"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "@/components/SmoothScroll";

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
  const [open, setOpen] = useState<number | null>(null);
  const isOpen = open !== null;

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

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((i) => (i === null ? i : (i - 1 + POSTERS.length) % POSTERS.length)),
    []
  );
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % POSTERS.length)),
    []
  );

  // Freeze the page + wire keyboard nav while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      getLenis()?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close, prev, next]);

  return (
    <section
      ref={scope}
      id="haul"
      className="bg-black px-6 py-28 sm:px-10 md:py-36"
    >
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-white/40">
            (Haul)
          </span>
          <h2 className="mt-2 text-[clamp(2rem,5vw,4rem)] font-normal tracking-[-0.04em] text-white">
            Outside work{" "}
            <em className="not-italic text-accent-500">projects</em>
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-white/50">
          Freelance poster and flyer work trusted to me by major agencies and
          promoters — Skyline, Factory93 and other large-scale events across the
          techno scene.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {POSTERS.map((src, i) => (
          <button
            type="button"
            key={src}
            onClick={() => setOpen(i)}
            aria-label={`Open poster design ${i + 1}`}
            className="haul-card group relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
          >
            <Image
              src={`/haul/${src}`}
              alt={`Poster design ${i + 1}`}
              fill
              sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 22vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[150] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Blurred, dimmed backdrop — click to close */}
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-xl"
            />

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={open}
                className="relative z-10 flex max-h-[85vh] max-w-[90vw] items-center justify-center"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={`/haul/${POSTERS[open]}`}
                  alt={`Poster design ${open + 1}`}
                  width={1200}
                  height={1500}
                  quality={95}
                  sizes="90vw"
                  className="h-auto max-h-[85vh] w-auto max-w-[90vw] rounded-lg object-contain shadow-2xl"
                />
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <button
              type="button"
              aria-label="Previous"
              onClick={prev}
              className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black sm:left-8"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={next}
              className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black sm:right-8"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black sm:right-8 sm:top-8"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <span className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-sm tabular-nums text-white/60">
              {open + 1} / {POSTERS.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
