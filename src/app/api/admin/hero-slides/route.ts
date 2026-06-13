import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApiSession, isErrorResponse } from "@/lib/api-auth";
import { heroSlideSchema, resolveSlug } from "@/lib/admin-schemas";

export async function GET(request: NextRequest) {
  const session = await requireApiSession(request, "VIEWER");
  if (isErrorResponse(session)) return session;

  try {
    const slides = await prisma.heroSlide.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(slides);
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await requireApiSession(request, "EDITOR");
  if (isErrorResponse(session)) return session;

  try {
    const body = heroSlideSchema.parse(await request.json());
    const slug = resolveSlug(body.slug, body.titleFr);

    const slide = await prisma.heroSlide.create({
      data: {
        slug,
        badgeFr: body.badgeFr,
        badgeEn: body.badgeEn,
        titleFr: body.titleFr,
        titleEn: body.titleEn,
        highlightFr: body.highlightFr,
        highlightEn: body.highlightEn,
        subtitleFr: body.subtitleFr,
        subtitleEn: body.subtitleEn,
        image: body.image,
        ctaHref: body.ctaHref,
        ctaSecondaryHref: body.ctaSecondaryHref,
        order: body.order,
        published: body.published,
      },
    });

    return NextResponse.json(slide, { status: 201 });
  } catch (error) {
    console.error("Create hero slide:", error);
    return NextResponse.json({ error: "Invalid data or slug exists" }, { status: 400 });
  }
}
