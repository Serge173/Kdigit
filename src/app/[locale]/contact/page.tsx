import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { SITE } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle, Mail, MapPin, Clock } from "lucide-react";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  const info = [
    {
      icon: MessageCircle,
      label: t("info.whatsapp"),
      value: SITE.phone,
      href: getWhatsAppUrl(),
      external: true,
    },
    { icon: Mail, label: t("info.email"), value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: MapPin, label: t("info.address"), value: SITE.address },
    { icon: Clock, label: t("info.hours"), value: t("info.hoursValue") },
  ];

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-6">
              {info.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-muted">
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">{item.label}</div>
                    {"href" in item && item.href ? (
                      <a
                        href={item.href}
                        target={"external" in item && item.external ? "_blank" : undefined}
                        rel={"external" in item && item.external ? "noopener noreferrer" : undefined}
                        className="font-semibold text-secondary hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="font-semibold text-secondary">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}

              <div className="rounded-2xl overflow-hidden border border-border h-64">
                <iframe
                  title="Google Maps"
                  src="https://maps.google.com/maps?q=Paris%2C%20France&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
