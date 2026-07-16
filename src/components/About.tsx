"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradientField from "@/components/GradientField";

gsap.registerPlugin(ScrollTrigger);

type Segment = { text: string; serif?: boolean };

const STATEMENT: Segment[][] = [
  [{ text: "As a designer &" }],
  [{ text: "no-code developer", serif: true }, { text: "," }],
  [{ text: "I build digital products" }],
  [{ text: "with usability, craft" }],
  [{ text: "and " }, { text: "emotion", serif: true }, { text: "." }],
];

export default function About() {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: { trigger: scope.current, start: "top 70%" },
          defaults: { ease: "power4.out" },
        })
        .from(".about-line > span", {
          yPercent: 115,
          duration: 1,
          stagger: 0.08,
        })
        .from(".about-visual", { autoAlpha: 0, scale: 0.94, duration: 1 }, "-=0.7")
        .from(".about-bio", { autoAlpha: 0, y: 24, duration: 0.8 }, "-=0.6");

      // Scroll-scrubbed reveal: the portrait scales down into its frame as the
      // section travels through the viewport (Luke Baffait style).
      gsap.fromTo(
        ".about-photo",
        { scale: 1.35, yPercent: -6 },
        {
          scale: 1,
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-visual",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={scope}
      id="about"
      className="relative overflow-hidden bg-black px-6 py-28 text-white sm:px-10 md:py-40"
    >
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <h2 className="max-w-xl font-normal tracking-[-0.04em]">
          {STATEMENT.map((line, i) => (
            <span
              key={i}
              className="about-line block overflow-hidden text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.12]"
            >
              <span className="block">
                {line.map((seg, j) =>
                  seg.serif ? (
                    <em key={j} className="font-serif italic text-accent-400">
                      {seg.text}
                    </em>
                  ) : (
                    <span key={j}>{seg.text}</span>
                  )
                )}
              </span>
            </span>
          ))}
        </h2>

        <div className="about-visual relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-black">
          <GradientField />
          <Image
            src="/about/portrait.jpg"
            alt="Gonzalo Romero"
            fill
            sizes="(max-width: 768px) 90vw, 40vw"
            className="about-photo object-cover mix-blend-luminosity"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      </div>

      <div className="about-bio mt-16 grid gap-6 border-t border-white/10 pt-8 md:grid-cols-2">
        <span className="text-sm uppercase tracking-widest text-white/40">
          (Info)
        </span>
        <p className="max-w-md text-lg leading-relaxed text-white/70">
          My name is Gonzalo. A multimedia designer with 5+ years of experience,
          focused on UX/UI since 2022. Now based in Germany, I design web and
          product experiences with usability, information architecture and
          scalable development in mind — bridging design and code to ship work
          that&apos;s creative but also practical and technically sound.
        </p>
      </div>
    </section>
  );
}
