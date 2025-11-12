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

    const errors: { [key: string]: string } = {};

    // Errors verifications fields
    if (!email) errors.email = "L'email est requis";
    if (!password) errors.password = "Le mot de passe est requis";
    if (!name) errors.name = "Le nom est requis";
    if (!firstname) errors.firstname = "Le prénom est requis";
    if (!birthdate) errors.birthdate = "La date de naissance est requise";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Regex for password
    if (password.length < 6) {
      errors.passwordLength =
        "Le mot de passe doit contenir au moins 6 caractères";
    }
    if (!/[A-Z]/.test(password)) {
      errors.passwordUppercase =
        "Le mot de passe doit contenir au moins une majuscule";
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.passwordSpecial =
        "Le mot de passe doit contenir au moins un caractère spécial";
    }

    // If validations errors => return errors
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Verification in db if user email already exists
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

    await sendEmail(user.email, user.firstname || "Cher utilisateur"); // send welcome email

    return NextResponse.json(
      { message: "Utilisateur créé avec succès" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur lors de la création de l'utilisateur" },
      { status: 500 }
    );
  }
}
