import { readFile } from "node:fs/promises";
import path from "node:path";
import { getSiteUrl } from "@/lib/site-url";

export const LOGO_PATH = "/images/kdigit-logo.png";

const LOGO_FILE = path.join(process.cwd(), "public/images/kdigit-logo.png");

export async function getLogoDataUrl(): Promise<string> {
  const buffer = await readFile(LOGO_FILE);
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

export function getLogoUrl(): string {
  return `${getSiteUrl()}${LOGO_PATH}`;
}

export function emailHeaderHtml(): string {
  const logoUrl = getLogoUrl();
  return `
    <div style="text-align:center;padding:24px 0 20px;border-bottom:1px solid #e5e7eb;margin-bottom:24px;">
      <img src="${logoUrl}" alt="KDIGIT" width="240" style="max-width:100%;height:auto;display:inline-block;" />
    </div>
  `;
}
