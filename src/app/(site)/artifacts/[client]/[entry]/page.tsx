import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import TransitionLink from "@/components/TransitionLink";
import ArtifactViewer from "@/components/artifacts/ArtifactViewer";
import { artifactEntries, getArtifactClient } from "@/content/artifacts";
import { ClientTheme } from "../../theme";

type Params = Promise<{ client: string; entry: string }>;

async function load(params: Params) {
  const { client, entry } = await params;
  const c = getArtifactClient(client);
  if (!c) return null;
  const entries = artifactEntries(c);
  const i = entries.findIndex((e) => e.slug === entry);
  if (i < 0) return null;
  return { client: c, entry: entries[i], newer: entries[i - 1], older: entries[i + 1] };
}

export async function generateMetadata({ params }: { params: Params }) {
  const data = await load(params);
  return {
    title: data ? `${data.entry.title} — ${data.client.name} Artifacts` : "Artifacts",
    robots: { index: false, follow: false },
  };
}

// One artifact post: meta, title, then the interactive full-bleed demo (or a
// preview), write-up, shots, how it was built, prev/next. Showcase only — no
// source is exposed.
export default async function ArtifactEntryPage({ params }: { params: Params }) {
  const data = await load(params);
  if (!data) notFound();
  const { client: c, entry: e, newer, older } = data;
  const base = `/artifacts/${c.slug}`;

  return (
    <ClientTheme client={c}>
      <Nav />
      <article className="mx-auto max-w-5xl px-6 pt-36 sm:px-10">
        <TransitionLink
          href={base}
          className="font-mono text-xs uppercase tracking-[0.06em] text-[var(--a-muted)] transition-colors hover:text-[var(--a-fg)]"
        >
          ← {c.name} Artifacts
        </TransitionLink>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs uppercase tracking-[0.06em] text-[var(--a-muted)]">
          <span>{e.number}</span>
          <span>{e.kind}</span>
          {e.role && <span>{e.role}</span>}
          {e.draft && <span className="text-accent-500">Draft</span>}
        </div>
        <h1 className="mt-4 font-[family-name:var(--font-artifact-serif)] text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1] tracking-[-0.02em]">
          {e.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-[var(--a-muted)] sm:text-xl">
          {e.summary}
        </p>
        {e.tags?.length ? (
          <ul className="mt-6 flex flex-wrap gap-2">
            {e.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-[var(--a-border)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--a-muted)]"
              >
                {t}
              </li>
            ))}
          </ul>
        ) : null}

        {/* The interactive demo, when there is one, replaces the hero preview. */}
        {e.preview && !e.live && (
          <div className="mt-12">
            <ArtifactViewer preview={e.preview} />
          </div>
        )}
      </article>

      {e.live && (
        <section className="mt-12 border-y border-[var(--a-border)]">
          <div className="mx-auto max-w-5xl px-6 py-14 sm:px-10">
            <h2 className="font-mono text-xs uppercase tracking-[0.06em] text-[var(--a-muted)]">{"// Live"}</h2>
            <p className="mt-4 font-[family-name:var(--font-artifact-serif)] text-3xl font-light tracking-[-0.01em]">
              {e.live.title}
            </p>
            {e.live.hint && <p className="mt-3 font-light text-[var(--a-muted)]">{e.live.hint} ↓</p>}
          </div>
          <ArtifactViewer preview={{ type: "component", id: e.live.id, aspect: "auto" }} />
        </section>
      )}

      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        {e.body?.length ? (
          <div className="mt-14 max-w-2xl space-y-5 text-lg font-light leading-relaxed">
            {e.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        ) : null}

        {e.shots?.length ? (
          <section className="mt-24">
            <h2 className="font-mono text-xs uppercase tracking-[0.06em] text-[var(--a-muted)]">{"// Shots"}</h2>
            <div className="mt-6 grid gap-x-4 gap-y-8 sm:grid-cols-2">
              {e.shots.map((shot, i) => (
                <figure key={i} className={shot.wide ? "sm:col-span-2" : undefined}>
                  <ArtifactViewer preview={shot.preview} />
                  <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--a-muted)]">
                    {String(i + 1).padStart(2, "0")} — {shot.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        {e.process?.length ? (
          <section className="mt-24">
            <h2 className="font-mono text-xs uppercase tracking-[0.06em] text-[var(--a-muted)]">{"// How it was built"}</h2>
            <ol className="mt-6 border-t border-[var(--a-border)]">
              {e.process.map((step, i) => (
                <li
                  key={i}
                  className={`grid gap-6 border-b border-[var(--a-border)] py-10 lg:gap-10 ${
                    step.wide ? "" : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
                  }`}
                >
                  <div>
                    <span className="font-mono text-xs text-[var(--a-muted)]">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-3 font-[family-name:var(--font-artifact-serif)] text-3xl font-light tracking-[-0.01em]">
                      {step.title}
                    </h3>
                    <p className="mt-4 max-w-2xl font-light leading-relaxed text-[var(--a-muted)]">{step.body}</p>
                  </div>
                  {step.figure && <ArtifactViewer preview={step.figure} />}
                </li>
              ))}
            </ol>
          </section>
        ) : null}
      </div>

      <div className="mx-auto max-w-5xl px-6 pb-24 sm:px-10">
        {(newer || older) && (
          <nav className="mt-20 grid gap-px overflow-hidden rounded-[10px] border border-[var(--a-border)] bg-[var(--a-border)] sm:grid-cols-2">
            {[
              { e: older, label: "← Older" },
              { e: newer, label: "Newer →" },
            ].map(({ e: n, label }) =>
              n ? (
                <TransitionLink
                  key={label}
                  href={`${base}/${n.slug}`}
                  className="bg-[var(--a-bg)] p-6 transition-colors hover:bg-[var(--a-surface)]"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--a-muted)]">
                    {label} · {n.number}
                  </span>
                  <span className="mt-2 block font-[family-name:var(--font-artifact-serif)] text-2xl font-light">
                    {n.title}
                  </span>
                </TransitionLink>
              ) : (
                <span key={label} className="hidden bg-[var(--a-bg)] sm:block" />
              )
            )}
          </nav>
        )}
      </div>
    </ClientTheme>
  );
}
