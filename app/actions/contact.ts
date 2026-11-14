"use server";

import { Resend } from "resend";

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  locale?: "fr" | "en";
}

export interface ContactActionResult {
  success: boolean;
  message: string;
  error?: string;
}

export async function sendContactMessage(
  data: ContactFormData
): Promise<ContactActionResult> {
  const { name, email, subject, message, locale = "fr" } = data;

  // Validation basique
  if (!name || name.trim().length < 2) {
    return {
      success: false,
      message:
        locale === "fr"
          ? "Veuillez renseigner un nom valide."
          : "Please provide a valid name.",
      error: "INVALID_NAME",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    return {
      success: false,
      message:
        locale === "fr"
          ? "Veuillez renseigner une adresse email valide."
          : "Please provide a valid email address.",
      error: "INVALID_EMAIL",
    };
  }

  if (!message || message.trim().length < 15) {
    return {
      success: false,
      message:
        locale === "fr"
          ? "Votre message est trop court (minimum 5 caractères)."
          : "Your message is too short (minimum 15 characters).",
      error: "INVALID_MESSAGE",
    };
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanSubject =
    subject && subject.trim().length > 0
      ? subject.trim()
      : locale === "fr"
        ? "Nouvelle demande de contact"
        : "New contact inquiry";
  const cleanMessage = message.trim();

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn(
      "[Safaridew Contact] RESEND_API_KEY manquante dans l'environnement. Message enregistré en simulation :",
      { cleanName, cleanEmail, cleanSubject, cleanMessage }
    );
    return {
      success: false,
      message:
        locale === "fr"
          ? `Erreur lors de l'envoi de l'email, veuillez réessayer plus tard`
          : `Failed to deliver email, try again later`,
    }

    // return {
    //   success: true,
    //   message:
    //     locale === "fr"
    //       ? "Merci ! Votre message a bien été pris en compte. (Mode simulation : configurez RESEND_API_KEY pour l'envoi réel)."
    //       : "Thank you! Your message was received. (Simulation mode: configure RESEND_API_KEY for live delivery).",
    // };
  }

  const resend = new Resend(apiKey);
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "Safaridew <onboarding@resend.dev>";
  const notificationTo =
    process.env.CONTACT_TO_EMAIL || "hello@safaridew.com";

  const isFr = locale === "fr";

  const receiptSubject = isFr
    ? `Accusé de réception : ${cleanSubject} | Safaridew`
    : `Acknowledgement receipt: ${cleanSubject} | Safaridew`;

  const receiptHtml = isFr
    ? `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #09090b; color: #f4f4f5; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 32px; }
    .logo { color: #f59e0b; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 24px; display: inline-block; }
    h1 { font-size: 20px; font-weight: 600; color: #fafafa; margin-top: 0; }
    p { color: #d4d4d8; font-size: 15px; line-height: 1.6; }
    .quote-box { background: #27272a; border-left: 3px solid #f59e0b; padding: 14px 18px; margin: 20px 0; color: #e4e4e7; font-size: 14px; white-space: pre-wrap; }
    .btn { display: inline-block; background-color: #f59e0b; color: #09090b; font-weight: 600; font-size: 14px; padding: 12px 22px; text-decoration: none; margin-top: 16px; }
    .footer { margin-top: 32px; padding-top: 20px; border-top: 1px solid #27272a; font-size: 12px; color: #71717a; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">SAFARIDEW</div>
    <h1>Bonjour ${cleanName},</h1>
    <p>Nous avons bien reçu votre message et nous vous remercions d'avoir contacté l'équipe <strong>Safaridew</strong>.</p>
    <p>Nous prenons connaissance de votre demande avec attention et nous reviendrons vers vous dans les meilleurs délais.</p>

    <p style="font-weight: 600; color: #a1a1aa; margin-bottom: 6px;">Rappel de votre message :</p>
    <div class="quote-box"><strong>Objet :</strong> ${cleanSubject}<br><br>${cleanMessage}</div>

    <p>Pour toute question complémentaire ou pour échanger directement avec notre équipe :</p>
    <a class="btn" href="https://cal.com/safaridew" target="_blank" rel="noopener noreferrer">Planifier un échange</a>

    <div class="footer">
      <p><strong>Safaridew</strong> — Startup Technologique & Agence Numérique<br>
      Numéro 17, Avenue Kilela Balanda — Lubumbashi, République démocratique du Congo<br>
      Email : <a href="mailto:hello@safaridew.com" style="color: #f59e0b; text-decoration: none;">hello@safaridew.com</a> | Web : <a href="https://safaridew.com" style="color: #f59e0b; text-decoration: none;">safaridew.com</a></p>
    </div>
  </div>
</body>
</html>
`
    : `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #09090b; color: #f4f4f5; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 32px; }
    .logo { color: #f59e0b; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 24px; display: inline-block; }
    h1 { font-size: 20px; font-weight: 600; color: #fafafa; margin-top: 0; }
    p { color: #d4d4d8; font-size: 15px; line-height: 1.6; }
    .quote-box { background: #27272a; border-left: 3px solid #f59e0b; padding: 14px 18px; margin: 20px 0; color: #e4e4e7; font-size: 14px; white-space: pre-wrap; }
    .btn { display: inline-block; background-color: #f59e0b; color: #09090b; font-weight: 600; font-size: 14px; padding: 12px 22px; text-decoration: none; margin-top: 16px; }
    .footer { margin-top: 32px; padding-top: 20px; border-top: 1px solid #27272a; font-size: 12px; color: #71717a; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">SAFARIDEW</div>
    <h1>Hello ${cleanName},</h1>
    <p>We have successfully received your message and thank you for reaching out to the <strong>Safaridew</strong> team.</p>
    <p>We are reviewing your message with care and will follow up with you as soon as possible.</p>

    <p style="font-weight: 600; color: #a1a1aa; margin-bottom: 6px;">Summary of your message:</p>
    <div class="quote-box"><strong>Subject:</strong> ${cleanSubject}<br><br>${cleanMessage}</div>

    <p>For any further questions or to connect directly with our team:</p>
    <a class="btn" href="https://cal.com/safaridew" target="_blank" rel="noopener noreferrer">Schedule a meeting (Cal.com)</a>

    <div class="footer">
      <p><strong>Safaridew</strong> — Tech Startup & Digital Agency<br>
      Number 17, Avenue Kilela Balanda — Lubumbashi, Democratic Republic of the Congo<br>
      Email: <a href="mailto:hello@safaridew.com" style="color: #f59e0b; text-decoration: none;">hello@safaridew.com</a> | Web: <a href="https://safaridew.com" style="color: #f59e0b; text-decoration: none;">safaridew.com</a></p>
    </div>
  </div>
</body>
</html>
`;

  try {
    // 1. Envoyer l'accusé de réception au visiteur
    let receiptResponse = await resend.emails.send({
      from: fromEmail,
      to: cleanEmail,
      subject: receiptSubject,
      html: receiptHtml,
    });

    // Si le domaine personnalisé n'est pas encore vérifié dans Resend, tentative avec onboarding@resend.dev
    // if (
    //   receiptResponse.error &&
    //   fromEmail !== "Safaridew <onboarding@resend.dev>" &&
    //   (receiptResponse.error.message.includes("domain") ||
    //     receiptResponse.error.message.includes("verify"))
    // ) {
    //   console.warn(
    //     `[Safaridew Contact] Domaine personnalisé non vérifié sur Resend (${fromEmail}). Tentative de secours avec onboarding@resend.dev...`
    //   );
    //   receiptResponse = await resend.emails.send({
    //     from: "Safaridew <onboarding@resend.dev>",
    //     to: cleanEmail,
    //     subject: receiptSubject,
    //     html: receiptHtml,
    //   });
    // }

    // if (receiptResponse.error) {
    //   console.error(
    //     "[Safaridew Contact] Erreur Resend accusé de réception :",
    //     receiptResponse.error
    //   );
    //   return {
    //     success: false,
    //     message: isFr
    //       ? `Erreur lors de l'envoi de l'email : ${receiptResponse.error.message}`
    //       : `Failed to deliver email: ${receiptResponse.error.message}`,
    //     error: receiptResponse.error.message,
    //   };
    // }

    // 2. Notification interne vers l'équipe Safaridew
    try {
      await resend.emails.send({
        from: fromEmail,
        to: notificationTo,
        replyTo: cleanEmail,
        subject: `[Nouveau Contact Site] ${cleanSubject} - ${cleanName}`,
        html: `
          <h2>Nouveau message reçu depuis le site web Safaridew</h2>
          <p><strong>Nom :</strong> ${cleanName}</p>
          <p><strong>Email :</strong> <a href="mailto:${cleanEmail}">${cleanEmail}</a></p>
          <p><strong>Objet :</strong> ${cleanSubject}</p>
          <p><strong>Langue :</strong> ${locale}</p>
          <hr />
          <h3>Message :</h3>
          <p style="white-space: pre-wrap;">${cleanMessage}</p>
        `,
      });
    } catch (teamNotificationError) {
      console.warn(
        "[Safaridew Contact] Impossible d'envoyer la copie interne :",
        teamNotificationError
      );
    }

    return {
      success: true,
      message: isFr
        ? "Votre message a bien été envoyé ! Nous vous répondrons dans les plus brefs délais."
        : "Your message has been sent successfully! We will respond as soon as possible.",
    };
  } catch (error: unknown) {
    console.error("[Safaridew Contact] Erreur lors de l'envoi Resend :", error);
    const errorMessage =
      error instanceof Error ? error.message : "Erreur inconnue";

    return {
      success: false,
      message: isFr
        ? "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer ou nous contacter directement à hello@safaridew.com."
        : "An error occurred while sending your message. Please try again or reach out directly at hello@safaridew.com.",
      error: errorMessage,
    };
  }
}

