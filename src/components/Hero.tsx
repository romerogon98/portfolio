"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Segment = { text: string; serif?: boolean };

// Each line is a list of segments; serif segments render in Instrument Serif italic.
const HEADLINE: Segment[][] = [
  [{ text: "Digital " }, { text: "products,", serif: true }],
  [{ text: "designed with" }],
  [{ text: "intention", serif: true }, { text: "." }],
];

export default function Hero() {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(".hero-line > span", {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.08,
        })
        .from(".hero-meta", { autoAlpha: 0, y: 16, duration: 0.8 }, "-=0.5")
        .from(".hero-scroll", { autoAlpha: 0, duration: 0.6 }, "-=0.4");
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={scope}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-black px-6 pb-10 pt-32 text-white sm:px-10"
    >
      <h1 className="max-w-5xl font-normal tracking-[-0.06em]">
        {HEADLINE.map((line, i) => (
          <span
            key={i}
            className="hero-line block overflow-hidden text-[13.5vw] leading-[1.05] sm:text-[clamp(3rem,8.5vw,7rem)]"
          >
            <span className="block">
              {line.map((seg, j) =>
                seg.serif ? (
                  <em key={j} className="font-serif italic">
                    {seg.text}
                  </em>
                ) : (
                  <span key={j}>{seg.text}</span>
                )
              )}
            </span>
          </span>
        ))}
      </h1>

      <div className="hero-meta flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-sm text-base font-medium leading-snug tracking-[-0.02em] text-white/60">
          UX/UI Designer &amp; No-Code Developer based in Germany, working with
          teams worldwide on web and product design.
        </p>
        <div className="hero-scroll flex items-center gap-2 text-xs uppercase tracking-widest text-white/40">
          <span className="h-8 w-px bg-white/30" />
          Scroll
        </div>
      </div>
    </section>
  );
}
