import type { CaseStudy } from "./types";

// DRAFT — images are final, copy is placeholder. Fill from the template in
// _input/case-studies/TEMPLATE.md before this goes anywhere public.
export const gm2: CaseStudy = {
  slug: "gm2",
  title: "GM2",
  subtitle: "[Subtitle — one line on what this project was]",
  year: "[Year]",
  client: "GM2",
  role: "[Your role]",
  duration: "[Duration]",
  heroImage: "/work/gm2/hero.jpg",
  tint: "from-accent-800 to-neutral-950",
  intro:
    "[Intro — 2-3 sentences: what the client does and how you got involved.]",
  context: "[Context — 1-2 sentences on the brief and the need.]",
  sections: [
    {
      heading: "Challenge",
      body: ["[What made this hard.]"],
      image: "/work/gm2/01.jpg",
    },
    {
      heading: "Solution",
      body: ["[What you designed/built and why.]"],
      list: ["[Key point 1]", "[Key point 2]", "[Key point 3]"],
      image: "/work/gm2/02.jpg",
    },
    {
      heading: "My Role",
      body: ["[What you owned on this project.]"],
      list: ["[Responsibility 1]", "[Responsibility 2]", "[Responsibility 3]"],
      image: "/work/gm2/03.jpg",
    },
    {
      heading: "Process",
      list: ["[Phase 1]", "[Phase 2]", "[Phase 3]"],
      image: "/work/gm2/04.jpg",
    },
    {
      heading: "Learnings",
      list: ["[Takeaway 1]", "[Takeaway 2]"],
      image: "/work/gm2/05.jpg",
    },
  ],
  gallery: ["/work/gm2/gallery-01.jpg", "/work/gm2/gallery-02.jpg"],
};
