import { defaultLocale, type Locale } from "@/i18n/config";

// A content field that can hold either a single string (treated as English) or a
// per-locale map. English is required; other locales are optional and fall back
// to English when missing — so a new case study works the moment its English
// copy exists, and translations can be added field-by-field later.
//
//   title: "Dicaba"                          // English only (fine)
//   title: { en: "Dicaba", es: "Dicaba" }    // translated
//
// Resolve a field for the active locale with `localize(field, locale)`. Client
// components get the locale from `useLocale()`, server components from
// `getLocale()`.
export type Localized<T = string> =
  | T
  | ({ en: T } & Partial<Record<Locale, T>>);

function isLocaleMap<T>(value: Localized<T>): value is { en: T } & Partial<Record<Locale, T>> {
  return typeof value === "object" && value !== null && "en" in (value as object);
}

export function localize<T>(value: Localized<T>, locale: Locale): T {
  if (isLocaleMap(value)) {
    return (value[locale] ?? value[defaultLocale] ?? value.en) as T;
  }
  return value;
}
