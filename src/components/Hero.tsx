"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/romero-gonzalo" },
  { label: "Gmail", href: "mailto:romerogon98@gmail.com" },
  { label: "Instagram", href: "https://www.instagram.com/gonromero.jpg/" },
];

// Kinetic-type hero (Russell Numo style): three oversized word-marquees scrolling
// in alternating directions, with the B&W portrait centered on top. Dark, with a
// subtle red glow behind for brand warmth.
const LINES = [
  { text: "NO-CODE DEVELOPER", dir: "right", dur: "32s" },
  { text: "UX/UI DESIGNER", dir: "left", dur: "27s" },
  { text: "CREATIVE", dir: "right", dur: "36s" },
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

function MarqueeLine({
  text,
  dir,
  dur,
}: {
  text: string;
  dir: "left" | "right";
  dur: string;
}) {
  const cls = dir === "right" ? "kinetic-rev" : "kinetic";
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
  const time = useBerlinTime();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        autoAlpha: 0,
        y: 44,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
      });
      gsap.from(".hero-photo", {
        autoAlpha: 0,
        scale: 0.9,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.15,
      });
      gsap.from(".hero-bar", { autoAlpha: 0, y: 16, duration: 0.8, delay: 0.5 });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={scope}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-black text-white"
    >
      <h1 className="sr-only">
        Gonzalo Romero — No-code developer, UX/UI designer, creative.
      </h1>

      <div
        className="relative z-10 flex select-none flex-col gap-[0.4vw] py-24"
        aria-hidden
      >
        {LINES.map((l) => (
          <MarqueeLine key={l.text} text={l.text} dir={l.dir} dur={l.dur} />
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

      <div className="hero-bar absolute inset-x-0 bottom-0 z-30 flex items-center justify-between px-6 py-5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/70 sm:px-10">
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
              {s.label}
            </a>
          ))}
        </span>
      </div>
    </section>
  );
}
