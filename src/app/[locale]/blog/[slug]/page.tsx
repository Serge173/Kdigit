import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowLeft, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { getBlogPostBySlug } from "@/lib/data/projects";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  const post = await getBlogPostBySlug(slug);
  if (!post || !post.published) notFound();

  const content = locale === "fr" ? post.contentFr : post.contentEn;

  return (
    <>
      <section className="pt-32 pb-12 hero-pattern">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Blog
          </Link>
          <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-md mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-secondary">
            {locale === "fr" ? post.titleFr : post.titleEn}
          </h1>
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {post.publishedAt && formatDate(post.publishedAt, locale === "fr" ? "fr-FR" : "en-US")}
            </span>
            <span>{post.authorName}</span>
          </div>
        </div>
      </section>

      <article className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {post.coverImage && (
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-10">
              <Image src={post.coverImage} alt="" fill className="object-cover" priority />
            </div>
          )}
          <div className="prose prose-lg max-w-none text-secondary/80 leading-relaxed whitespace-pre-line">
            {content}
          </div>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-border">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </>
  );
}
