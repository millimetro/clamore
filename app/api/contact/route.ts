import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Email configuration using environment variables
const getEmailTransporter = () => {
  // Check if using SMTP or a service like Gmail, Outlook, etc.
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;
  const smtpSecure = process.env.SMTP_SECURE === "true";

  if (!smtpHost || !smtpUser || !smtpPassword) {
    throw new Error("Email configuration is missing. Please set SMTP environment variables.");
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure, // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });
};

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: "Tutti i campi sono obbligatori" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Formato email non valido" },
        { status: 400 }
      );
    }

    // Get recipient email from environment or use default
    const recipientEmail = process.env.CONTACT_EMAIL || "clamore.bergamo@gmail.com";

    // Create email transporter
    let transporter;
    try {
      transporter = getEmailTransporter();
    } catch (error) {
      console.error("Email configuration error:", error);
      return NextResponse.json(
        { error: "Configurazione email non valida. Contatta l'amministratore." },
        { status: 500 }
      );
    }

    // Email content for admin
    const adminMailOptions = {
      from: `"${body.name}" <${process.env.SMTP_USER}>`,
      replyTo: body.email,
      to: recipientEmail,
      subject: `[Contatto Clamore] ${body.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 4px solid #161616; background: #f5f5f5;">
          <h1 style="color: #161616; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #161616; padding-bottom: 10px;">
            Nuovo messaggio dal form di contatto
          </h1>
          
          <div style="background: white; padding: 20px; border: 2px solid #161616; margin-bottom: 20px;">
            <p style="margin: 10px 0; color: #161616;"><strong>Nome:</strong> ${escapeHtml(body.name)}</p>
            <p style="margin: 10px 0; color: #161616;"><strong>Email:</strong> <a href="mailto:${escapeHtml(body.email)}" style="color: #161616;">${escapeHtml(body.email)}</a></p>
            <p style="margin: 10px 0; color: #161616;"><strong>Oggetto:</strong> ${escapeHtml(body.subject)}</p>
          </div>
          
          <div style="background: white; padding: 20px; border: 2px solid #161616;">
            <h2 style="color: #161616; font-size: 18px; margin-bottom: 10px;">Messaggio:</h2>
            <p style="color: #161616; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(body.message)}</p>
          </div>
        </div>
      `,
      text: `
Nuovo messaggio dal form di contatto Clamore

Nome: ${body.name}
Email: ${body.email}
Oggetto: ${body.subject}

Messaggio:
${body.message}
      `,
    };

    // Send email to admin
    await transporter.sendMail(adminMailOptions);

    // Optionally send confirmation email to user
    if (process.env.SEND_CONFIRMATION_EMAIL === "true") {
      const confirmationMailOptions = {
        from: `"Clamore" <${process.env.SMTP_USER}>`,
        to: body.email,
        subject: "Ricevuta richiesta di contatto - Clamore",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 4px solid #161616; background: #f5f5f5;">
            <h1 style="color: #161616; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #161616; padding-bottom: 10px;">
              Messaggio ricevuto!
            </h1>
            
            <p style="color: #161616; line-height: 1.6;">
              Ciao <strong>${escapeHtml(body.name)}</strong>,
            </p>
            
            <p style="color: #161616; line-height: 1.6;">
              Abbiamo ricevuto il tuo messaggio e ti risponderemo il prima possibile.
            </p>
            
            <div style="background: white; padding: 20px; border: 2px solid #161616; margin: 20px 0;">
              <p style="margin: 0; color: #161616;"><strong>Oggetto:</strong> ${escapeHtml(body.subject)}</p>
            </div>
            
            <p style="color: #161616; line-height: 1.6;">
              Saluti,<br>
              <strong>Il team di Clamore</strong>
            </p>
          </div>
        `,
        text: `
Messaggio ricevuto!

Ciao ${body.name},

Abbiamo ricevuto il tuo messaggio e ti risponderemo il prima possibile.

Oggetto: ${body.subject}

Saluti,
Il team di Clamore
        `,
      };

      try {
        await transporter.sendMail(confirmationMailOptions);
      } catch (error) {
        // Log error but don't fail the request if confirmation email fails
        console.error("Error sending confirmation email:", error);
      }
    }

    return NextResponse.json(
      { message: "Messaggio inviato con successo" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Errore nell'invio del messaggio. Riprova più tardi." },
      { status: 500 }
    );
  }
}

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}





