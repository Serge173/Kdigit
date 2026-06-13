import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApiSession, isErrorResponse } from "@/lib/api-auth";
import { articleSchema, resolveSlug } from "@/lib/admin-schemas";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireApiSession(request, "VIEWER");
  if (isErrorResponse(session)) return session;

  const { id } = await params;

  try {
    const article = await prisma.blogPost.findUnique({ where: { id } });
    if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(article);
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
    const body = articleSchema.parse(await request.json());
    const slug = resolveSlug(body.slug, body.titleFr);

    const existing = await prisma.blogPost.findUnique({ where: { id } });
    const publishedAt =
      body.published && !existing?.publishedAt ? new Date() : existing?.publishedAt;

    const article = await prisma.blogPost.update({
      where: { id },
      data: {
        slug,
        titleFr: body.titleFr,
        titleEn: body.titleEn,
        excerptFr: body.excerptFr,
        excerptEn: body.excerptEn,
        contentFr: body.contentFr,
        contentEn: body.contentEn,
        coverImage: body.coverImage || null,
        category: body.category,
        tags: body.tags,
        published: body.published,
        publishedAt: body.published ? publishedAt : null,
        authorName: body.authorName,
      },
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error("Update article:", error);
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
    await prisma.blogPost.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
