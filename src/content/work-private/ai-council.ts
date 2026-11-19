import type { CaseStudy } from "@/content/work/types";

// Intro is the team-level story (Litebox); `myPart` is mine. Stills come from
// the Litebox Behance showcase (behance.net/gallery/255854369); its videos are
// Vimeo embeds and aren't included.
const A = "/work/ai-council/stills";

export const aiCouncil: CaseStudy = {
  slug: "ai-council",
  title: "AI Council",
  subtitle: "Branding and marketing site for a technical AI conference, designed and built in Claude Code",
  year: "2026",
  client: "AI Council",
  role: "UX/UI Designer · Design Engineer",
  studio: "Litebox",
  duration: "2 months — 1-month revamp, 1-month full site",
  tint: "from-blue-700 to-neutral-950",
  heroImage: `${A}/hero.webp`,
  heroImageMobile: `${A}/hero-mobile.webp`,
  cover: `${A}/cover.webp`,
  intro:
    "AI Council — formerly Data Council — is a technical conference with more than 13 years of history, bringing together the engineers who build the systems the world runs on, now focused on the AI stack. Litebox partnered with the AI Council team on brand direction, the website, key visuals and a wide range of animations for web and social.",
  context:
    "The work ran in two sprints: a one-month brand revamp, then the entire site in a second month — close to record time for a site of this scope.",
  myPart: {
    lead:
      "This case isn't really about the conference brand. It's about the site: I designed all of it, and I built it directly in Claude Code — sometimes skipping Figma altogether.",
    body: [
      "It started the traditional way, with structure and direction in Figma. But with one month on the clock, handing off static files wasn't an option. So I set up a design system of our own and a set of Claude Code skills that knew how to apply it, and from there I designed straight into code, with the key visuals as the source of truth.",
      "No handoff, no waiting on someone to interpret a file. Layout, motion and responsive behavior were decided in the browser by the same person who designed them — which is the only reason a site this size fit into a month.",
    ],
    owned: [
      "The design of the entire site — every page, from the first ideas, brainstorming and benchmark to launch",
      "The build in Claude Code, often designing directly in code instead of in Figma",
      "A design system of our own, set up so Claude could work with it",
      "Claude Code skills that applied that system consistently across pages",
      "The sitemaps for each phase, scoped to fit the time we had",
    ],
    media: [
      {
        src: `${A}/site-every-talk.webp`,
        alt: "AI Council site on tablet and phone: “Every talk. Every insight.”",
        wide: true,
      },
      { src: `${A}/schedule.webp`, alt: "AI Council three-day schedule by track" },
      { src: `${A}/speakers-tablet.webp`, alt: "AI Council speakers page on a tablet" },
    ],
  },
  sections: [
    {
      heading: "Challenge",
      body: [
        "Simple to say, hard to do: ship a site in one month that would be presented in Silicon Valley, in front of an AI council — and build it with Claude, from the design onward.",
        "The audience was the engineers who build the AI stack. A site made with AI, shown to the people who make AI, had no room to look generic or unfinished.",
      ],
    },
    {
      heading: "Solution",
      body: [
        "Together with the Litebox team, we laid out sitemaps for each of the phases we defined — a scope that was short on time but wide on pages. Each phase shipped on its own, so the site was always presentable while the next set of pages was being built.",
      ],
      list: [
        "A phased sitemap that kept the site launchable at every step",
        "A three-day schedule organized by track, with talks and speakers",
        "Speaker pages built to scale as the lineup grew",
        "A single design system shared by every page, applied through Claude Code skills",
      ],
    },
    {
      heading: "Visual Language",
      body: [
        "The brand is built from pixels: a mark made of square steps, a deep blue against warm cream, and an editorial serif for headlines with monospaced labels for the technical layer. The same pixel-step pattern runs from the stage screens to the site's section breaks, so the site feels like the event you walk into.",
      ],
      media: [
        { src: `${A}/logo.webp`, alt: "AI Council logo on blue with a pixel-step pattern" },
        { src: `${A}/billboard.webp`, alt: "“The frontier of AI is built here” key visual with 3D pixel mark" },
        { src: `${A}/palette.webp`, alt: "AI Council color palette", wide: true },
      ],
    },
    {
      heading: "Process",
      list: [
        "Ideas & benchmark — brainstorming and a look at how other technical conferences present themselves",
        "Brand revamp — one month on direction, key visuals and the system",
        "Sitemaps — the site split into phases, each one shippable",
        "Design system & skills — set up so Claude could apply the system reliably",
        "Design & build in Claude Code — the full site in a second month",
        "Launch — live in time for the conference",
      ],
    },
    {
      heading: "Learnings",
      body: [
        "This is the project where I learned to get the most out of Claude — not just prompts, but connectors, MCPs and skills. It was right when building sites with Claude was becoming the thing to do, and it took a lot of attempts, plenty of failures and a few wins that made the method stick.",
      ],
      list: [
        "A design system written for the agent, not only for people, is what makes its output consistent",
        "Skills turn one good result into a repeatable one across every page",
        "Designing in code shortens the distance between the idea and what ships — and puts the final call on how things behave in my hands",
      ],
    },
  ],
  gallery: [
    { src: `${A}/merch.webp`, alt: "AI Council cap, keychain, lanyards and attendee badges" },
    { src: `${A}/banners.webp`, alt: "AI Council venue banner and sponsor screen" },
  ],
};
