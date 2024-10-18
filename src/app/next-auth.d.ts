// src/next-auth.d.ts
import NextAuth from "next-auth";

// Étendre les types de NextAuth pour ajouter le champ firstname
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstname?: string | null; // Ajout du champ firstname
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    firstname?: string | null; // Ajout du champ firstname à l'utilisateur
  }

  interface JWT {
    sub: string;
    firstname?: string | null; // Ajout du champ firstname au JWT
  }
}
