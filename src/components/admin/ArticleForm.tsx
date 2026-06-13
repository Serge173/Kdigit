"use client";

import { useState } from "react";
import { navigateWithToast } from "@/lib/navigation";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/Button";
import { Save, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export interface ArticleFormData {
  titleFr: string;
  titleEn: string;
  slug: string;
  excerptFr: string;
  excerptEn: string;
  contentFr: string;
  contentEn: string;
  coverImage: string;
  category: string;
  tags: string;
  published: boolean;
  authorName: string;
}

interface ArticleFormProps {
  initial?: Partial<ArticleFormData>;
  articleId?: string;
}

const defaultValues: ArticleFormData = {
  titleFr: "",
  titleEn: "",
  slug: "",
  excerptFr: "",
  excerptEn: "",
  contentFr: "",
  contentEn: "",
  coverImage: "",
  category: "Développement web",
  tags: "",
  published: false,
  authorName: "KDIGIT",
};

const CATEGORIES = [
  "Développement web",
  "Intelligence artificielle",
  "Cybersécurité",
  "Marketing digital",
  "Innovations technologiques",
];

export function ArticleForm({ initial, articleId }: ArticleFormProps) {
  const [form, setForm] = useState<ArticleFormData>({ ...defaultValues, ...initial });
  const [loading, setLoading] = useState(false);

  const isEdit = !!articleId;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const url = isEdit ? `/api/admin/articles/${articleId}` : "/api/admin/articles";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error("Erreur lors de l'enregistrement", { description: data.error });
        return;
      }

      const message = isEdit ? "Article modifié avec succès" : "Article créé avec succès";
      navigateWithToast("/admin/articles", () => toast.success(message));
    } catch {
      toast.error("Erreur de connexion", { description: "Impossible de contacter le serveur." });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (!articleId) return;
    toast.confirm("Supprimer cet article ?", async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/articles/${articleId}`, { method: "DELETE" });
        if (!res.ok) {
          toast.error("Suppression impossible");
          return;
        }
        navigateWithToast("/admin/articles", () => toast.success("Article supprimé"));
      } catch {
        toast.error("Erreur de connexion");
      } finally {
        setLoading(false);
      }
    }, { description: "Cette action est irréversible." });
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm";
  const labelClass = "block text-sm font-medium text-secondary mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Link href="/admin/articles" className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline">
        <ArrowLeft className="w-4 h-4" /> Retour
      </Link>

      <div className="bg-white rounded-2xl border border-border p-6 space-y-5">
        <h2 className="text-lg font-bold text-secondary">
          {isEdit ? "Modifier l'article" : "Nouvel article"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Titre FR *</label>
            <input name="titleFr" value={form.titleFr} onChange={handleChange} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Titre EN *</label>
            <input name="titleEn" value={form.titleEn} onChange={handleChange} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Slug (URL)</label>
            <input name="slug" value={form.slug} onChange={handleChange} className={inputClass} placeholder="auto-généré si vide" />
          </div>
          <div>
            <label className={labelClass}>Catégorie *</label>
            <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Extrait FR *</label>
            <textarea name="excerptFr" value={form.excerptFr} onChange={handleChange} rows={3} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Extrait EN *</label>
            <textarea name="excerptEn" value={form.excerptEn} onChange={handleChange} rows={3} className={inputClass} required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Contenu FR *</label>
            <textarea name="contentFr" value={form.contentFr} onChange={handleChange} rows={10} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Contenu EN *</label>
            <textarea name="contentEn" value={form.contentEn} onChange={handleChange} rows={10} className={inputClass} required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Image de couverture (URL)</label>
            <input name="coverImage" value={form.coverImage} onChange={handleChange} type="url" className={inputClass} placeholder="https://..." />
          </div>
          <div>
            <label className={labelClass}>Tags (séparés par virgule)</label>
            <input name="tags" value={form.tags} onChange={handleChange} className={inputClass} placeholder="Next.js, React, Web" />
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <div>
            <label className={labelClass}>Auteur</label>
            <input name="authorName" value={form.authorName} onChange={handleChange} className="w-48 px-4 py-2.5 rounded-xl border border-border text-sm" />
          </div>
          <label className="flex items-center gap-2 text-sm self-end pb-2">
            <input type="checkbox" name="published" checked={form.published} onChange={handleChange} className="rounded" />
            Publier immédiatement
          </label>
        </div>
      </div>


      <div className="flex items-center gap-4">
        <Button type="submit" disabled={loading}>
          <Save className="w-4 h-4" />
          {loading ? "Enregistrement..." : "Enregistrer"}
        </Button>
        {isEdit && (
          <Button type="button" variant="outline" onClick={handleDelete} disabled={loading} className="text-red-600 border-red-200 hover:bg-red-50">
            <Trash2 className="w-4 h-4" /> Supprimer
          </Button>
        )}
      </div>
    </form>
  );
}
