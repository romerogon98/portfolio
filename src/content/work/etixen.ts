import type { CaseStudy } from "./types";

// DRAFT — images are final, copy is placeholder. Fill from the template in
// _input/case-studies/TEMPLATE.md before this goes anywhere public.
export const etixen: CaseStudy = {
  slug: "etixen",
  title: "Etixen",
  subtitle: "[Subtitle — one line on what this project was]",
  year: "[Year]",
  client: "Etixen",
  role: "[Your role]",
  duration: "[Duration]",
  heroImage: "/work/etixen/hero.jpg",
  tint: "from-sky-900 to-slate-950",
  intro:
    "[Intro — 2-3 sentences: what the client does and how you got involved.]",
  context: "[Context — 1-2 sentences on the brief and the need.]",
  sections: [
    {
      heading: "Challenge",
      body: ["[What made this hard.]"],
      image: "/work/etixen/01.jpg",
    },
    {
      heading: "Solution",
      body: ["[What you designed/built and why.]"],
      list: ["[Key point 1]", "[Key point 2]", "[Key point 3]"],
      image: "/work/etixen/02.jpg",
    },
    {
      heading: "My Role",
      body: ["[What you owned on this project.]"],
      list: ["[Responsibility 1]", "[Responsibility 2]", "[Responsibility 3]"],
      image: "/work/etixen/03.jpg",
    },
    {
      heading: "Process",
      list: ["[Phase 1]", "[Phase 2]", "[Phase 3]"],
      image: "/work/etixen/04.jpg",
    },
    {
      heading: "Learnings",
      list: ["[Takeaway 1]", "[Takeaway 2]"],
      image: "/work/etixen/05.jpg",
    },
  ],
  gallery: ["/work/etixen/gallery-01.jpg", "/work/etixen/gallery-02.jpg"],
};
