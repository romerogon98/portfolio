"use client";

import { useEffect, useRef } from "react";
import { marqueeBox, marqueeZones, type MarqueeBox } from "@/lib/marquee";

// Site-wide selection marquee (the Vector Wordmark's box, lifted out of the
// canvas): marching ants, corner handles, a faint tint and x/y + size
// read-outs. It tracks the mouse at arrow size, snaps to any hovered link or
// button, and grows over registered reveal zones (the hero wordmark). It only
// shows while a mouse is over the page — no auto-sweep, nothing on touch.

const EASE = 10; // 1/s — exponential follow rate
// Box around SiteCursor's arrow: the glyph spans ~0..17 × 0..20 px from the
// tip, so centre on that plus padding.
const CURSOR_OFFSET = { x: 8.5, y: 10 };
const CURSOR_HALF = { hx: 15, hy: 17 };
const SNAP_PAD = { x: 8, y: 6 };
const HANDLE = 8;

export default function MarqueeCursor() {
  const boxRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<SVGRectElement>(null);
  const posRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ptr = { x: 0, y: 0 };
    let hasMouse = false;
    let snapEl: Element | null = null;

    const hitTest = () => {
      const el = document.elementFromPoint(ptr.x, ptr.y);
      snapEl = el?.closest("a, button") ?? null;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      hasMouse = true;
      ptr.x = e.clientX;
      ptr.y = e.clientY;
      snapEl = (e.target as Element | null)?.closest?.("a, button") ?? null;
    };
    // Content moves under a still pointer while scrolling.
    const onScroll = () => {
      if (hasMouse) hitTest();
    };
    const onLeave = (e: MouseEvent) => {
      if (!e.relatedTarget) hasMouse = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseout", onLeave);

    const inside = (el: Element, x: number, y: number) => {
      const r = el.getBoundingClientRect();
      return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    };

    let raf = 0;
    let last = 0;
    let ants = 0;

    const frame = (now: number) => {
      const dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
      last = now;

      let target: MarqueeBox | null = null;
      if (hasMouse) {
        if (snapEl && snapEl.isConnected) {
          const r = snapEl.getBoundingClientRect();
          target = {
            x: r.left + r.width / 2,
            y: r.top + r.height / 2,
            hx: r.width / 2 + SNAP_PAD.x,
            hy: r.height / 2 + SNAP_PAD.y,
          };
        } else {
          const zone = [...marqueeZones()].find((z) => inside(z.el, ptr.x, ptr.y));
          target = zone
            ? { x: ptr.x, y: ptr.y, ...zone.half() }
            : { x: ptr.x + CURSOR_OFFSET.x, y: ptr.y + CURSOR_OFFSET.y, ...CURSOR_HALF };
        }
      }

      const b = marqueeBox;
      const k = Math.min(1, EASE * dt);
      if (target) {
        // Appearing from hidden: place, don't glide in.
        if (b.opacity < 0.01) Object.assign(b, target);
        b.x += (target.x - b.x) * k;
        b.y += (target.y - b.y) * k;
        b.hx += (target.hx - b.hx) * k;
        b.hy += (target.hy - b.hy) * k;
      }
      b.opacity += ((target ? 1 : 0) - b.opacity) * Math.min(1, 12 * dt);
      if (!reduceMotion) ants = (ants + dt * 18) % 6;

      const box = boxRef.current;
      if (box) {
        box.style.opacity = b.opacity.toFixed(3);
        box.style.transform = `translate(${b.x - b.hx}px, ${b.y - b.hy}px)`;
        box.style.width = `${b.hx * 2}px`;
        box.style.height = `${b.hy * 2}px`;
      }
      rectRef.current?.setAttribute("stroke-dashoffset", String(-ants));
      if (posRef.current) {
        const pct = (v: number) => Math.round(Math.min(100, Math.max(0, v * 100)));
        posRef.current.textContent = `${pct(b.x / innerWidth)}, ${pct(1 - b.y / innerHeight)}`;
      }
      if (dimRef.current) {
        dimRef.current.textContent = `${Math.round(b.hx * 2)} × ${Math.round(b.hy * 2)}`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  const handle = "absolute bg-accent-500";
  const hs = { width: HANDLE, height: HANDLE };
  const off = -HANDLE / 2;
  const label =
    "absolute whitespace-nowrap font-mono text-[11px] tracking-[0.08em] text-accent-500 opacity-60";

  return (
    <div
      ref={boxRef}
      aria-hidden
      className="[.cursor-hidden_&]:invisible pointer-events-none fixed left-0 top-0 z-[199] bg-accent-500/10 opacity-0 print:hidden"
    >
      <svg className="absolute inset-0 h-full w-full overflow-visible">
        <rect
          ref={rectRef}
          x="0.5"
          y="0.5"
          width="100%"
          height="100%"
          fill="none"
          className="stroke-accent-500"
          strokeWidth="1"
          strokeDasharray="3 3"
          style={{ width: "calc(100% - 1px)", height: "calc(100% - 1px)" }}
        />
      </svg>
      <span className={handle} style={{ ...hs, left: off, top: off }} />
      <span className={handle} style={{ ...hs, right: off, top: off }} />
      <span className={handle} style={{ ...hs, left: off, bottom: off }} />
      <span className={handle} style={{ ...hs, right: off, bottom: off }} />
      <div ref={posRef} className={label} style={{ left: 0, bottom: "calc(100% + 6px)" }} />
      <div
        ref={dimRef}
        className={label}
        style={{ left: "50%", top: "calc(100% + 8px)", transform: "translateX(-50%)" }}
      />
    </div>
  );
}
