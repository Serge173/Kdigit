"use client";

import { useState } from "react";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/Button";
import { KeyRound, Save } from "lucide-react";

export function ChangePasswordForm() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      toast.warning("Les mots de passe ne correspondent pas");
      return;
    }

    if (form.newPassword.length < 6) {
      toast.warning("Minimum 6 caractères pour le nouveau mot de passe");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/me/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error("Échec du changement", { description: data.error || "Erreur inconnue" });
        return;
      }

      toast.success("Mot de passe mis à jour");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch {
      toast.error("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <KeyRound className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-secondary">Changer mon mot de passe</h2>
          <p className="text-sm text-muted-foreground">Saisissez votre mot de passe actuel puis le nouveau.</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary mb-1">Mot de passe actuel *</label>
        <input
          type="password"
          value={form.currentPassword}
          onChange={(e) => setForm((p) => ({ ...p, currentPassword: e.target.value }))}
          className={inputClass}
          required
          autoComplete="current-password"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-secondary mb-1">Nouveau mot de passe *</label>
        <input
          type="password"
          value={form.newPassword}
          onChange={(e) => setForm((p) => ({ ...p, newPassword: e.target.value }))}
          className={inputClass}
          required
          minLength={6}
          autoComplete="new-password"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-secondary mb-1">Confirmer le nouveau mot de passe *</label>
        <input
          type="password"
          value={form.confirmPassword}
          onChange={(e) => setForm((p) => ({ ...p, confirmPassword: e.target.value }))}
          className={inputClass}
          required
          minLength={6}
          autoComplete="new-password"
        />
      </div>

      <Button type="submit" disabled={loading}>
        <Save className="w-4 h-4" />
        {loading ? "Enregistrement..." : "Mettre à jour le mot de passe"}
      </Button>
    </form>
  );
}
