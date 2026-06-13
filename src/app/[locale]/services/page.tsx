import { setRequestLocale } from "next-intl/server";
import { ServicesContent } from "@/components/pages/ServicesContent";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicesContent />;
}
