import { QuotesList } from "@/components/admin/QuotesList";
import { getAdminQuotes } from "@/lib/admin-data";

export default async function AdminQuotesPage() {
  const quotes = await getAdminQuotes();

  const serialized = quotes.map((q) => ({
    ...q,
    createdAt: q.createdAt.toISOString(),
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold text-secondary mb-2">Demandes de devis</h1>
      <p className="text-muted-foreground mb-8">{quotes.length} demande(s)</p>
      <QuotesList quotes={serialized} />
    </div>
  );
}
