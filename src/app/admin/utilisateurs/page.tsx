import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getAdminUsers } from "@/lib/admin-data";

export default async function AdminUsersPage() {
  const users = await getAdminUsers();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Utilisateurs</h1>
          <p className="text-muted-foreground">Gestion des accès administrateur</p>
        </div>
        <Link
          href="/admin/utilisateurs/nouveau"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-bg text-white font-semibold text-sm"
        >
          <Plus className="w-4 h-4" /> Ajouter
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold">Nom</th>
              <th className="text-left px-6 py-4 text-sm font-semibold">Email</th>
              <th className="text-left px-6 py-4 text-sm font-semibold">Rôle</th>
              <th className="text-left px-6 py-4 text-sm font-semibold">Statut</th>
              <th className="text-right px-6 py-4 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                  Aucun utilisateur.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="border-t border-border">
                  <td className="px-6 py-4 text-sm font-medium">{u.name}</td>
                  <td className="px-6 py-4 text-sm">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${u.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {u.active ? "Actif" : "Inactif"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/utilisateurs/${u.id}`} className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline">
                      <Pencil className="w-4 h-4" /> Modifier
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
