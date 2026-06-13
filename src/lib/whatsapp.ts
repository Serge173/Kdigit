import { SITE } from "@/lib/constants";

const DEFAULT_MESSAGE =
  "Bonjour KDIGIT, je souhaite obtenir des informations sur vos services.";

export function getWhatsAppUrl(message = DEFAULT_MESSAGE) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
