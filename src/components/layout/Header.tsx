"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

const navItems = [
  { key: "home", href: "/" },
  { key: "about", href: "/a-propos" },
  { key: "services", href: "/services" },
  { key: "portfolio", href: "/realisations" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const switchLocale = locale === "fr" ? "en" : "fr";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-white/50 via-white/30 to-white/15 backdrop-blur-xl border-b border-white/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Logo variant="header" />

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "text-primary bg-primary/5"
                    : "text-secondary/70 hover:text-primary hover:bg-white/50"
                )}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href={pathname}
              locale={switchLocale}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-secondary/70 hover:text-primary hover:bg-white/50 transition-colors"
            >
              <Globe className="w-4 h-4" />
              {switchLocale.toUpperCase()}
            </Link>
            <Link
              href="/devis"
              className="px-5 py-2.5 rounded-xl gradient-bg text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
            >
              {t("quote")}
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/40 transition-colors"
            aria-label="Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/20 bg-white/45 backdrop-blur-xl">
          <nav className="flex flex-col p-4 gap-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg font-medium transition-colors",
                  pathname === item.href
                    ? "text-primary bg-primary/5"
                    : "text-secondary/70 hover:bg-white/50"
                )}
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/devis"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-3 rounded-xl gradient-bg text-white text-center font-semibold"
            >
              {t("quote")}
            </Link>
            <Link
              href={pathname}
              locale={switchLocale}
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-secondary/70"
            >
              <Globe className="w-4 h-4" />
              {switchLocale.toUpperCase()}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
