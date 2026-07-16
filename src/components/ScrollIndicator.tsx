"use client";

import { useEffect, useRef } from "react";

// Minimal hero scroll cue: a thin line with a travelling bead + "Scroll" label.
// Tied to scroll — it fades and drifts down as the page leaves the first viewport.
export default function ScrollIndicator() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const p = Math.min(1, window.scrollY / (window.innerHeight * 0.5));
      el.style.opacity = String(1 - p);
      el.style.transform = `translateY(${p * 16}px)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-3 text-white/60 will-change-[opacity,transform]"
    >
      <span className="text-[11px] font-medium uppercase tracking-[0.28em]">
        Scroll
      </span>
      <span className="relative block h-11 w-px overflow-hidden bg-white/15">
        <span className="scroll-bead absolute left-0 top-0 block h-3 w-px bg-white/80" />
      </span>
    </div>
  );
}
