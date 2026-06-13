import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApiSession, isErrorResponse } from "@/lib/api-auth";
import { projectSchema, resolveSlug } from "@/lib/admin-schemas";

export async function GET(request: NextRequest) {
  const session = await requireApiSession(request, "VIEWER");
  if (isErrorResponse(session)) return session;

  try {
    const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await requireApiSession(request, "EDITOR");
  if (isErrorResponse(session)) return session;

  try {
    const body = projectSchema.parse(await request.json());
    const slug = resolveSlug(body.slug, body.titleFr);

    const project = await prisma.project.create({
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

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Create project:", error);
    return NextResponse.json({ error: "Invalid data or slug already exists" }, { status: 400 });
  }
}
