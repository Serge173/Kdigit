import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getApiSession } from "@/lib/api-auth";
import { changePasswordSchema } from "@/lib/admin-schemas";
import { hashPassword, verifyPassword } from "@/lib/auth";

export async function PATCH(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = changePasswordSchema.parse(await request.json());

    const user = await prisma.user.findUnique({ where: { id: session.userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const valid = await verifyPassword(body.currentPassword, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Mot de passe actuel incorrect" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: session.userId },
      data: { passwordHash: await hashPassword(body.newPassword) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Change password:", error);
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }
}
