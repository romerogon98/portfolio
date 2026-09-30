"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

// Cursor-tracking image preview (after GSAP's "Cursor-Tracking Image Preview"
// demo), shared by list pages: while a row is hovered its image replaces the
// custom cursor and trails the pointer, cross-fading between rows.

export type CursorPreviewItem = {
  key: string;
  /** Image under /public; without one, a tinted card with `title` is shown. */
  img?: string;
  title?: string;
  /** Tailwind gradient classes for the fallback card. */
  tint?: string;
};

export function useCursorPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const follow = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const box = ref.current;
    if (!box) return;
    gsap.set(box, { xPercent: -50, yPercent: -50 });
    const x = gsap.quickTo(box, "x", { duration: 0.4, ease: "power3" });
    const y = gsap.quickTo(box, "y", { duration: 0.4, ease: "power3" });
    follow.current = { x, y };
    const move = (e: MouseEvent) => {
      x(e.clientX);
      y(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // The preview stands in for the cursor: `.cursor-hidden` on <html> hides
  // SiteCursor + MarqueeCursor.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("cursor-hidden", active !== null);
    return () => root.classList.remove("cursor-hidden");
  }, [active]);

  const enter = (index: number, e: React.MouseEvent) => {
    // First entry jumps to the pointer instead of gliding in from afar.
    if (active === null && ref.current) {
      gsap.set(ref.current, { x: e.clientX, y: e.clientY });
      follow.current?.x(e.clientX);
      follow.current?.y(e.clientY);
    }
    setActive(index);
  };

  return { ref, active, enter, leave: () => setActive(null) };
}

/** Fixed layer holding every row's image; desktop pointers only. */
export function CursorPreviewLayer({
  previewRef,
  items,
  active,
}: {
  previewRef: React.RefObject<HTMLDivElement | null>;
  items: CursorPreviewItem[];
  active: number | null;
}) {
  return (
    <div
      ref={previewRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[150] hidden size-[350px] [@media(hover:hover)]:block"
    >
      {items.map((p, i) => (
        <div
          key={p.key}
          className={`absolute inset-0 transition-opacity duration-100 ease-linear ${
            active === i ? "opacity-100" : "opacity-0"
          }`}
        >
          {p.img ? (
            <Image src={p.img} alt="" fill sizes="350px" className="object-cover" />
          ) : (
            <div
              className={`absolute inset-0 flex items-end bg-gradient-to-br p-5 ${
                p.tint ?? "from-accent-500 to-accent-950"
              }`}
            >
              <span className="text-2xl tracking-[-0.03em] text-white">{p.title}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
