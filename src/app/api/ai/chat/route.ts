import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { consumeAiRequest } from "../../../../../lib/ai/usage";
import OpenAI from "openai";
import prisma from "../../../../../lib/prisma";

/**
 * Construit le contexte glycémique pour l'IA (7 derniers jours)
 */
function buildMeasurementsContext(
  measurements: {
    glycemyLevel: number;
    insulinDose: number | null;
    date: Date;
  }[]
): string {
  if (!measurements.length) {
    return "\n\n[GLYCÉMIE]\nAucune mesure enregistrée sur les 7 derniers jours.";
  }

  const formatted = measurements
    .map((m) => {
      const date = new Date(m.date).toLocaleDateString("fr-FR");
      const insulin = m.insulinDose ? ` | Insuline ${m.insulinDose}U` : "";
      return `${date} | ${m.glycemyLevel} g/L${insulin}`;
    })
    .join("\n");

  return `\n\n[GLYCÉMIE - 7 DERNIERS JOURS]\n${formatted}`;
}

/**
 * Construit le contexte médical du patient pour l'IA (type de diabète, médicaments)
 */
function buildProfileContext(
  profile: {
    diabetesType: string | null;
    medications: string | null;
  } | null
): string {
  if (!profile) {
    return "\n\n[PROFIL]\nAucune information médicale renseignée.";
  }

  const diabetesTypeMap: Record<string, string> = {
    TYPE_1: "Type 1 (insulinodépendant)",
    TYPE_2: "Type 2",
    GESTATIONAL: "Diabète gestationnel",
    LADA: "LADA (diabète auto-immun latent de l’adulte)",
    OTHER: "Autre type de diabète",
  };

  let context = "\n\n[PROFIL]";

  if (profile.diabetesType) {
    const label = diabetesTypeMap[profile.diabetesType] ?? profile.diabetesType;
    context += `\nType de diabète : ${label}`;

    //Orientation forte pour l'IA sans coût significatif
    if (profile.diabetesType === "TYPE_1") {
      context +=
        "\n Patient insulinodépendant : vigilance accrue sur les variations glycémiques.";
    }
  } else {
    context += "\nType de diabète : Non renseigné";
  }

  if (profile.medications) {
    context += `\nMédicaments : ${profile.medications}`;
  }

  return context;
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY manquante");
    }

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const userId = session.user.id;
    if (!userId || isNaN(userId)) {
      return NextResponse.json(
        { error: "ID utilisateur invalide" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { message } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message requis" }, { status: 400 });
    }

    //Débit quota AVANT appel OpenAI
    let quotaInfo;
    try {
      quotaInfo = await consumeAiRequest(userId);
    } catch (error: any) {
      if (error.message === "NO_AI_ACCESS") {
        return NextResponse.json(
          {
            error: "L'accès IA nécessite un abonnement IA+",
            code: "NO_AI_ACCESS",
          },
          { status: 403 }
        );
      }

      if (error.message === "AI_QUOTA_EXCEEDED") {
        return NextResponse.json(
          {
            error: "Quota quotidien atteint. Réessayez demain.",
            code: "AI_QUOTA_EXCEEDED",
          },
          { status: 429 }
        );
      }

      throw error;
    }

    //Profil utilisateur (type-safe)
    const profile = await prisma.profile.findUnique({
      where: { userId },
      select: {
        diabetesType: true,
        medications: true,
      },
    });

    //Mesures des 7 derniers jours
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const measurements = await prisma.measurement.findMany({
      where: {
        userId,
        date: { gte: sevenDaysAgo },
      },
      orderBy: { date: "desc" },
      select: {
        glycemyLevel: true,
        insulinDose: true,
        date: true,
      },
      take: 50,
    });

    const profileContext = buildProfileContext(profile);
    const measurementsContext = buildMeasurementsContext(measurements);

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Tu es GlycoBot, un assistant médical spécialisé dans le diabète. " +
            "Tu analyses les données du patient ci-dessous et fournis des conseils clairs, courts et concis " +
            "Tu rappelles toujours que l'avis d'un professionnel de santé est indispensable pour toute décision médicale." +
            profileContext +
            measurementsContext,
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 400,
      temperature: 0.7,
    });

    const response =
      completion.choices[0]?.message?.content ??
      "Désolé, je n'ai pas pu générer de réponse.";

    return NextResponse.json({
      response,
      remaining: quotaInfo.remaining,
      dailyLimit: quotaInfo.dailyLimit,
    });
  } catch (error) {
    console.error("Erreur API /api/ai/chat:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
