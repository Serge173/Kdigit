import Link from "next/link";
import { requireAdminPage } from "@/lib/admin-guard";
import { ChangePasswordForm } from "@/components/admin/ChangePasswordForm";
import { prisma } from "@/lib/prisma";
import { UserCog } from "lucide-react";

export default async function AdminProfilePage() {
  const session = await requireAdminPage("VIEWER");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { name: true, email: true, role: true, active: true, createdAt: true },
  });

  if (!user) {
    return <p className="text-muted-foreground">Utilisateur introuvable.</p>;
  }

  const roleLabels: Record<string, string> = {
    ADMIN: "Administrateur",
    EDITOR: "Éditeur",
    VIEWER: "Lecteur",
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-secondary mb-2">Mon compte</h1>
      <p className="text-muted-foreground mb-8">Gérez vos informations et votre mot de passe.</p>

      <div className="bg-white rounded-2xl border border-border p-6 mb-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-bold text-secondary text-lg">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border text-sm">
          <div>
            <dt className="text-muted-foreground">Rôle</dt>
            <dd className="font-semibold text-secondary">{roleLabels[user.role] ?? user.role}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Statut</dt>
            <dd className="font-semibold text-secondary">{user.active ? "Actif" : "Inactif"}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-muted-foreground">Membre depuis</dt>
            <dd className="font-semibold text-secondary">
              {user.createdAt.toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </dd>
          </div>
        </dl>

        {session.role === "ADMIN" && (
          <Link
            href={`/admin/utilisateurs/${session.userId}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mt-2"
          >
            <UserCog className="w-4 h-4" />
            Modifier mon profil complet (admin)
          </Link>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-border p-6">
        <ChangePasswordForm />
      </div>
    </div>
  );
}
