import { MapPin, Navigation } from "lucide-react";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const MAP_EMBED_URL =
  "https://maps.google.com/maps?q=Cocody%2C+Abidjan%2C+C%C3%B4te+d%27Ivoire&z=14&output=embed";

export function ContactMapCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden border border-border bg-white shadow-sm flex flex-col h-full min-h-[420px]",
        className
      )}
    >
      <div className="relative flex-1 min-h-[320px]">
        <iframe
          title="KDIGIT — Cocody, Abidjan"
          src={MAP_EMBED_URL}
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className="p-5 border-t border-border bg-muted/40">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-secondary">{SITE.address}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-primary text-sm font-medium mt-2 hover:underline"
            >
              <Navigation className="w-4 h-4" />
              Ouvrir dans Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
