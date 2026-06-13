import { prisma } from "@/lib/prisma";
import { QuotesList } from "@/components/admin/QuotesList";

export default async function AdminQuotesPage() {
  let quotes: Awaited<ReturnType<typeof prisma.quoteRequest.findMany>> = [];
  try {
    quotes = await prisma.quoteRequest.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    // DB not connected
  }

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
