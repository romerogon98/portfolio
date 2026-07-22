"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Real 3D cylinder (BS technique): cards sit at fixed angles around a parent
// that is itself rotated on Y. Only the parent's rotateY animates → seamless loop.
const TINTS = [
  "from-accent-500 to-accent-800",
  "from-rose-400 to-rose-600",
  "from-amber-300 to-amber-600",
  "from-emerald-400 to-emerald-700",
  "from-accent-400 to-accent-700",
  "from-neutral-600 to-neutral-900",
  "from-accent-600 to-accent-950",
  "from-sky-400 to-sky-700",
  "from-fuchsia-400 to-fuchsia-700",
  "from-accent-300 to-accent-600",
];

const COUNT = TINTS.length;
const STEP = 360 / COUNT; // deg between cards
// R = (cardWidth / 2) / tan(180 / COUNT) is the "just touching" radius.
// The 1.2 factor opens a gap between cards, like the reference.
const RADIUS_FACTOR = (0.5 / Math.tan(Math.PI / COUNT)) * 1.2;

export default function Gallery3D() {
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = carousel.current;
      if (!el) return;

      // Spin the whole cylinder. 360deg = one full, seamless loop.
      const spin = { v: 0 };
      gsap.to(spin, {
        v: -360,
        duration: 48,
        ease: "none",
        repeat: -1,
        onUpdate: () => el.style.setProperty("--spin", String(spin.v)),
      });
    }, carousel);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative flex w-full justify-center [perspective:2000px]">
      <div
        ref={carousel}
        className="relative [transform-style:preserve-3d]"
        style={
          {
            "--card-w": "clamp(14rem,22vw,20rem)",
            "--r": `calc(var(--card-w) * ${RADIUS_FACTOR})`,
            "--spin": 0,
            width: "var(--card-w)",
            height: "calc(var(--card-w) * 1.25)",
            transform:
              "translateZ(calc(var(--r) * -1)) rotateY(calc(var(--spin) * 1deg))",
          } as React.CSSProperties
        }
      >
        {TINTS.map((tint, i) => (
          <div
            key={i}
            className="absolute inset-0 [backface-visibility:hidden] [transform-style:preserve-3d]"
            style={{ transform: `rotateY(${i * STEP}deg) translateZ(var(--r))` }}
          >
            <div
              className={`h-full w-full rounded-3xl bg-gradient-to-br ${tint}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
