import sgMail from "@sendgrid/mail";

// Configure l'API Key SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export async function sendEmail(to: string, firstname: string) {
  try {
    const msg = {
      to,
      from: {
        email: "ebdeveloper@outlook.fr", // Remplace par ton e-mail vérifié
        name: "GlycoWatch®", // Nom de l'expéditeur
      },
      subject: "Bienvenue sur GlycoWatch",
      text: `Bonjour ${firstname}, bienvenue sur GlycoWatch®! Nous sommes ravis de vous avoir parmi nous.`,
      html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #00cba9; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0;">Bienvenue sur GlycoWatch®</h1>
        </div>
        <div style="padding: 20px;">
          <p>Bonjour <strong>${firstname}</strong>,</p>
          <p>Nous sommes ravis de vous accueillir sur GlycoWatch®! Notre application est conçue pour vous aider à suivre et gérer vos mesures de glycémie de manière simple et efficace.</p>
          <p>Nous espérons que vous trouverez notre service utile et agréable. Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter à tout moment.</p>
          <p style="margin-top: 20px;">Cordialement,<br>L'équipe GlycoWatch®</p>
        </div>
        <div style="background-color: #f0f0f0; text-align: center; padding: 10px; font-size: 12px; color: #555;">
          <p>Vous recevez cet e-mail parce que vous avez créé un compte sur GlycoWatch®. Si vous n'êtes pas à l'origine de cette action, veuillez nous contacter immédiatement.</p>
        </div>
      </div>
    `,
    };

    await sgMail.send(msg);
    console.log("E-mail envoyé avec succès");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail", error);
  }
}
