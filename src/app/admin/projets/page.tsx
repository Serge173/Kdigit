import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";

export default async function AdminProjectsPage() {
  let projects: Awaited<ReturnType<typeof prisma.project.findMany>> = [];
  try {
    projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
  } catch {
    // DB not connected
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Réalisations</h1>
          <p className="text-muted-foreground">Gérez le portfolio de projets</p>
        </div>
        <Link
          href="/admin/projets/nouveau"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-bg text-white font-semibold text-sm"
        >
          <Plus className="w-4 h-4" /> Ajouter
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-secondary">Client</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-secondary">Titre</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-secondary">Statut</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                  Aucune réalisation. Connectez PostgreSQL et lancez <code className="bg-muted px-2 py-1 rounded">npm run db:seed</code>
                </td>
              </tr>
            ) : (
              projects.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="px-6 py-4 text-sm">{p.clientName}</td>
                  <td className="px-6 py-4 text-sm font-medium">{p.titleFr}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${p.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {p.published ? "Publié" : "Brouillon"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/projets/${p.id}`} className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline">
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
