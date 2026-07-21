"use client";

import { useEffect, useState } from "react";
import GradientField from "@/components/GradientField";
import TransitionLink from "@/components/TransitionLink";

const EMAIL = "romerogon98@gmail.com";

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/romero-gonzalo" },
  { label: "Behance", href: "https://www.behance.net/romerogonzalo" },
  { label: "Instagram", href: "https://www.instagram.com/gonromero.jpg/" },
  { label: "SoundCloud", href: "https://soundcloud.com/romerogon" },
  { label: "Sabotage", href: "https://www.instagram.com/sabotage.ba/" },
  { label: "Vimeo", href: "https://vimeo.com/romerogon98" },
];

const MENU = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Private work", href: "/work/private" },
  { label: "CV", href: "/cv" },
];

function useBerlinTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Berlin",
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 1000 * 30);
    return () => clearInterval(id);
  }, []);
  return time;
}

// Reveal footer (Luke Baffait style): pinned full-screen at the bottom of the
// document (z-0) and uncovered as the page content (z-10) scrolls up over it.
// The scroll room + the #contact anchor live in the sibling spacer in page.tsx.
export default function Footer() {
  const time = useBerlinTime();

  return (
    <footer className="fixed inset-x-0 bottom-0 z-0 flex h-screen flex-col justify-between overflow-hidden bg-black px-6 pb-8 pt-28 text-white sm:px-10">
      <GradientField className="opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/40" />

      {/* Top — contact + columns */}
      <div className="relative z-10 flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xl">
          <span className="text-sm uppercase tracking-widest text-white/40">
            (Get in touch)
          </span>
          <a
            href={`mailto:${EMAIL}`}
            className="group mt-4 block w-fit text-[clamp(1.5rem,4vw,2.75rem)] font-normal tracking-[-0.03em] text-white/90 transition-colors hover:text-white"
          >
            {EMAIL}
            <span className="block h-px w-full origin-left scale-x-0 bg-accent-600 transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </a>
        </div>

        <div className="flex gap-12 sm:gap-16">
          <div className="flex flex-col gap-3">
            <span className="mb-1 text-xs uppercase tracking-widest text-white/30">
              Social
            </span>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-white"
              >
                {s.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="mb-1 text-xs uppercase tracking-widest text-white/30">
              Menu
            </span>
            {MENU.map((m) => {
              const cls =
                "text-base font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-white";
              // Page routes get the curtain transition; in-page anchors stay plain.
              return m.href.startsWith("/") ? (
                <TransitionLink key={m.label} href={m.href} className={cls}>
                  {m.label}
                </TransitionLink>
              ) : (
                <a key={m.label} href={m.href} className={cls}>
                  {m.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom — oversized wordmark + meta */}
      <div className="relative z-10">
        <h2 className="font-normal leading-[0.85] tracking-[-0.04em] text-[clamp(2.75rem,15vw,13rem)]">
          Gonzalo Romero<span className="text-accent-600">.</span>
        </h2>
        <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-5 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>Based in Germany · Available worldwide</span>
          <span className="tabular-nums">{time && `Berlin — ${time}`}</span>
          <span>© {new Date().getFullYear()} Gonzalo Romero</span>
        </div>
      </div>
    </footer>
  );
}
