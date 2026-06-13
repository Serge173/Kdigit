"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import type { HeroSlideData } from "@/lib/data/hero-slides";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 5500;

const SLIDE_CTA_LABELS: Record<
  string,
  { primaryFr: string; primaryEn: string; secondaryFr: string; secondaryEn: string }
> = {
  bienvenue: {
    primaryFr: "Découvrir KDIGIT",
    primaryEn: "Discover KDIGIT",
    secondaryFr: "Nos services",
    secondaryEn: "Our services",
  },
  "invitation-de-baby": {
    primaryFr: "Découvrir le produit",
    primaryEn: "Discover the product",
    secondaryFr: "Demander un devis",
    secondaryEn: "Request a quote",
  },
};

const PRODUCT_BG_SLUGS = new Set(["invitation-de-baby"]);

interface HeroProps {
  slides: HeroSlideData[];
}

export function Hero({ slides }: HeroProps) {
  const t = useTranslations("hero");
  const locale = useLocale();
  const isFr = locale === "fr";

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = slides.length;

  const next = useCallback(() => {
    if (total === 0) return;
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    if (total === 0) return;
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (paused || total <= 1) return;
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, next, total]);

  if (total === 0) return null;

  const slide = slides[current];
  const customCta = SLIDE_CTA_LABELS[slide.slug];
  const isProductBg = PRODUCT_BG_SLUGS.has(slide.slug);
  const compactCta = slide.slug === "invitation-de-baby";

  return (
    <section
      className="relative h-[85vh] min-h-[500px] max-h-[820px] overflow-hidden pt-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full bg-secondary"
        >
          <Image
            src={slide.image}
            alt=""
            fill
            priority={current === 0}
            className={cn(
              "object-center",
              isProductBg ? "object-cover scale-105" : "object-cover"
            )}
            sizes="100vw"
          />
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-transparent",
              isProductBg && "from-secondary/92 via-secondary/55 to-transparent"
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-secondary/20" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45 }}
            className="w-full max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/25 text-primary-light text-xs sm:text-sm font-medium mb-4 border border-primary/30 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              {isFr ? slide.badgeFr : slide.badgeEn}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight text-white">
              {isFr ? slide.titleFr : slide.titleEn}{" "}
              <span className="gradient-text-light block sm:inline mt-1 sm:mt-0">
                {isFr ? slide.highlightFr : slide.highlightEn}
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base md:text-lg text-white/90 max-w-xl leading-relaxed">
              {isFr ? slide.subtitleFr : slide.subtitleEn}
            </p>

            <div className={cn("flex flex-col sm:flex-row", compactCta ? "mt-4 gap-2" : "mt-6 sm:mt-8 gap-3")}>
              <Link
                href={slide.ctaHref}
                className={cn(
                  "inline-flex items-center justify-center gradient-bg text-white hover:opacity-90 transition-opacity",
                  compactCta
                    ? "gap-1 px-2 py-1 rounded-md text-[10px] font-medium shadow-sm shadow-primary/20"
                    : "gap-2 px-6 py-3 rounded-xl font-semibold text-sm sm:text-base shadow-lg shadow-primary/25"
                )}
              >
                {customCta
                  ? isFr
                    ? customCta.primaryFr
                    : customCta.primaryEn
                  : t("cta")}
                <ArrowRight className={compactCta ? "w-2.5 h-2.5" : "w-4 h-4"} />
              </Link>
              <Link
                href={slide.ctaSecondaryHref}
                className={cn(
                  "inline-flex items-center justify-center text-white hover:border-primary hover:bg-white/10 transition-colors backdrop-blur-sm",
                  compactCta
                    ? "gap-1 px-2 py-1 rounded-md border border-white/30 text-[10px] font-medium"
                    : "gap-2 px-6 py-3 rounded-xl border-2 border-white/30 font-semibold text-sm sm:text-base"
                )}
              >
                {customCta
                  ? isFr
                    ? customCta.secondaryFr
                    : customCta.secondaryEn
                  : t("ctaSecondary")}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-20 left-4 right-4 sm:left-8 sm:right-8 z-10 hidden md:flex items-center gap-6 pointer-events-none">
        <span className="text-xs text-white/50 shrink-0">{t("trusted")}</span>
        <div className="flex flex-wrap gap-4">
          {["AGILESTEST", "Aurore", "TechCorp", "GovPlus"].map((name) => (
            <span key={name} className="text-xs font-bold text-white/35">
              {name}
            </span>
          ))}
        </div>
      </div>

      {total > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Slide précédent"
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-primary transition-colors"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={next}
            aria-label="Slide suivant"
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-primary transition-colors"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
                className="group relative p-1"
              >
                <span
                  className={cn(
                    "block h-1.5 sm:h-2 rounded-full transition-all duration-500",
                    i === current ? "w-8 sm:w-10 bg-primary" : "w-1.5 sm:w-2 bg-white/40 group-hover:bg-white/70"
                  )}
                />
              </button>
            ))}
          </div>

          {!paused && (
            <motion.div
              key={current}
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent z-20"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
            />
          )}
        </>
      )}
    </section>
  );
}
