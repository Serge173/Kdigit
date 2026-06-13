import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApiSession, isErrorResponse } from "@/lib/api-auth";
import { projectSchema, resolveSlug } from "@/lib/admin-schemas";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireApiSession(request, "VIEWER");
  if (isErrorResponse(session)) return session;

  const { id } = await params;

  try {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(project);
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
    const body = projectSchema.parse(await request.json());
    const slug = resolveSlug(body.slug, body.titleFr);

    const project = await prisma.project.update({
      where: { id },
      data: {
        slug,
        clientName: body.clientName,
        titleFr: body.titleFr,
        titleEn: body.titleEn,
        descriptionFr: body.descriptionFr,
        descriptionEn: body.descriptionEn,
        technologies: body.technologies,
        resultsFr: body.resultsFr,
        resultsEn: body.resultsEn,
        coverImage: body.coverImage,
        screenshots: body.screenshots,
        featured: body.featured,
        published: body.published,
        order: body.order,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Update project:", error);
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
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
