"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setLocaleCookie } from "@/i18n/actions";
import { localeNames, locales, type Locale } from "@/i18n/config";

// Language switch (EN · ES · DE). No i18n routing, so it writes the locale
// cookie via a server action and refreshes — the server re-reads it and
// re-renders with the new messages. Inherits the nav's mono/uppercase type.
export default function LocaleSwitcher() {
  const active = useLocale() as Locale;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const select = (loc: Locale) => {
    if (loc === active) return;
    startTransition(async () => {
      await setLocaleCookie(loc);
      router.refresh();
    });
  };

  return (
    <div
      className={`flex items-center gap-2 tabular-nums transition-opacity ${
        isPending ? "opacity-40" : ""
      }`}
    >
      {locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => select(loc)}
          aria-current={loc === active ? "true" : undefined}
          className={
            loc === active
              ? "text-accent-500"
              : "opacity-50 transition-opacity hover:opacity-100"
          }
        >
          {localeNames[loc]}
        </button>
      ))}
    </div>
  );
}
