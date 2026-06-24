import type { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";

export async function requireAdminPage(minRole: UserRole = "EDITOR") {
  const session = await requireAdmin(minRole);
  if (!session) {
    redirect("/admin");
  }
  return session;
}
