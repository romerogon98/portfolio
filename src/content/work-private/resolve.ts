import type { CaseStudy } from "@/content/work/types";

export const resolve: CaseStudy = {
  slug: "resolve",
  title: "Resolve",
  subtitle: "Ongoing website and growth work for an AI production-engineering platform",
  year: "2026",
  client: "Resolve AI",
  role: "Growth · UX/UI Designer",
  duration: "Ongoing website & growth improvements",
  tint: "from-emerald-900 to-slate-950",
  liveUrl: "https://resolve.ai/",
  intro:
    "Resolve AI builds AI agents for production engineering — \"machines on call for humans.\" Its agents handle on-call, incidents, and operational tasks, doing root-cause analysis and troubleshooting in minutes, and teams can build their own agents on top via MCP, API and Skills. It's trusted by engineering teams at Coinbase, DoorDash, Snowflake and Zscaler, with enterprise-grade security (SOC 2 Type II, GDPR, HIPAA). Litebox partnered with Resolve on ongoing website and growth work.",
  context:
    "Rather than a from-scratch build, Resolve needed continuous improvement of an existing, fast-moving site — a cleaner sitemap, new pages and templates (integrations), better forms, SEO, and engineering-quality upgrades. The goal was to keep the marketing site sharp and performant as the product and company scaled.",
  sections: [
    {
      heading: "Challenge",
      body: [
        "Resolve's site was live and evolving quickly, so the challenge was improving it in flight — tightening the information architecture, adding pages and templates, and raising quality without disrupting a site that was actively used. It also serves a demanding, technical audience (SREs and engineering leaders at large enterprises), so clarity and credibility mattered.",
        "On the technical side, the setup needed hardening: the gap between staging and production was too large (SEO features disabled on staging meant prod was doubling as a test environment), and there was no per-PR deploy — both risks to quality as the site grew.",
      ],
    },
    {
      heading: "Solution",
      body: [
        "We worked as an ongoing UX/UI + growth partner: rebuilding the sitemap (adding missing but important pages like About, Integrations and Security), creating an Integrations template and content (e.g. Kubernetes), improving forms, and running SEO work across the site.",
        "In parallel, we proposed engineering improvements to raise quality and speed up delivery — a deploy per PR (as used across other projects) and closing the gap between staging and production so prod stopped being the testing ground. The result was a steadier, more scalable workflow for continuous site improvements.",
      ],
      list: [
        "An ongoing improvement engagement on a live, fast-moving site (not a from-scratch build)",
        "A rebuilt sitemap that surfaced missing key pages (About, Integrations, Security)",
        "An Integrations page template plus content (e.g. Kubernetes) and improved forms",
        "SEO work across the site",
        "Engineering-quality proposals: per-PR deploys and closing the staging↔production gap",
      ],
      closing:
        "The engagement was about compounding improvements — structure, pages, forms, SEO and delivery quality — on a site that had to keep moving.",
    },
    {
      heading: "My Role",
      body: [
        "My role here leaned more growth than pure product design — working on the site's structure, SEO and conversion surfaces on the Litebox team — with UI design on specific pieces like the Integrations template.",
      ],
      list: [
        "Worked on the sitemap and information architecture, surfacing missing key pages",
        "Designed the Integrations page template and its content (e.g. Kubernetes)",
        "Improved the site's forms and conversion surfaces",
        "Supported SEO work across the site as part of the growth stream",
        "Fed into the engineering-quality proposals (per-PR deploys, staging↔production parity)",
      ],
    },
    {
      heading: "Process",
      list: [
        "Audit — reviewed the existing site, sitemap and technical setup",
        "Structure — rebuilt the sitemap and surfaced missing key pages",
        "Design & build — Integrations template/content, forms, page improvements",
        "Growth — SEO work across the site",
        "Engineering quality — per-PR deploys and staging↔production improvements",
      ],
    },
    {
      heading: "Learnings",
      list: [
        "Improving a live, fast-moving site in flight without disrupting it",
        "How much a clean sitemap/IA matters for prioritizing what to fix next",
        "Pairing design work with growth (SEO) and engineering-quality upgrades",
        "Serving a demanding technical audience where clarity and credibility are the bar",
      ],
    },
  ],
};
