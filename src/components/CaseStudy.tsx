"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OriginButton } from "@/components/ui/OriginButton";
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

  // Light treatment for cases whose imagery is bright — dark type reads better
  // over it than the default white-on-black.
  const light = data.theme === "light";
  const t = {
    page: light ? "bg-white text-neutral-900" : "bg-black text-white",
    heroScrim: light
      ? "from-white via-white/75 to-white/25"
      : "from-black via-black/70 to-black/20",
    subtitle: light ? "text-neutral-500" : "text-white/70",
    rule: light ? "border-neutral-200" : "border-white/15",
    label: light ? "text-neutral-400" : "text-white/40",
    intro: light ? "text-neutral-800" : "text-white/90",
    context: light ? "text-neutral-500" : "text-white/60",
    body: light ? "text-neutral-700" : "text-white/80",
    bullet: light ? "bg-neutral-400" : "bg-white/40",
    frame: light ? "border-neutral-200" : "border-white/10",
  };

  return (
    <div ref={scope} className={t.page}>
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
        <div className={`absolute inset-0 -z-10 bg-gradient-to-t ${t.heroScrim}`} />

        <h1 className="cs-hero-title max-w-4xl overflow-hidden">
          <span className="block text-[14vw] font-normal leading-[1.02] tracking-[-0.06em] sm:text-[clamp(3rem,7.5vw,7rem)]">
            {data.title}
          </span>
        </h1>
        <p className={`mt-4 max-w-lg text-lg font-medium tracking-[-0.02em] ${t.subtitle}`}>
          {data.subtitle}
        </p>
        {data.liveUrl && (
          <OriginButton
            onClick={() => window.open(data.liveUrl, "_blank")}
            className="mt-6 self-start"
          >
            Visit live site
          </OriginButton>
        )}

        <dl
          className={`cs-hero-meta mt-12 grid grid-cols-2 gap-6 border-t pt-6 text-sm sm:grid-cols-4 ${t.rule}`}
        >
          <div>
            <dt className={t.label}>Year</dt>
            <dd className="mt-1">{data.year}</dd>
          </div>
          <div>
            <dt className={t.label}>Client</dt>
            <dd className="mt-1">{data.client}</dd>
          </div>
          <div>
            <dt className={t.label}>Role</dt>
            <dd className="mt-1">{data.role}</dd>
          </div>
          <div>
            <dt className={t.label}>Duration</dt>
            <dd className="mt-1">{data.duration}</dd>
          </div>
        </dl>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-24 sm:px-10">
        <p className={`cs-reveal text-2xl leading-relaxed sm:text-3xl ${t.intro}`}>
          {data.intro}
        </p>
        {data.context && (
          <p className={`cs-reveal mt-8 text-lg leading-relaxed ${t.context}`}>
            {data.context}
          </p>
        )}
      </section>

      {data.sections.map((section) => (
        <section key={section.heading} className="mx-auto max-w-3xl px-6 pb-24 sm:px-10">
          <h2
            className={`cs-reveal text-sm font-semibold uppercase tracking-widest ${t.label}`}
          >
            {section.heading}
          </h2>

          {section.body?.map((paragraph, i) => (
            <p key={i} className={`cs-reveal mt-6 text-lg leading-relaxed ${t.body}`}>
              {paragraph}
            </p>
          ))}

          {section.list && (
            <ul className="cs-reveal mt-6 space-y-3">
              {section.list.map((item, i) => (
                <li
                  key={i}
                  className={`flex gap-3 text-lg leading-relaxed ${t.body}`}
                >
                  <span
                    className={`mt-3 h-1 w-1 shrink-0 rounded-full ${t.bullet}`}
                  />
                  {item}
                </li>
              ))}
            </ul>
          )}

          {section.closing && (
            <p className={`cs-reveal mt-6 text-lg leading-relaxed ${t.body}`}>
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

      {data.gallery && data.gallery.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-28 sm:px-10">
          <h2
            className={`cs-reveal text-sm font-semibold uppercase tracking-widest ${t.label}`}
          >
            Gallery
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {data.gallery.map((src, i) => (
              <div
                key={src}
                className={`cs-reveal relative aspect-[4/3] overflow-hidden rounded-sm border ${t.frame}`}
              >
                <Image
                  src={src}
                  alt={`${data.title} — image ${i + 1}`}
                  fill
                  quality={90}
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
