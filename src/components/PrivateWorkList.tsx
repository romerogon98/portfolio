"use client";

import TransitionLink from "@/components/TransitionLink";
import { CursorPreviewLayer, useCursorPreview } from "@/components/CursorPreview";
import type { PrivateProjectStatus } from "@/content/work-private";

export type PrivateWorkItem = {
  slug: string;
  title: string;
  status: PrivateProjectStatus;
  img?: string;
  tint?: string;
};

// The private-work list; hovering a row swaps the cursor for its cover.
export default function PrivateWorkList({ items }: { items: PrivateWorkItem[] }) {
  const { ref, active, enter, leave } = useCursorPreview();

  return (
    <div className="relative mt-16">
      <ul
        onMouseLeave={leave}
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
            <li key={p.slug} onMouseEnter={(e) => enter(i, e)}>
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

      <CursorPreviewLayer
        previewRef={ref}
        active={active}
        items={items.map((p) => ({ key: p.slug, img: p.img, title: p.title, tint: p.tint }))}
      />
    </div>
  );
}
