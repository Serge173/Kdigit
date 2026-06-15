import type { Metadata } from "next";
import { Poppins, Inter, Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/Toaster";
import { SITE } from "@/lib/constants";
import { LOGO_PATH } from "@/lib/branding";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  applicationName: SITE.name,
  icons: {
    icon: [{ url: LOGO_PATH, type: "image/png" }],
    apple: [{ url: LOGO_PATH, type: "image/png" }],
    shortcut: LOGO_PATH,
  },
};

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${poppins.variable} ${inter.variable} ${montserrat.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
