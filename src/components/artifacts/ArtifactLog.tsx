"use client";

import TransitionLink from "@/components/TransitionLink";
import { CursorPreviewLayer, useCursorPreview } from "@/components/CursorPreview";

export type ArtifactLogItem = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  kind: string;
  draft?: boolean;
  /** Preview image — the entry's cover, else the client's. */
  img?: string;
};

// A client's artifacts as a changelog: number, title + summary, kind. Hovering
// a row swaps the cursor for its cover, like the private-work list.
export default function ArtifactLog({ base, items }: { base: string; items: ArtifactLogItem[] }) {
  const { ref, active, enter, leave } = useCursorPreview();

  return (
    <>
      <ol onMouseLeave={leave} className="mt-6 border-t border-[var(--a-border)]">
        {items.map((e, i) => (
          <li key={e.slug} onMouseEnter={(ev) => enter(i, ev)} className="border-b border-[var(--a-border)]">
            <TransitionLink
              href={`${base}/${e.slug}`}
              className="group grid grid-cols-[3rem_1fr] gap-x-6 gap-y-2 py-7 transition-colors hover:bg-[var(--a-surface)] sm:grid-cols-[4rem_1fr_auto] sm:items-baseline sm:px-3"
            >
              <span className="font-mono text-xs text-[var(--a-muted)]">{e.number}</span>
              <span className="col-start-2 sm:col-start-auto">
                <span className="block font-[family-name:var(--font-artifact-serif)] text-3xl font-light tracking-[-0.01em]">
                  {e.title}
                  {e.draft && (
                    <span className="ml-3 align-middle font-mono text-[10px] uppercase tracking-[0.06em] text-accent-500">
                      Draft
                    </span>
                  )}
                </span>
                <span className="mt-2 block max-w-2xl font-light text-[var(--a-muted)]">{e.summary}</span>
              </span>
              <span className="col-start-2 font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--a-muted)] transition-colors group-hover:text-[var(--a-fg)] sm:col-start-auto">
                {e.kind} →
              </span>
            </TransitionLink>
          </li>
        ))}
      </ol>

      <CursorPreviewLayer
        previewRef={ref}
        active={active}
        items={items.map((e) => ({ key: e.slug, img: e.img, title: e.title }))}
      />
    </>
  );
}
