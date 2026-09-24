import type { CaseStudy } from "@/content/work/types";

// Content adapted from the public Litebox case study (litebox.ai/work/keycard)
// into Gonzalo's own first-person voice — not a copy of the agency's text.
// Media and Lottie animations come from the same page.
const K = "/work/keycard";

export const keycard: CaseStudy = {
  slug: "keycard",
  title: "Keycard",
  subtitle: "Launch site and marketing web for an identity-infrastructure startup",
  year: "2025",
  client: "Keycard",
  role: "UX/UI Designer · Web Development",
  duration: "Launch sprint + ongoing partnership",
  tint: "from-slate-700 to-slate-950",
  heroImage: `${K}/stills/hero-laptop.jpg`,
  heroImageMobile: `${K}/stills/hero-laptop-mobile.png`,
  cover: `${K}/stills/cover.jpg`,
  liveUrl: "https://keycard.tech/",
  intro:
    "Keycard builds identity infrastructure for the agent-native world — tools that let developers give AI agents secure, dynamic access to other tools without giving up enterprise-grade security. What started as a request for a marketing site turned into an ongoing partnership with Litebox, and I worked on the UX/UI and the build of the site: first a launch page against a hard event deadline, then the full marketing site behind it.",
  context:
    "Keycard needed a partner who could understand a genuinely technical product well enough to make it feel simple — and who could move fast. They had a fixed launch event where they wanted to make a strong first impression on investors and future hires, and the site had to be live for it.",
  sections: [
    {
      heading: "Challenge",
      body: [
        "The brief started as \"build us a marketing site,\" but the real challenge was translating a technical product — secure, dynamic access control for AI agents — into an experience that felt trustworthy and approachable to developers, without dumbing the product down.",
        "On top of that, everything had to ship before a fixed event date, with no room to iterate slowly — and the site had to be built on a foundation that could keep growing once the launch was over.",
      ],
      media: [
        {
          src: `${K}/stills/laptop-unified-identity.jpg`,
          alt: "Keycard site on a laptop: unified identity section",
          wide: true,
        },
        {
          src: `${K}/stills/logo-grid.jpg`,
          alt: "Keycard logo construction on a grid",
        },
        {
          src: `${K}/stills/logo-fallback.webp`,
          lottie: `${K}/logo.json`,
          alt: "Keycard logo animated on a digital grid",
        },
      ],
    },
    {
      heading: "Solution",
      body: [
        "Litebox explored two creative directions with Keycard's in-house designer, and Keycard chose the one built around a technical, fluid and secure feeling. My part was carrying that system into the web: structuring the product story, designing the interface and building it.",
        "The launch page came first — scoped for impact and shipped in time for the event, where it gave Keycard the polished first impression they needed and helped them secure funding. The rest of the marketing site followed and launched just weeks later, using the brand's isometric illustrations to explain what the product actually does.",
      ],
      list: [
        "A high-impact launch page, designed and built fast enough to be live for the event",
        "The full marketing site, shipped weeks after the event on the same system",
        "Product pages that use isometric illustrations and animated sections to make a technical product legible",
        "Careers and values pages to support hiring right after the funding round",
      ],
      media: [
        {
          src: `${K}/stills/illustrations-fallback.webp`,
          lottie: `${K}/illustrations.json`,
          alt: "Keycard AI architecture isometric illustration",
        },
        {
          src: `${K}/stills/trust-fallback.webp`,
          lottie: `${K}/trust.json`,
          alt: "Keycard core value: trust by default",
        },
        {
          src: `${K}/stills/scroll-fallback.webp`,
          lottie: `${K}/scroll.json`,
          alt: "Keycard platform benefits for developers",
          wide: true,
        },
        {
          src: `${K}/stills/website-dark-laptop.jpg`,
          alt: "Keycard website in dark mode on a laptop",
          wide: true,
        },
      ],
      closing:
        "After launch the scope kept growing — more site pages, a sales deck for enterprise prospects, social assets and merch — all under the same visual system.",
    },
    {
      heading: "My Role",
      body: [
        "I worked on the UX/UI and web development stage as part of the Litebox team assigned to Keycard, collaborating directly with their CEO and their in-house design and engineering teams in a constant feedback loop.",
      ],
      list: [
        "Designed the UX and UI of the launch page and the full marketing site",
        "Built the site, from the event-deadline launch page to the pages that followed",
        "Translated the brand system — illustrations, motion, type — into web components",
        "Designed and built the careers and values pages",
      ],
      media: [
        {
          src: `${K}/stills/values-rapid-evolution.jpg`,
          alt: "Keycard values page: rapid evolution",
          wide: true,
        },
        {
          src: `${K}/stills/mobile-job-positions.jpg`,
          alt: "Keycard job positions on mobile",
        },
        {
          src: `${K}/stills/job-listing-card.jpg`,
          alt: "Keycard open positions job listing card",
        },
        {
          src: `${K}/stills/tablet-values.jpg`,
          alt: "Keycard values screen on a tablet",
          wide: true,
        },
      ],
    },
    {
      heading: "Process",
      list: [
        "Discovery — understanding Keycard's product, technical constraints and their designer's direction",
        "Direction — the brand direction chosen by Keycard, carried into the web experience",
        "Speed — a scoped, high-impact landing page designed and built to hit the event deadline",
        "Expansion — the rest of the site and supporting pages once the brand had launched",
      ],
    },
    {
      heading: "Learnings",
      list: [
        "Turning a security-and-infrastructure product into something visually approachable without dumbing it down",
        "Designing and building under a fixed, non-negotiable deadline without cutting corners on the system underneath it",
        "What it takes to go from a single landing page to being an ongoing web partner for a client",
      ],
    },
  ],
  gallery: [
    {
      src: `${K}/stills/conference.jpg`,
      alt: "Keycard presentation on a conference stage",
      wide: true,
    },
    { src: `${K}/stills/badge.jpg`, alt: "Keycard event badge" },
    { src: `${K}/stills/watch.webp`, alt: "Keycard watch face with the green logo" },
    { src: `${K}/stills/tshirt.jpg`, alt: "Black Keycard t-shirt with a minimal logo" },
    { src: `${K}/stills/subway-poster.webp`, alt: "Keycard subway billboard ad" },
  ],
};
