"use client";

import { useEffect, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
// Arrow glyph size in px. The OriginKit default (56) is sized for a bounded
// showcase surface; a real page cursor wants something closer to a native one.
const SIZE = 26;
// The visible tip of the arrow sits at (5,3) inside the 28-unit viewBox, so we
// offset the box up-left by that amount to land the tip exactly on the pointer.
const TIP_X = (5 / 28) * SIZE;
const TIP_Y = (3 / 28) * SIZE;

function subscribeFinePointer(onChange: () => void) {
  const mq = window.matchMedia(FINE_POINTER);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

// Global cursor: the OriginKit "User Cursor" arrow (sans the trailing name
// pill) spring-tracking the pointer across the whole site, replacing the native
// cursor. Adapted to run at the window level (the original is scoped to a
// 200×200 host). mix-blend-difference keeps it legible over both the dark shell
// and the light work / CV sections. Fine pointers only — touch renders nothing.
export default function SiteCursor() {
  // false on the server, then synced from the media query on the client.
  const enabled = useSyncExternalStore(
    subscribeFinePointer,
    () => window.matchMedia(FINE_POINTER).matches,
    () => false
  );

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // OriginKit arrow spring — snappy follow.
  const springX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });
  // Springy press-scale feedback while a button is held.
  const scale = useSpring(1, { stiffness: 500, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("site-cursor-active");
    const move = (e: PointerEvent) => {
      x.set(e.clientX - TIP_X);
      y.set(e.clientY - TIP_Y);
    };
    const down = () => scale.set(0.92);
    const up = () => scale.set(1);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      root.classList.remove("site-cursor-active");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled, x, y, scale]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200] mix-blend-difference print:hidden"
      style={{
        x: springX,
        y: springY,
        scale,
        width: SIZE,
        height: SIZE,
        transformOrigin: "0% 0%",
      }}
    >
      <svg
        width={SIZE}
        height={SIZE}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", overflow: "visible" }}
      >
        <path d="M5 3 L23 14 L14 16 L11 24 Z" fill="#ffffff" />
      </svg>
    </motion.div>
  );
}
