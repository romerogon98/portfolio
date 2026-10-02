import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HistoryReveal from "@/components/HistoryReveal";
import About from "@/components/About";
import WorkGallery from "@/components/WorkGallery";
import Haul from "@/components/Haul";
import Stack from "@/components/Stack";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import type { WorkGalleryItem } from "@/components/WorkGallery";
import type { CaseStudy } from "@/content/work/types";
import { dicaba } from "@/content/work/dicaba";
import { entuitive } from "@/content/work/entuitive";
import { kapi } from "@/content/work/kapi";
import { tidli } from "@/content/work/tidli";
import { facturante } from "@/content/work/facturante";
import { PRIVATE_PROJECTS } from "@/content/work-private";
import { DOCUMENTED } from "@/content/work-private/cases";
import { griffin } from "@/content/artifacts/griffin";

const card = (c: CaseStudy, href: string): WorkGalleryItem => ({
  href,
  title: c.title,
  subtitle: c.subtitle,
  img: c.cover ?? c.heroImage,
  tint: c.tint,
});

// The site is password-gated, so the Litebox (NDA) cases sit alongside the
// rest — newest first, ongoing ones stay out until their case study opens.
// Griffin has no case study yet, only its artifacts log, so it links there.
const WORK: WorkGalleryItem[] = [
  {
    href: `/artifacts/${griffin.slug}`,
    title: griffin.name,
    subtitle: griffin.intro.lead,
    img: griffin.cover,
  },
  ...PRIVATE_PROJECTS.filter((p) => p.status === "documented").map((p) =>
    card(DOCUMENTED[p.slug], `/work/${p.slug}`)
  ),
  ...[dicaba, entuitive, kapi, tidli, facturante].map((c) =>
    card(c, `/work/${c.slug}`)
  ),
];

export default function Home() {
  return (
    <>
      <Nav />

      <main className="relative z-10 bg-black">
        <Hero />
        <HistoryReveal />
        <About />
        <WorkGallery items={WORK} />
        <Haul />
        <Stack />
        <Skills />
      </main>

      {/* Slides up over the pinned, shrinking Skills panel (see Skills.tsx). */}
      <Footer />
    </>
  );
}
