import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { encode } from "next-auth/jwt";
import prisma from "../../../../lib/prisma";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    let email: string;

    // verification if content is JSON or x-www-form-urlencoded
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const body = await req.json(); // if JSON, parse the body
      email = body.email;
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await req.formData(); // if form-urlencoded, parse the data
      email = formData.get("email") as string;
    } else {
      return NextResponse.redirect(
        `${process.env.APP_URL}/error-unsupported-format`
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.redirect(`${process.env.APP_URL}/user-not-found`);
    }

    // generate token JWT for 1 hour
    const resetToken = await encode({
      secret: process.env.NEXTAUTH_SECRET || "",
      token: { email },
      maxAge: 60 * 60,
    });

    const resetLink = `${process.env.APP_URL}/reset-password?token=${resetToken}`;

    // send the e-mail
    const msg = {
      to: email,
      from: {
        email: "ebdeveloper@outlook.fr",
        name: "GlycoWatch®",
      },
      subject: "Réinitialisation de votre mot de passe",
      html: `
        <p>Bonjour,</p>
        <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien ci-dessous pour continuer :</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer cet e-mail.</p>
      `,
    };

    await sgMail.send(msg);

    return NextResponse.redirect(
      `${process.env.APP_URL}/email-sent-success?success=true`
    );
  } catch (error) {
    return NextResponse.redirect(
      `${process.env.APP_URL}/home?error=server_error`
    );
  }
}
