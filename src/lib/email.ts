import nodemailer from "nodemailer";
import { emailHeaderHtml } from "@/lib/branding";
import type { NeedsAssessmentData } from "@/lib/quote-form-schema";
import { formatQuoteSummary } from "@/lib/quote-form-schema";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("[Email] SMTP not configured. Would send:", { to, subject });
    return { success: true, mocked: true };
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      html,
    });
    return { success: true, mocked: false };
  } catch (error) {
    console.error("[Email] Send failed:", error);
    return { success: false, mocked: false };
  }
}

export function contactNotificationHtml(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  return `
    ${emailHeaderHtml()}
    <h2>Nouveau message de contact — KDIGIT</h2>
    <p><strong>Nom :</strong> ${data.name}</p>
    <p><strong>Email :</strong> ${data.email}</p>
    <p><strong>Téléphone :</strong> ${data.phone || "—"}</p>
    <p><strong>Objet :</strong> ${data.subject}</p>
    <p><strong>Message :</strong></p>
    <p>${data.message.replace(/\n/g, "<br>")}</p>
  `;
}

export function needsAssessmentNotificationHtml(data: NeedsAssessmentData) {
  const summary = formatQuoteSummary(data, "fr");
  return `
    ${emailHeaderHtml()}
    <h2 style="color:#14532D;margin-bottom:8px;">Nouvelle fiche de collecte des besoins — KDIGIT</h2>
    <p style="color:#64748b;margin-bottom:24px;">Un visiteur a rempli le formulaire « Demander un devis ».</p>
    <pre style="white-space:pre-wrap;font-family:Inter,Arial,sans-serif;font-size:14px;line-height:1.6;background:#f8fafc;padding:20px;border-radius:12px;border:1px solid #e2e8f0;">${escapeHtml(summary)}</pre>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function quoteNotificationHtml(data: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  serviceType: string;
  budget?: string;
  deadline?: string;
  description: string;
}) {
  return `
    ${emailHeaderHtml()}
    <h2>Nouvelle demande de devis — KDIGIT</h2>
    <p><strong>Nom :</strong> ${data.name}</p>
    <p><strong>Email :</strong> ${data.email}</p>
    <p><strong>Téléphone :</strong> ${data.phone}</p>
    <p><strong>Entreprise :</strong> ${data.company || "—"}</p>
    <p><strong>Prestation :</strong> ${data.serviceType}</p>
    <p><strong>Budget :</strong> ${data.budget || "—"}</p>
    <p><strong>Délai :</strong> ${data.deadline || "—"}</p>
    <p><strong>Description :</strong></p>
    <p>${data.description.replace(/\n/g, "<br>")}</p>
  `;
}
