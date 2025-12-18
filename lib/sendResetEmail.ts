import { Resend } from "resend";
import { encode } from "next-auth/jwt"; // Fonction NextAuth pour encoder le token JWT

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetEmail(email: string) {
  const appUrl = process.env.APP_URL || "http://localhost:3000";

  try {
    const resetToken = await encode({
      secret: process.env.NEXTAUTH_SECRET || "",
      token: { email, sub: email }, // sub est requis par le type JWT
      maxAge: 60 * 60, // Expire dans 1 heure
    });

    const resetLink = `${appUrl}/reset-password?token=${resetToken}`;

    await resend.emails.send({
      from: "GlycoWatch® <noreply@glycowatch.fr>",
      to: email,
      subject: "Réinitialisation de votre mot de passe",
      html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #00cba9; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0;">Bienvenue sur GlycoWatch®</h1>
        </div>
        <div style="padding: 20px;">
          <p>Bonjour,</p>
          <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien ci-dessous pour continuer :</p>
          <a href="${resetLink}" target="_blank">${resetLink}</a>
          <p>Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer cet e-mail.</p>
          <p style="margin-top: 20px;">Cordialement,<br>L'équipe GlycoWatch®</p>
        </div>
        <div style="background-color: #f0f0f0; text-align: center; padding: 10px; font-size: 12px; color: #555;">
          <p>Vous recevez cet e-mail parce que vous avez créé un compte sur GlycoWatch®. Si vous n'êtes pas à l'origine de cette action, veuillez nous contacter immédiatement.</p>
        </div>
      </div>
    `,
    });
  } catch (error) {
    throw new Error("Erreur lors de l'envoi de l'e-mail.");
  }
}
