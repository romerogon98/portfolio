"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CaseStudy as CaseStudyData } from "@/content/work/types";

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudy({ data }: { data: CaseStudyData }) {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cs-hero-title > span", {
        yPercent: 110,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });
      gsap.from(".cs-hero-meta", {
        autoAlpha: 0,
        y: 16,
        duration: 0.8,
        delay: 0.4,
        ease: "power4.out",
      });

      gsap.utils.toArray<HTMLElement>(".cs-reveal").forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={scope} className="bg-black text-white">
      <section className="relative isolate flex min-h-screen flex-col justify-end overflow-hidden px-6 pb-14 pt-32 sm:px-10">
        {data.heroImage ? (
          <Image
            src={data.heroImage}
            alt={data.title}
            fill
            priority
            quality={90}
            sizes="100vw"
            className="absolute inset-0 -z-10 object-cover"
          />
        ) : (
          <div
            className={`absolute inset-0 -z-10 bg-gradient-to-br ${
              data.tint ?? "from-accent-500 to-accent-950"
            }`}
          />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/70 to-black/20" />

        <h1 className="cs-hero-title max-w-4xl overflow-hidden">
          <span className="block text-[14vw] font-normal leading-[1.02] tracking-[-0.06em] sm:text-[clamp(3rem,7.5vw,7rem)]">
            {data.title}
          </span>
        </h1>
        <p className="mt-4 max-w-lg text-lg font-medium tracking-[-0.02em] text-white/70">
          {data.subtitle}
        </p>

        <dl className="cs-hero-meta mt-12 grid grid-cols-2 gap-6 border-t border-white/15 pt-6 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-white/40">Year</dt>
            <dd className="mt-1">{data.year}</dd>
          </div>
          <div>
            <dt className="text-white/40">Client</dt>
            <dd className="mt-1">{data.client}</dd>
          </div>
          <div>
            <dt className="text-white/40">Role</dt>
            <dd className="mt-1">{data.role}</dd>
          </div>
          <div>
            <dt className="text-white/40">Duration</dt>
            <dd className="mt-1">{data.duration}</dd>
          </div>
        </dl>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-24 sm:px-10">
        <p className="cs-reveal text-2xl leading-relaxed text-white/90 sm:text-3xl">
          {data.intro}
        </p>
        {data.context && (
          <p className="cs-reveal mt-8 text-lg leading-relaxed text-white/60">
            {data.context}
          </p>
        )}
      </section>

      {data.sections.map((section) => (
        <section key={section.heading} className="mx-auto max-w-3xl px-6 pb-24 sm:px-10">
          <h2 className="cs-reveal text-sm font-semibold uppercase tracking-widest text-white/40">
            {section.heading}
          </h2>

          {section.body?.map((paragraph) => (
            <p key={paragraph} className="cs-reveal mt-6 text-lg leading-relaxed text-white/80">
              {paragraph}
            </p>
          ))}

          {section.list && (
            <ul className="cs-reveal mt-6 space-y-3">
              {section.list.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-lg leading-relaxed text-white/80"
                >
                  <span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-white/40" />
                  {item}
                </li>
              ))}
            </ul>
          )}

          {section.closing && (
            <p className="cs-reveal mt-6 text-lg leading-relaxed text-white/80">
              {section.closing}
            </p>
          )}

          {section.image && (
            <div className="cs-reveal relative mt-10 aspect-[16/10] overflow-hidden rounded-sm">
              <Image
                src={section.image}
                alt={section.heading}
                fill
                quality={90}
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          )}
        </section>
      ))}

      {data.liveUrl && (
        <section className="border-t border-white/10 px-6 py-16 sm:px-10">
          <a
            href={data.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cs-reveal inline-flex items-center gap-2 text-lg font-medium underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
          >
            Visit live site ↗
          </a>
        </section>
      )}
    </div>
  );
}
