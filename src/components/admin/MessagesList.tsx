"use client";

import { useState } from "react";
import { toast } from "@/lib/toast";
import { StatusSelect } from "@/components/admin/StatusSelect";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

const STATUS_OPTIONS = [
  { value: "NEW", label: "Nouveau" },
  { value: "READ", label: "Lu" },
  { value: "REPLIED", label: "Répondu" },
  { value: "ARCHIVED", label: "Archivé" },
];

const STATUS_LABELS = Object.fromEntries(STATUS_OPTIONS.map((o) => [o.value, o.label]));

export function MessagesList({ messages }: { messages: Message[] }) {
  const [items, setItems] = useState(messages);

  const updateStatus = async (id: string, status: string) => {
    const previous = items.find((m) => m.id === id)?.status;
    setItems((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));

    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error();

      toast.success("Statut mis à jour", { description: `Message marqué : ${STATUS_LABELS[status] ?? status}` });
    } catch {
      setItems((prev) => prev.map((m) => (m.id === id ? { ...m, status: previous ?? m.status } : m)));
      toast.error("Erreur", { description: "Impossible de mettre à jour le statut." });
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-white p-12 rounded-2xl border border-border text-center text-muted-foreground">
        Aucun message reçu
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((m) => (
        <div key={m.id} className="bg-white p-6 rounded-2xl border border-border">
          <div className="flex items-start justify-between mb-3 gap-4">
            <div>
              <h3 className="font-bold text-secondary">{m.name}</h3>
              <p className="text-sm text-muted-foreground">
                {m.email} {m.phone && `• ${m.phone}`}
              </p>
            </div>
            <StatusSelect
              value={m.status}
              options={STATUS_OPTIONS}
              onChange={(status) => updateStatus(m.id, status)}
            />
          </div>
          <p className="font-medium text-sm text-secondary mb-2">{m.subject}</p>
          <p className="text-sm text-muted-foreground whitespace-pre-line">{m.message}</p>
          <p className="text-xs text-muted-foreground mt-3">
            {new Date(m.createdAt).toLocaleString("fr-FR")}
          </p>
        </div>
      ))}
    </div>
  );
}
