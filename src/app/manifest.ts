import type { MetadataRoute } from "next";
import { SITE, COLORS } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — Solutions digitales`,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: COLORS.background,
    theme_color: COLORS.primary,
    lang: "fr",
    icons: [
      {
        src: SITE.logo,
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
