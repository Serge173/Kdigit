"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  ArrowLeft,
  Check,
  ShoppingBag,
  FileText,
  MessageCircle,
} from "lucide-react";
import type { ProductData } from "@/lib/data/products";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function ProductContent({ product }: { product: ProductData }) {
  const locale = useLocale();
  const isFr = locale === "fr";

  const orderMessage = isFr
    ? "Bonjour KDIGIT, je souhaite passer une commande pour InvitationDeBaby."
    : "Hello KDIGIT, I would like to place an order for InvitationDeBaby.";

  return (
    <>
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-30" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 text-sm font-medium mb-8 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {isFr ? "Retour à l'accueil" : "Back to home"}
          </Link>

          <div className="mx-auto w-full max-w-xl mb-8">
            <Image
              src={product.logo}
              alt={product.name}
              width={800}
              height={450}
              className="w-full h-auto drop-shadow-2xl"
              priority
            />
          </div>

          <p className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary-light text-sm font-semibold mb-4 border border-primary/30 tracking-wide">
            {isFr ? "Produit phare KDIGIT" : "KDIGIT flagship product"}
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            {product.name}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            {isFr ? product.taglineFr : product.taglineEn}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-secondary/80 leading-relaxed text-center">
            {isFr ? product.introFr : product.introEn}
          </p>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-secondary text-center mb-12">
            {isFr ? product.whyTitleFr : product.whyTitleEn}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {(isFr ? product.whyItemsFr : product.whyItemsEn).map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 p-5 rounded-2xl bg-white border border-border"
              >
                <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="text-secondary/90 text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-secondary text-center mb-12">
            {isFr ? product.featuresTitleFr : product.featuresTitleEn}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(isFr ? product.featuresFr : product.featuresEn).map((feature) => (
              <div
                key={feature}
                className="p-5 rounded-2xl border border-border bg-white card-hover"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm text-secondary/90 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="p-8 rounded-2xl bg-white border border-border">
            <h2 className="text-2xl font-bold text-secondary mb-4">
              {isFr ? product.missionTitleFr : product.missionTitleEn}
            </h2>
            <p className="text-secondary/80 leading-relaxed">
              {isFr ? product.missionFr : product.missionEn}
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white border border-border">
            <h2 className="text-2xl font-bold text-secondary mb-4">
              {isFr ? product.promiseTitleFr : product.promiseTitleEn}
            </h2>
            <p className="text-secondary/80 leading-relaxed">
              {isFr ? product.promiseFr : product.promiseEn}
            </p>
          </div>
          <p className="text-center text-xl font-semibold gradient-text">
            {product.name} — {isFr ? product.sloganFr : product.sloganEn}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-secondary mb-4">
            {isFr ? "Prêt à célébrer votre événement ?" : "Ready to celebrate your event?"}
          </h2>
          <p className="text-muted-foreground mb-10">
            {isFr
              ? "Commandez, demandez un devis ou contactez notre équipe — nous vous accompagnons."
              : "Place an order, request a quote or contact our team — we're here to help."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={getWhatsAppUrl(orderMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl gradient-bg text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
            >
              <ShoppingBag className="w-5 h-5" />
              {isFr ? "Passer une commande" : "Place an order"}
            </a>
            <Link
              href="/devis"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-white border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-colors"
            >
              <FileText className="w-5 h-5" />
              {isFr ? "Avoir un devis" : "Get a quote"}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-[#25D366] text-white font-semibold hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-5 h-5" />
              {isFr ? "Contactez-nous" : "Contact us"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
