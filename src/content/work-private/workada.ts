import type { CaseStudy } from "@/content/work/types";

export const workada: CaseStudy = {
  slug: "workada",
  title: "Workada",
  subtitle: "Marketing site designed and shipped in three days with Claude Code",
  year: "2026",
  client: "Workada (Longitude Labs)",
  role: "UX/UI Designer · Web Development",
  duration: "V1 shipped in ~3 days",
  tint: "from-sky-700 to-indigo-950",
  liveUrl: "https://workada.com/",
  intro:
    "Workada is a platform for flexible, remote AI-training work — data labeling and annotation done on your own schedule, paid weekly, for a global community of contributors who help train the models used by millions. It's a subsidiary of Longitude Labs and plays in the same space as Outlier AI. Litebox partnered with Workada to design and build their marketing landing site, and we took the V1 from a template-y starting point to a live, production site in record time.",
  context:
    "Workada needed a marketing landing that made remote AI-training work feel credible, human, and worth applying to — with a clear \"how it works\" path from application to earning. The catch was speed: the site had to go from visual direction to a production V1 in days, not weeks.",
  sections: [
    {
      heading: "Challenge",
      body: [
        "The starting point was a generic, template-like site, and the brief was to make it feel like a real brand without changing the underlying content — a clear hero, a \"why Workada,\" testimonials from real contributors, a five-step \"how it works,\" a mission section, and open roles. It had to communicate trust (weekly pay via Stripe, real people, real impact) to an audience deciding whether to apply.",
        "The real constraint was time. We had a matter of days to go from a Figma direction to a live, production-ready V1 — which meant design and build had to happen almost in parallel, with no time for a long, sequential handoff.",
      ],
    },
    {
      heading: "Solution",
      body: [
        "We split the work to move fast: a visual direction and V1 layout designed in Figma first (two directions explored to get away from the template feel), while the build happened in parallel. I set up Claude Code as the build engine and fed it the design, content, and Litebox's foundations, then built the actual site directly with Claude Code rather than a traditional hand-coded handoff. That's what made the record timeline possible.",
        "From the V1 we refined in tight loops — animated gradients, custom graphics, testimonials carousel, the \"how it works\" flow, mobile, plus SEO tags, OG images, forms styling and PostHog event tracking. The site was built on Next.js and deployed on Vercel, with deployment docs so Workada's own engineering team could pull it into their repo and route the landing to the product. It went live at workada.com.",
      ],
      list: [
        "A production V1 shipped in ~3 days by running design and build in parallel",
        "Built the site directly with Claude Code instead of a traditional design-to-dev handoff",
        "Two visual directions explored to move the site away from a generic template feel without changing content",
        "Full landing: hero, why Workada, contributor testimonials, five-step \"how it works,\" mission, open roles",
        "SEO tags, OG images, PostHog event tracking and a clean deployment handoff to the client's engineering team",
      ],
      closing:
        "After the V1 went live, the engagement continued into branding and brand-voice guidelines, tightening the identity around the site.",
    },
    {
      heading: "My Role",
      body: [
        "I worked as UX/UI designer and builder on the Litebox team for Workada — designing the visual direction and V1 in Figma and then building the live site itself with Claude Code, iterating with the team through a fast, few-day sprint to production.",
      ],
      list: [
        "Designed the visual direction and V1 layout in Figma (two directions to escape the template feel)",
        "Built the production site directly with Claude Code — layout, styles, animations, forms",
        "Implemented animated gradients, custom graphics, testimonials and the \"how it works\" flow",
        "Handled SEO tags, OG images and worked with the team on PostHog event tracking",
        "Iterated on client feedback across desktop and mobile through to the live launch on workada.com",
      ],
    },
    {
      heading: "Process",
      list: [
        "Onboarding — got to know the client and their existing site; benchmarked references",
        "Direction — two visual directions / V1 in Figma to move away from the template look",
        "Parallel build — Claude Code set up and fed the design + content, then built through to a working V1",
        "Refine — gradients, animations, graphics, mobile, SEO/OG, forms and PostHog tracking in fast loops",
        "Ship & handoff — Next.js on Vercel, deployment docs, client pulls into their repo → live at workada.com",
      ],
    },
    {
      heading: "Learnings",
      list: [
        "Using Claude Code to build a real production site — not just a prototype — and hit a 3-day timeline a traditional handoff couldn't",
        "Running design and development in parallel so the two never blocked each other",
        "How much building-while-designing changes the design role: the two become one tight loop",
        "Making a content-locked, template-y site feel like a real brand through direction, motion and detail",
        "Shipping fast without skipping the production essentials — SEO, OG, tracking, and a clean handoff",
      ],
    },
  ],
};
