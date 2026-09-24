import Nav from "@/components/Nav";
import PrivateWorkList from "@/components/PrivateWorkList";
import { PRIVATE_PROJECTS } from "@/content/work-private";
import { DOCUMENTED } from "@/content/work-private/cases";

export const metadata = {
  title: "Private work | Gonzalo Romero",
  robots: { index: false, follow: false },
};

export default function PrivateWorkIndex() {
  const items = PRIVATE_PROJECTS.map((p) => ({
    slug: p.slug,
    title: p.title,
    status: p.status,
    img: DOCUMENTED[p.slug]?.cover ?? DOCUMENTED[p.slug]?.heroImage,
    tint: DOCUMENTED[p.slug]?.tint,
  }));

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

        <PrivateWorkList items={items} />
      </main>
    </>
  );
}
