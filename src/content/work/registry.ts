import type { CaseRef } from "@/components/CaseStudy";

// Ordered, lightweight refs for the "Next case" link. Only the five real public
// cases cycle here — the freelance drafts (gm2, hestia, …) are excluded until
// their copy is written, so no placeholder subtitle can leak into a next-card.
const PUBLIC: (CaseRef & { slug: string })[] = [
  {
    slug: "dicaba",
    href: "/work/dicaba",
    title: "Dicaba",
    subtitle: "Real Estate Website Design & Development",
    heroImage: "/work/dicaba/hero-interior.jpg",
  },
  {
    slug: "entuitive",
    href: "/work/entuitive-engineering",
    title: "Entuitive Engineering",
    subtitle: "Structuring complexity into a seamless one-page site on Framer",
    heroImage: "/work/entuitive/hero.jpg",
  },
  {
    slug: "kapi",
    href: "/work/kapi",
    title: "Kapi",
    subtitle: "UX/UI Overhaul & Strategic Product Improvement",
    heroImage: "/work/kapi/hero.jpg",
  },
  {
    slug: "tidli",
    href: "/work/tidli",
    title: "Tidli",
    subtitle: "UX/UI Design for a Task Management Application",
    heroImage: "/work/tidli/hero.jpg",
  },
  {
    slug: "facturante",
    href: "/work/facturante",
    title: "Facturante",
    subtitle: "Smart Webflow Implementation for Automated Billing",
    heroImage: "/work/facturante/hero.jpg",
  },
];

export function nextPublicCase(slug: string): CaseRef | null {
  const i = PUBLIC.findIndex((c) => c.slug === slug);
  if (i < 0) return null;
  const n = PUBLIC[(i + 1) % PUBLIC.length];
  return {
    href: n.href,
    title: n.title,
    subtitle: n.subtitle,
    heroImage: n.heroImage,
  };
}
