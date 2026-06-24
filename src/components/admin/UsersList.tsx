"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "@/lib/toast";
import { Plus, Pencil, Trash2, UserPlus } from "lucide-react";

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  createdAt: string;
}

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Admin",
  EDITOR: "Éditeur",
  VIEWER: "Lecteur",
};

export function UsersList({ users, currentUserId }: { users: UserRow[]; currentUserId: string }) {
  const [items, setItems] = useState(users);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDelete = (user: UserRow) => {
    if (user.id === currentUserId) {
      toast.warning("Action impossible", { description: "Vous ne pouvez pas supprimer votre propre compte." });
      return;
    }

    toast.confirm(`Supprimer ${user.name} ?`, async () => {
      setLoadingId(user.id);
      try {
        const res = await fetch(`/api/admin/users/${user.id}`, { method: "DELETE" });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          toast.error("Suppression impossible", { description: data.error });
          return;
        }
        setItems((prev) => prev.filter((u) => u.id !== user.id));
        toast.success("Utilisateur supprimé");
      } catch {
        toast.error("Erreur de connexion");
      } finally {
        setLoadingId(null);
      }
    }, { description: "Cette action est irréversible." });
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-border p-12 text-center">
        <UserPlus className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
        <p className="text-muted-foreground mb-4">Aucun utilisateur pour le moment.</p>
        <Link
          href="/admin/utilisateurs/nouveau"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-bg text-white font-semibold text-sm"
        >
          <Plus className="w-4 h-4" /> Créer un utilisateur
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:block bg-white rounded-2xl border border-border overflow-hidden">
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
            {items.map((u) => (
              <tr key={u.id} className="border-t border-border">
                <td className="px-6 py-4 text-sm font-medium">
                  {u.name}
                  {u.id === currentUserId && (
                    <span className="ml-2 text-xs text-primary">(vous)</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm">{u.email}</td>
                <td className="px-6 py-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    {ROLE_LABELS[u.role] ?? u.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${u.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {u.active ? "Actif" : "Inactif"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="inline-flex items-center gap-3">
                    <Link
                      href={`/admin/utilisateurs/${u.id}`}
                      className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline"
                    >
                      <Pencil className="w-4 h-4" /> Modifier
                    </Link>
                    {u.id !== currentUserId && (
                      <button
                        type="button"
                        onClick={() => handleDelete(u)}
                        disabled={loadingId === u.id}
                        className="inline-flex items-center gap-1 text-red-600 text-sm font-medium hover:underline disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" /> Supprimer
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {items.map((u) => (
          <div key={u.id} className="bg-white rounded-2xl border border-border p-5 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-bold text-secondary truncate">
                  {u.name}
                  {u.id === currentUserId && (
                    <span className="ml-1 text-xs font-normal text-primary">(vous)</span>
                  )}
                </p>
                <p className="text-sm text-muted-foreground truncate">{u.email}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium shrink-0">
                {ROLE_LABELS[u.role] ?? u.role}
              </span>
            </div>
            <span
              className={`inline-block text-xs px-2 py-1 rounded-full ${u.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
            >
              {u.active ? "Actif" : "Inactif"}
            </span>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href={`/admin/utilisateurs/${u.id}`}
                className="inline-flex items-center gap-1 text-primary text-sm font-medium"
              >
                <Pencil className="w-4 h-4" /> Modifier
              </Link>
              {u.id !== currentUserId && (
                <button
                  type="button"
                  onClick={() => handleDelete(u)}
                  disabled={loadingId === u.id}
                  className="inline-flex items-center gap-1 text-red-600 text-sm font-medium disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" /> Supprimer
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
