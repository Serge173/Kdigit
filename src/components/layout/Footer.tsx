"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Share2, Rss, Globe, MessageSquare, Mail, MessageCircle, MapPin } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { SITE } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { SERVICE_CATEGORIES } from "@/lib/data/services";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="mb-4">
              <Logo variant="footer" />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">{t("description")}</p>
            <div className="flex gap-3">
              {[
                { icon: Share2, href: SITE.social.linkedin },
                { icon: Globe, href: SITE.social.facebook },
                { icon: Rss, href: SITE.social.twitter },
                { icon: MessageSquare, href: SITE.social.instagram },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{t("services")}</h3>
            <ul className="space-y-2">
              {SERVICE_CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/services/${cat.slug}`}
                    className="text-white/60 text-sm hover:text-primary transition-colors"
                  >
                    {cat.titleFr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{t("company")}</h3>
            <ul className="space-y-2">
              {[
                { label: tNav("about"), href: "/a-propos" },
                { label: tNav("portfolio"), href: "/realisations" },
                { label: tNav("blog"), href: "/blog" },
                { label: tNav("contact"), href: "/contact" },
                { label: tNav("quote"), href: "/devis" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/60 text-sm hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{tNav("contact")}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {SITE.phone} (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                {SITE.email}
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                {SITE.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {year} {SITE.name}. {t("rights")}
          </p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="text-white/40 text-sm hover:text-white transition-colors">
              {t("legal")}
            </Link>
            <Link href="/confidentialite" className="text-white/40 text-sm hover:text-white transition-colors">
              {t("privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
