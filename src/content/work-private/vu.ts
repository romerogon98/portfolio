import type { CaseStudy } from "@/content/work/types";

export const vu: CaseStudy = {
  slug: "vu",
  title: "VU",
  subtitle: "A trilingual demand engine for a LATAM digital identity platform",
  year: "2026",
  client: "VU (VU Security)",
  role: "UX/UI Designer · Branding to Launch",
  duration: "Launch March 2026 · ongoing monthly retainer",
  studio: "Litebox",
  tint: "from-orange-700 to-neutral-950",
  cover: "/work/vu/stills/cover.webp",
  heroVideo: {
    sources: ["/work/vu/mosaic.webm", "/work/vu/mosaic.mp4"],
    fallback: "/work/vu/stills/hero-fallback-mobile.webp",
  },
  liveUrl: "https://www.vusecurity.com/",
  intro:
    "VU is a Latin American digital identity company — identity verification, biometric authentication and real-time fraud detection, consolidated in a single platform (VU ONE) and sold to banks, gaming operators, retailers, healthcare providers and governments across Argentina, Brazil, Chile, Colombia and Mexico. They arrived at Litebox with a mature product and an enterprise sales motion that worked, but a marketing site that generated almost none of their pipeline. Litebox designed and built a new site from scratch, and the project has since become an ongoing design, development, content and growth retainer.",
  myPart: {
    lead:
      "I was on VU from the very beginning — from the first branding explorations and the first screens to the launched product. I owned the UX/UI of the site end to end, from the information architecture to every page and template the content engine and event landings run on.",
    body: [
      "Being there from the start meant the site and the brand grew together: the same visual language that shows up on a stand, a billboard or a printed report is the one the pages are built on. The interesting design problem wasn't a single page, it was a system — layouts that hold up in three languages, templates the client's team can publish into without a designer, and CTAs and forms specified with tracking in mind from day one.",
    ],
    owned: [
      "Early branding work — the first explorations that set the visual language for the site",
      "The site's information architecture and UI across home, solutions and capability pages",
      "Layouts that hold up in Spanish, English and Brazilian Portuguese",
      "The page templates behind the regulation, glossary, fraud-type and comparison content",
      "The event landing template, starting with FEBRABAN TECH 2026",
      "CTAs and forms specified for tracking, and a consistent system as the retainer expanded it",
    ],
    media: [
      {
        src: "/work/vu/stills/site-laptop.webp",
        alt: "VU site on a laptop: “Frictionless authentication to protect every identity”",
        wide: true,
      },
      {
        src: "/work/vu/stills/site-screens.webp",
        alt: "VU site pages across phone and tablet: onboarding, verification, gaming and authentication",
        wide: true,
      },
    ],
  },
  context:
    "In VU's market, the conversation starts with regulation: a compliance officer facing a new AML rule, a CISO after a fraud incident, a product lead replacing a vendor. Each arrives with a specific question about a specific country. The old site answered none of them by name, search traffic was almost entirely branded, and the leads that did come in arrived in spikes nobody could trace back to a source.",
  sections: [
    {
      heading: "Challenge",
      body: [
        "The site had to speak to Argentina, Brazil and the wider region as separate markets, not as one page translated three times. Spanish, English and Brazilian Portuguese each needed to hold up in the same layouts, and leads had to reach the sales rep who actually covers that country.",
        "It also had to be found. The category itself barely gets searched in LATAM — terms like 'KYC provider' or 'identity verification software' show no measurable volume in Argentina, Mexico or Colombia. What people do search is the regulation: the law, the deadline, the document type, the regulator by name. And the biggest lead source, conferences, was completely invisible: three spikes in 120 days, all landing as direct traffic on a generic contact page.",
      ],
      media: [
        {
          src: "/work/vu/stills/identity-orange.webp",
          alt: "VU “Identity” key visual on an orange gradient",
        },
        {
          src: "/work/vu/stills/face-scan.webp",
          alt: "Person checking their phone with a VU biometric verification overlay",
        },
        {
          src: "/work/vu/stills/digital-trust.webp",
          alt: "“Leading the way in Digital Trust” VU key visual",
          wide: true,
        },
      ],
    },
    {
      heading: "Solution",
      body: [
        "We shipped the new site on 18 March 2026 in three languages, with the contact form routing leads into Microsoft Dynamics by country. Tracking was specified alongside the design rather than bolted on after — which paid off in May, when a tracking audit caught that the 'Request a demo' buttons on the homepage and every solutions page weren't firing any event at all.",
        "Underneath the product pages we designed a content layer built around how buyers actually search: capability pages generated from VU's product wiki, seven regulation pages for Argentina, a glossary, a fraud-types hub, and comparison pages the team edits from the CMS. Everything comes out of templates plus a data dictionary, so adding the next country is a week of work instead of a quarter — and the team can publish without a designer or developer in the loop.",
        "For events, we turned a one-off problem into a repeatable cycle: one UTM per physical surface, a QR code per piece, a dedicated landing per event, and a report that compares each event against the last. FEBRABAN TECH 2026 was the first to run on it — a trilingual landing shipped in 13 days, with a raffle as the lead magnet, converting 31% of visitors into leads.",
      ],
      list: [
        "A trilingual marketing site (ES · EN · PT-BR) in production since March 2026, with country-based lead routing into Dynamics",
        "A template-driven content system — capability, regulation, glossary, fraud-type and comparison pages — built to scale country by country",
        "Every page shipped with FAQ blocks, structured data and keywords validated against real search volume",
        "An event landing template plus a UTM and QR convention, making conferences measurable for the first time",
        "A measurement layer the team can trust after an audit caught the main demo CTA firing no event",
      ],
      media: [
        {
          src: "/work/vu/stills/website.webp",
          alt: "VU marketing site homepage on a large screen",
          wide: true,
        },
        {
          src: "/work/vu/stills/phone.webp",
          alt: "VU mobile screen: “We're leading the way to digital trust”",
        },
        {
          src: "/work/vu/stills/icons.webp",
          alt: "VU icon set: face scan, plug, shield and fingerprint",
        },
      ],
      closing:
        "The biggest lesson came from FEBRABAN itself: the stand totems were printed by VU with QR codes that had no UTMs, so most of that traffic arrived unattributed. Now we send the client every QR code, one per physical surface, before they build their own pieces.",
    },
    {
      heading: "Visual Language",
      body: [
        "The site speaks the same language as the rest of VU's brand: a rotating V mark, Roobert as the typeface, a restrained palette of orange, dark grey and beige, and a line-icon set built around identity — face scan, fingerprint, shield. Carrying that system into the web meant the site felt like the same company a buyer had just met at a stand, on a billboard or in a printed report.",
      ],
      media: [
        {
          src: "/work/vu/rotating-v.webm",
          poster: "/work/vu/posters/rotating-v.webp",
          alt: "VU rotating V mark",
        },
        {
          src: "/work/vu/roobert-typography.webm",
          poster: "/work/vu/posters/roobert-typography.webp",
          alt: "Roobert typography specimen for VU",
        },
        {
          src: "/work/vu/stills/palette-fallback.webp",
          lottie: "/work/vu/palette.json",
          alt: "VU color palette: orange, middle orange, dark grey, beige and white",
        },
        {
          src: "/work/vu/stories.webm",
          poster: "/work/vu/posters/stories.webp",
          alt: "VU animated social stories",
        },
      ],
    },
    {
      heading: "Process",
      list: [
        "Branding — first explorations and key visuals, alongside the site's earliest screens",
        "Discovery — VU's product, the buyers (compliance, security, product) and the five markets they sell into",
        "Architecture & UI — a trilingual site designed as a modular system in Figma",
        "Build & launch — development, Dynamics routing and instrumentation, live on 18 March 2026",
        "Content engine — search research, then templates for regulation, glossary, fraud-type and comparison pages",
        "Growth — tracking audit, event landings and per-event reporting under a monthly retainer",
      ],
    },
    {
      heading: "Learnings",
      list: [
        "Localizing for a market means answering its questions, not translating the same page",
        "When the category isn't searched, design for the question the buyer is really asking — here, the regulation",
        "Instrumentation belongs in the design, not after launch; the audit proved it",
        "Designing templates instead of pages is what lets a small team scale content across countries",
        "Offline surfaces need the same rigor as the site — a QR code without a UTM is a lost lead",
      ],
    },
  ],
  gallery: [
    { src: "/work/vu/stills/logo.webp", alt: "VU logo on dark with orange pixel blocks" },
    { src: "/work/vu/stills/secure-frictionless.webp", alt: "“Secure, frictionless experiences” VU key visual" },
    {
      src: "/work/vu/stills/print-collateral.webp",
      alt: "VU print collateral: brochures, fact sheet and posters",
      wide: true,
    },
    {
      src: "/work/vu/stills/annual-report.webp",
      alt: "VU Annual Report 2026 and “Road to Digital Trust” spreads",
    },
    {
      src: "/work/vu/business-cards.webm",
      poster: "/work/vu/posters/business-cards.webp",
      alt: "VU business cards",
    },
    {
      src: "/work/vu/stills/billboard.webp",
      alt: "“Verify and protect your users” VU billboard in a subway station",
      wide: true,
    },
    {
      src: "/work/vu/tshirt.webm",
      poster: "/work/vu/posters/tshirt.webp",
      alt: "VU branded t-shirt",
    },
    {
      src: "/work/vu/tote-bag.webm",
      poster: "/work/vu/posters/tote-bag.webp",
      alt: "VU branded tote bag",
    },
    {
      src: "/work/vu/stills/social-stories.webp",
      alt: "VU social media posts",
      wide: true,
    },
  ],
};
