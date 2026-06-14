import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { getAdminHeroSlides } from "@/lib/admin-data";

export default async function AdminSlidesPage() {
  const slides = await getAdminHeroSlides();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Slides Hero</h1>
          <p className="text-muted-foreground">Gérez le carrousel de la page d&apos;accueil</p>
        </div>
        <Link
          href="/admin/slides/nouveau"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-bg text-white font-semibold text-sm"
        >
          <Plus className="w-4 h-4" /> Ajouter un slide
        </Link>
      </div>

      {slides.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-border text-center text-muted-foreground">
          Aucun slide.{" "}
          <Link href="/admin/slides/nouveau" className="text-primary hover:underline">
            Créer le premier
          </Link>{" "}
          ou lancez <code className="bg-muted px-2 py-1 rounded">npm run db:seed</code>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {slides.map((slide) => (
            <div key={slide.id} className="bg-white rounded-2xl border border-border overflow-hidden card-hover">
              <div className="relative h-40">
                <Image src={slide.image} alt={slide.titleFr} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
                <span className="absolute top-3 left-3 text-xs font-medium bg-primary text-white px-2 py-1 rounded-full">
                  #{slide.order + 1}
                </span>
                <span className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-full ${slide.published ? "bg-accent text-white" : "bg-gray-200 text-gray-600"}`}>
                  {slide.published ? "Publié" : "Brouillon"}
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs text-primary font-medium mb-1">{slide.badgeFr}</p>
                <h3 className="font-bold text-secondary">
                  {slide.titleFr} <span className="text-primary">{slide.highlightFr}</span>
                </h3>
                <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{slide.subtitleFr}</p>
                <Link
                  href={`/admin/slides/${slide.id}`}
                  className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4 hover:underline"
                >
                  <Pencil className="w-4 h-4" /> Modifier
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
