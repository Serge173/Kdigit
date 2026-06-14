import { ContactForm } from "@/components/forms/ContactForm";
import { ContactMapCard } from "@/components/ui/ContactMapCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface QuickContactSectionProps {
  locale: string;
}

export function QuickContactSection({ locale }: QuickContactSectionProps) {
  const isFr = locale === "fr";

  return (
    <section className="py-20 lg:py-28 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={isFr ? "Contact rapide" : "Quick contact"}
          subtitle={
            isFr
              ? "Une question ? Envoyez-nous un message, nous vous répondons sous 24h."
              : "Have a question? Send us a message, we respond within 24h."
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="bg-white p-8 rounded-2xl border border-border shadow-sm h-full">
            <ContactForm />
          </div>
          <ContactMapCard />
        </div>
      </div>
    </section>
  );
}
