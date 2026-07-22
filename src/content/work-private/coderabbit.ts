import type { CaseStudy } from "@/content/work/types";

export const coderabbit: CaseStudy = {
  slug: "coderabbit",
  title: "CodeRabbit",
  subtitle: "Brand identity and CMS-backed marketing site for an AI code-review tool",
  year: "2025 — 2026",
  client: "CodeRabbit",
  role: "UX/UI Lead",
  duration: "Brand + website build, then ongoing pages",
  tint: "from-orange-900 to-zinc-950",
  liveUrl: "https://www.coderabbit.ai/",
  intro:
    "CodeRabbit is the leading AI code-review tool — an AI-first pull-request reviewer that gives context-aware, line-by-line feedback, chats with developers, and learns their preferences over time. It's the most-installed AI app on GitHub and GitLab, used across 6M+ repositories by 15,000+ customers including NVIDIA and Swiggy. Litebox partnered with CodeRabbit on a new brand identity and marketing site.",
  context:
    "CodeRabbit needed a brand and website that positioned it as the category leader in AI code review — credible to developers, sharp enough for enterprise buyers, and fast to scale into new pages. The work spanned a new identity, a CMS-backed marketing site, a blog, and multiple product/enterprise pages.",
  sections: [
    {
      heading: "Challenge",
      body: [
        "The brief covered both a new identity and a full marketing site for a developer-first product, which had to speak credibly to engineers while also standing up to enterprise scrutiny (security, trust, SOC 2). Translating a technical code-review workflow into a clear, confident brand — without losing developer credibility — was the core challenge.",
        "The site also had to be built to scale: a CMS-backed system that could grow into a blog, enterprise and solutions pages, and multilingual content, while hitting high performance and launch deadlines.",
      ],
    },
    {
      heading: "Solution",
      body: [
        "We started from brand exploration — moodboards and two identity directions — to define CodeRabbit's new look, then designed the marketing site (including a full dark mode) on top of it. The build used Strapi as a CMS so the team could manage content, with the blog, enterprise, and solutions pages all designed as part of one system.",
        "Beyond the core site, the scope included a Trust Center, SOC 2 / startup forms, an embedded HubSpot scheduler, a sticky announcement bar, blog and site translation (i18n through Strapi), and a performance push toward top PageSpeed scores — shipped incrementally on staging and then to production.",
      ],
      list: [
        "A new brand identity explored through moodboards and two directions, then applied across the site",
        "A CMS-backed marketing site (Strapi) with full dark mode, built to scale into new pages",
        "Blog, Enterprise, Composable Solutions and Trust Center pages designed as one system",
        "i18n/translation of the website and blog managed through Strapi",
        "Performance and launch essentials — PageSpeed push, announcement bar, embedded forms/scheduler",
      ],
      closing:
        "The work went from a new identity to a scalable, CMS-backed site and a steady stream of pages supporting the product's growth.",
    },
    {
      heading: "My Role",
      body: [
        "I worked as UX/UI lead on the Litebox team assigned to CodeRabbit, driving the design across the new identity and the marketing site — from the brand directions through to the pages built on the CMS-backed system.",
      ],
      list: [
        "Led the UX/UI across the brand exploration and the marketing site",
        "Worked through moodboards and two identity directions to define the new look",
        "Designed the site on the new identity, including its full dark mode",
        "Kept the blog, Enterprise, Solutions and Trust Center pages consistent within one system",
        "Iterated with the client through staging reviews and into production",
      ],
    },
    {
      heading: "Process",
      list: [
        "Brand — moodboards and two identity directions to define the new look",
        "Design — marketing site (incl. full dark mode) built on the new identity",
        "Build — Strapi CMS + Next.js, deployed on Vercel, shipped incrementally",
        "Expansion — blog, Enterprise, Solutions, Trust Center, i18n and forms",
        "Optimization — PageSpeed performance push and launch polish",
      ],
    },
    {
      heading: "Learnings",
      list: [
        "Building a brand that stays credible to developers while satisfying enterprise buyers",
        "Designing a CMS-backed system (Strapi) that scales into many pages without losing consistency",
        "Supporting internationalization (site + blog) as a first-class part of the design",
        "Balancing performance, trust/security surfaces, and launch deadlines",
      ],
    },
  ],
};
