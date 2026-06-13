import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { Methodology } from "@/components/sections/Methodology";
import { CTASection } from "@/components/sections/CTASection";
import { ContactForm } from "@/components/forms/ContactForm";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getFeaturedProjects } from "@/lib/data/projects";
import { getHeroSlides } from "@/lib/data/hero-slides";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [projects, heroSlides] = await Promise.all([
    getFeaturedProjects(),
    getHeroSlides(),
  ]);

  return (
    <>
      <Hero slides={heroSlides} />
      <Stats />
      <WhyChoose />
      <ServicesSection />
      <PortfolioSection projects={projects} />
      <Testimonials />
      <Methodology />
      <section className="py-20 lg:py-28 bg-muted">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={locale === "fr" ? "Contact rapide" : "Quick contact"}
            subtitle={
              locale === "fr"
                ? "Une question ? Envoyez-nous un message, nous vous répondons sous 24h."
                : "Have a question? Send us a message, we respond within 24h."
            }
          />
          <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
            <ContactForm />
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
