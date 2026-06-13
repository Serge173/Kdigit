import { notFound } from "next/navigation";
import { HeroSlideForm } from "@/components/admin/HeroSlideForm";
import { getHeroSlideById } from "@/lib/data/hero-slides";

export default async function EditSlidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const slide = await getHeroSlideById(id);
  if (!slide) notFound();

  return (
    <HeroSlideForm
      slideId={id}
      initial={{
        badgeFr: slide.badgeFr,
        badgeEn: slide.badgeEn,
        titleFr: slide.titleFr,
        titleEn: slide.titleEn,
        highlightFr: slide.highlightFr,
        highlightEn: slide.highlightEn,
        subtitleFr: slide.subtitleFr,
        subtitleEn: slide.subtitleEn,
        slug: slide.slug,
        image: slide.image,
        ctaHref: slide.ctaHref,
        ctaSecondaryHref: slide.ctaSecondaryHref,
        order: slide.order,
        published: slide.published,
      }}
    />
  );
}
