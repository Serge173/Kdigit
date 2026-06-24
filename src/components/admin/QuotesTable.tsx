"use client";

import Link from "next/link";
import { ArrowRight, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { QUOTE_STATUS_LABELS, quoteStatusBadgeClass } from "@/components/admin/quotes/quote-status";

export interface AdminQuoteListItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  appName: string | null;
  company: string | null;
  serviceType: string;
  budget: string | null;
  status: string;
  createdAt: string;
}

interface QuotesTableProps {
  quotes: AdminQuoteListItem[];
  limit?: number;
  showViewAllLink?: boolean;
  totalCount?: number;
}

export function QuotesTable({ quotes, limit, showViewAllLink, totalCount }: QuotesTableProps) {
  const items = limit ? quotes.slice(0, limit) : quotes;

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-white p-12 text-center text-muted-foreground">
        <ClipboardList className="mx-auto mb-3 h-10 w-10 opacity-40" />
        Aucune demande de devis
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-5 py-4 font-semibold">Projet</th>
              <th className="px-5 py-4 font-semibold">Client</th>
              <th className="px-5 py-4 font-semibold">Type</th>
              <th className="px-5 py-4 font-semibold">Budget</th>
              <th className="px-5 py-4 font-semibold">Statut</th>
              <th className="px-5 py-4 font-semibold">Date</th>
              <th className="px-5 py-4 font-semibold" aria-hidden />
            </tr>
          </thead>
          <tbody>
            {items.map((quote) => (
              <tr key={quote.id} className="border-b border-border/70 last:border-0 hover:bg-muted/20">
                <td className="px-5 py-4">
                  <Link href={`/admin/devis/${quote.id}`} className="font-semibold text-secondary hover:text-primary">
                    {quote.appName || quote.company || "Sans nom"}
                  </Link>
                </td>
                <td className="px-5 py-4">
                  <Link href={`/admin/devis/${quote.id}`} className="block text-secondary/90 hover:text-primary">
                    <span className="font-medium">{quote.name}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">{quote.email}</span>
                  </Link>
                </td>
                <td className="px-5 py-4 text-muted-foreground">{quote.serviceType}</td>
                <td className="px-5 py-4 text-muted-foreground">{quote.budget || "—"}</td>
                <td className="px-5 py-4">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                      quoteStatusBadgeClass(quote.status)
                    )}
                  >
                    {QUOTE_STATUS_LABELS[quote.status] ?? quote.status}
                  </span>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-muted-foreground">
                  {new Date(quote.createdAt).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-5 py-4 text-right">
                  <Link
                    href={`/admin/devis/${quote.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    Voir
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-border md:hidden">
        {items.map((quote) => (
          <Link
            key={quote.id}
            href={`/admin/devis/${quote.id}`}
            className="block p-4 transition-colors hover:bg-muted/20"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-semibold text-secondary">
                  {quote.appName || quote.company || "Sans nom"}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {quote.name} • {quote.serviceType}
                </p>
                {quote.budget && (
                  <p className="mt-1 text-xs text-muted-foreground">Budget : {quote.budget}</p>
                )}
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold",
                  quoteStatusBadgeClass(quote.status)
                )}
              >
                {QUOTE_STATUS_LABELS[quote.status] ?? quote.status}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {new Date(quote.createdAt).toLocaleString("fr-FR")}
            </p>
          </Link>
        ))}
      </div>

      {showViewAllLink && limit && (totalCount ?? quotes.length) > limit && (
        <div className="border-t border-border px-5 py-3 text-center">
          <Link href="/admin/devis" className="text-sm font-semibold text-primary hover:underline">
            Voir les {totalCount ?? quotes.length} demandes
          </Link>
        </div>
      )}
    </div>
  );
}
