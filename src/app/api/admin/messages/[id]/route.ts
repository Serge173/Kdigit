import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireApiSession, isErrorResponse } from "@/lib/api-auth";

const schema = z.object({
  status: z.enum(["NEW", "READ", "REPLIED", "ARCHIVED"]),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireApiSession(request, "EDITOR");
  if (isErrorResponse(session)) return session;

  const { id } = await params;

  try {
    const { status } = schema.parse(await request.json());
    const message = await prisma.contactMessage.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json(message);
  } catch {
    return NextResponse.json({ error: "Invalid data or not found" }, { status: 400 });
  }
}
