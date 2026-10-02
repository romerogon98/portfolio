import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import TransitionLink from "@/components/TransitionLink";
import ArtifactLog from "@/components/artifacts/ArtifactLog";
import CurrencyField from "@/artifacts/griffin/CurrencyField";
import { artifactEntries, getArtifactClient } from "@/content/artifacts";
import { ClientTheme } from "../theme";

export async function generateMetadata({ params }: { params: Promise<{ client: string }> }) {
  const { client } = await params;
  const c = getArtifactClient(client);
  return {
    title: `${c?.name ?? "Client"} Artifacts | Gonzalo Romero`,
    robots: { index: false, follow: false },
  };
}

// A client's mini-blog: editorial header in the client's palette, then the
// artifacts as a changelog — number, date, title + summary, kind.
export default async function ArtifactClientPage({ params }: { params: Promise<{ client: string }> }) {
  const { client } = await params;
  const c = getArtifactClient(client);
  if (!c) notFound();
  const entries = artifactEntries(c);
  const base = `/artifacts/${c.slug}`;

  return (
    <ClientTheme client={c}>
      <Nav />
      {/* The ASCII field is the backdrop for the whole header (it runs under the
          fixed nav too); a soft black vignette behind the copy keeps it legible,
          and the bottom fades into the page. */}
      <header className="relative overflow-hidden border-b border-[var(--a-border)] px-6 pb-24 pt-36 sm:px-10">
        {c.slug === "griffin" && (
          <>
            <CurrencyField color={c.theme.muted} className="absolute inset-0" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[var(--a-bg)] to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--a-bg)] to-transparent" />
          </>
        )}
        <div className="relative w-fit">
          {/* Solid black behind the copy, fading out to the right and at the
              top/bottom edges. Extends left past the page gutter. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 -left-10 -right-40 -top-32 bg-[linear-gradient(90deg,var(--a-bg)_60%,transparent)] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] sm:-right-56"
          />
          <div className="relative">
            <TransitionLink
              href="/artifacts"
              className="font-mono text-xs uppercase tracking-[0.06em] text-[var(--a-muted)] transition-colors hover:text-[var(--a-fg)]"
            >
              ← Artifacts
            </TransitionLink>
            {/* Recognition first: where this work got featured. */}
            {c.featured?.length ? (
              <div className="mt-8 flex flex-wrap gap-2">
                {c.featured.map((f) => {
                  const cls =
                    "inline-flex items-center gap-2 rounded-full border border-[var(--a-border)] bg-[var(--a-bg)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--a-fg)]";
                  const label = (
                    <>
                      <span className="size-1.5 rounded-full bg-accent-500" />
                      Featured on {f.name}
                      {f.url && " ↗"}
                    </>
                  );
                  return f.url ? (
                    <a key={f.name} href={f.url} target="_blank" rel="noopener noreferrer" className={`${cls} transition-colors hover:border-[var(--a-muted)]`}>
                      {label}
                    </a>
                  ) : (
                    <span key={f.name} className={cls}>
                      {label}
                    </span>
                  );
                })}
              </div>
            ) : null}
            <h1 className="mt-6 font-[family-name:var(--font-artifact-serif)] text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[0.95] tracking-[-0.02em]">
              <span className="sm:whitespace-nowrap">Artifacts &amp; animations</span>
              <br />
              <span className="text-[var(--a-muted)]">for</span> {c.name}
            </h1>
            <p className="mt-8 max-w-xl text-lg font-light leading-relaxed sm:text-xl">
              {c.intro.lead} <span className="text-[var(--a-muted)]">{c.intro.rest}</span>
            </p>
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center rounded-full bg-[var(--a-fg)] px-6 py-3.5 font-mono text-sm uppercase tracking-[0.06em] text-[var(--a-bg)] transition-opacity hover:opacity-85"
            >
              Visit {c.url.replace(/^https?:\/\/(www\.)?/, "")}
            </a>
          </div>
        </div>
      </header>

      <section className="px-6 py-20 sm:px-10">
        <h2 className="font-mono text-xs uppercase tracking-[0.06em] text-[var(--a-muted)]">{"// Log"}</h2>
        {entries.length ? (
          <ArtifactLog
            base={base}
            items={entries.map((e) => ({
              slug: e.slug,
              number: e.number,
              title: e.title,
              summary: e.summary,
              kind: e.kind,
              draft: e.draft,
              img: e.cover ?? c.cover,
            }))}
          />
        ) : (
          <p className="mt-6 border-t border-[var(--a-border)] pt-8 font-light text-[var(--a-muted)]">
            First artifacts landing soon.
          </p>
        )}
      </section>
    </ClientTheme>
  );
}
