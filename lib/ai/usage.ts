import prisma from "../prisma";
import { Plan } from "@prisma/client";

/**
 * Quotas quotidiens par plan
 */
const QUOTAS: Record<Plan, number> = {
  FREE: 0, // Pas d'accès IA
  IA_PLUS: 50, // 50 requêtes/jour
};

/**
 * Vérifie si l'utilisateur peut faire une requête IA (lecture seule, pour affichage UI)
 * NOTE : Pour consommer un crédit, utiliser consumeAiRequest() (atomique)
 *
 * @returns {Promise<{ allowed: boolean; remaining: number; dailyLimit: number }>}
 */
export async function checkAiQuota(userId: number): Promise<{
  allowed: boolean;
  remaining: number;
  dailyLimit: number;
}> {
  const subscription = await prisma.subscription.findUnique({
    where: { userId },
  });

  const plan = subscription?.plan || "FREE";
  const dailyLimit = QUOTAS[plan];

  // Plan FREE = pas d'accès
  if (plan === "FREE") {
    return {
      allowed: false,
      remaining: 0,
      dailyLimit: 0,
    };
  }

  // Récupérer l'usage (ne pas créer si inexistant, c'est juste pour affichage)
  const aiUsage = await prisma.aiUsage.findUnique({
    where: { userId },
  });

  if (!aiUsage) {
    // Si pas encore d'usage, on retourne le quota théorique
    return {
      allowed: dailyLimit > 0,
      remaining: dailyLimit,
      dailyLimit,
    };
  }

  // Vérifier si reset nécessaire (comparaison simple)
  const now = new Date();
  const lastReset = aiUsage.lastReset ? new Date(aiUsage.lastReset) : null;
  const isNewDay =
    !lastReset || lastReset.toDateString() !== now.toDateString();

  // Calculer le remaining (0 si nouveau jour, sinon dailyLimit - requestsToday)
  const requestsToday = isNewDay ? 0 : aiUsage.requestsToday;
  const remaining = Math.max(0, aiUsage.dailyLimit - requestsToday);

  return {
    allowed: remaining > 0,
    remaining,
    dailyLimit: aiUsage.dailyLimit,
  };
}

/**
 * Consomme une requête IA de manière atomique (check + increment dans une transaction)
 * CRITIQUE : Cette fonction doit être utilisée AVANT l'appel OpenAI pour éviter les fuites financières
 *
 * @throws {Error} "NO_AI_ACCESS" si plan FREE
 * @throws {Error} "AI_QUOTA_EXCEEDED" si quota quotidien atteint
 *
 * @returns {Promise<{ remaining: number; dailyLimit: number }>} Nombre de requêtes restantes
 */
export async function consumeAiRequest(userId: number): Promise<{
  remaining: number;
  dailyLimit: number;
}> {
  return await prisma.$transaction(async (tx) => {
    // 1. Récupérer le plan
    const subscription = await tx.subscription.findUnique({
      where: { userId },
    });

    const plan = subscription?.plan || "FREE";
    const dailyLimit = QUOTAS[plan];

    // 2. Si plan FREE, refuser immédiatement
    if (dailyLimit === 0) {
      throw new Error("NO_AI_ACCESS");
    }

    // 3. Récupérer ou créer l'usage
    let usage = await tx.aiUsage.findUnique({
      where: { userId },
    });

    const now = new Date();

    if (!usage) {
      usage = await tx.aiUsage.create({
        data: {
          userId,
          dailyLimit,
          requestsToday: 0,
          lastReset: now,
        },
      });
    } else {
      // 4. Mettre à jour le quota si le plan a changé
      if (usage.dailyLimit !== dailyLimit) {
        usage = await tx.aiUsage.update({
          where: { userId },
          data: { dailyLimit },
        });
      }

      // 5. Reset si nouveau jour
      const isNewDay =
        !usage.lastReset ||
        usage.lastReset.toDateString() !== now.toDateString();

      if (isNewDay) {
        usage = await tx.aiUsage.update({
          where: { userId },
          data: {
            requestsToday: 0,
            lastReset: now,
          },
        });
      }
    }

    // 6. Vérifier le quota AVANT d'incrémenter
    if (usage.requestsToday >= usage.dailyLimit) {
      throw new Error("AI_QUOTA_EXCEEDED");
    }

    // 7. Incrémenter atomiquement et récupérer la nouvelle valeur
    const updatedUsage = await tx.aiUsage.update({
      where: { userId },
      data: {
        requestsToday: { increment: 1 },
      },
    });

    // 8. Retourner les infos (remaining calculé avec la valeur mise à jour)
    return {
      remaining: updatedUsage.dailyLimit - updatedUsage.requestsToday,
      dailyLimit: updatedUsage.dailyLimit,
    };
  });
}

/**
 * Initialise les crédits pour un nouvel utilisateur
 */
export async function initializeAiUsage(
  userId: number,
  plan: Plan = "FREE"
): Promise<void> {
  const dailyLimit = QUOTAS[plan];

  await prisma.aiUsage.upsert({
    where: { userId },
    create: {
      userId,
      dailyLimit,
      requestsToday: 0,
      lastReset: new Date(),
    },
    update: {
      dailyLimit, // Mettre à jour si le plan a changé
    },
  });
}

/**
 * Récupère le nombre de requêtes disponibles
 */
export async function getAvailableTokens(userId: number): Promise<number> {
  const quota = await checkAiQuota(userId);
  return quota.remaining;
}
