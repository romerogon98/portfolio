import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import en from "../../messages/en.json";
import { defaultLocale, isLocale, LOCALE_COOKIE } from "./config";

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

// Deep-merge translated messages over the English base so any key that hasn't
// been translated yet transparently falls back to English. The site never shows
// a raw key while catalogs are filled in over time.
function deepMerge<T>(base: T, override: unknown): T {
  if (!isObject(base) || !isObject(override)) {
    return (override ?? base) as T;
  }
  const out: Record<string, unknown> = { ...base };
  for (const key of Object.keys(override)) {
    out[key] =
      key in base ? deepMerge(base[key], override[key]) : override[key];
  }
  return out as T;
}

// No i18n routing: the active locale comes from a cookie (set by LocaleSwitcher),
// defaulting to English. Reading the cookie makes rendering dynamic — the
// trade-off we chose over URL-prefixed locales.
export default getRequestConfig(async () => {
  const store = await cookies();
  const cookieValue = store.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(cookieValue) ? cookieValue : defaultLocale;

  const messages =
    locale === defaultLocale
      ? en
      : deepMerge(en, (await import(`../../messages/${locale}.json`)).default);

  return { locale, messages };
});
