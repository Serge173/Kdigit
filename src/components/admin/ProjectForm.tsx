"use client";

import { useState } from "react";
import { navigateWithToast } from "@/lib/navigation";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/Button";
import { Save, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export interface ProjectFormData {
  clientName: string;
  titleFr: string;
  titleEn: string;
  slug: string;
  descriptionFr: string;
  descriptionEn: string;
  technologies: string;
  resultsFr: string;
  resultsEn: string;
  coverImage: string;
  screenshots: string;
  featured: boolean;
  published: boolean;
  order: number;
}

interface ProjectFormProps {
  initial?: Partial<ProjectFormData>;
  projectId?: string;
}

const defaultValues: ProjectFormData = {
  clientName: "",
  titleFr: "",
  titleEn: "",
  slug: "",
  descriptionFr: "",
  descriptionEn: "",
  technologies: "",
  resultsFr: "",
  resultsEn: "",
  coverImage: "",
  screenshots: "",
  featured: false,
  published: true,
  order: 0,
};

export function ProjectForm({ initial, projectId }: ProjectFormProps) {
  const [form, setForm] = useState<ProjectFormData>({ ...defaultValues, ...initial });
  const [loading, setLoading] = useState(false);

  const isEdit = !!projectId;

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

    const url = isEdit ? `/api/admin/projects/${projectId}` : "/api/admin/projects";
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

      const message = isEdit ? "Réalisation modifiée avec succès" : "Réalisation créée avec succès";
      navigateWithToast("/admin/projets", () => toast.success(message));
    } catch {
      toast.error("Erreur de connexion", { description: "Impossible de contacter le serveur." });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (!projectId) return;
    toast.confirm("Supprimer cette réalisation ?", async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/projects/${projectId}`, { method: "DELETE" });
        if (!res.ok) {
          toast.error("Suppression impossible");
          return;
        }
        navigateWithToast("/admin/projets", () => toast.success("Réalisation supprimée"));
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
      <Link href="/admin/projets" className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline">
        <ArrowLeft className="w-4 h-4" /> Retour
      </Link>

      <div className="bg-white rounded-2xl border border-border p-6 space-y-5">
        <h2 className="text-lg font-bold text-secondary">
          {isEdit ? "Modifier la réalisation" : "Nouvelle réalisation"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Nom du client *</label>
            <input name="clientName" value={form.clientName} onChange={handleChange} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Slug (URL)</label>
            <input name="slug" value={form.slug} onChange={handleChange} className={inputClass} placeholder="auto-généré si vide" />
          </div>
          <div>
            <label className={labelClass}>Titre FR *</label>
            <input name="titleFr" value={form.titleFr} onChange={handleChange} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Titre EN *</label>
            <input name="titleEn" value={form.titleEn} onChange={handleChange} className={inputClass} required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Description FR *</label>
            <textarea name="descriptionFr" value={form.descriptionFr} onChange={handleChange} rows={4} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Description EN *</label>
            <textarea name="descriptionEn" value={form.descriptionEn} onChange={handleChange} rows={4} className={inputClass} required />
          </div>
        </div>

        <div>
          <label className={labelClass}>Technologies (séparées par virgule)</label>
          <input name="technologies" value={form.technologies} onChange={handleChange} className={inputClass} placeholder="React, Next.js, PostgreSQL" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Résultats FR *</label>
            <textarea name="resultsFr" value={form.resultsFr} onChange={handleChange} rows={3} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Résultats EN *</label>
            <textarea name="resultsEn" value={form.resultsEn} onChange={handleChange} rows={3} className={inputClass} required />
          </div>
        </div>

        <div>
          <label className={labelClass}>Image de couverture (URL) *</label>
          <input name="coverImage" value={form.coverImage} onChange={handleChange} type="url" className={inputClass} required placeholder="https://..." />
        </div>

        <div>
          <label className={labelClass}>Captures d&apos;écran (une URL par ligne)</label>
          <textarea name="screenshots" value={form.screenshots} onChange={handleChange} rows={3} className={inputClass} placeholder="https://image1.jpg&#10;https://image2.jpg" />
        </div>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="rounded" />
            Mise en avant (page d&apos;accueil)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="published" checked={form.published} onChange={handleChange} className="rounded" />
            Publié
          </label>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Ordre</label>
            <input name="order" value={form.order} onChange={handleChange} type="number" className="w-20 px-3 py-1.5 rounded-lg border border-border text-sm" />
          </div>
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
