import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google client ID or secret");
}

const authOptions: AuthOptions = {
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Credentials Provider pour authentification classique
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Vérification que les credentials ne sont pas undefined
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Email ou mot de passe manquant");
        }

        // Recherche de l'utilisateur dans la base de données via Prisma
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Aucun utilisateur trouvé");
        }

        // Vérification du mot de passe
        if (!user.password) {
          throw new Error("Mot de passe non défini pour cet utilisateur");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Mot de passe incorrect");
        }

        // Retourner un objet utilisateur conforme à NextAuth
        return {
          id: String(user.id), // NextAuth s'attend à une chaîne de caractères
          name: user.name,
          email: user.email,
          image: user.image,
          firstname: user.firstname,
        };
      },
    }),
  ],

  adapter: PrismaAdapter(prisma), // Utilisation de Prisma avec NextAuth

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt" as SessionStrategy, // Utilisation de JWT pour les sessions
  },

  callbacks: {
    async session({ session, token }) {
      const userId = parseInt(token.sub || "", 10); // Convertir l'ID en entier
      if (session.user) {
        session.user.id = userId; // Associer l'ID utilisateur à la session
        session.user.firstname = token.firstname || null;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id; // Lier l'utilisateur au token JWT
        token.firstname = user.firstname || null;
      }
      return token;
    },

    async redirect({ url, baseUrl }) {
      // Redirection après authentification
      if (url.startsWith(baseUrl)) {
        return url; // Rediriger vers la page d'origine
      }
      return "/dashboard"; // Rediriger par défaut vers /dashboard
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
