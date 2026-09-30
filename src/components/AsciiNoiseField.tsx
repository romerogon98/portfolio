"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { clsx } from "clsx";
import {
  AsciiNoiseEngine,
  resolveConfig,
  type AsciiNoiseConfig,
  type FrameStats,
  type Pointer,
  type PresetName,
  type RenderStage,
} from "@/lib/asciiNoise";

// Animated ASCII noise field. Fills its parent (give the parent a size), renders
// on a DPR-aware 2D canvas, pauses while offscreen, and honours
// prefers-reduced-motion by drawing a single still frame. Pointer tracking runs
// on the window, so the cursor effect works even under overlaid content.
//
//   <div className="relative h-[60vh]">
//     <AsciiNoiseField preset="ledger" config={{ hi: "#ff4d00" }} />
//   </div>

export type AsciiNoiseFieldProps = {
  /** Starting point; `config` is merged on top. */
  preset?: PresetName;
  config?: Partial<AsciiNoiseConfig>;
  /** Freeze time (the cursor effect still responds). */
  paused?: boolean;
  /** Leave the background clear so the page shows through. */
  transparent?: boolean;
  /** CSS font-family for the glyphs. Defaults to the site mono (JetBrains Mono). */
  fontFamily?: string;
  className?: string;
  /** Called about once a second with the grid size and frame rate. */
  onStats?: (stats: FrameStats & { fps: number }) => void;
  /** Draw an intermediate pipeline step instead of glyphs (for process shots). */
  stage?: RenderStage;
  /** Receives a function that renders the current frame to a PNG at `scale`× the element size. */
  snapshotRef?: RefObject<AsciiSnapshot | null>;
};

export type AsciiSnapshot = (scale?: number) => Promise<Blob | null>;

export default function AsciiNoiseField({
  preset,
  config,
  paused = false,
  transparent = false,
  fontFamily,
  className,
  onStats,
  snapshotRef,
  stage = "glyphs",
}: AsciiNoiseFieldProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Stringify so inline `config={{...}}` objects don't count as a change every render.
  const configKey = JSON.stringify(config ?? null);
  const resolved = useMemo(
    () => resolveConfig(preset, config),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [preset, configKey],
  );

  // The render loop reads the latest props through refs, so it never restarts.
  const live = useRef({ cfg: resolved, paused, transparent, fontFamily, onStats, stage, dirty: true });
  useEffect(() => {
    live.current = { cfg: resolved, paused, transparent, fontFamily, onStats, stage, dirty: true };
  }, [resolved, paused, transparent, fontFamily, onStats, stage]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const engine = new AsciiNoiseEngine();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0, height = 0;
    let visible = true;
    let raf = 0;
    let t = 0;
    let last = performance.now();
    let frame = 0;
    let frames = 0;
    let statsAt = last;
    let pointer: Pointer = null;

    const siteMono = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue("--font-jetbrains-mono").trim();
      return v ? `${v}, ui-monospace, monospace` : "ui-monospace, monospace";
    };
    const defaultFont = siteMono();

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      width = Math.max(1, r.width);
      height = Math.max(1, r.height);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      live.current.dirty = true;
    };

    const draw = () => {
      const L = live.current;
      const stats = engine.render(ctx, width, height, L.cfg, t, pointer, L.fontFamily ?? defaultFont, L.transparent, L.stage);
      L.dirty = false;
      return stats;
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const L = live.current;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const playing = !L.paused && !reduced.matches;
      if (playing) t += dt;
      frame++;
      const due = playing ? frame % Math.max(1, L.cfg.frameSkip) === 0 : L.dirty;
      if (!due) return;
      const stats = draw();
      frames++;
      if (L.onStats && now - statsAt > 1000) {
        L.onStats({ ...stats, fps: Math.round((frames * 1000) / (now - statsAt)) });
        frames = 0;
        statsAt = now;
      }
    };

    const start = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const R = live.current.cfg.radius;
      pointer = x > -R && y > -R && x < r.width + R && y < r.height + R ? { x, y } : null;
      live.current.dirty = true;
    };
    const onLeave = () => {
      pointer = null;
      live.current.dirty = true;
    };

    // Offscreen re-render at a fixed scale: crisp on any screen, never includes overlays.
    // The fade is always painted (not erased) so the PNG has a solid background.
    if (snapshotRef) {
      snapshotRef.current = (scale = 2) => {
        const L = live.current;
        const off = document.createElement("canvas");
        off.width = Math.round(width * scale);
        off.height = Math.round(height * scale);
        const octx = off.getContext("2d");
        if (!octx) return Promise.resolve(null);
        octx.setTransform(scale, 0, 0, scale, 0, 0);
        new AsciiNoiseEngine().render(octx, width, height, L.cfg, t, pointer, L.fontFamily ?? defaultFont, L.transparent);
        return new Promise((resolve) => off.toBlob(resolve, "image/png"));
      };
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(wrap);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    if (visible) start();
    // Glyph metrics change once the webfont lands — repaint even while paused.
    document.fonts?.ready.then(() => {
      live.current.dirty = true;
    });

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (snapshotRef) snapshotRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrapRef} aria-hidden className={clsx("absolute inset-0 overflow-hidden", className)}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
