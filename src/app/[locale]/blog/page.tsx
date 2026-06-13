import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { formatDate } from "@/lib/utils";
import { getBlogPosts } from "@/lib/data/projects";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const posts = await getBlogPosts();

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground">{t("noPosts")}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block rounded-2xl overflow-hidden bg-white border border-border card-hover"
                >
                  {post.coverImage && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={locale === "fr" ? post.titleFr : post.titleEn}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-bold text-secondary mt-3 group-hover:text-primary transition-colors">
                      {locale === "fr" ? post.titleFr : post.titleEn}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                      {locale === "fr" ? post.excerptFr : post.excerptEn}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {post.publishedAt && formatDate(post.publishedAt, locale === "fr" ? "fr-FR" : "en-US")}
                      </span>
                      <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold">
                        {t("readMore")} <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
