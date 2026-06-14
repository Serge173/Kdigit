import Link from "next/link";
import { FolderOpen, FileText, MessageSquare, ClipboardList, ArrowRight } from "lucide-react";
import { QuotesList } from "@/components/admin/QuotesList";
import { getDashboardData } from "@/lib/admin-data";

export default async function AdminDashboard() {
  const data = await getDashboardData();

  const cards = [
    { label: "Réalisations", value: data.projects, icon: FolderOpen, href: "/admin/projets", color: "bg-primary" },
    { label: "Articles publiés", value: data.posts, icon: FileText, href: "/admin/articles", color: "bg-accent" },
    { label: "Nouveaux messages", value: data.messagesNew, icon: MessageSquare, href: "/admin/messages", color: "bg-accent-dark" },
    { label: "Total devis", value: data.quotesTotal, sub: data.quotesNew > 0 ? `${data.quotesNew} nouveau(x)` : undefined, icon: ClipboardList, href: "/admin/devis", color: "bg-accent" },
  ];

  const serializedQuotes = data.quotes.map((q) => ({
    ...q,
    createdAt: q.createdAt.toISOString(),
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold text-secondary mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-8">Vue d&apos;ensemble de votre site KDIGIT</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="p-6 bg-white rounded-2xl border border-border card-hover"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-secondary">{card.value}</span>
            </div>
            <p className="text-muted-foreground text-sm font-medium">{card.label}</p>
            {card.sub && <p className="text-accent text-xs font-semibold mt-1">{card.sub}</p>}
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-secondary">Demandes de devis</h2>
          <p className="text-muted-foreground text-sm mt-1">
            {data.quotesTotal} demande(s) au total
          </p>
        </div>
        <Link
          href="/admin/devis"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
        >
          Voir tout <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <QuotesList quotes={serializedQuotes} />
    </div>
  );
}
