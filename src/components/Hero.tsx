"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import DecodeText from "@/components/DecodeText";
import VectorWordmark from "@/components/VectorWordmark";

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/romero-gonzalo" },
  { label: "Gmail", href: "mailto:romerogon98@gmail.com" },
  { label: "Instagram", href: "https://www.instagram.com/gonromero.jpg/" },
];

// Hero: the role lines render as a WebGL vector wordmark filling the
// background (selection marquee follows the pointer), with the B&W portrait
// centered on top.
const LINES = ["NO-CODE DEVELOPER", "UX/UI DESIGNER", "CREATIVE"];
// One word per row on narrow screens so the type stays large around the photo.
const COMPACT_LINES = ["NO-CODE", "DEVELOPER", "UX/UI", "DESIGNER", "CREATIVE"];

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

export default function Hero() {
  const scope = useRef<HTMLElement>(null);
  const time = useBerlinTime();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Order: photo first, then the wordmark fades up, then the bottom bar.
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-photo", { autoAlpha: 0, scale: 0.9, duration: 1.1 })
        .from(
          ".hero-wordmark",
          { autoAlpha: 0, scale: 1.04, duration: 1.2, ease: "power4.out" },
          "-=0.5"
        )
        .from(".hero-bar", { autoAlpha: 0, y: 16, duration: 0.7 }, "-=0.25");
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

      <VectorWordmark
        lines={LINES}
        compactLines={COMPACT_LINES}
        className="hero-wordmark absolute inset-0 z-10" />

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
