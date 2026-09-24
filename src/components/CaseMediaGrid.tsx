"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { CaseMedia } from "@/content/work/types";

type Media = Exclude<CaseMedia, string>;

const isVideo = (src: string) => /\.(webm|mp4)$/i.test(src);
const normalize = (item: CaseMedia): Media =>
  typeof item === "string" ? { src: item } : item;

// Loops only while on screen, and doesn't fetch until it gets close. The
// `muted` attribute is set by hand before play() — mobile browsers only allow
// autoplay for muted video, and React only sets the property, not the attribute.
function LazyVideo({
  src,
  poster,
  alt,
  className,
}: {
  src: string;
  poster?: string;
  alt: string;
  className: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.setAttribute("muted", "");
    const play = () => v.play().catch(() => {});
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!v.getAttribute("src")) {
            v.src = src;
            v.load();
          }
          play();
        } else {
          v.pause();
        }
      },
      { rootMargin: "200px" }
    );
    // Some mobile browsers reject the first play() until data arrives.
    v.addEventListener("canplay", play);
    io.observe(v);
    return () => {
      io.disconnect();
      v.removeEventListener("canplay", play);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      poster={poster}
      aria-label={alt}
      muted
      loop
      playsInline
      preload="none"
      draggable={false}
      className={className}
    />
  );
}

// Lottie animation over its still fallback; the player is only loaded once the
// tile gets near the viewport.
function LottieMedia({
  src,
  fallback,
  alt,
  className,
  sizes,
}: {
  src: string;
  fallback: string;
  alt: string;
  className: string;
  sizes: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let anim: { destroy: () => void } | null = null;
    let cancelled = false;
    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting || anim) return;
        io.disconnect();
        const [{ default: lottie }, data] = await Promise.all([
          import("lottie-web/build/player/lottie_light"),
          fetch(src).then((r) => r.json()),
        ]);
        if (cancelled) return;
        const a = lottie.loadAnimation({
          container: el,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: data,
          rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
        });
        a.addEventListener("DOMLoaded", () => setReady(true));
        anim = a;
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      anim?.destroy();
    };
  }, [src]);

  return (
    <div className="relative">
      <Image
        src={fallback}
        alt={alt}
        width={0}
        height={0}
        quality={90}
        sizes={sizes}
        draggable={false}
        className={className}
      />
      <div
        ref={box}
        aria-hidden
        className={`absolute inset-0 transition-opacity duration-500 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

function MediaItem({
  m,
  alt,
  className,
  sizes,
}: {
  m: Media;
  alt: string;
  className: string;
  sizes: string;
}) {
  if (m.lottie)
    return (
      <LottieMedia
        src={m.lottie}
        fallback={m.src}
        alt={alt}
        className={className}
        sizes={sizes}
      />
    );
  if (isVideo(m.src))
    return (
      <LazyVideo
        src={m.src}
        poster={m.poster}
        alt={alt}
        className={className}
      />
    );
  return (
    <Image
      src={m.src}
      alt={alt}
      width={0}
      height={0}
      quality={90}
      sizes={sizes}
      draggable={false}
      className={className}
    />
  );
}

export default function CaseMediaGrid({
  items,
  title,
  className = "mt-10",
}: {
  items: CaseMedia[];
  title: string;
  className?: string;
}) {
  return (
    <div className={`grid items-start gap-4 sm:grid-cols-2 ${className}`}>
      {items.map((item, i) => {
        const m = normalize(item);
        return (
          <div
            key={m.src}
            // Media renders at its natural aspect ratio — never cropped, and
            // no fixed-ratio box around it that could leave gaps.
            className={`cs-reveal overflow-hidden rounded-sm ${m.wide ? "sm:col-span-2" : ""}`}
          >
            <MediaItem
              m={m}
              alt={m.alt ?? `${title} — media ${i + 1}`}
              className="block h-auto w-full"
              sizes={
                m.wide
                  ? "(max-width: 1024px) 100vw, 1024px"
                  : "(max-width: 640px) 100vw, 512px"
              }
            />
          </div>
        );
      })}
    </div>
  );
}

// Horizontal, draggable strip. Touch scrolls natively; mouse drags the track.
// Every item shares one height and keeps its own width, so nothing is cropped.
export function CaseGallery({
  items,
  title,
  label,
}: {
  items: CaseMedia[];
  title: string;
  label: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let startX = 0;
    let startScroll = 0;
    let moved = false;
    let active = false;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      active = true;
      moved = false;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.style.scrollSnapType = "none";
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!active) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 4) {
        moved = true;
        setDragging(true);
      }
      el.scrollLeft = startScroll - dx;
    };
    const onUp = (e: PointerEvent) => {
      if (!active) return;
      active = false;
      el.style.scrollSnapType = "";
      if (el.hasPointerCapture(e.pointerId))
        el.releasePointerCapture(e.pointerId);
      setDragging(false);
    };
    // A drag that ends over a link or video shouldn't count as a click.
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("click", onClick, true);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("click", onClick, true);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="cs-reveal">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 sm:px-10">
        <span
          className={`font-mono text-[11px] uppercase tracking-wider ${label}`}
        >
          ({items.length}) Drag to explore →
        </span>
        <span className="relative h-px w-24 overflow-hidden bg-white/15">
          <span
            className="absolute inset-y-0 left-0 bg-accent-500"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </span>
      </div>
      <div
        ref={track}
        className={`mt-6 flex snap-x snap-proximity gap-4 overflow-x-auto overscroll-x-contain px-6 pb-2 [scrollbar-width:none] sm:px-[max(2.5rem,calc((100vw-64rem)/2+2.5rem))] [&::-webkit-scrollbar]:hidden ${
          dragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
      >
        {items.map((item, i) => {
          const m = normalize(item);
          return (
            <div
              key={m.src}
              className="h-[70vw] shrink-0 snap-start overflow-hidden rounded-sm sm:h-[min(60vh,520px)]"
            >
              <MediaItem
                m={m}
                alt={m.alt ?? `${title} — media ${i + 1}`}
                className="pointer-events-none block h-full w-auto max-w-none"
                sizes="(max-width: 640px) 140vw, 1040px"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
