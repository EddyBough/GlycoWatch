import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password, name, firstname, birthdate, address, phone } = body;

  console.log("Données reçues : ", {
    email,
    password,
    name,
    firstname,
    birthdate,
    address,
    phone,
  });

  if (!email || !password || !name || !firstname || !birthdate) {
    return NextResponse.json(
      {
        message:
          "Email, mot de passe, nom, prénom et date de naissance sont requis",
      },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
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
