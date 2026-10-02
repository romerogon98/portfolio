import Image from "next/image";
import Nav from "@/components/Nav";
import TransitionLink from "@/components/TransitionLink";
import { ARTIFACT_CLIENTS, artifactEntries } from "@/content/artifacts";

export const metadata = {
  title: "Artifacts | Gonzalo Romero",
  robots: { index: false, follow: false },
};

export default function ArtifactsIndex() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-black px-6 py-32 text-white sm:px-10">
        <span className="font-mono text-xs uppercase tracking-widest text-white/40">
          (Artifacts)
        </span>
        <h1 className="mt-4 max-w-2xl text-pretty text-[clamp(2rem,5vw,3.5rem)] font-normal tracking-[-0.04em]">
          Custom builds for <em className="not-italic text-accent-500">SaaS</em> products.
        </h1>
        <p className="mt-4 max-w-lg text-pretty text-white/50">
          Bespoke components, motion and generative assets, shipped to SaaS
          clients&apos; production sites — and featured on SaaS design showcases.
          Each client gets its own log, with live previews and process.
        </p>

        <ul className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-2">
          {ARTIFACT_CLIENTS.map((c) => {
            const entries = artifactEntries(c);
            return (
              <li key={c.slug}>
                <TransitionLink href={`/artifacts/${c.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-white/10 bg-white/5">
                    {c.cover && (
                      <Image
                        src={c.cover}
                        alt={`${c.name} artifacts cover`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                  <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className="text-2xl font-medium">{c.name}</span>
                      <span className="font-mono text-xs uppercase tracking-widest text-white/40">
                        {c.category}
                      </span>
                    </span>
                    <span className="font-mono text-xs uppercase tracking-widest text-white/40 transition-colors group-hover:text-white">
                      {entries.length} {entries.length === 1 ? "artifact" : "artifacts"}
                      {" "}→
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-white/50">{c.tagline}</p>
                  {c.featured?.length ? (
                    <span className="mt-3 flex flex-wrap gap-2">
                      {c.featured.map((f) => (
                        <span
                          key={f.name}
                          className="rounded-full border border-accent-500/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent-500"
                        >
                          Featured on {f.name}
                        </span>
                      ))}
                    </span>
                  ) : null}
                </TransitionLink>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
