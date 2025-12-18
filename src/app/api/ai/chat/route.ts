import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { consumeAiRequest } from "../../../../../lib/ai/usage";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    // 0. Vérifier que OPENAI_API_KEY est configurée
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY manquante");
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // 1. Vérifier l'authentification
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    // Type assertion nécessaire car NextAuth types sont complexes
    const userId = session.user.id;
    if (!userId || isNaN(userId)) {
      return NextResponse.json(
        { error: "ID utilisateur invalide" },
        { status: 401 }
      );
    }

    // 2. Récupérer le message utilisateur
    const body = await req.json();
    const { message } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message requis" }, { status: 400 });
    }

    // 3. Consommer un crédit IA (atomique - vérifie ET débite)
    let quotaInfo;
    try {
      quotaInfo = await consumeAiRequest(userId);
    } catch (error: any) {
      // Log pour monitoring (utile en SaaS)
      console.warn("AI quota error", {
        userId,
        error: error.message,
      });

      // Gérer les erreurs de quota
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
      // Erreur inattendue
      throw error;
    }

    // 4. Appeler OpenAI (seulement si crédit débité avec succès)
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Tu es GlycoBot, un assistant médical spécialisé dans le diabète. Tu fournis des conseils généraux sur la glycémie et le diabète. Tu es professionnel, rassurant et toujours précise qu'il faut consulter un médecin pour tout conseil médical personnalisé.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 300, // Réponses courtes pour limiter les coûts
      temperature: 0.7,
    });

    const aiResponse =
      completion.choices[0]?.message?.content ||
      "Désolé, je n'ai pas pu générer de réponse.";

    // 5. Retourner la réponse avec les infos de quota
    return NextResponse.json({
      response: aiResponse,
      remaining: quotaInfo.remaining,
      dailyLimit: quotaInfo.dailyLimit,
    });
  } catch (error) {
    console.error("Erreur API /api/ai/chat:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
