import type { CaseStudy } from "@/content/work/types";

// Slug stays "dystil" to match the private index; the client's actual brand
// name is Distyl AI, so the display title uses the correct spelling.
// Stills and videos are captures of the live distyl.ai (2026-10-02).
const D = "/work/dystil";

export const dystil: CaseStudy = {
  slug: "dystil",
  title: "Distyl",
  subtitle: "Rebrand and enterprise marketing site, designed in Figma and built with Claude Code",
  year: "2026",
  client: "Distyl AI",
  role: "UX/UI Designer · Motion & Handoff",
  duration: "Final stretch — delivery, handoff & polish",
  studio: "Litebox",
  tint: "from-stone-700 to-neutral-950",
  theme: "light",
  heroScene: "distyl-logo",
  heroImage: `${D}/stills/hero.jpg`,
  heroImageMobile: `${D}/stills/hero-mobile.jpg`,
  cover: `${D}/stills/cover.jpg`,
  liveUrl: "https://www.distyl.ai/",
  intro:
    "Distyl AI architects the AI-native enterprise — it forward-deploys teams of engineers and researchers, plus a suite of purpose-built products (Distillery, Weave, Context Mesh, Context Views, Journey, Canary), to design and operationalize AI transformations for Fortune 500 companies. Founded by ex-Palantir leaders and recently valued at $1.8B, their AI systems reach 150M+ end users across telecom, healthcare, insurance and more, and they partner with OpenAI, Anthropic, Google and Microsoft. Litebox partnered with Distyl on their rebrand and a new marketing site built to match the seriousness and scale of that enterprise story.",
  myPart: {
    lead:
      "I joined Distyl in the final stretch. The rebrand and the site were already well underway at Litebox — my part was helping land it: finishing the delivery, running the handoff and polishing the site with animation.",
    body: [
      "Coming in late meant getting up to speed fast on a large system that other people had built, and then raising the finish without breaking it. Most of my time went into the details that make a site feel complete — how sections enter, how things move on scroll, how it holds up across breakpoints — and into leaving the project in a state the client could own.",
    ],
    owned: [
      "Polish passes across the site's sections, with animation and scroll-linked motion",
      "Closing out the remaining delivery work alongside the Litebox team",
      "The handoff to Distyl — making the site and its system ready for the client to take over",
      "QA across desktop, tablet and mobile before release",
    ],
  },
  context:
    "Distyl needed a brand and website that signaled frontier, enterprise-grade credibility to Fortune 500 buyers — not a startup landing, but a polished, technically ambitious site with a deep product architecture, case studies, research and careers. The work ran in phases against a live company, with leadership deeply involved in feedback and a bar set high on both design quality and technical polish.",
  sections: [
    {
      heading: "Challenge",
      body: [
        "Distyl is a large, layered story: eight+ technology products, case studies, research, news, and careers, all under a rebrand that had to feel frontier and enterprise-credible at once. The challenge was designing a system that could carry that depth — a real information architecture across many pages — while holding a consistent, premium look and feel that lived up to a Fortune-500-facing brand.",
        "It was also technically demanding and phased. The site called for a cursor-reactive 3D hero, site-wide page transitions, animated stats, custom illustrations and a CMS-driven content model — all shipped incrementally (a minimum viable website first, then Careers, News and ongoing improvements) with a high-touch, detail-oriented client feedback loop across desktop, tablet and mobile.",
      ],
      media: [
        { src: `${D}/stills/tech-hero.jpg`, alt: "Distyl Technology page: purpose-built products for the enterprise AI lifecycle", wide: true },
        { src: `${D}/stills/cases.jpg`, alt: "Distyl case studies: Fortune 100 outcomes in numbers", wide: true },
      ],
    },
    {
      heading: "Solution",
      body: [
        "We started from the brand — refreshed guidelines (including image-generation prompts and asset galleries) and key visuals — then designed the site around a clear, scalable structure: Home, a Technology section with a subpage per product, Case Studies, Research, About, News and Careers. Custom illustrations carried a lot of the personality (home stats, About locations, Research entries), directed with an illustrator to keep a consistent style across sections.",
        "The workflow was Figma-first, then Claude Code: we set the base and the design system in Figma, then did the entire buildup with Claude Code rather than a traditional hand-coded handoff. On top of the system, the build layered in the technical craft the brand demanded. The hero is a custom Three.js animation of the Distyl logo that reacts to the cursor (with a graceful touch fallback), and we built a hero editor alongside it to shape and tune that animation live as we went, instead of guessing in code. Sections across the site carry custom scroll-linked animations, plus site-wide page transitions, animated metrics, and a Sanity CMS so Distyl could manage content themselves. We shipped in phases on Next.js + Vercel — MVW first, then Careers and News — with tight QA across breakpoints and a steady cadence of client review.",
      ],
      list: [
        "A rebrand foundation: refreshed guidelines, image-generation prompts, asset galleries and key visuals",
        "A Figma-first workflow — base and design system in Figma, then the full buildup with Claude Code",
        "A scalable IA across many pages (Technology + per-product subpages, Case Studies, Research, About, News, Careers)",
        "Custom illustrations directed to a consistent style across Home stats, About locations and Research",
        "A custom Three.js logo animation for the hero, built and tuned with a purpose-made hero editor",
        "Custom scroll-linked animations across sections, plus site-wide page transitions and animated metrics",
        "Sanity CMS for client-managed content, shipped in phases (MVW → Careers, News, improvements) on Next.js + Vercel",
      ],
      closing:
        "The engagement became an ongoing partnership — a first MVW release followed by new pages and continuous improvements, all under the same brand and design system.",
      media: [
        {
          src: `${D}/logo-3d.webm`,
          poster: `${D}/logo-3d-poster.jpg`,
          alt: "The Distyl logo as a Three.js scene, tilting with the cursor",
          wide: true,
        },
        {
          src: `${D}/home-scroll.webm`,
          poster: `${D}/home-scroll-poster.jpg`,
          alt: "Scroll-linked reveals down the Distyl homepage",
          wide: true,
        },
        { src: `${D}/stills/home-statement.jpg`, alt: "Homepage statement with a custom isometric illustration" },
        { src: `${D}/stills/home-outcomes.jpg`, alt: "Homepage outcomes with custom illustrations" },
      ],
    },
    {
      heading: "Process",
      list: [
        "Branding — refreshed guidelines, key visuals, image-generation prompts and asset galleries",
        "Structure — low-fi wireframe and IA for the full site, scoped into phases",
        "Figma base — set the design system and section base in Figma",
        "Buildup with Claude Code — Three.js logo hero tuned in a custom hero editor, scroll-linked animations, page transitions, animated stats, Sanity CMS",
        "Phased release — MVW first, then Careers, News and ongoing improvements on Next.js + Vercel, with QA across breakpoints",
      ],
    },
    {
      heading: "Learnings",
      list: [
        "Joining a project in its final stretch — getting up to speed fast on a system other people built",
        "Raising the finish of a site with motion and detail without breaking what already works",
        "Treating the handoff as part of the design: leaving something the client can actually own",
      ],
    },
  ],
  gallery: [
    {
      src: `${D}/stills/about-investors.jpg`,
      alt: "About page: investors, partners (OpenAI, Microsoft, Anthropic, Google) and talent",
      wide: true,
    },
    { src: `${D}/stills/research-hero.jpg`, alt: "Distyl Research page hero", wide: true },
    { src: `${D}/stills/careers-forward.jpg`, alt: "Careers page: forward deployment and team photography" },
    { src: `${D}/stills/about-locations.jpg`, alt: "About page: New York, San Francisco and London offices" },
  ],
};
