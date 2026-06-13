import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApiSession, isErrorResponse } from "@/lib/api-auth";
import { articleSchema, resolveSlug } from "@/lib/admin-schemas";

export async function GET(request: NextRequest) {
  const session = await requireApiSession(request, "VIEWER");
  if (isErrorResponse(session)) return session;

  try {
    const articles = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(articles);
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await requireApiSession(request, "EDITOR");
  if (isErrorResponse(session)) return session;

  try {
    const body = articleSchema.parse(await request.json());
    const slug = resolveSlug(body.slug, body.titleFr);

    const article = await prisma.blogPost.create({
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
        publishedAt: body.published ? new Date() : null,
        authorName: body.authorName,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("Create article:", error);
    return NextResponse.json({ error: "Invalid data or slug already exists" }, { status: 400 });
  }
}
