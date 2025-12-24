// src/next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      firstname?: string | null;
      plan: "FREE" | "IA_PLUS";
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    firstname?: string | null;
  }
}

// ⚠️ IMPORTANT : JWT est dans next-auth/jwt
declare module "next-auth/jwt" {
  interface JWT {
    sub: string;
    firstname?: string | null;
    plan?: "FREE" | "IA_PLUS";
  }
}
