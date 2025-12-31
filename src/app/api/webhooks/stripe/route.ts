import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "../../../../../lib/prisma";
import { initializeAiUsage } from "../../../../../lib/ai/usage";

// Mapping des plans vers les price_id Stripe (identique à checkout)
const STRIPE_PRICES = {
  IA_PLUS: "price_1SivPDIFAaTY0fFsML0cZpFV",
};

// Fonction helper : mapper price_id → plan
function getPlanFromPriceId(priceId: string | undefined): "IA_PLUS" | "FREE" {
  if (!priceId) return "FREE";

  const plan = Object.keys(STRIPE_PRICES).find(
    (key) => STRIPE_PRICES[key as keyof typeof STRIPE_PRICES] === priceId
  ) as keyof typeof STRIPE_PRICES | undefined;

  return plan ? (plan as "IA_PLUS") : "FREE";
}

// Initialiser Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

// Important : Next.js 15+ nécessite de désactiver le body parsing pour les webhooks
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Signature manquante" }, { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("STRIPE_WEBHOOK_SECRET manquant");
    return NextResponse.json(
      { error: "Configuration webhook manquante" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    // Vérifier la signature du webhook (sécurité critique)
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error("Erreur de vérification webhook:", err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Gérer les différents événements
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        // Récupérer le userId depuis les metadata
        const userId = session.metadata?.userId;
        if (!userId) {
          console.error("userId manquant dans checkout.session.completed");
          return NextResponse.json({ received: true });
        }

        const userIdNumber = parseInt(userId, 10);
        if (isNaN(userIdNumber)) {
          console.error("userId invalide:", userId);
          return NextResponse.json({ received: true });
        }

        // Récupérer la subscription depuis Stripe
        const subscriptionId = session.subscription as string;
        if (!subscriptionId) {
          console.error("subscriptionId manquant");
          return NextResponse.json({ received: true });
        }

        const subscription = await stripe.subscriptions.retrieve(
          subscriptionId
        );

        // Récupérer le price_id et mapper vers le plan
        const priceId = subscription.items.data[0]?.price.id;
        const plan = getPlanFromPriceId(priceId);

        // Mettre à jour la DB avec le plan détecté
        await prisma.subscription.upsert({
          where: { userId: userIdNumber },
          update: {
            plan: plan,
            status: subscription.status,
            stripeSubId: subscription.id,
          },
          create: {
            userId: userIdNumber,
            plan: plan,
            status: subscription.status,
            stripeCustomerId: subscription.customer as string,
            stripeSubId: subscription.id,
          },
        });

        // Initialiser les quotas IA pour cet utilisateur
        try {
          await initializeAiUsage(userIdNumber, plan);
        } catch (error) {
          console.error("Erreur initialisation quotas IA:", error);
          // On continue même si l'initialisation échoue
        }

        console.log(`Abonnement activé pour userId: ${userIdNumber}`);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;

        // Récupérer le userId depuis les metadata de la subscription
        const userId = subscription.metadata?.userId;
        if (!userId) {
          console.error("userId manquant dans customer.subscription.updated");
          return NextResponse.json({ received: true });
        }

        const userIdNumber = parseInt(userId, 10);
        if (isNaN(userIdNumber)) {
          console.error("userId invalide:", userId);
          return NextResponse.json({ received: true });
        }

        // Récupérer le price_id et mapper vers le plan
        const priceId = subscription.items.data[0]?.price.id;
        const plan = getPlanFromPriceId(priceId);

        // Mettre à jour le status dans la DB
        // Si l'abonnement est annulé mais toujours actif jusqu'à la fin de période
        const finalPlan =
          subscription.status === "active" || subscription.status === "trialing"
            ? plan
            : "FREE";

        await prisma.subscription.updateMany({
          where: { userId: userIdNumber },
          data: {
            status: subscription.status,
            plan: finalPlan,
          },
        });

        // Mettre à jour les quotas IA si nécessaire
        try {
          await initializeAiUsage(userIdNumber, finalPlan);
        } catch (error) {
          console.error("Erreur mise à jour quotas IA:", error);
        }

        console.log(
          `Abonnement mis à jour pour userId: ${userIdNumber}, status: ${subscription.status}`
        );
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        // Récupérer le userId depuis les metadata
        const userId = subscription.metadata?.userId;
        if (!userId) {
          console.error("userId manquant dans customer.subscription.deleted");
          return NextResponse.json({ received: true });
        }

        const userIdNumber = parseInt(userId, 10);
        if (isNaN(userIdNumber)) {
          console.error("userId invalide:", userId);
          return NextResponse.json({ received: true });
        }

        // Mettre à jour la DB : plan = FREE, status = canceled
        await prisma.subscription.updateMany({
          where: { userId: userIdNumber },
          data: {
            plan: "FREE",
            status: "canceled",
            stripeSubId: null, // Optionnel : garder pour historique
          },
        });

        // Réinitialiser les quotas IA
        try {
          await initializeAiUsage(userIdNumber, "FREE");
        } catch (error) {
          console.error("Erreur réinitialisation quotas IA:", error);
        }

        console.log(`Abonnement annulé pour userId: ${userIdNumber}`);
        break;
      }

      default:
        console.log(`Événement non géré: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Erreur traitement webhook:", error);
    return NextResponse.json(
      { error: "Erreur lors du traitement du webhook" },
      { status: 500 }
    );
  }
}
