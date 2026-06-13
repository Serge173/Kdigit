import Image from "next/image";
import NextLink from "next/link";
import { Link as I18nLink } from "@/i18n/routing";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "header" | "footer" | "admin";
  href?: string;
  className?: string;
  priority?: boolean;
  /** Use next/link instead of i18n Link (required outside [locale], e.g. admin) */
  nativeLink?: boolean;
}

const sizes = {
  header: "h-10 sm:h-11 lg:h-12 w-auto",
  footer: "h-12 sm:h-14 w-auto",
  admin: "h-9 w-auto",
};

export function Logo({
  variant = "header",
  href = "/",
  className,
  priority = variant === "header",
  nativeLink = variant === "admin",
}: LogoProps) {
  const Link = nativeLink ? NextLink : I18nLink;

  return (
    <Link href={href} className={cn("inline-flex items-center shrink-0 group", className)}>
      <Image
        src={SITE.logo}
        alt={`${SITE.name} — Innovation digitale`}
        width={320}
        height={120}
        priority={priority}
        className={cn(
          sizes[variant],
          "rounded-2xl object-contain object-left transition-opacity group-hover:opacity-90"
        )}
      />
    </Link>
  );
}
