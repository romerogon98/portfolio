"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// One-shot / random designs (posters, flyers) pulled from the Framer "haul".
// Files live in /public/haul — swap or extend freely.
const POSTERS = [
  "haul-01.png",
  "haul-02.jpg",
  "haul-03.jpg",
  "haul-04.png",
  "haul-05.png",
  "haul-06.png",
  "haul-07.png",
  "haul-08.png",
  "haul-09.jpg",
  "haul-10.png",
  "haul-11.png",
  "haul-12.png",
  "haul-13.png",
  "haul-14.jpg",
  "haul-15.jpg",
];

export default function Haul() {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".haul-card", {
        autoAlpha: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: { trigger: scope.current, start: "top 75%" },
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={scope}
      id="haul"
      className="bg-black px-6 py-28 sm:px-10 md:py-36"
    >
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-sm uppercase tracking-widest text-white/40">
            (Haul)
          </span>
          <h2 className="mt-2 text-[clamp(2rem,5vw,4rem)] font-normal tracking-[-0.04em] text-white">
            A selection of{" "}
            <em className="font-serif italic text-accent-500">other projects</em>
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-white/50">
          One-shot posters, flyers and random designs — the stuff made just for
          the craft.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {POSTERS.map((src, i) => (
          <div
            key={src}
            className="haul-card group relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
          >
            <Image
              src={`/haul/${src}`}
              alt={`Poster design ${i + 1}`}
              fill
              sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 22vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
