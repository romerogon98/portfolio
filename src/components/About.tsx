"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StrokeLink from "@/components/StrokeLink";

gsap.registerPlugin(ScrollTrigger);

const SOUNDCLOUD_URL = "https://soundcloud.com/romerogon";
const LITEBOX_URL = "https://litebox.ai";
const SABOTAGE_URL = "https://www.instagram.com/sabotage.ba/";

export default function About() {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: { trigger: scope.current, start: "top 70%" },
          defaults: { ease: "power4.out" },
        })
        .from(".about-visual", { autoAlpha: 0, scale: 0.94, duration: 1 })
        .from(".about-line", { autoAlpha: 0, y: 30, duration: 1 }, "-=0.6")
        .from(".about-bio", { autoAlpha: 0, y: 24, duration: 0.8 }, "-=0.7");

      // Scroll-scrubbed reveal: the portrait settles into its frame as the
      // section travels through the viewport. Kept subtle so the zoom never
      // crops the top of the head.
      gsap.fromTo(
        ".about-photo",
        { scale: 1.06 },
        {
          scale: 1,
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
      <div className="grid items-center gap-12 md:grid-cols-[0.8fr_1.5fr] md:gap-16">
        {/* Portrait */}
        <div className="relative">
          <div className="about-visual relative aspect-[2/3] overflow-hidden rounded-3xl border border-white/10 bg-black">
            <Image
              src="/about/portrait.jpg"
              alt="Gonzalo Romero"
              fill
              sizes="(max-width: 768px) 90vw, 32vw"
              className="about-photo object-cover grayscale"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        </div>

        {/* Statement */}
        <div>
          <span className="text-sm uppercase tracking-widest text-white/40">
            (About)
          </span>
          <div className="about-line mt-5 flex gap-4">
            <span className="mt-[0.9em] hidden h-2.5 w-2.5 shrink-0 bg-accent-500 sm:block" />
            <h2 className="text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.03em]">
              I design and build digital products with usability, craft and{" "}
              <span className="text-white/90">emotion</span> — now shaping{" "}
              <em className="not-italic text-accent-500">AI-era</em>{" "}
              workflows as a hybrid designer &amp; developer.
            </h2>
          </div>

          <p className="about-bio mt-8 max-w-2xl text-[clamp(1.25rem,2.3vw,1.9rem)] leading-[1.25] tracking-[-0.02em] text-white/35 sm:pl-[calc(0.625rem+1rem)]">
            Currently designing &amp; building at{" "}
            <StrokeLink href={LITEBOX_URL} className="text-white">
              Litebox
            </StrokeLink>
            , and previously with <span className="text-white">Avans</span>,{" "}
            <span className="text-white">Sayes</span> and studios across Latin
            America.
          </p>

          <p className="about-bio mt-5 max-w-2xl text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed text-white/35 sm:pl-[calc(0.625rem+1rem)]">
            Outside of work I produce and play{" "}
            <span className="text-white/70">techno</span> — you can hear it on{" "}
            <StrokeLink href={SOUNDCLOUD_URL} className="text-white">
              SoundCloud
            </StrokeLink>{" "}
            — and I run{" "}
            <StrokeLink href={SABOTAGE_URL} className="text-white">
              @sabotage.ba
            </StrokeLink>
            , a clothing brand I design and shoot for.
          </p>
        </div>
      </div>
    </section>
  );
}
