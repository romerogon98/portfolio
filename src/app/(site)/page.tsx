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
import { DOCUMENTED } from "@/content/work-private/cases";
import { griffin } from "@/content/artifacts/griffin";

const card = (c: CaseStudy, href: string): WorkGalleryItem => ({
  href,
  title: c.title,
  subtitle: c.subtitle,
  img: c.cover ?? c.heroImage,
  tint: c.tint,
});

// Hand-picked order for the home. Private (Litebox, NDA) cases resolve
// through DOCUMENTED; Griffin has no case study yet, only its artifacts log,
// so it links there. AI Council is listed while its case is still being
// written — its page shows the "in progress" state until it's documented.
const privateCard = (slug: string) =>
  card(DOCUMENTED[slug], `/work/${slug}`);

const griffinCard: WorkGalleryItem = {
  href: `/artifacts/${griffin.slug}`,
  title: griffin.name,
  subtitle: griffin.intro.lead,
  img: griffin.cover,
};

const WORK: WorkGalleryItem[] = [
  privateCard("ai-council"),
  privateCard("vu"),
  card(entuitive, `/work/${entuitive.slug}`),
  griffinCard,
  privateCard("dystil"),
  privateCard("keycard"),
  card(dicaba, `/work/${dicaba.slug}`),
  card(kapi, `/work/${kapi.slug}`),
  card(tidli, `/work/${tidli.slug}`),
  card(facturante, `/work/${facturante.slug}`),
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
