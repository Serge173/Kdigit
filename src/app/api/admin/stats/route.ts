import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApiSession, isErrorResponse } from "@/lib/api-auth";

export async function GET(request: NextRequest) {
  const session = await requireApiSession(request, "VIEWER");
  if (isErrorResponse(session)) return session;

  try {
    const [projects, posts, messagesNew, quotesNew, quotesTotal] = await Promise.all([
      prisma.project.count(),
      prisma.blogPost.count({ where: { published: true } }),
      prisma.contactMessage.count({ where: { status: "NEW" } }),
      prisma.quoteRequest.count({ where: { status: "NEW" } }),
      prisma.quoteRequest.count(),
    ]);

    return NextResponse.json({
      projects,
      posts,
      messagesNew,
      quotesNew,
      quotesTotal,
    });
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
