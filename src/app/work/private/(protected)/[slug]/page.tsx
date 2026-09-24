import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import CaseStudy from "@/components/CaseStudy";
import { PRIVATE_PROJECTS } from "@/content/work-private";
import { DOCUMENTED } from "@/content/work-private/cases";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = PRIVATE_PROJECTS.find((p) => p.slug === slug);
  return {
    title: `${entry?.title ?? "Private work"} | Gonzalo Romero`,
    robots: { index: false, follow: false },
  };
}

export default async function PrivateCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = PRIVATE_PROJECTS.find((p) => p.slug === slug);
  if (!entry) notFound();

  // Only finished case studies open; ongoing ones stay locked.
  const data = entry.status === "documented" ? DOCUMENTED[slug] : undefined;

  // Next documented private case, wrapping around.
  const documented = PRIVATE_PROJECTS.filter((p) => p.status === "documented");
  const idx = documented.findIndex((p) => p.slug === slug);
  const nextEntry = idx >= 0 ? documented[(idx + 1) % documented.length] : null;
  const nextData = nextEntry ? DOCUMENTED[nextEntry.slug] : null;
  const next =
    nextData && nextEntry
      ? {
          href: `/work/private/${nextEntry.slug}`,
          title: nextData.title,
          subtitle: nextData.subtitle,
          heroImage: nextData.cover ?? nextData.heroImage,
          tint: nextData.tint,
        }
      : null;

  return (
    <>
      <Nav light={data?.theme === "light"} />
      {data ? (
        <CaseStudy data={data} next={next} />
      ) : (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
          <span className="font-mono text-xs uppercase tracking-widest text-white/40">
            (Private work)
          </span>
          <h1 className="mt-4 text-[clamp(2rem,5vw,3rem)] font-normal tracking-[-0.03em]">
            {entry.title}
          </h1>
          <p className="mt-3 max-w-sm text-white/50">
            {entry.status === "ongoing"
              ? "Ongoing project — the case study opens once the work wraps up."
              : "Case study in progress — content coming soon."}
          </p>
        </div>
      )}
    </>
  );
}
