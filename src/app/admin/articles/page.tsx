import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";

export default async function AdminArticlesPage() {
  let posts: Awaited<ReturnType<typeof prisma.blogPost.findMany>> = [];
  try {
    posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    // DB not connected
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Articles de blog</h1>
          <p className="text-muted-foreground">Gérez les publications</p>
        </div>
        <Link
          href="/admin/articles/nouveau"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-bg text-white font-semibold text-sm"
        >
          <Plus className="w-4 h-4" /> Nouvel article
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold">Titre</th>
              <th className="text-left px-6 py-4 text-sm font-semibold">Catégorie</th>
              <th className="text-left px-6 py-4 text-sm font-semibold">Statut</th>
              <th className="text-left px-6 py-4 text-sm font-semibold">Date</th>
              <th className="text-right px-6 py-4 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                  Aucun article. <Link href="/admin/articles/nouveau" className="text-primary hover:underline">Créer le premier</Link>
                </td>
              </tr>
            ) : (
              posts.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="px-6 py-4 text-sm font-medium">{p.titleFr}</td>
                  <td className="px-6 py-4 text-sm">{p.category}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${p.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {p.published ? "Publié" : "Brouillon"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString("fr-FR") : "—"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/articles/${p.id}`} className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline">
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
