import Link from "next/link";
import { Plus } from "lucide-react";
import { getAdminUsers } from "@/lib/admin-data";
import { requireAdminPage } from "@/lib/admin-guard";
import { UsersList } from "@/components/admin/UsersList";

export default async function AdminUsersPage() {
  const session = await requireAdminPage("ADMIN");
  const users = await getAdminUsers();

  const serialized = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    active: u.active,
    createdAt: u.createdAt.toISOString(),
  }));

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-secondary">Utilisateurs</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Créez, modifiez et gérez les accès à l&apos;administration.
          </p>
        </div>
        <Link
          href="/admin/utilisateurs/nouveau"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl gradient-bg text-white font-semibold text-sm shrink-0"
        >
          <Plus className="w-4 h-4" /> Nouvel utilisateur
        </Link>
      </div>

      <UsersList users={serialized} currentUserId={session.userId} />
    </div>
  );
}
