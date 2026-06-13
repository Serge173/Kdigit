import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { LangAttribute } from "@/components/layout/LangAttribute";
import { SITE } from "@/lib/constants";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: `${SITE.name} – ${isFr ? SITE.slogan : SITE.sloganEn}`,
      template: `%s | ${SITE.name}`,
    },
    description: isFr ? SITE.description : SITE.descriptionEn,
    keywords: [
      "développement web",
      "applications mobiles",
      "transformation digitale",
      "KDIGIT",
      "création site internet",
      "Next.js",
      "React",
    ],
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    manifest: "/manifest.webmanifest",
    openGraph: {
      type: "website",
      locale: isFr ? "fr_FR" : "en_US",
      alternateLocale: isFr ? "en_US" : "fr_FR",
      siteName: SITE.name,
      title: SITE.name,
      description: isFr ? SITE.description : SITE.descriptionEn,
      url: SITE.url,
    },
    twitter: {
      card: "summary_large_image",
      title: SITE.name,
      description: isFr ? SITE.description : SITE.descriptionEn,
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: SITE.url,
      languages: {
        fr: "/",
        en: "/en",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "fr" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <LangAttribute locale={locale} />
      <div className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieConsent />
      </div>
    </NextIntlClientProvider>
  );
}
