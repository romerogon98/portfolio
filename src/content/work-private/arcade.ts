import type { CaseStudy } from "@/content/work/types";

export const arcade: CaseStudy = {
  slug: "arcade",
  title: "Arcade",
  subtitle: "Marketing site for an MCP runtime powering production AI agents",
  year: "2026",
  client: "Arcade (Arcade AI, Inc.)",
  role: "UX/UI Designer · Motion Direction · Custom Illustrations",
  duration: "Multi-week engagement",
  tint: "from-lime-900 to-fuchsia-950",
  liveUrl: "https://www.arcade.dev/",
  intro:
    "Arcade is the MCP runtime for production AI agents — the layer that sits between an agent and every system it needs to reach, handling authorization, reliable tools, and governance in one place so agents can pass enterprise security review. It's a deeply technical, developer-first product, trusted in production by teams like LangChain and Snyk and built by people who authored parts of the MCP tool-authorization spec. Litebox partnered with Arcade to design and build their marketing site — turning that dense infrastructure story into something a technical buyer immediately gets.",
  context:
    "Arcade needed a marketing site that could explain an abstract infrastructure product — a runtime for agent auth, tools and governance — without losing developers in jargon or overpromising. The work spanned the full site: UX and information architecture, UI design, custom illustrations, and motion, all delivered fast with a tight client feedback loop and a clean handoff to their engineering team.",
  sections: [
    {
      heading: "Challenge",
      body: [
        "Arcade's product is invisible by nature — it's the runtime between agents and the systems they act on. The UX challenge was making three abstract problems (authorization, reliability, governance) concrete and legible on a page, then showing how a single runtime solves all three. Getting the narrative and the diagrams right mattered more than decoration, because the audience is technical and skeptical.",
        "It was also a fast-moving, iteration-heavy engagement. Design, custom illustrations, and motion all had to advance in parallel while staying locked enough that development didn't churn — so a big part of the challenge was sequencing the work, locking sections as they were approved, and keeping a tight feedback loop with the client through weekly reviews.",
      ],
    },
    {
      heading: "Solution",
      body: [
        `We split the work cleanly into UX and UI: first a sitemap and audit to define structure, then UI design delivered section by section so each piece could be reviewed and locked before dev picked it up. The homepage was built around a clear argument — "an agent isn't an agent if it can't take actions" → the three walls every agent hits → "one runtime that solves all three" → the capabilities, proof, and the boring-but-critical enterprise stuff (compliance, deployment, the team behind the spec).`,
        `Custom illustrations and motion carried a lot of the explanation. We directed a set of technical illustrations (the runtime diagram, the "everything agents need to ship" set, the "boring stuff" trio) and layered in motion — cursor-reactive UI elements, gradient animations, Lottie assets and hover interactions — while protecting the integrity of the original design. To keep locked sections from generating dev rework, we reviewed the Figma section by section, flagged what was ready, and closed with a full Motion + Design handoff package and technical documentation.`,
      ],
      list: [
        "A UX pass (sitemap + audit) delivered separately from UI so structure was settled before visual design",
        "A homepage narrative that makes three abstract problems (auth, reliability, governance) concrete and shows one runtime solving them",
        "Direction of custom technical illustrations to explain an invisible infrastructure product",
        "Motion design layered in — cursor-reactive elements, gradient animation, Lottie, hover interactions — without breaking the original design",
        "Section-by-section lock-in to prevent dev rework, plus a full handoff package and technical docs",
      ],
      closing:
        "The engagement covered the full marketing site — Homepage and Product page — plus SEO, cookie-consent setup, and a documented handoff so Arcade's team could carry it forward.",
    },
    {
      heading: "My Role",
      body: [
        "I worked as UX/UI designer on the Arcade team at Litebox, owning the site's UX (sitemap and audit) and UI design, and driving the motion/illustration direction — working directly with the client (Alex Gutow) through weekly reviews and coordinating with our motion designer and developers.",
      ],
      list: [
        "Delivered the UX foundation: sitemap and site audit, kept separate from the UI work for clarity",
        "Designed the UI for the Homepage and Product page in Figma",
        "Directed custom illustrations to visually explain the runtime, auth, and governance concepts",
        "Led the motion-design exploration and defined the approach (gradient animation, hover effects, Lottie) with the motion designer",
        "Ran a tight client feedback loop — sharing deliveries via Figma + Loom, locking sections to avoid dev rework",
      ],
    },
    {
      heading: "Process",
      list: [
        "UX — sitemap and audit to settle structure before any visual design",
        "UI design — Homepage and Product page designed section by section in Figma, reviewed and locked as they were approved",
        "Illustration & motion — directed custom illustrations and a motion exploration in parallel, aligning on approach before production",
        "Build & QA — dev implementation on staging, responsive fixes, SEO and cookie-consent, hover-animation problem-solving",
        "Handoff — full Motion + Design asset package and technical documentation for Arcade's team",
      ],
    },
    {
      heading: "Learnings",
      list: [
        "Explaining an invisible, highly technical infrastructure product to a skeptical developer audience through structure and illustration, not hype",
        "Sequencing design, illustration, and motion in parallel while keeping sections locked enough to protect the dev timeline",
        "Where motion actually adds meaning vs. where it fights the design — and the technical limits of animating on top of illustrations",
        "Running an iteration-heavy engagement with a demanding client feedback loop and still shipping clean handoffs",
        "Separating UX deliverables from UI so each can be reviewed and approved on its own terms",
      ],
    },
  ],
};
