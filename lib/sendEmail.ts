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
      html: `<p>Bonjour <strong>${firstname}</strong>,</p>
             <p>Bienvenue sur GlycoWatch®! Nous sommes ravis de vous avoir parmi nous.</p>
             <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>`,
    };

    await sgMail.send(msg);
    console.log("E-mail envoyé avec succès");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail", error);
  }
}
