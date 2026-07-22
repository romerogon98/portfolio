import TransitionLink from "@/components/TransitionLink";
import Nav from "@/components/Nav";
import { PRIVATE_PROJECTS } from "@/content/work-private";

export const metadata = {
  title: "Private work | Gonzalo Romero",
  robots: { index: false, follow: false },
};

export default function PrivateWorkIndex() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-black px-6 py-32 text-white sm:px-10">
        <span className="font-mono text-xs uppercase tracking-widest text-white/40">
          (Private work)
        </span>
        <h1 className="mt-4 max-w-2xl text-[clamp(2rem,5vw,3.5rem)] font-normal tracking-[-0.04em]">
          Confidential client work at{" "}
          <em className="not-italic text-accent-500">Litebox</em>.
        </h1>
        <p className="mt-4 max-w-lg text-white/50">
          Under NDA — shared directly, never listed publicly.
        </p>

        <ul className="mt-16 max-w-3xl divide-y divide-white/10 border-t border-white/10">
          {PRIVATE_PROJECTS.map((p) => {
            const live = p.status === "documented";
            const row = (
              <div className="flex items-center justify-between py-6">
                <span className="text-2xl font-medium sm:text-3xl">
                  {p.title}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-white/40">
                  {live ? "View case study →" : "Coming soon"}
                </span>
              </div>
            );

            return (
              <li key={p.slug}>
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
      </main>
    </>
  );
}
