import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { sendEmail } from "../../../../lib/sendEmail";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name, firstname, birthdate, address, phone } =
      body;

    if (!email || !password || !name || !firstname || !birthdate) {
      return NextResponse.json(
        {
          message:
            "Email, mot de passe, nom, prénom et date de naissance sont requis",
        },
        { status: 400 }
      );
    }

    // Vérification si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Un compte existe déjà avec cet email" },
        { status: 409 } // Code 409 pour conflit
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        firstname,
        profile: {
          create: {
            birthdate: new Date(birthdate),
            address,
            phone,
          },
        },
      },
    });

    await sendEmail(user.email, user.firstname || "Cher utilisateur"); //une fois créé on envoi un email de bienvenue

    return NextResponse.json(
      { message: "Utilisateur créé avec succès" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur", error);
    return NextResponse.json(
      { message: "Erreur lors de la création de l'utilisateur" },
      { status: 500 }
    );
  }
}
