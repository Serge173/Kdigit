import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { UserForm } from "@/components/admin/UserForm";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let user;
  try {
    user = await prisma.user.findUnique({ where: { id } });
  } catch {
    notFound();
  }

  if (!user) notFound();

  return (
    <UserForm
      userId={id}
      initial={{
        name: user.name,
        email: user.email,
        role: user.role,
        active: user.active,
      }}
    />
  );
}
