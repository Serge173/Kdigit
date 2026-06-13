import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { SITE } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero title={locale === "fr" ? "Mentions légales" : "Legal notice"} />
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg text-secondary/80">
          <h2>Éditeur du site</h2>
          <p>{SITE.name} — {SITE.address}</p>
          <p>
            Email : {SITE.email} — WhatsApp :{" "}
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              {SITE.phone}
            </a>
          </p>
          <h2>Hébergement</h2>
          <p>Le site est hébergé par un prestataire certifié avec certificat SSL/HTTPS.</p>
          <h2>Propriété intellectuelle</h2>
          <p>L&apos;ensemble du contenu de ce site est protégé par le droit d&apos;auteur. Toute reproduction est interdite sans autorisation.</p>
        </div>
      </section>
    </>
  );
}
