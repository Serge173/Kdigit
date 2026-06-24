import { notFound } from "next/navigation";
import { QuoteDetailView } from "@/components/admin/QuoteDetailView";
import { getAdminQuote } from "@/lib/admin-data";

export default async function AdminQuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quote = await getAdminQuote(id);

  if (!quote) notFound();

  return (
    <QuoteDetailView
      quote={{
        ...quote,
        createdAt: quote.createdAt.toISOString(),
        updatedAt: quote.updatedAt.toISOString(),
      }}
    />
  );
}
