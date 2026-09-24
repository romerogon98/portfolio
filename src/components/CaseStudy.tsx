"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OriginButton } from "@/components/ui/OriginButton";
import TransitionLink from "@/components/TransitionLink";
import MosaicHero from "@/components/MosaicHero";
import CaseMediaGrid, { CaseGallery } from "@/components/CaseMediaGrid";
import { navigateWithTransition } from "@/components/PageTransition";
import { getLenis } from "@/components/SmoothScroll";
import type { CaseStudy as CaseStudyData } from "@/content/work/types";

gsap.registerPlugin(ScrollTrigger);

export type CaseRef = {
  href: string;
  title: string;
  subtitle: string;
  heroImage?: string;
  tint?: string;
};

export default function CaseStudy({
  data,
  next,
}: {
  data: CaseStudyData;
  next?: CaseRef | null;
}) {
  const scope = useRef<HTMLDivElement>(null);
  const heroSentinel = useRef<HTMLDivElement>(null);
  const [showBar, setShowBar] = useState(false);
  const [nextProgress, setNextProgress] = useState(0);
  // Mobile accordion — sections start collapsed; desktop always shows them.
  const [openSections, setOpenSections] = useState<Set<number>>(
    () => new Set()
  );
  const toggleSection = (idx: number) =>
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  const advancing = useRef(false);
  const overscroll = useRef(0);

  // Reveal the sticky bottom bar once the hero (and its live button) is gone.
  useEffect(() => {
    const el = heroSentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(
      // Only when the sentinel has scrolled ABOVE the viewport — a sentinel
      // still below the fold (short viewports at load) must not trigger it.
      ([entry]) =>
        setShowBar(!entry.isIntersecting && entry.boundingClientRect.top <= 0),
      { rootMargin: "-80px 0px 0px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Opening/closing a section changes page height — re-measure scroll-driven
  // reveals and the smooth scroller so nothing stays stuck hidden.
  useEffect(() => {
    ScrollTrigger.refresh();
    getLenis()?.resize();
  }, [openSections]);

  const backToTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Litebox-style auto-advance: once pinned at the very bottom, extra downward
  // scroll fills a progress bar and then slides to the next case via the curtain
  // transition. Scrolling back up drains it. Only armed when a next case exists.
  useEffect(() => {
    if (!next) return;
    const THRESHOLD = 800; // px of overscroll past the bottom to trigger the jump
    const atBottom = () =>
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2;

    const bump = (delta: number) => {
      if (advancing.current) return;
      // Downward deltas only count once we're pinned at the end; upward deltas
      // always drain the accumulator back toward zero.
      if (delta > 0 && !atBottom()) return;
      overscroll.current = Math.min(
        THRESHOLD,
        Math.max(0, overscroll.current + delta)
      );
      const p = overscroll.current / THRESHOLD;
      setNextProgress(p);
      if (p >= 1) {
        advancing.current = true;
        navigateWithTransition(next.href);
      }
    };

    let touchY = 0;
    const onWheel = (e: WheelEvent) => bump(e.deltaY);
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? touchY;
      bump(touchY - y); // dragging the finger up scrolls the page down
      touchY = y;
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [next]);

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
    labelSm: light ? "sm:text-neutral-400" : "sm:text-white/40",
    intro: light ? "text-neutral-800" : "text-white/90",
    context: light ? "text-neutral-500" : "text-white/60",
    body: light ? "text-neutral-700" : "text-white/80",
    bullet: light ? "bg-neutral-400" : "bg-white/40",
    frame: light ? "border-neutral-200" : "border-white/10",
    bar: light
      ? "border-neutral-200 bg-white/70 text-neutral-900"
      : "border-white/10 bg-black/50 text-white",
  };
  const monoLabel = `font-mono uppercase tracking-wider ${t.label}`;

  return (
    <div ref={scope} className={t.page}>
      <section className="relative isolate flex min-h-screen flex-col justify-end overflow-hidden px-6 pb-14 pt-32 sm:px-10">
        {data.heroVideo ? (
          <MosaicHero
            sources={data.heroVideo.sources}
            fallback={data.heroVideo.fallback}
            alt={data.title}
          />
        ) : data.heroImage ? (
          <>
            <Image
              src={data.heroImage}
              alt={data.title}
              fill
              priority
              quality={90}
              sizes="100vw"
              className={`absolute inset-0 -z-10 object-cover ${
                data.heroImageMobile ? "max-sm:hidden" : ""
              }`}
            />
            {data.heroImageMobile && (
              <Image
                src={data.heroImageMobile}
                alt={data.title}
                fill
                priority
                quality={90}
                sizes="100vw"
                className="absolute inset-0 -z-10 object-cover sm:hidden"
              />
            )}
          </>
        ) : (
          <div
            className={`absolute inset-0 -z-10 bg-gradient-to-br ${
              data.tint ?? "from-accent-500 to-accent-950"
            }`}
          />
        )}
        <div
          className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t ${
            data.heroVideo ? "from-black via-black/40 via-30% to-transparent" : t.heroScrim
          }`}
        />

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
            <dt className={`text-[11px] ${monoLabel}`}>Year</dt>
            <dd className="mt-1">{data.year}</dd>
          </div>
          <div>
            <dt className={`text-[11px] ${monoLabel}`}>Client</dt>
            <dd className="mt-1">{data.client}</dd>
          </div>
          <div>
            <dt className={`text-[11px] ${monoLabel}`}>Role</dt>
            <dd className="mt-1">{data.role}</dd>
          </div>
          <div>
            <dt className={`text-[11px] ${monoLabel}`}>Duration</dt>
            <dd className="mt-1">{data.duration}</dd>
          </div>
        </dl>
      </section>

      {/* Sentinel — once this scrolls above the fold, the sticky bar appears. */}
      <div ref={heroSentinel} aria-hidden className="h-0" />

      <section className="mx-auto max-w-5xl px-6 py-24 sm:px-10">
        <p className={`cs-reveal text-2xl leading-relaxed sm:text-3xl ${t.intro}`}>
          {data.intro}
        </p>
        {data.context && (
          <p className={`cs-reveal mt-8 text-lg leading-relaxed ${t.context}`}>
            {data.context}
          </p>
        )}
      </section>

      {data.sections.map((section, idx) => {
        const open = openSections.has(idx);
        const hasMedia = !!section.media?.length;
        const panelId = `case-section-${idx}`;
        return (
          // On mobile each section collapses into a tappable row, so the page
          // reads as an index instead of one long scroll. Desktop is unchanged.
          <div
            key={section.heading}
            className={`max-sm:border-b ${t.rule} ${idx === 0 ? "max-sm:border-t" : ""}`}
          >
            <section className="mx-auto max-w-5xl px-6 sm:px-10 sm:pb-24">
              <h2 className="cs-reveal">
                <button
                  type="button"
                  onClick={() => toggleSection(idx)}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className={`flex w-full items-center justify-between gap-4 text-left max-sm:py-6 max-sm:text-[1.75rem] max-sm:font-normal max-sm:leading-none max-sm:tracking-[-0.03em] sm:pointer-events-none sm:font-mono sm:text-xs sm:font-semibold sm:uppercase sm:tracking-widest ${t.labelSm}`}
                >
                  {section.heading}
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                    className={`shrink-0 transition-transform duration-300 sm:hidden ${
                      open ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </h2>

              <div
                id={panelId}
                className={open ? (hasMedia ? "" : "max-sm:pb-10") : "max-sm:hidden"}
              >
                {section.body?.map((paragraph, i) => (
                  <p
                    key={i}
                    className={`cs-reveal mt-6 text-lg leading-relaxed max-sm:first:mt-0 ${t.body}`}
                  >
                    {paragraph}
                  </p>
                ))}

                {section.list && (
                  <ul className="cs-reveal mt-6 space-y-3 max-sm:first:mt-0">
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
              </div>
            </section>
            {hasMedia && (
              <div
                className={`mx-auto max-w-5xl px-6 pb-10 sm:-mt-14 sm:px-10 sm:pb-24 ${
                  open ? "" : "max-sm:hidden"
                }`}
              >
                <CaseMediaGrid items={section.media!} title={data.title} />
              </div>
            )}
          </div>
        );
      })}

      {data.gallery && data.gallery.length > 0 && (
        <section className="pb-28 max-sm:pt-16">
          <div className="mx-auto max-w-5xl px-6 sm:px-10">
            <h2
              className={`cs-reveal max-sm:text-[1.75rem] max-sm:leading-none max-sm:tracking-[-0.03em] sm:font-mono sm:text-xs sm:font-semibold sm:uppercase sm:tracking-widest ${t.labelSm}`}
            >
              Gallery
            </h2>
          </div>
          <div className="mt-6">
            <CaseGallery items={data.gallery} title={data.title} label={t.label} />
          </div>
        </section>
      )}

      {next && (
        <TransitionLink
          href={next.href}
          className={`group relative block border-t ${t.frame}`}
        >
          {/* Overscroll progress — fills as you keep scrolling past the bottom. */}
          <span
            aria-hidden
            className="absolute left-0 top-0 h-0.5 bg-accent-500"
            style={{ width: `${nextProgress * 100}%` }}
          />
          <section className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-20 sm:flex-row sm:items-center sm:justify-between sm:px-10">
            <div>
              <span className={`text-xs ${monoLabel}`}>(Next case)</span>
              <h2 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-normal leading-[1.02] tracking-[-0.04em]">
                {next.title}
              </h2>
              <p className={`mt-2 max-w-md ${t.subtitle}`}>{next.subtitle}</p>
              <span
                aria-hidden
                className={`mt-5 inline-flex items-center gap-1.5 text-[11px] ${monoLabel}`}
              >
                Keep scrolling
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 10l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
            <div
              className={`relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-lg border sm:w-64 ${t.frame}`}
            >
              {next.heroImage ? (
                <Image
                  src={next.heroImage}
                  alt={next.title}
                  fill
                  sizes="256px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    next.tint ?? "from-accent-500 to-accent-950"
                  }`}
                />
              )}
            </div>
          </section>
        </TransitionLink>
      )}

      {/* Sticky bottom bar — appears once the hero live button is out of view. */}
      <div
        className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 transition-all duration-300 print:hidden ${
          showBar ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div
          className={`flex items-center gap-2 rounded-full border p-2 backdrop-blur-xl ${t.bar} ${
            showBar ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <button
            type="button"
            onClick={backToTop}
            aria-label="Back to top"
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              light ? "hover:bg-black/5" : "hover:bg-white/10"
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M6 14l6-6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {data.liveUrl && (
            <a
              href={data.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex h-10 items-center gap-2 rounded-full px-5 text-sm font-medium ${
                light ? "bg-neutral-900 text-white" : "bg-white text-black"
              }`}
            >
              Visit live site
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M7 17L17 7M17 7H8M17 7v9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
