"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import DecodeText from "@/components/DecodeText";

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/romero-gonzalo" },
  { label: "Gmail", href: "mailto:romerogon98@gmail.com" },
  { label: "Instagram", href: "https://www.instagram.com/gonromero.jpg/" },
];

// Kinetic-type hero: three oversized word-marquees scrolling in alternating
// directions, with the B&W portrait centered on top. All lines share the same
// linear speed (duration scales with text length) and ease-slow on hover.
const SECONDS_PER_CHAR = 2;
const LINES = [
  { text: "NO-CODE DEVELOPER", dir: "right" },
  { text: "UX/UI DESIGNER", dir: "left" },
  { text: "CREATIVE", dir: "right" },
] as const;

function useBerlinTime() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () =>
      setT(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Europe/Berlin",
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function MarqueeLine({ text, dir }: { text: string; dir: "left" | "right" }) {
  const cls = dir === "right" ? "kinetic-rev" : "kinetic";
  const dur = `${text.length * SECONDS_PER_CHAR}s`;
  const Group = () => (
    <span className="flex shrink-0">
      {[0, 1].map((i) => (
        <span
          key={i}
          className="whitespace-nowrap px-[0.14em] text-[13vw] font-bold uppercase leading-[0.92] tracking-[-0.02em]"
        >
          {text}
        </span>
      ))}
    </span>
  );
  return (
    <div className="hero-line flex overflow-hidden" aria-hidden>
      <div
        className={`${cls} flex w-max`}
        style={{ "--dur": dur } as React.CSSProperties}
      >
        <Group />
        <Group />
      </div>
    </div>
  );
}

export default function Hero() {
  const scope = useRef<HTMLElement>(null);
  const marquees = useRef<HTMLDivElement>(null);
  const time = useBerlinTime();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Order: photo first, then the text lines cascade in left → right → left,
      // then the bottom bar.
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-photo", { autoAlpha: 0, scale: 0.9, duration: 1.1 })
        .from(
          ".hero-line",
          {
            autoAlpha: 0,
            xPercent: (i: number) => (i % 2 === 0 ? -14 : 14),
            duration: 0.9,
            stagger: 0.16,
            ease: "power4.out",
          },
          "-=0.5"
        )
        .from(".hero-bar", { autoAlpha: 0, y: 16, duration: 0.7 }, "-=0.25");
    }, scope);
    return () => ctx.revert();
  }, []);

  // Smoothly ease the marquee speed down on hover (Web Animations API keeps the
  // scroll position continuous instead of jumping the way a CSS duration swap
  // would).
  const setRate = (rate: number) => {
    marquees.current
      ?.getAnimations({ subtree: true })
      .forEach((a) => a.updatePlaybackRate?.(rate));
  };

  return (
    <section
      ref={scope}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-black text-white"
    >
      <h1 className="sr-only">
        Gonzalo Romero — No-code developer, UX/UI designer, creative.
      </h1>

      <div
        ref={marquees}
        onMouseEnter={() => setRate(0.35)}
        onMouseLeave={() => setRate(1)}
        className="relative z-10 flex select-none flex-col gap-[0.4vw] py-24"
        aria-hidden
      >
        {LINES.map((l) => (
          <MarqueeLine key={l.text} text={l.text} dir={l.dir} />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
        <div className="hero-photo relative h-[46vh] w-[clamp(230px,32vw,440px)] overflow-hidden rounded-lg shadow-2xl shadow-black/50 ring-1 ring-white/10">
          <Image
            src="/hero/portrait-bw.webp"
            alt="Gonzalo Romero"
            fill
            sizes="(max-width: 768px) 60vw, 32vw"
            priority
            className="object-cover grayscale"
          />
        </div>
      </div>

      <div className="hero-bar absolute inset-x-0 bottom-0 z-30 flex items-center justify-between px-6 py-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/70 sm:px-10">
        <span>
          Based in Germany ·{" "}
          <span className="tabular-nums text-white/90">{time}</span>
        </span>
        <span className="flex items-center gap-4">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="transition-colors hover:text-white"
            >
              <DecodeText text={s.label} scrambleClassName="text-accent-500" />
            </a>
          ))}
        </span>
      </div>
    </section>
  );
}
