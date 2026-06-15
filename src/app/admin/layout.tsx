import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { SITE } from "@/lib/constants";
import { LOGO_PATH } from "@/lib/branding";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: `Administration | ${SITE.name}`,
  icons: {
    icon: [{ url: LOGO_PATH, type: "image/png" }],
    apple: [{ url: LOGO_PATH, type: "image/png" }],
    shortcut: LOGO_PATH,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
