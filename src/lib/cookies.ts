export const COOKIE_CONSENT_KEY = "kdigit-cookie-consent";
export const COOKIE_CONSENT_COOKIE = "kdigit_cookie_consent";
const CONSENT_MAX_AGE_DAYS = 365;

export interface CookieConsentData {
  accepted: boolean;
  cookies: boolean;
  personalData: boolean;
  date: string;
  version: string;
}

export const CONSENT_VERSION = "1.0";

export function getCookieConsent(): CookieConsentData | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as CookieConsentData;
    return data?.accepted ? data : null;
  } catch {
    return null;
  }
}

export function hasCookieConsent(): boolean {
  return getCookieConsent() !== null;
}

export function acceptCookieConsent(): void {
  if (typeof window === "undefined") return;

  const data: CookieConsentData = {
    accepted: true,
    cookies: true,
    personalData: true,
    date: new Date().toISOString(),
    version: CONSENT_VERSION,
  };

  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(data));

  const maxAge = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60;
  document.cookie = `${COOKIE_CONSENT_COOKIE}=1; path=/; max-age=${maxAge}; SameSite=Lax`;
}
