export type PrivateProjectStatus = "documented" | "ongoing" | "soon";

export type PrivateProjectEntry = {
  slug: string;
  title: string;
  status: PrivateProjectStatus;
};

// Confidential Litebox client work. "documented" entries have a full case
// study under src/content/work-private/<slug>.ts; the rest are placeholders
// until content + assets are ready. "ongoing" projects are still in progress:
// listed with a lock, their case study kept closed until the work wraps up.
// Kept in alphabetical order by title.
export const PRIVATE_PROJECTS: PrivateProjectEntry[] = [
  { slug: "arcade", title: "Arcade", status: "documented" },
  { slug: "causely", title: "Causely", status: "documented" },
  { slug: "dystil", title: "Distyl", status: "documented" },
  { slug: "emergence", title: "Emergence", status: "ongoing" },
  { slug: "keycard", title: "Keycard", status: "documented" },
  { slug: "resolve", title: "Resolve", status: "ongoing" },
  { slug: "superwall", title: "Superwall", status: "documented" },
  { slug: "vu", title: "VU", status: "documented" },
  { slug: "workada", title: "Workada", status: "ongoing" },
];
