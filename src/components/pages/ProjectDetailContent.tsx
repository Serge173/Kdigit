"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";

interface Project {
  clientName: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  coverImage: string;
  screenshots: string[];
  technologies: string[];
  resultsFr: string;
  resultsEn: string;
}

export function ProjectDetailContent({ project }: { project: Project }) {
  const t = useTranslations("portfolio");
  const locale = useLocale();

  return (
    <>
      <section className="pt-32 pb-12 hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/realisations" className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4" /> {t("viewAll")}
          </Link>
          <span className="inline-block bg-primary text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
            {project.clientName}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-secondary">
            {locale === "fr" ? project.titleFr : project.titleEn}
          </h1>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-12">
            <Image
              src={project.coverImage}
              alt={locale === "fr" ? project.titleFr : project.titleEn}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-secondary mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {locale === "fr" ? project.descriptionFr : project.descriptionEn}
              </p>

              {project.screenshots.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-secondary mb-6">Captures d&apos;écran</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.screenshots.map((src, i) => (
                      <div key={i} className="relative h-48 rounded-xl overflow-hidden border border-border">
                        <Image src={src} alt={`Screenshot ${i + 1}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div className="p-6 rounded-2xl bg-muted">
                <h3 className="font-bold text-secondary mb-4">{t("technologies")}</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-muted">
                <h3 className="font-bold text-secondary mb-4">{t("results")}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {locale === "fr" ? project.resultsFr : project.resultsEn}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
