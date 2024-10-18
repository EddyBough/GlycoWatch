// src/app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  // Vérification de l'utilisateur dans la base de données
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      { message: "Email ou mot de passe incorrect" },
      { status: 401 }
    );
  }

  // Connexion réussie, tu pourrais créer un token ici si tu utilises une session
  return NextResponse.json(
    { message: "Connexion réussie", userId: user.id },
    { status: 200 }
  );
}
