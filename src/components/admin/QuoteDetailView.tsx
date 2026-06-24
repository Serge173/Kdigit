"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, MessageCircle, Phone } from "lucide-react";
import { toast } from "@/lib/toast";
import { StatusSelect } from "@/components/admin/StatusSelect";
import {
  QUOTE_STATUS_LABELS,
  QUOTE_STATUS_OPTIONS,
  quoteStatusBadgeClass,
} from "@/components/admin/quotes/quote-status";
import { buildQuoteDisplaySections } from "@/lib/quote-admin-display";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export interface AdminQuoteDetail {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  appName: string | null;
  address: string | null;
  sector: string | null;
  serviceType: string;
  budget: string | null;
  deadline: string | null;
  description: string;
  formData: unknown;
  fileUrl: string | null;
  status: string;
  ipAddress: string | null;
  createdAt: string;
  updatedAt: string;
}

export function QuoteDetailView({ quote }: { quote: AdminQuoteDetail }) {
  const [status, setStatus] = useState(quote.status);
  const [saving, setSaving] = useState(false);

  const sections = buildQuoteDisplaySections(quote.formData);
  const title = quote.appName || quote.company || quote.name;

  const updateStatus = async (nextStatus: string) => {
    const previous = status;
    setStatus(nextStatus);
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/quotes/${quote.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!res.ok) throw new Error();

      toast.success("Statut mis à jour", {
        description: `Devis marqué : ${QUOTE_STATUS_LABELS[nextStatus] ?? nextStatus}`,
      });
    } catch {
      setStatus(previous);
      toast.error("Erreur", { description: "Impossible de mettre à jour le statut." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Link
        href="/admin/devis"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour à la liste
      </Link>

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                quoteStatusBadgeClass(status)
              )}
            >
              {QUOTE_STATUS_LABELS[status] ?? status}
            </span>
            <span className="text-xs text-muted-foreground">{quote.serviceType}</span>
          </div>
          <h1 className="text-3xl font-bold text-secondary">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Reçu le {new Date(quote.createdAt).toLocaleString("fr-FR")}
            {quote.updatedAt !== quote.createdAt && (
              <> • Mis à jour le {new Date(quote.updatedAt).toLocaleString("fr-FR")}</>
            )}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-white p-4 shadow-sm lg:min-w-[260px]">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Gérer le devis
          </p>
          <StatusSelect
            value={status}
            options={[...QUOTE_STATUS_OPTIONS]}
            onChange={updateStatus}
            disabled={saving}
          />
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-white p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Contact</p>
          <p className="font-semibold text-secondary">{quote.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{quote.email}</p>
          <p className="text-sm text-muted-foreground">{quote.phone}</p>
          {quote.address && <p className="mt-2 text-sm text-muted-foreground">{quote.address}</p>}
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={`mailto:${quote.email}`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-secondary hover:bg-muted/40"
            >
              <Mail className="h-3.5 w-3.5" />
              Email
            </a>
            <a
              href={`tel:${quote.phone}`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-secondary hover:bg-muted/40"
            >
              <Phone className="h-3.5 w-3.5" />
              Appeler
            </a>
            <a
              href={getWhatsAppUrl(`Bonjour ${quote.name}, concernant votre demande de devis KDIGIT (${title}).`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-secondary hover:bg-muted/40"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Projet</p>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-muted-foreground">Nom du projet</dt>
              <dd className="font-medium text-secondary">{quote.appName || quote.company || "—"}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Type de solution</dt>
              <dd className="font-medium text-secondary">{quote.serviceType}</dd>
            </div>
            {quote.sector && (
              <div>
                <dt className="text-muted-foreground">Secteur</dt>
                <dd className="font-medium text-secondary">{quote.sector}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Budget & délai</p>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-muted-foreground">Budget prévu</dt>
              <dd className="font-medium text-secondary">{quote.budget || "—"}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Date souhaitée</dt>
              <dd className="font-medium text-secondary">{quote.deadline || "—"}</dd>
            </div>
          </dl>
        </div>
      </div>

      {sections.length > 0 ? (
        <div className="space-y-4">
          {sections.map((section) => (
            <section key={section.title} className="rounded-2xl border border-border bg-white p-6">
              <h2 className="mb-4 text-lg font-bold text-secondary">{section.title}</h2>
              <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {section.fields.map((field) => (
                  <div
                    key={`${section.title}-${field.label}`}
                    className={field.label === "Description" || field.label === "Description détaillée" ? "md:col-span-2" : ""}
                  >
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {field.label}
                    </dt>
                    <dd className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-secondary">{field.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      ) : (
        <section className="rounded-2xl border border-border bg-white p-6">
          <h2 className="mb-4 text-lg font-bold text-secondary">Détail de la demande</h2>
          <pre className="whitespace-pre-wrap rounded-xl bg-muted/40 p-4 font-sans text-sm leading-relaxed text-muted-foreground">
            {quote.description}
          </pre>
        </section>
      )}

      {quote.fileUrl && (
        <div className="mt-4 rounded-2xl border border-border bg-white p-5">
          <a
            href={quote.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Voir le document joint
          </a>
        </div>
      )}

      {quote.ipAddress && (
        <p className="mt-6 text-xs text-muted-foreground">Adresse IP : {quote.ipAddress}</p>
      )}
    </div>
  );
}
