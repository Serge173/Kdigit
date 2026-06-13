"use client";

import { useState } from "react";
import { toast } from "@/lib/toast";
import { StatusSelect } from "@/components/admin/StatusSelect";

interface Quote {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  serviceType: string;
  budget: string | null;
  deadline: string | null;
  description: string;
  fileUrl: string | null;
  status: string;
  createdAt: string;
}

const STATUS_OPTIONS = [
  { value: "NEW", label: "Nouveau" },
  { value: "IN_PROGRESS", label: "En cours" },
  { value: "QUOTED", label: "Devis envoyé" },
  { value: "ACCEPTED", label: "Accepté" },
  { value: "REJECTED", label: "Refusé" },
  { value: "CLOSED", label: "Clôturé" },
];

const STATUS_LABELS = Object.fromEntries(STATUS_OPTIONS.map((o) => [o.value, o.label]));

export function QuotesList({ quotes }: { quotes: Quote[] }) {
  const [items, setItems] = useState(quotes);

  const updateStatus = async (id: string, status: string) => {
    const previous = items.find((q) => q.id === id)?.status;
    setItems((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));

    try {
      const res = await fetch(`/api/admin/quotes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error();

      toast.success("Statut mis à jour", { description: `Devis marqué : ${STATUS_LABELS[status] ?? status}` });
    } catch {
      setItems((prev) => prev.map((q) => (q.id === id ? { ...q, status: previous ?? q.status } : q)));
      toast.error("Erreur", { description: "Impossible de mettre à jour le statut." });
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-white p-12 rounded-2xl border border-border text-center text-muted-foreground">
        Aucune demande de devis
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((q) => (
        <div key={q.id} className="bg-white p-6 rounded-2xl border border-border">
          <div className="flex items-start justify-between mb-3 gap-4">
            <div>
              <h3 className="font-bold text-secondary">{q.name}</h3>
              <p className="text-sm text-muted-foreground">
                {q.email} • {q.phone} {q.company && `• ${q.company}`}
              </p>
            </div>
            <StatusSelect
              value={q.status}
              options={STATUS_OPTIONS}
              onChange={(status) => updateStatus(q.id, status)}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
            <div><span className="text-muted-foreground">Prestation:</span> <strong>{q.serviceType}</strong></div>
            {q.budget && <div><span className="text-muted-foreground">Budget:</span> {q.budget}</div>}
            {q.deadline && <div><span className="text-muted-foreground">Délai:</span> {q.deadline}</div>}
          </div>
          <p className="text-sm text-muted-foreground whitespace-pre-line">{q.description}</p>
          {q.fileUrl && (
            <a href={q.fileUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-sm text-primary hover:underline">
              Voir le document joint
            </a>
          )}
          <p className="text-xs text-muted-foreground mt-3">
            {new Date(q.createdAt).toLocaleString("fr-FR")}
          </p>
        </div>
      ))}
    </div>
  );
}
