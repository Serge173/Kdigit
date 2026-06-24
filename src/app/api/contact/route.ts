import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ensureDatabaseUrl } from "@/lib/database-url";
import {
  classifyDatabaseError,
  databaseErrorResponse,
  getClientIp,
} from "@/lib/db-errors";
import { sendEmail, contactNotificationHtml } from "@/lib/email";
import { checkRateLimit, getRateLimitFromEnv } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const schema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().max(20).optional(),
  email: z.string().email(),
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(5000),
  website: z.string().max(0).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const data = schema.parse(body);
    const ip = getClientIp(request);
    const limit = getRateLimitFromEnv("CONTACT_RATE_LIMIT_PER_HOUR", 10);

    if (!checkRateLimit("contact", ip, limit)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    if (!ensureDatabaseUrl()) {
      return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    }

    await prisma.contactMessage.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        subject: data.subject,
        message: data.message,
        ipAddress: ip,
      },
    });

    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
    if (adminEmail) {
      try {
        await sendEmail({
          to: adminEmail,
          subject: `[KDIGIT] Contact: ${data.subject}`,
          html: contactNotificationHtml(data),
        });
      } catch (emailError) {
        console.error("Contact email error:", emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
    console.error("Contact error:", error);
    const { status, body: errBody } = databaseErrorResponse(classifyDatabaseError(error));
    return NextResponse.json(errBody, { status });
  }
}
