"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Cookie } from "lucide-react";
import { acceptCookieConsent, hasCookieConsent } from "@/lib/cookies";

export function CookieConsent() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!hasCookieConsent());
  }, []);

  const handleAccept = () => {
    acceptCookieConsent();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed bottom-0 left-0 right-0 z-[9998] p-4 sm:p-6 pointer-events-none"
    >
      <div className="max-w-4xl mx-auto pointer-events-auto rounded-2xl border border-border bg-white/95 backdrop-blur-xl shadow-2xl shadow-secondary/10 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shrink-0">
              <Cookie className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h2 id="cookie-consent-title" className="font-bold text-secondary text-sm sm:text-base">
                {t("title")}
              </h2>
              <p id="cookie-consent-desc" className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t("description")}{" "}
                <Link href="/confidentialite" className="text-primary font-medium hover:underline">
                  {t("privacyLink")}
                </Link>
                .
              </p>
              <p className="mt-2 text-[11px] sm:text-xs text-muted-foreground/90 leading-relaxed">
                {t("dataNote")}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAccept}
            className="shrink-0 w-full sm:w-auto px-6 py-3 rounded-xl gradient-bg text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
