import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ServiceCategoryContent } from "@/components/pages/ServiceCategoryContent";
import { getServiceCategory } from "@/lib/data/services";

export default async function ServiceCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const category = getServiceCategory(slug);
  if (!category) notFound();

  return <ServiceCategoryContent category={category} />;
}
