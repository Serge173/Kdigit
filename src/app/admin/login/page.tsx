"use client";

import { useState } from "react";
import { navigateWithToast } from "@/lib/navigation";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Lock, Mail } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const description =
          data.error === "Database unavailable"
            ? "La base de données n'est pas encore initialisée. Réessayez après le déploiement."
            : res.status === 401
              ? "Identifiants incorrects."
              : "Erreur serveur. Réessayez dans quelques instants.";
        toast.error("Connexion échouée", { description });
        return;
      }

      navigateWithToast("/admin", () => toast.success("Connexion réussie", { description: "Bienvenue dans l'administration." }));
    } catch {
      toast.error("Erreur de connexion", { description: "Impossible de contacter le serveur." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted hero-pattern">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl border border-border shadow-xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-5">
            <Logo variant="header" href="/" nativeLink className="pointer-events-auto" />
          </div>
          <h1 className="text-2xl font-bold text-secondary">Administration</h1>
          <p className="text-muted-foreground text-sm mt-1">Connectez-vous pour accéder au panneau</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
                required
              />
            </div>
          </div>


          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
      </div>
    </div>
  );
}
