"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const BAND_COUNT = 5;
const STEP_MS = 55;
const DURATION_MS = 450;
const SWEEP_MS = DURATION_MS + (BAND_COUNT - 1) * STEP_MS; // full stagger sweep
const SAFETY_MS = 6000; // never let the cover hang forever if a route stalls

type Phase = "idle" | "covering" | "revealing";

// Module-level handle so any link (including ones rendered from server
// components) can trigger the curtain without threading props through the
// tree — same pattern as SmoothScroll's getLenis().
let requestCover: ((href: string) => void) | null = null;
export function navigateWithTransition(href: string) {
  requestCover?.(href);
}

// Full-height vertical columns side by side, mounted once in the root layout
// so they survive route changes.
//   Cover:  columns rise up from below, staggered across the width, until black.
//   Reveal: columns keep rising up and off the top, uncovering the new page.
// The route is pushed only AFTER the cover sweep fully blacks out the screen,
// so the incoming page can never peek through half-raised columns. The reveal
// then fires once the new route has actually committed (pathname changed).
export default function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const target = useRef<string | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    requestCover = (href: string) => {
      if (href === pathname || target.current) return;
      target.current = href;
      setPhase("covering");
    };
    return () => {
      requestCover = null;
    };
  }, [pathname]);

  // Screen is fully covered — only now navigate, so nothing shows through the
  // rising columns. A safety uncovers if the route never commits.
  useEffect(() => {
    if (phase !== "covering") return;
    const nav = setTimeout(() => {
      if (target.current) router.push(target.current);
    }, SWEEP_MS + 40);
    const safety = setTimeout(() => {
      target.current = null;
      setPhase("revealing");
    }, SAFETY_MS);
    return () => {
      clearTimeout(nav);
      clearTimeout(safety);
    };
  }, [phase, router]);

  // New route committed under the cover — now uncover it.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (target.current && pathname === target.current) {
      target.current = null;
      setPhase("revealing");
    }
  }, [pathname]);

  // Reveal sweep finished — return to idle.
  useEffect(() => {
    if (phase !== "revealing") return;
    const t = setTimeout(() => setPhase("idle"), SWEEP_MS);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] flex flex-row"
      style={{ pointerEvents: phase === "idle" ? "none" : "auto" }}
    >
      {Array.from({ length: BAND_COUNT }).map((_, i) => {
        const y = phase === "covering" ? 0 : phase === "revealing" ? -100 : 100;
        // Cover: right column leads, columns rise up staggered right → left.
        // Reveal: left column leads, columns lift off staggered left → right.
        const delay =
          phase === "covering" ? (BAND_COUNT - 1 - i) * STEP_MS : i * STEP_MS;

        return (
          <div
            key={i}
            className="h-full flex-1 bg-black"
            style={{
              transform: `translateY(${y}%)`,
              transition:
                phase === "idle"
                  ? "none"
                  : `transform ${DURATION_MS}ms cubic-bezier(0.76,0,0.24,1) ${delay}ms`,
            }}
          />
        );
      })}
    </div>
  );
}
