// Site locales. English is the source/default; every other locale falls back
// to it (see i18n/request.ts and content/i18n.ts), so translations can be filled
// in incrementally without ever breaking the site. Add a locale here + a
// messages/<code>.json file to enable it everywhere.
export const locales = ["en", "es", "de"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

// next-intl's conventional cookie name; the LocaleSwitcher writes it and
// i18n/request.ts reads it on the server.
export const LOCALE_COOKIE = "NEXT_LOCALE";

// Short labels for the nav switcher.
export const localeNames: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  de: "DE",
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}
