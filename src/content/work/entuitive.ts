import type { CaseStudy } from "./types";

export const entuitive: CaseStudy = {
  slug: "entuitive-engineering",
  title: "Entuitive Engineering",
  subtitle:
    "Structuring complexity into a seamless one-page site on Framer",
  year: "2022",
  client: "Entuitive Engineering",
  role: "UX/UI Designer & Framer Developer",
  duration: "3 months",
  heroImage: "/work/entuitive/hero.jpg",
  tint: "from-accent-500 to-accent-950",
  intro:
    "Entuitive Engineering is a civil and structural consultancy based in South Yarra, Victoria. They offer high-level engineering solutions across six business verticals, serving residential, commercial, industrial, and public sector projects.",
  context:
    "The client needed a fully-contained, one-page website that would clearly present their expertise, services, and culture — all without external navigation or page reloads.",
  sections: [
    {
      heading: "Challenge",
      body: [
        "The key challenge was condensing extensive technical and service information into a seamless single-page experience. The site had to be both technically rich and visually refined — delivering depth without overwhelming the user.",
        "Added to that, the time zone difference made regular calls difficult, so most collaboration happened asynchronously or in off-hours, requiring precision and clarity in communication.",
      ],
      image: "/work/entuitive/01.jpg",
    },
    {
      heading: "Solution",
      body: [
        "We designed a one-page website that used layered navigation, tabbed content blocks, and interactive popups to guide users through Entuitive's six service areas and company values.",
        "The experience was crafted mobile-first, knowing that most of their traffic would come through handheld devices.",
      ],
      list: [
        "Sticky sidebar for continuous orientation",
        "Tabbed content reveals for each service vertical",
        'Interactive popups for deeper sections like "Culture" and "Projects"',
        "Custom animations and hover effects (collaboration with internal devs)",
      ],
      image: "/work/entuitive/02.jpg",
    },
    {
      heading: "My Role",
      list: [
        "Led the UX and UI design from discovery to final design handoff",
        "Defined the structure of the one-page flow to balance clarity with content depth",
        "Created prototypes in Figma and collaborated closely with the client's internal developer",
        "Managed asynchronous communication due to timezone gaps",
        "Designed for performance and mobile optimization",
        "Aligned visual direction with the brand's engineering-driven, modern tone",
      ],
    },
    {
      heading: "Learnings",
      list: [
        "Learned to design complex content architecture within a one-page structure",
        "Adapted to timezone differences through async collaboration and detailed documentation",
        "Strengthened ability to balance UX depth with minimalism and performance",
        "Contributed to a site that was later featured on Land-book.com as a design reference",
      ],
      image: "/work/entuitive/03.jpg",
    },
  ],
  liveUrl: "https://www.entuitiveengineering.com.au/",
};
