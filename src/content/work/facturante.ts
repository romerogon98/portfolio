import type { CaseStudy } from "./types";

export const facturante: CaseStudy = {
  slug: "facturante",
  title: "Facturante",
  subtitle: "Smart Webflow Implementation for Automated Billing",
  year: "2023",
  client: "Facturante",
  role: "Webflow Developer · Project Manager",
  duration: "3–4 weeks",
  heroImage: "/work/facturante/hero.jpg",
  intro:
    "Facturante is an Argentinian digital invoicing platform. The client approached us with the need to rebuild their website and integrate a new automated billing system that would suggest the most suitable plan based on user input.",
  context:
    "The design had already been delivered and approved, so my focus was on leading the implementation process and solving technical challenges related to automation.",
  sections: [
    {
      heading: "Challenge",
      body: [
        "The main challenge was integrating dynamic plan recommendations within Webflow — a no-code platform with limitations in logic and automation. We explored tools like Webblocks, but due to those limitations, we moved to a custom JavaScript implementation.",
      ],
      image: "/work/facturante/01.jpg",
    },
    {
      heading: "Solution",
      body: [
        "We built the site in Webflow using a fully dynamic CMS structure for easy plan updates. For the billing automation logic, we used JavaScript integrated into Webflow, making the plan selector truly dynamic and tailored.",
        "All of this was coordinated through validation calls with the client and testing rounds to ensure correct performance.",
      ],
    },
    {
      heading: "My Role",
      list: [
        "Acted as Project Manager, managing my dev team and keeping client communication smooth",
        "Worked as Webflow Developer, building and implementing all CMS and structural components",
        "Participated in decision-making on third-party tools, testing flows, and final QA",
      ],
    },
    {
      heading: "Extra Contribution — Homepage Redesign",
      body: [
        "Some months later, I also participated in the redesign and rebuild of the homepage, again as Project Manager and developer. This updated version further improved clarity and user experience, and was delivered in under one month.",
      ],
    },
    {
      heading: "Learnings",
      list: [
        "Gained in-depth experience with Webflow's CMS and integrations",
        "Learned to evaluate and test external tools like Webblocks",
        "Strengthened my project management and client-facing communication",
        "Learned to resolve no-code limitations through hybrid solutions",
      ],
    },
  ],
  liveUrl: "https://web.facturante.com/",
};
