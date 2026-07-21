import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import CaseStudy from "@/components/CaseStudy";
import { PRIVATE_PROJECTS } from "@/content/work-private";
import { keycard } from "@/content/work-private/keycard";
import { arcade } from "@/content/work-private/arcade";
import { superwall } from "@/content/work-private/superwall";
import { vu } from "@/content/work-private/vu";
import { causely } from "@/content/work-private/causely";
import { coderabbit } from "@/content/work-private/coderabbit";
import { dystil } from "@/content/work-private/dystil";
import { emergence } from "@/content/work-private/emergence";
import { resolve } from "@/content/work-private/resolve";
import { workada } from "@/content/work-private/workada";

// Add an entry here as each project gets a real, documented case study.
const DOCUMENTED: Record<string, typeof keycard> = {
  keycard,
  arcade,
  superwall,
  vu,
  causely,
  coderabbit,
  dystil,
  emergence,
  resolve,
  workada,
};

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

  const data = DOCUMENTED[slug];

  return (
    <>
      <Nav light={data?.theme === "light"} />
      {data ? (
        <CaseStudy data={data} />
      ) : (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
          <span className="text-sm uppercase tracking-widest text-white/40">
            (Private work)
          </span>
          <h1 className="mt-4 text-[clamp(2rem,5vw,3rem)] font-normal tracking-[-0.03em]">
            {entry.title}
          </h1>
          <p className="mt-3 max-w-sm text-white/50">
            Case study in progress — content coming soon.
          </p>
        </div>
      )}
    </>
  );
}
