# Changelog - Intégration IA dans le Chatbot avec Quotas

**Date**: 2025-01-XX
**Ticket**: issue-184-integration-of-openai-in-chatbot-with-quota-management

## 📝 Récapitulatif des modifications

### Phase 1: Migration Prisma ✅

- **Fichier**: `prisma/schema.prisma`
- **Changements**:
  - Ajout de l'enum `Plan` (FREE, IA_PLUS)
  - Ajout du modèle `Subscription`
  - Ajout du modèle `AiUsage`
- **Migration**: Déjà appliquée en production

### Phase 2: Service de gestion des quotas ✅

- **Fichier**: `lib/ai/usage.ts` (NOUVEAU)
- **Fonctions créées**:
  - `checkAiQuota()` - Vérifie les quotas (lecture seule, pour UI)
  - `consumeAiRequest()` - Consomme un crédit IA (atomique, transaction Prisma)
  - `initializeAiUsage()` - Initialise les quotas pour un nouvel utilisateur
  - `getAvailableTokens()` - Récupère le nombre de requêtes disponibles

### Phase 3: API Route `/api/ai/chat` ✅

- **Fichier**: `src/app/api/ai/chat/route.ts` (NOUVEAU)
- **Fonctionnalités**:
  - Authentification via NextAuth
  - Vérification et consommation de quotas (atomique)
  - Appel OpenAI GPT-4o-mini
  - Gestion d'erreurs (403, 429, 500)

### Phase 3b: Refactorisation authOptions

- **Fichier**: `src/lib/auth.ts` (NOUVEAU)
  - Configuration NextAuth extraite de la route
- **Fichier**: `src/app/api/auth/[...nextauth]/route.ts` (MODIFIÉ)
  - Simplifié pour n'exporter que GET/POST handlers
  - Importe `authOptions` depuis `src/lib/auth.ts`

### Modifications des types NextAuth

- **Fichier**: `src/app/next-auth.d.ts` (MODIFIÉ)
  - `Session.user.id` : `string` → `number`
  - Ajout de `firstname` dans Session, User et JWT
  - Module `next-auth/jwt` séparé pour l'interface JWT

### Corrections liées aux types

- **Fichier**: `lib/sendResetEmail.ts` (MODIFIÉ)
  - Ajout de `sub: email` dans le token JWT (requis par le type)
- **Fichier**: `src/app/dashboard/page.tsx` (MODIFIÉ)
  - Ajout vérification `session?.user?.id` avant appel `addMeasurement()`
- **Fichier**: `src/app/profile/ProfilePage.tsx` (MODIFIÉ)
  - Correction `signOut(session?.user.id)` → `signOut()` (signOut ne prend pas de paramètre)

### Dépendances ajoutées

- **Fichier**: `package.json`
  - `openai: ^6.14.0`

## 🔄 Pour revenir en arrière

### Si problème avec authOptions

Pour restaurer l'ancienne structure (authOptions dans route.ts) :

1. Déplacer le contenu de `src/lib/auth.ts` dans `src/app/api/auth/[...nextauth]/route.ts`
2. Supprimer `src/lib/auth.ts`
3. Mettre à jour les imports dans `src/app/api/ai/chat/route.ts`

### Si problème avec les types NextAuth

Pour restaurer les types d'origine :

```typescript
// src/app/next-auth.d.ts - Version simplifiée
declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Revenir à string
      firstname?: string | null;
    } & DefaultSession["user"];
  }
}
```

### Si problème avec les quotas

Pour désactiver temporairement :

1. Dans `lib/ai/usage.ts`, modifier `QUOTAS` :

```typescript
const QUOTAS: Record<Plan, number> = {
  FREE: 999999, // Accès illimité temporaire
  IA_PLUS: 999999,
};
```

## 📦 Variables d'environnement requises

```env
OPENAI_API_KEY="sk-..."  # NOUVEAU - Requis pour l'API IA
```

## ✅ Tests réussis

- Build local ✅
- Types TypeScript ✅
- Linter ✅

## ⚠️ Notes importantes

- Les quotas sont gérés de manière atomique (transaction Prisma) pour éviter les race conditions
- Le coût est maîtrisé avec `max_tokens: 300` par requête
- Les utilisateurs FREE n'ont pas accès à l'IA (0 requêtes/jour)
- Les utilisateurs IA_PLUS ont 50 requêtes/jour

## 🔜 Prochaines étapes

- Phase 4-7: Intégration dans le chatbot (ActionProvider, MessageParser)
- Phase 8: API `/api/subscription/status` pour affichage quotas
- Phase 9: Initialisation automatique AiUsage lors du signup
- Phase 10: Tests et vérifications finales
