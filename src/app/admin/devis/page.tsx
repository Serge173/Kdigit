import { QuotesTable } from "@/components/admin/QuotesTable";
import { getAdminQuotes } from "@/lib/admin-data";

export default async function AdminQuotesPage() {
  const quotes = await getAdminQuotes();

  const serialized = quotes.map((q) => ({
    id: q.id,
    name: q.name,
    email: q.email,
    phone: q.phone,
    appName: q.appName,
    company: q.company,
    serviceType: q.serviceType,
    budget: q.budget,
    status: q.status,
    createdAt: q.createdAt.toISOString(),
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold text-secondary mb-2">Demandes de devis</h1>
      <p className="text-muted-foreground mb-8">{quotes.length} demande(s)</p>
      <QuotesTable quotes={serialized} />
    </div>
  );
}
