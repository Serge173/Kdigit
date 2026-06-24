"use client";

import { useState } from "react";
import { navigateWithToast } from "@/lib/navigation";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/Button";
import { Save, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export interface UserFormData {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "EDITOR" | "VIEWER";
  active: boolean;
}

interface UserFormProps {
  initial?: Partial<UserFormData>;
  userId?: string;
  currentUserId?: string;
}

const defaultValues: UserFormData = {
  name: "",
  email: "",
  password: "",
  role: "EDITOR",
  active: true,
};

export function UserForm({ initial, userId, currentUserId }: UserFormProps) {
  const [form, setForm] = useState<UserFormData>({ ...defaultValues, ...initial, password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isEdit = !!userId;
  const isSelf = isEdit && userId === currentUserId;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

    if (!isEdit && !form.password) {
      toast.warning("Mot de passe requis", { description: "Veuillez saisir un mot de passe." });
      setLoading(false);
      return;
    }

    if (form.password && form.password !== confirmPassword) {
      toast.warning("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    const url = isEdit ? `/api/admin/users/${userId}` : "/api/admin/users";
    const method = isEdit ? "PUT" : "POST";

    const payload: Record<string, unknown> = { ...form };
    if (isEdit && !form.password) delete payload.password;
    delete payload.confirmPassword;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error("Erreur lors de l'enregistrement", { description: data.error });
        return;
      }

      const message = isEdit ? "Utilisateur modifié avec succès" : "Utilisateur créé avec succès";
      navigateWithToast("/admin/utilisateurs", () => toast.success(message));
    } catch {
      toast.error("Erreur de connexion", { description: "Impossible de contacter le serveur." });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (!userId) return;
    if (isSelf) {
      toast.warning("Action impossible", { description: "Vous ne pouvez pas supprimer votre propre compte." });
      return;
    }

    toast.confirm("Supprimer cet utilisateur ?", async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });
        if (!res.ok) {
          const data = await res.json();
          toast.error("Suppression impossible", { description: data.error });
          return;
        }
        navigateWithToast("/admin/utilisateurs", () => toast.success("Utilisateur supprimé"));
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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
      <Link href="/admin/utilisateurs" className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline">
        <ArrowLeft className="w-4 h-4" /> Retour à la liste
      </Link>

      <div className="bg-white rounded-2xl border border-border p-6 space-y-5">
        <h2 className="text-lg font-bold text-secondary">
          {isEdit ? "Modifier l'utilisateur" : "Nouvel utilisateur"}
        </h2>

        <div>
          <label className={labelClass}>Nom complet *</label>
          <input name="name" value={form.name} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>
            Mot de passe {isEdit ? "(laisser vide pour ne pas changer)" : "*"}
          </label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className={inputClass}
            minLength={6}
            required={!isEdit}
            autoComplete={isEdit ? "new-password" : "off"}
          />
        </div>
        {(form.password || !isEdit) && (
          <div>
            <label className={labelClass}>Confirmer le mot de passe {!isEdit && "*"}</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputClass}
              minLength={6}
              required={!isEdit || !!form.password}
              autoComplete="new-password"
            />
          </div>
        )}
        <div>
          <label className={labelClass}>Rôle *</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className={inputClass}
            disabled={isSelf}
          >
            <option value="VIEWER">Viewer (lecture seule)</option>
            <option value="EDITOR">Editor (création / édition)</option>
            <option value="ADMIN">Admin (accès complet)</option>
          </select>
          {isSelf && (
            <p className="text-xs text-muted-foreground mt-1">Vous ne pouvez pas modifier votre propre rôle.</p>
          )}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="active"
            checked={form.active}
            onChange={handleChange}
            className="rounded"
            disabled={isSelf}
          />
          Compte actif
        </label>
        {isSelf && (
          <p className="text-xs text-muted-foreground">
            Pour changer votre mot de passe, utilisez la page{" "}
            <Link href="/admin/profil" className="text-primary hover:underline">
              Mon compte
            </Link>
            .
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={loading}>
          <Save className="w-4 h-4" />
          {loading ? "Enregistrement..." : isEdit ? "Enregistrer" : "Créer l'utilisateur"}
        </Button>
        {isEdit && !isSelf && (
          <Button
            type="button"
            variant="outline"
            onClick={handleDelete}
            disabled={loading}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" /> Supprimer
          </Button>
        )}
      </div>
    </form>
  );
}
