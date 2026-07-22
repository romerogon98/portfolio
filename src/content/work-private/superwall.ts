import type { CaseStudy } from "@/content/work/types";

export const superwall: CaseStudy = {
  slug: "superwall",
  title: "Superwall",
  subtitle: "Page-by-page marketing site redesign for a subscription and paywall platform",
  year: "2026",
  client: "Superwall (Nest 22, Inc.)",
  role: "UX/UI Designer · Marketing Website",
  duration: "Multi-month partnership (page-by-page redesign)",
  tint: "from-indigo-900 to-slate-950",
  liveUrl: "https://superwall.com/",
  intro:
    "Superwall is a subscription and paywall platform for consumer mobile and web apps — a no-code paywall editor and experimentation engine on top of a full subscription backend (entitlements, receipt validation, webhooks, revenue analytics). It manages $1.6B+ in annual subscription revenue across 10,000+ apps, including names like Quizlet, Citizen and Cal AI. Litebox partnered with Superwall to redesign their marketing site, working page by page against a live product with a demanding, design-savvy client.",
  context:
    "Superwall needed a marketing site that could carry a technically dense, feature-rich product — paywalls, experimentation, subscription infrastructure, integrations, case studies — with a consistent, scalable design system rather than a patchwork of one-off pages. The engagement ran as an ongoing, page-by-page collaboration: build a shared UI kit first, then design, review, and ship pages directly onto the live site.",
  sections: [
    {
      heading: "Challenge",
      body: [
        "Superwall is a broad product with a lot of surface area — a paywall editor, A/B testing, subscription infrastructure, 30+ integrations, and a deep library of case studies. The challenge was bringing consistency and scalability to a site that had to hold all of that: instead of designing pages in isolation, we needed a system of reusable components so every new page felt like part of the same site and could scale as the product grew.",
        "It was also a hands-on, iterative engagement with a client team that cared deeply about detail — spacing, contrast, hierarchy, how things read in context. Feedback was frequent and specific (down to header spacing and dark-background contrast), and pages were reviewed on staging and pushed live incrementally, so the work had to be precise and consistent every step of the way.",
      ],
    },
    {
      heading: "Solution",
      body: [
        "We started by building a UI kit from the components in Superwall's existing Figma and site — consolidating and extending them into a consistent, reusable system with clear typography sizes, styles, and usage criteria. That kit became the foundation everything else was built on, so new pages stayed consistent and scalable rather than one-offs.",
        "From there we designed and shipped pages one at a time — Pricing, Integrations, category landing pages, case studies, and marketing banners — each reviewed on staging, refined against detailed client feedback, and pushed live on superwall.com. We designed for the site's dark theme throughout, always validating designs in real page context rather than as standalone assets, and handed off clean Figma files for development.",
      ],
      list: [
        "A reusable UI kit built from existing components, unifying typography, styles, and usage criteria for consistency and scale",
        "Page-by-page design and delivery — Pricing, Integrations, landing pages, case studies, banners — shipped live incrementally",
        "Landing-page structure for categories with many subpages, giving users a clear entry point into deep sections",
        "Designs built for a dark-themed site, with contrast and hierarchy validated in real page context",
        "Clean Figma handoffs and a tight staging-review-then-publish loop with the client",
      ],
      closing:
        "The work ran as an ongoing partnership: a shared system up front, then a steady cadence of pages designed, reviewed, and shipped live.",
    },
    {
      heading: "My Role",
      body: [
        "I worked as UX/UI designer on the Litebox team assigned to Superwall, contributing to the shared UI kit and designing marketing pages, then preparing the Figma handoffs for development — collaborating with our project lead and the client's team through a detailed, iterative review process.",
      ],
      list: [
        "Contributed to the UI kit — components, typography sizes and styles, usage criteria",
        "Designed marketing pages (e.g. Pricing, Integrations, landing pages, case studies) on the dark-themed system",
        "Designed marketing banners and validated them in real page context",
        "Prepared and shared Figma handoff files for development",
        "Iterated against detailed client feedback across staging reviews before pages went live",
      ],
    },
    {
      heading: "Process",
      list: [
        "Kickoff — reviewed the client's existing files and site, requested analytics, and aligned on where to start",
        "UI kit — built a consistent, reusable component and type system as the foundation",
        "Page design — designed pages one at a time (Pricing, Integrations, landing pages, case studies, banners)",
        "Review & iterate — staging reviews with the client, refining spacing, contrast, and hierarchy in context",
        "Ship & handoff — pushed pages live on superwall.com incrementally, with clean Figma handoffs to dev",
      ],
    },
    {
      heading: "Learnings",
      list: [
        "Building a design system first pays off: consistency and scale come from a shared kit, not from designing pages in isolation",
        "Always judging design in real page context — sizing, contrast, hierarchy — rather than as standalone assets",
        "Designing for a dark theme, where contrast and readability need deliberate handling",
        "Working within a fast, page-by-page ship cadence directly onto a live site",
        "Collaborating with a detail-oriented client through frequent, specific feedback without losing momentum",
      ],
    },
  ],
};
