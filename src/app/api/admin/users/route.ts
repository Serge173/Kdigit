import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApiSession, isErrorResponse } from "@/lib/api-auth";
import { userSchema, userCreateSchema } from "@/lib/admin-schemas";
import { hashPassword } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await requireApiSession(request, "ADMIN");
  if (isErrorResponse(session)) return session;

  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, email: true, name: true, role: true, active: true, createdAt: true },
    });
    return NextResponse.json(users);
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await requireApiSession(request, "ADMIN");
  if (isErrorResponse(session)) return session;

  try {
    const body = userCreateSchema.parse(await request.json());
    const passwordHash = await hashPassword(body.password);
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        passwordHash,
        role: body.role,
        active: body.active,
      },
      select: { id: true, email: true, name: true, role: true, active: true },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Create user:", error);
    return NextResponse.json({ error: "Invalid data or email exists" }, { status: 400 });
  }
}
