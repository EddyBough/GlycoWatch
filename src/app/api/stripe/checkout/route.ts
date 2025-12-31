import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Stripe from "stripe";
import prisma from "../../../../../lib/prisma";

// Mapping des plans vers les price_id Stripe
const STRIPE_PRICES = {
  IA_PLUS: "price_1SivPDIFAaTY0fFsML0cZpFV",
};

// Initialiser Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

export async function POST(req: NextRequest) {
  try {
    // 1. Vérifier que les variables Stripe sont configurées
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("Variables Stripe manquantes");
      return NextResponse.json(
        { error: "Configuration Stripe manquante" },
        { status: 500 }
      );
    }

    // 2. Lire le body et valider le plan
    const body = await req.json();
    const { plan } = body;

    if (!plan || plan !== "IA_PLUS") {
      return NextResponse.json({ error: "Plan invalide" }, { status: 400 });
    }

    const priceId = STRIPE_PRICES[plan as keyof typeof STRIPE_PRICES];

    // 3. Vérifier l'authentification
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

    // 4. Vérifier que l'utilisateur n'a pas déjà un abonnement actif
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (subscription?.plan === "IA_PLUS" && subscription?.status === "active") {
      return NextResponse.json(
        { error: "Vous avez déjà un abonnement actif" },
        { status: 400 }
      );
    }

    // 5. Récupérer ou créer le customer Stripe
    let customerId = subscription?.stripeCustomerId;

    if (!customerId) {
      // Créer un nouveau customer Stripe
      const customer = await stripe.customers.create({
        email: session.user.email || undefined,
        name: session.user.name || undefined,
        metadata: {
          userId: String(userId),
        },
      });

      customerId = customer.id;

      // Sauvegarder le customer ID dans la DB
      await prisma.subscription.upsert({
        where: { userId },
        update: {
          stripeCustomerId: customerId,
        },
        create: {
          userId,
          plan: "FREE",
          stripeCustomerId: customerId,
        },
      });
    }

    // 6. Créer la session Checkout
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get("origin")}/pricing?success=true`,
      cancel_url: `${req.headers.get("origin")}/pricing?canceled=true`,
      metadata: {
        userId: String(userId),
      },
      subscription_data: {
        metadata: {
          userId: String(userId),
        },
      },
    });

    // 7. Rediriger vers Stripe Checkout
    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error("Erreur API /api/stripe/checkout:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la session de paiement" },
      { status: 500 }
    );
  }
}
