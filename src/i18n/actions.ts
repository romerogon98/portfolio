"use server";

import { cookies } from "next/headers";
import { isLocale, LOCALE_COOKIE, type Locale } from "./config";

// Persist the chosen locale server-side. i18n/request.ts reads this cookie on
// the next render; the LocaleSwitcher calls router.refresh() to trigger it.
export async function setLocaleCookie(locale: Locale) {
  if (!isLocale(locale)) return;
  const store = await cookies();
  store.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
