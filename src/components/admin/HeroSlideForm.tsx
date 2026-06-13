"use client";

import { useState } from "react";
import { navigateWithToast } from "@/lib/navigation";
import { toast } from "@/lib/toast";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Save, Trash2, ArrowLeft } from "lucide-react";

export interface HeroSlideFormData {
  badgeFr: string;
  badgeEn: string;
  titleFr: string;
  titleEn: string;
  highlightFr: string;
  highlightEn: string;
  subtitleFr: string;
  subtitleEn: string;
  slug: string;
  image: string;
  ctaHref: string;
  ctaSecondaryHref: string;
  order: number;
  published: boolean;
}

interface HeroSlideFormProps {
  initial?: Partial<HeroSlideFormData>;
  slideId?: string;
}

const defaultValues: HeroSlideFormData = {
  badgeFr: "",
  badgeEn: "",
  titleFr: "",
  titleEn: "",
  highlightFr: "",
  highlightEn: "",
  subtitleFr: "",
  subtitleEn: "",
  slug: "",
  image: "",
  ctaHref: "/devis",
  ctaSecondaryHref: "/services",
  order: 0,
  published: true,
};

export function HeroSlideForm({ initial, slideId }: HeroSlideFormProps) {
  const [form, setForm] = useState<HeroSlideFormData>({ ...defaultValues, ...initial });
  const [loading, setLoading] = useState(false);

  const isEdit = !!slideId;

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

    const url = isEdit ? `/api/admin/hero-slides/${slideId}` : "/api/admin/hero-slides";
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

      const message = isEdit ? "Slide modifié avec succès" : "Slide créé avec succès";
      navigateWithToast("/admin/slides", () => toast.success(message));
    } catch {
      toast.error("Erreur de connexion", { description: "Impossible de contacter le serveur." });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (!slideId) return;
    toast.confirm("Supprimer ce slide ?", async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/hero-slides/${slideId}`, { method: "DELETE" });
        if (!res.ok) {
          toast.error("Suppression impossible");
          return;
        }
        navigateWithToast("/admin/slides", () => toast.success("Slide supprimé"));
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
      <Link href="/admin/slides" className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline">
        <ArrowLeft className="w-4 h-4" /> Retour
      </Link>

      <div className="bg-white rounded-2xl border border-border p-6 space-y-5">
        <h2 className="text-lg font-bold text-secondary">
          {isEdit ? "Modifier le slide" : "Nouveau slide hero"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Badge FR *</label>
            <input name="badgeFr" value={form.badgeFr} onChange={handleChange} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Badge EN *</label>
            <input name="badgeEn" value={form.badgeEn} onChange={handleChange} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Titre FR *</label>
            <input name="titleFr" value={form.titleFr} onChange={handleChange} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Titre EN *</label>
            <input name="titleEn" value={form.titleEn} onChange={handleChange} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Mise en avant FR *</label>
            <input name="highlightFr" value={form.highlightFr} onChange={handleChange} className={inputClass} required placeholder="réalité digitale" />
          </div>
          <div>
            <label className={labelClass}>Mise en avant EN *</label>
            <input name="highlightEn" value={form.highlightEn} onChange={handleChange} className={inputClass} required placeholder="digital reality" />
          </div>
          <div>
            <label className={labelClass}>Slug (URL interne)</label>
            <input name="slug" value={form.slug} onChange={handleChange} className={inputClass} placeholder="auto-généré si vide" />
          </div>
          <div>
            <label className={labelClass}>Ordre d&apos;affichage</label>
            <input name="order" type="number" value={form.order} onChange={handleChange} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Sous-titre FR *</label>
            <textarea name="subtitleFr" value={form.subtitleFr} onChange={handleChange} rows={3} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Sous-titre EN *</label>
            <textarea name="subtitleEn" value={form.subtitleEn} onChange={handleChange} rows={3} className={inputClass} required />
          </div>
        </div>

        <div>
          <label className={labelClass}>Image de fond (URL) *</label>
          <input name="image" type="url" value={form.image} onChange={handleChange} className={inputClass} required placeholder="https://..." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Lien bouton principal</label>
            <input name="ctaHref" value={form.ctaHref} onChange={handleChange} className={inputClass} placeholder="/devis" />
          </div>
          <div>
            <label className={labelClass}>Lien bouton secondaire</label>
            <input name="ctaSecondaryHref" value={form.ctaSecondaryHref} onChange={handleChange} className={inputClass} placeholder="/services" />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" checked={form.published} onChange={handleChange} className="rounded" />
          Publié (visible sur la page d&apos;accueil)
        </label>
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
