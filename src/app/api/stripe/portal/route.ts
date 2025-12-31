import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Stripe from "stripe";
import prisma from "../../../../../lib/prisma";

// Initialiser Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

export async function POST(req: NextRequest) {
  try {
    // 1. Vérifier l'authentification
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

    // 2. Récupérer l'abonnement de l'utilisateur
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      return NextResponse.json(
        { error: "Aucun abonnement trouvé" },
        { status: 400 }
      );
    }
    //si l'utilisateur n'a pas de customer stripe associé (pas d'abonnement actif sur stripe), on renvoie une erreur
    if (!subscription.stripeCustomerId) {
      return NextResponse.json(
        {
          error:
            "Aucun client Stripe associé. Veuillez souscrire à un abonnement via le processus de paiement.",
        },
        { status: 400 }
      );
    }

    // 3. Créer la session du Customer Portal Stripe
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: `${
        req.headers.get("origin") ||
        process.env.NEXTAUTH_URL ||
        "http://localhost:3000"
      }/pricing`,
    });

    // 4. Rediriger vers le Customer Portal
    return NextResponse.json({ url: portalSession.url });
  } catch (error: any) {
    console.error("Erreur API /api/stripe/portal:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la session du portail" },
      { status: 500 }
    );
  }
}
