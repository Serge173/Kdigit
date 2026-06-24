import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ensureDatabaseUrl } from "@/lib/database-url";
import {
  classifyDatabaseError,
  databaseErrorResponse,
  getClientIp,
} from "@/lib/db-errors";
import { sendEmail, needsAssessmentNotificationHtml, quoteNotificationHtml } from "@/lib/email";
import { SITE, SERVICE_TYPES } from "@/lib/constants";
import {
  formatQuoteSummary,
  formatQuoteWhatsAppMessage,
  needsAssessmentSchema,
} from "@/lib/quote-form-schema";
import { sendWhatsAppNotification } from "@/lib/whatsapp-notify";
import { checkRateLimit, getRateLimitFromEnv } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const legacySchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(6).max(20),
  email: z.string().trim().email(),
  company: z.string().trim().max(100).optional(),
  serviceType: z.string().trim().min(1),
  budget: z.string().trim().max(50).optional(),
  deadline: z.string().trim().max(50).optional(),
  description: z.string().trim().min(20).max(10000),
  website: z.string().max(0).optional(),
});

async function notifyAdmin(data: Parameters<typeof needsAssessmentNotificationHtml>[0]) {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER || SITE.email;
  const subject = `[KDIGIT] Nouveau devis — ${data.appName} (${data.name})`;

  const emailResult = await sendEmail({
    to: adminEmail,
    subject,
    html: needsAssessmentNotificationHtml(data),
  });

  const whatsappResult = await sendWhatsAppNotification(formatQuoteWhatsAppMessage(data));

  return { emailResult, whatsappResult };
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    const ip = getClientIp(request);

    if (contentType.includes("application/json")) {
      const body = await request.json();

      if (body.website) {
        return NextResponse.json({ success: true });
      }

      const quoteLimit = getRateLimitFromEnv("QUOTE_RATE_LIMIT_PER_HOUR", 5);
      if (!checkRateLimit("quote", ip, quoteLimit)) {
        return NextResponse.json({ error: "Too many requests" }, { status: 429 });
      }

      const data = needsAssessmentSchema.parse(body);

      if (!ensureDatabaseUrl()) {
        return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
      }

      const description = formatQuoteSummary(data, "fr");
      const { website: _honeypot, ...formPayload } = data;
      const serviceLabel =
        SERVICE_TYPES.find((item) => item.value === data.solutionType)?.labelFr ?? data.solutionType;

      await prisma.quoteRequest.create({
        data: {
          name: data.name,
          phone: data.phone,
          email: data.email,
          company: data.appName,
          appName: data.appName,
          address: data.address,
          sector: data.sector,
          serviceType: serviceLabel,
          budget: data.budget,
          deadline: data.deadline,
          description,
          formData: formPayload,
          ipAddress: ip,
        },
      });

      await notifyAdmin(data);

      return NextResponse.json({ success: true });
    }

    const formData = await request.formData();
    const raw = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? "").trim() || undefined,
      serviceType: String(formData.get("serviceType") ?? ""),
      budget: String(formData.get("budget") ?? "").trim() || undefined,
      deadline: String(formData.get("deadline") ?? "").trim() || undefined,
      description: String(formData.get("description") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    if (raw.website) {
      return NextResponse.json({ success: true });
    }

    const quoteLimit = getRateLimitFromEnv("QUOTE_RATE_LIMIT_PER_HOUR", 5);
    if (!checkRateLimit("quote", ip, quoteLimit)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const data = legacySchema.parse(raw);

    if (!ensureDatabaseUrl()) {
      return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    }

    const { website: _honeypot, ...quoteData } = data;

    await prisma.quoteRequest.create({
      data: {
        ...quoteData,
        ipAddress: ip,
      },
    });

    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER || SITE.email;
    await sendEmail({
      to: adminEmail,
      subject: `[KDIGIT] Devis: ${data.serviceType} - ${data.name}`,
      html: quoteNotificationHtml(data),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        process.env.NODE_ENV === "development"
          ? { error: "Invalid data", details: error.flatten() }
          : { error: "Invalid data" },
        { status: 400 }
      );
    }

    console.error("Quote error:", error);
    const { status, body } = databaseErrorResponse(classifyDatabaseError(error));
    return NextResponse.json(body, { status });
  }
}
