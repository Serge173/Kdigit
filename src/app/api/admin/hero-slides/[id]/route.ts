import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApiSession, isErrorResponse } from "@/lib/api-auth";
import { heroSlideSchema, resolveSlug } from "@/lib/admin-schemas";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireApiSession(request, "VIEWER");
  if (isErrorResponse(session)) return session;

  const { id } = await params;

  try {
    const slide = await prisma.heroSlide.findUnique({ where: { id } });
    if (!slide) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(slide);
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireApiSession(request, "EDITOR");
  if (isErrorResponse(session)) return session;

  const { id } = await params;

  try {
    const body = heroSlideSchema.parse(await request.json());
    const slug = resolveSlug(body.slug, body.titleFr);

    const slide = await prisma.heroSlide.update({
      where: { id },
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

    return NextResponse.json(slide);
  } catch (error) {
    console.error("Update hero slide:", error);
    return NextResponse.json({ error: "Invalid data or not found" }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireApiSession(request, "ADMIN");
  if (isErrorResponse(session)) return session;

  const { id } = await params;

  try {
    await prisma.heroSlide.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
