import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
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
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    // Credentials Provider for classic authentication
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Vérification for avoid undefined credentials
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Email or password missing");
        }

        // Search for the user in the database via Prisma
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Aucun utilisateur trouvé");
        }

        // Password verification
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

        // Return an object user compliant with NextAuth
        return {
          id: String(user.id), // NextAuth expects a string
          name: user.name,
          email: user.email,
          image: user.image,
          firstname: user.firstname,
        };
      },
    }),
  ],

  adapter: PrismaAdapter(prisma), // Use of Prisma with NextAuth

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt" as SessionStrategy, // Use of JWT for sessions
    maxAge: 7 * 24 * 60 * 60, // 7 jours
    updateAge: 24 * 60 * 60, // 24 hours to refresh the session
  },

  callbacks: {
    async session({ session, token }) {
      const userId = parseInt(token.sub || "", 10); // Convert the ID to an integer
      if (session.user) {
        session.user.id = userId; // Associate the user ID to the session
        session.user.firstname = token.firstname || null;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id; // Link the user to the JWT token
        token.firstname = user.firstname || null;
      }
      return token;
    },

    async redirect({ url, baseUrl }) {
      // Redirection after authentication
      if (url.startsWith(baseUrl)) {
        return url; // Redirect to the original page
      }
      return "/dashboard"; // Redirect to /dashboard by default
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
