const DEFAULT_SITE_URL = "https://kdigit-site.vercel.app";

/** Extrait une URL valide même si la variable d'env contient du texte parasite. */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_URL;

  const match = raw.match(/https?:\/\/[^\s\]"']+/i);
  if (match) {
    try {
      return new URL(match[0]).origin;
    } catch {
      /* ignore */
    }
  }

  try {
    return new URL(raw).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}
