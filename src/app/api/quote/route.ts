import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { getDatabaseUrl } from "@/lib/database-url";
import { sendEmail, quoteNotificationHtml } from "@/lib/email";

export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(6).max(20),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  serviceType: z.string().min(1),
  budget: z.string().max(50).optional(),
  deadline: z.string().max(50).optional(),
  description: z.string().min(20).max(10000),
  website: z.string().max(0).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const raw = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      company: (formData.get("company") as string) || undefined,
      serviceType: formData.get("serviceType") as string,
      budget: (formData.get("budget") as string) || undefined,
      deadline: (formData.get("deadline") as string) || undefined,
      description: formData.get("description") as string,
      website: (formData.get("website") as string) || "",
    };

    if (raw.website) {
      return NextResponse.json({ success: true });
    }

    const data = schema.parse(raw);
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    let fileUrl: string | undefined;
    const file = formData.get("file") as File | null;

    if (file && file.size > 0) {
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "File too large" }, { status: 400 });
      }

      try {
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadsDir, { recursive: true });

        const ext = path.extname(file.name);
        const filename = `quote-${Date.now()}${ext}`;
        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(path.join(uploadsDir, filename), buffer);
        fileUrl = `/uploads/${filename}`;
      } catch (fileError) {
        console.error("Quote file upload error:", fileError);
      }
    }

    if (!getDatabaseUrl()) {
      return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    }

    await prisma.quoteRequest.create({
      data: {
        ...data,
        fileUrl,
        ipAddress: ip,
      },
    });

    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
    if (adminEmail) {
      try {
        await sendEmail({
          to: adminEmail,
          subject: `[KDIGIT] Devis: ${data.serviceType} - ${data.name}`,
          html: quoteNotificationHtml(data),
        });
      } catch (emailError) {
        console.error("Quote email error:", emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
    console.error("Quote error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
