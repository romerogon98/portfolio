import type { CaseStudy } from "@/content/work/types";

// Content adapted from the public Litebox case study (litebox.ai/work/keycard)
// into Gonzalo's own first-person voice — not a copy of the agency's text.
// No heroImage yet: Litebox renders that hero via a canvas frame-sequence with
// no clean static asset to pull from; swap in real exports when available.
export const keycard: CaseStudy = {
  slug: "keycard",
  title: "Keycard",
  subtitle: "Brand, web & go-to-market for an identity-infrastructure startup",
  year: "2025",
  client: "Keycard",
  role: "UX/UI Designer · Brand Design · Web Development",
  duration: "Ongoing partnership",
  tint: "from-slate-700 to-slate-950",
  liveUrl: "https://keycard.tech/",
  intro:
    "Keycard builds identity infrastructure for the agent-native world — tools that let developers give AI agents secure, dynamic access to other tools without giving up enterprise-grade security. What started as a request for a marketing site turned into an ongoing brand and web partnership at Litebox, where I worked on the visual system, the site, and the go-to-market push around their launch event.",
  context:
    "Keycard needed a partner who could understand a genuinely technical product well enough to make it feel simple — and who could move fast. They had a hard deadline: a launch event where they wanted to make a strong first impression on investors and future hires.",
  sections: [
    {
      heading: "Challenge",
      body: [
        "The brief started as \"build us a marketing site,\" but the real challenge was translating a technical product — secure, dynamic access control for AI agents — into a brand that felt both trustworthy and approachable to developers.",
        "On top of that, everything had to ship before a fixed event date, with no room to iterate slowly.",
      ],
    },
    {
      heading: "Solution",
      body: [
        "We started by working closely with Keycard's in-house designer to understand their aesthetic and technical constraints, then explored two creative directions. Keycard picked the one built around a technical, fluid, secure feeling — and that decision shaped everything that followed.",
      ],
      list: [
        "A logo that layers in concepts of access, fluidity and a technical chip",
        "Custom 2D illustrations with a 3D isometric feel to explain the product visually",
        "A full brandbook so the identity stayed consistent as the team grew",
        "A high-impact landing page built fast enough to be ready for the launch event",
      ],
      closing:
        "After the event, the scope grew: the rest of the marketing site, a sales deck for enterprise prospects, social assets and merch — all under the same visual system.",
    },
    {
      heading: "My Role",
      body: [
        "I worked as UX/UI designer and developer on the Litebox team assigned to Keycard, collaborating directly with their CEO and their in-house design and engineering teams.",
      ],
      list: [
        "Designed and built the marketing site",
        "Contributed to the visual system alongside Keycard's in-house designer",
        "Kept a tight feedback loop with the client through a hard deadline",
        "Continued into post-launch work: additional site pages, sales collateral, social assets",
      ],
    },
    {
      heading: "Process",
      list: [
        "Discovery — understanding Keycard's product, technical constraints and their designer's direction",
        "Direction — two creative explorations, one chosen and refined into the full system",
        "Speed — a scoped, high-impact landing page built to hit the event deadline",
        "Expansion — the rest of the site and supporting collateral once the brand had launched",
      ],
    },
    {
      heading: "Learnings",
      list: [
        "Turning a security-and-infrastructure product into something visually approachable without dumbing it down",
        "Designing under a fixed, non-negotiable deadline without cutting corners on the system underneath it",
        "What it takes to go from a single landing page to being an ongoing brand and web partner for a client",
      ],
    },
  ],
};
