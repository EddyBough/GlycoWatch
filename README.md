# 🩺 GlycoWatch

**Application de suivi de glycémie moderne et intuitive**

GlycoWatch est une application web complète pour le suivi quotidien de la glycémie, conçue avec Next.js 14, TypeScript et une interface utilisateur moderne.

## ✨ Fonctionnalités

### 🔐 Authentification

- **Connexion sécurisée** avec NextAuth.js
- **Support multi-providers** : Google, GitHub, Email/Mot de passe
- **Gestion des sessions** avec JWT
- **Réinitialisation de mot de passe** par email

### 📊 Suivi des mesures

- **Saisie quotidienne** des taux de glycémie
- **Enregistrement des doses d'insuline** (optionnel)
- **Calendrier interactif** avec visualisation des mesures
- **Graphiques dynamiques** avec Chart.js
- **Export PDF** des rapports mensuels

### 👤 Gestion du profil

- **Profil utilisateur complet** avec informations médicales
- **Historique des mesures** avec filtrage par date
- **Modification et suppression** des mesures
- **Données de santé** (médicaments, problèmes de santé)

### 🤖 Assistant chatbot

- **Chatbot intégré** pour conseils et support
- **Interface conversationnelle** intuitive
- **Réponses contextuelles** sur le diabète

### 📱 Interface moderne

- **Design responsive** avec Tailwind CSS
- **Animations fluides** avec Framer Motion
- **Thème cohérent** avec couleurs médicales
- **Notifications toast** pour le feedback utilisateur

## 🛠️ Technologies utilisées

### Frontend

- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Animations
- **React Calendar** - Composant calendrier
- **Chart.js** - Graphiques et visualisations

### Backend

- **Next.js API Routes** - API REST
- **Prisma** - ORM et gestion de base de données
- **PostgreSQL** - Base de données relationnelle
- **NextAuth.js** - Authentification
- **bcrypt** - Hachage des mots de passe

### Services externes

- **SendGrid** - Envoi d'emails
- **Google OAuth** - Authentification Google
- **GitHub OAuth** - Authentification GitHub

## 🚀 Installation

### Prérequis

- Node.js 18+
- PostgreSQL
- npm ou pnpm

### 1. Cloner le projet

```bash
git clone https://github.com/votre-username/glycowatch.git
cd glycowatch
```

### 2. Installer les dépendances

```bash
npm install
# ou
pnpm install
```

### 3. Configuration de l'environnement

Créer un fichier `.env.local` :

```env
# Base de données
POSTGRES_PRISMA_URL="postgresql://username:password@localhost:5432/glycowatch"

# NextAuth
NEXTAUTH_SECRET="votre-secret-nextauth"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Google
GOOGLE_CLIENT_ID="votre-google-client-id"
GOOGLE_CLIENT_SECRET="votre-google-client-secret"

# OAuth GitHub
GITHUB_CLIENT_ID="votre-github-client-id"
GITHUB_CLIENT_SECRET="votre-github-client-secret"

# SendGrid
SENDGRID_API_KEY="votre-sendgrid-api-key"
SENDGRID_FROM_EMAIL="noreply@votre-domaine.com"
```

### 4. Configuration de la base de données

```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma migrate deploy

# (Optionnel) Seeder la base de données
npm run seed
```

### 5. Lancer l'application

```bash
# Mode développement
npm run dev

# Mode production
npm run build
npm start
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
glycowatch/
├── src/
│   ├── app/                    # App Router Next.js
│   │   ├── api/               # API Routes
│   │   ├── dashboard/         # Page tableau de bord
│   │   ├── profile/           # Page profil
│   │   └── auth/              # Pages d'authentification
│   └── components/            # Composants React
│       ├── ui/                # Composants UI réutilisables
│       ├── Chatbot/           # Composant chatbot
│       └── ...                # Autres composants
├── lib/                       # Utilitaires et fonctions
│   ├── prisma.ts             # Client Prisma
│   ├── measurements.ts       # Logique métier mesures
│   └── profile.ts            # Logique métier profil
├── prisma/                   # Configuration Prisma
│   ├── schema.prisma         # Schéma de base de données
│   └── migrations/           # Migrations
└── public/                   # Assets statiques
```

## 🎯 Utilisation

### 1. Inscription/Connexion

- Créer un compte avec email/mot de passe
- Ou se connecter avec Google/GitHub
- Compléter le profil utilisateur

### 2. Saisie des mesures

- Aller sur le tableau de bord
- Saisir le taux de glycémie
- Optionnellement ajouter la dose d'insuline
- Les mesures sont automatiquement datées

### 3. Consultation des données

- **Calendrier** : visualiser les mesures par jour
- **Graphiques** : analyser les tendances
- **Rapports** : exporter les données en PDF

### 4. Gestion du profil

- Modifier les informations personnelles
- Ajouter les médicaments et problèmes de santé
- Gérer les préférences de compte

## 🔧 Scripts disponibles

```bash
npm run dev          # Mode développement
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Linter ESLint
npm run seed         # Seeder la base de données
```

## 🚀 Déploiement

### Vercel (recommandé)

```bash
# Build optimisé pour Vercel
npm run vercel-build
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajouter nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- [Next.js](https://nextjs.org/) - Framework React
- [Prisma](https://prisma.io/) - ORM moderne
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Chart.js](https://chartjs.org/) - Bibliothèque de graphiques
- [NextAuth.js](https://next-auth.js.org/) - Authentification

---

**Développé avec ❤️ pour améliorer le suivi de la glycémie et en hommage aux patients atteints du diabete**
