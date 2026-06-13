"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/sections/CTASection";

interface Project {
  id: string;
  slug: string;
  clientName: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  coverImage: string;
  technologies: string[];
}

export function PortfolioContent({ projects }: { projects: Project[] }) {
  const t = useTranslations("portfolio");
  const locale = useLocale();

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/realisations/${project.slug}`}
                className="group block rounded-2xl overflow-hidden bg-white border border-border card-hover"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project.coverImage}
                    alt={locale === "fr" ? project.titleFr : project.titleEn}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 to-transparent" />
                  <span className="absolute bottom-4 left-4 text-white text-sm font-medium bg-primary px-3 py-1 rounded-full">
                    {project.clientName}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-secondary group-hover:text-primary transition-colors">
                    {locale === "fr" ? project.titleFr : project.titleEn}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                    {locale === "fr" ? project.descriptionFr : project.descriptionEn}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 rounded-md bg-accent/10 text-accent font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold mt-4">
                    {t("viewProject")} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
