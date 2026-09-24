"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";

// Video hero split into a grid of tiles. Each tile draws the same looping video
// through its own treatment (raw, halftone dots, pixel blocks, scan lines) and
// swaps treatment every few seconds; tiles near the pointer reveal the raw
// footage (or the touch point). Falls back to a still for reduced motion.

const ACCENT = [241, 94, 55]; // VU orange
const SAMPLES = 10; // luminance samples per tile edge
type Mode = "raw" | "dots" | "blocks" | "lines" | "dim";
const MODES: Mode[] = [
  "raw",
  "dots",
  "blocks",
  "lines",
  "dim",
  "dots",
  "blocks",
];

type Tile = { mode: Mode; next: number };

// Animate unless the visitor prefers reduced motion; re-evaluated live.
const QUERIES = ["(prefers-reduced-motion: reduce)"];
const canAnimate = () => QUERIES.every((q) => !window.matchMedia(q).matches);
const subscribeMotion = (cb: () => void) => {
  const lists = QUERIES.map((q) => window.matchMedia(q));
  lists.forEach((l) => l.addEventListener("change", cb));
  return () => lists.forEach((l) => l.removeEventListener("change", cb));
};

export default function MosaicHero({
  sources,
  fallback,
  alt,
}: {
  sources: string[];
  fallback: string;
  alt: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const animated = useSyncExternalStore(
    subscribeMotion,
    canAnimate,
    () => false
  );

  useEffect(() => {
    if (!animated) return;
    const el = wrap.current;
    const cv = canvas.current;
    const vid = video.current;
    if (!el || !cv || !vid) return;
    const ctx = cv.getContext("2d");
    const sampler = document.createElement("canvas");
    const sctx = sampler.getContext("2d", { willReadFrequently: true });
    if (!ctx || !sctx) return;

    let cols = 0;
    let rows = 0;
    let tile = 0;
    let tiles: Tile[] = [];
    let raf = 0;
    let visible = true;
    const pointer = { x: -1e4, y: -1e4 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const pick = (now: number): Tile => ({
      mode: MODES[Math.floor(Math.random() * MODES.length)],
      next: now + 1800 + Math.random() * 3200,
    });

    const resize = () => {
      const { width, height } = el.getBoundingClientRect();
      cv.width = Math.round(width * dpr);
      cv.height = Math.round(height * dpr);
      // Fewer, smaller tiles on phones so the mosaic still reads as a grid.
      tile =
        width < 640
          ? Math.round(width / 4)
          : Math.max(110, Math.round(width / 9));
      cols = Math.ceil(width / tile);
      rows = Math.ceil(height / tile);
      sampler.width = cols * SAMPLES;
      sampler.height = rows * SAMPLES;
      const now = performance.now();
      tiles = Array.from({ length: cols * rows }, () => pick(now));
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onLeave = () => {
      pointer.x = pointer.y = -1e4;
    };

    // Source rect that "covers" a w×h target with the video frame.
    const cover = (w: number, h: number) => {
      const vw = vid.videoWidth;
      const vh = vid.videoHeight;
      const scale = Math.max(w / vw, h / vh);
      const sw = w / scale;
      const sh = h / scale;
      return { sx: (vw - sw) / 2, sy: (vh - sh) / 2, scale };
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible || vid.readyState < 2) return;
      const W = cv.width / dpr;
      const H = cv.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, W, H);

      const { sx, sy, scale } = cover(cols * tile, rows * tile);
      const S = SAMPLES;
      sctx.drawImage(
        vid,
        sx,
        sy,
        (cols * tile) / scale,
        (rows * tile) / scale,
        0,
        0,
        sampler.width,
        sampler.height
      );
      const px = sctx.getImageData(0, 0, sampler.width, sampler.height).data;
      const lum = (i: number) =>
        (px[i] * 0.299 + px[i + 1] * 0.587 + px[i + 2] * 0.114) / 255;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const t = tiles[r * cols + c];
          if (now > t.next) Object.assign(t, pick(now));
          const x0 = c * tile;
          const y0 = r * tile;
          const near =
            Math.hypot(x0 + tile / 2 - pointer.x, y0 + tile / 2 - pointer.y) <
            tile * 1.1;
          const mode: Mode = near ? "raw" : t.mode;

          if (mode === "raw" || mode === "dim") {
            ctx.globalAlpha = mode === "dim" ? 0.35 : 1;
            ctx.drawImage(
              vid,
              sx + x0 / scale,
              sy + y0 / scale,
              tile / scale,
              tile / scale,
              x0,
              y0,
              tile,
              tile
            );
            ctx.globalAlpha = 1;
            continue;
          }

          const cell = tile / S;
          for (let j = 0; j < S; j++) {
            for (let i = 0; i < S; i++) {
              const idx = ((r * S + j) * sampler.width + (c * S + i)) * 4;
              const l = lum(idx);
              if (l < 0.12) continue;
              const x = x0 + i * cell;
              const y = y0 + j * cell;
              ctx.fillStyle = `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},${Math.min(1, l * 1.6)})`;
              if (mode === "dots") {
                ctx.beginPath();
                ctx.arc(
                  x + cell / 2,
                  y + cell / 2,
                  (cell / 2) * Math.min(1, l * 1.4),
                  0,
                  Math.PI * 2
                );
                ctx.fill();
              } else if (mode === "blocks") {
                if ((i + j) % 2 === 0 && l > 0.25)
                  ctx.fillRect(x + 1, y + 1, cell - 2, cell - 2);
              } else {
                ctx.fillRect(
                  x,
                  y + cell / 2 - 1,
                  cell * Math.min(1, l * 1.5),
                  2
                );
              }
            }
          }
        }
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) vid.play().catch(() => {});
      else vid.pause();
    });

    resize();
    io.observe(el);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    vid.play().catch(() => {});
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [animated]);

  return (
    <div ref={wrap} className="absolute inset-0 -z-10 bg-[#0a0a0a]">
      {animated ? (
        <>
          <video
            ref={video}
            muted
            loop
            playsInline
            preload="auto"
            className="hidden"
          >
            {sources.map((src) => (
              <source
                key={src}
                src={src}
                type={src.endsWith(".mp4") ? "video/mp4" : "video/webm"}
              />
            ))}
          </video>
          <canvas
            ref={canvas}
            aria-label={alt}
            role="img"
            className="block h-full w-full"
          />
        </>
      ) : (
        <Image
          src={fallback}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}
    </div>
  );
}
