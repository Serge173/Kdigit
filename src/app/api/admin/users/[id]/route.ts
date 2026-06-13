import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApiSession, isErrorResponse } from "@/lib/api-auth";
import { userSchema } from "@/lib/admin-schemas";
import { hashPassword } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireApiSession(request, "ADMIN");
  if (isErrorResponse(session)) return session;

  const { id } = await params;

  try {
    const body = userSchema.parse(await request.json());

    const data: Record<string, unknown> = {
      name: body.name,
      email: body.email,
      role: body.role,
      active: body.active,
    };

    if (body.password) {
      data.passwordHash = await hashPassword(body.password);
    }

    const user = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, email: true, name: true, role: true, active: true },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Update user:", error);
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

  if (session.userId === id) {
    return NextResponse.json({ error: "Cannot delete yourself" }, { status: 400 });
  }

  try {
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
