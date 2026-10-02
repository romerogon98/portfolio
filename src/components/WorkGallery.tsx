"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type WorkGalleryItem = {
  href: string;
  title: string;
  subtitle: string;
  img?: string;
  tint?: string;
};

const STAGGER = [0, 7, 2, 9, 4]; // vh vertical offset per card, meech-style

// Items are built on the server (see app/(site)/page.tsx) so the NDA case
// content never ships in this client bundle — only the card fields do.
export default function WorkGallery({ items }: { items: WorkGalleryItem[] }) {
  const scope = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const t = track.current;
      const sec = scope.current;
      if (!t || !sec) return;

      const distance = () => Math.max(0, t.scrollWidth - window.innerWidth);

      // The tall section provides the scroll length; the inner is sticky-pinned
      // via CSS, and the track slides horizontally as we scroll through it.
      const sizeSection = () => {
        sec.style.height = window.innerHeight + distance() + "px";
      };
      sizeSection();

      gsap.to(t, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      const onResize = () => {
        sizeSection();
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);
      ScrollTrigger.refresh();

      return () => window.removeEventListener("resize", onResize);
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} id="work" className="relative bg-black">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div
          ref={track}
          className="flex w-max items-center gap-6 pl-6 pr-[12vw] sm:gap-8 sm:pl-10"
        >
          {/* Intro panel */}
          <div className="mr-4 shrink-0">
            <span className="font-mono text-xs uppercase tracking-widest text-white/40">
              (Selected work)
            </span>
            <h2 className="mt-3 text-[clamp(2.5rem,6vw,5rem)] font-normal leading-[0.95] tracking-[-0.04em] text-white">
              Selected
              <br />
              <em className="not-italic text-accent-600">work</em>
            </h2>
            <p className="mt-4 max-w-[16rem] text-sm text-white/50">
              Scroll to explore — click any project to open the case study.
            </p>
          </div>

          {items.map((c, i) => (
            <TransitionLink
              key={c.href}
              href={c.href}
              className="group relative aspect-square w-[clamp(18rem,34vw,28rem)] shrink-0 overflow-hidden rounded-2xl border border-white/10"
              style={{ marginTop: `${STAGGER[i % STAGGER.length]}vh` }}
            >
              {c.img ? (
                <Image
                  src={c.img}
                  alt={c.title}
                  fill
                  sizes="(max-width: 640px) 70vw, 34vw"
                  quality={90}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${c.tint ?? "from-accent-500 to-accent-950"}`}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-3xl font-medium tracking-[-0.02em] text-white">
                  {c.title}
                </h3>
                <p className="mt-1 text-sm font-medium tracking-[-0.01em] text-white/60">
                  {c.subtitle}
                </p>
              </div>
            </TransitionLink>
          ))}

        </div>
      </div>
    </section>
  );
}
