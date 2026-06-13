import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireApiSession, isErrorResponse } from "@/lib/api-auth";

const schema = z.object({
  status: z.enum(["NEW", "IN_PROGRESS", "QUOTED", "ACCEPTED", "REJECTED", "CLOSED"]),
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
    const quote = await prisma.quoteRequest.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json(quote);
  } catch {
    return NextResponse.json({ error: "Invalid data or not found" }, { status: 400 });
  }
}
