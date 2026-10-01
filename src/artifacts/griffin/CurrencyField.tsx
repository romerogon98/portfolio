"use client";

import { useEffect, useRef } from "react";

// ASCII currency field: a monospace grid of diagonal rails (/) where £ and $
// clusters form and dissolve, driven by a slow sum of sines. Canvas-drawn,
// paused off-screen, a single still frame under reduced motion.

const CELL_W = 9; // px per column
const CELL_H = 14; // px per row
const FPS = 14;

export default function CurrencyField({
  color = "#959089",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!host || !canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const family = getComputedStyle(host).fontFamily || "monospace";
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = host.offsetWidth;
      h = host.offsetHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Cheap smooth field in ~[-1, 1].
    const field = (x: number, y: number, t: number) =>
      (Math.sin(x * 0.09 + t * 0.7) +
        Math.sin(y * 0.23 - t * 0.5 + x * 0.03) +
        Math.sin((x + y) * 0.05 + t * 0.35) +
        Math.sin(x * 0.021 - y * 0.11 - t * 0.9)) /
      4;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.font = `12px ${family}`;
      ctx.textBaseline = "top";
      ctx.fillStyle = color;
      const cols = Math.ceil(w / CELL_W);
      const rows = Math.ceil(h / CELL_H);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const v = field(c, r, t);
          let ch: string;
          // A second, slower wave decides which currency a cluster is made of.
          if (v > 0.3) ch = Math.sin(c * 0.04 - r * 0.07 + t * 0.2) > 0 ? "£" : "$";
          else if (v > -0.2) ch = "/";
          else continue;
          ctx.globalAlpha = ch === "/" ? 0.22 : 0.45 + Math.min(0.55, (v - 0.3) * 2);
          ctx.fillText(ch, c * CELL_W, r * CELL_H);
        }
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0;
    let last = 0;
    let visible = true;
    const t0 = performance.now();

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (now - last < 1000 / FPS) return;
      last = now;
      draw((now - t0) / 1000);
    };
    const gate = () => {
      if (!reduceMotion && visible && !document.hidden) {
        if (!raf) raf = requestAnimationFrame(frame);
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const ro = new ResizeObserver(() => {
      resize();
      draw((performance.now() - t0) / 1000);
    });
    ro.observe(host);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      gate();
    });
    io.observe(host);
    document.addEventListener("visibilitychange", gate);
    gate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", gate);
    };
  }, [color]);

  return (
    <div ref={hostRef} aria-hidden className={`overflow-hidden font-mono ${className || "relative"}`}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
