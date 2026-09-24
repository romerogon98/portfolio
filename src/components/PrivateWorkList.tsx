"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import TransitionLink from "@/components/TransitionLink";
import type { PrivateProjectStatus } from "@/content/work-private";

export type PrivateWorkItem = {
  slug: string;
  title: string;
  status: PrivateProjectStatus;
  img?: string;
  tint?: string;
};

// The original private-work list, plus a preview that opens in the middle of
// the list on hover and glides to whichever row is active.
export default function PrivateWorkList({ items }: { items: PrivateWorkItem[] }) {
  const list = useRef<HTMLUListElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (preview.current) gsap.set(preview.current, { xPercent: -50, yPercent: -50 });
  }, []);

  const show = (index: number, row: HTMLElement) => {
    const box = preview.current;
    const ul = list.current;
    if (!box || !ul) return;
    const y = row.offsetTop + row.offsetHeight / 2;
    const first = active === null;
    setActive(index);
    // First hover snaps into place; after that the preview slides between rows.
    gsap.to(box, { y, duration: first ? 0 : 0.45, ease: "power3.out", overwrite: "auto" });
    gsap.to(box, { clipPath: "inset(0%)", duration: 0.5, ease: "power3.out" });
  };

  const hide = () => {
    setActive(null);
    if (preview.current)
      gsap.to(preview.current, { clipPath: "inset(50%)", duration: 0.4, ease: "power3.inOut" });
  };

  return (
    <div className="relative mt-16">
      <ul
        ref={list}
        onMouseLeave={hide}
        className="divide-y divide-white/10 border-t border-white/10"
      >
        {items.map((p, i) => {
          const live = p.status === "documented";
          const row = (
            <div className="flex items-center justify-between py-6">
              <span className="text-2xl font-medium sm:text-3xl">{p.title}</span>
              <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/40">
                {p.status === "ongoing" && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="5" y="11" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="2" />
                  </svg>
                )}
                {live ? "View case study →" : p.status === "ongoing" ? "Ongoing" : "Coming soon"}
              </span>
            </div>
          );

          return (
            <li key={p.slug} onMouseEnter={(e) => show(i, e.currentTarget)}>
              {live ? (
                <TransitionLink
                  href={`/work/private/${p.slug}`}
                  className="block transition-opacity hover:opacity-70"
                >
                  {row}
                </TransitionLink>
              ) : (
                <div className="opacity-40">{row}</div>
              )}
            </li>
          );
        })}
      </ul>

      {/* Hover preview — desktop pointers only; top is set by GSAP per row. */}
      <div
        ref={preview}
        aria-hidden
        style={{ clipPath: "inset(50%)" }}
        className="pointer-events-none absolute left-1/2 top-0 hidden h-[200px] w-56 overflow-hidden rounded-sm [@media(hover:hover)]:block"
      >
        {items.map((p, i) => (
          <div
            key={p.slug}
            className={`absolute inset-0 transition-opacity duration-300 ${
              active === i ? "opacity-100" : "opacity-0"
            }`}
          >
            {p.img ? (
              <Image src={p.img} alt="" fill sizes="224px" className="object-cover" />
            ) : (
              <div
                className={`absolute inset-0 flex items-end bg-gradient-to-br p-4 ${
                  p.tint ?? "from-accent-500 to-accent-950"
                }`}
              >
                <span className="text-xl tracking-[-0.03em] text-white">{p.title}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
