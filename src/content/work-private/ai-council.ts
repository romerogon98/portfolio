import type { CaseStudy } from "@/content/work/types";

// Litebox showcase (visual reference): behance.net/gallery/255854369
// DRAFT — listed as "soon" in the private index until the remaining copy in
// brackets (duration, sections) is written. Intro is the team-level story
// (Litebox); `myPart` is mine. Stills come from the Litebox Behance showcase
// above; its videos are Vimeo embeds and aren't included.
const A = "/work/ai-council/stills";

export const aiCouncil: CaseStudy = {
  slug: "ai-council",
  title: "AI Council",
  subtitle: "Branding and marketing site for a technical AI conference",
  year: "2026",
  client: "AI Council",
  role: "UX/UI Designer · Ideas to Launch",
  studio: "Litebox",
  duration: "[Duration]",
  tint: "from-blue-700 to-neutral-950",
  heroImage: `${A}/hero.webp`,
  heroImageMobile: `${A}/hero-mobile.webp`,
  cover: `${A}/cover.webp`,
  intro:
    "AI Council — formerly Data Council — is a technical conference with more than 13 years of history, bringing together the engineers who build the systems the world runs on, now focused on the AI stack. Litebox partnered with the AI Council team on brand direction, the website, key visuals and a wide range of animations for web and social.",
  myPart: {
    lead:
      "I was on AI Council from the first ideas to the launch of the site — brainstorming, benchmarking, the UX process and the release itself.",
    body: ["[Optional — how you worked: tools, workflow, a decision you're proud of.]"],
    owned: [
      "Early ideas and brainstorming that shaped the direction of the site",
      "Benchmark of conference and event sites to define where AI Council should sit",
      "The UX process — structure, flows and wireframes for the site",
      "[UI / specific pages or pieces you designed]",
      "The launch of the site",
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
      body: ["[What made this hard.]"],
    },
    {
      heading: "Solution",
      body: ["[What the team shipped, and where your part fits in it.]"],
    },
    {
      heading: "Visual Language",
      body: [
        "[How the brand works — e.g. the pixel-built mark, the blue palette and the editorial serif — and how it carries from the stage to the site.]",
      ],
      media: [
        { src: `${A}/logo.webp`, alt: "AI Council logo on blue with a pixel-step pattern" },
        { src: `${A}/billboard.webp`, alt: "“The frontier of AI is built here” key visual with 3D pixel mark" },
        { src: `${A}/palette.webp`, alt: "AI Council color palette", wide: true },
      ],
    },
    {
      heading: "Learnings",
      list: ["[Takeaway 1]", "[Takeaway 2]"],
    },
  ],
  gallery: [
    { src: `${A}/merch.webp`, alt: "AI Council cap, keychain, lanyards and attendee badges" },
    { src: `${A}/banners.webp`, alt: "AI Council venue banner and sponsor screen" },
  ],
};
