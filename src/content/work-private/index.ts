export type PrivateProjectStatus = "documented" | "soon";

export type PrivateProjectEntry = {
  slug: string;
  title: string;
  status: PrivateProjectStatus;
};

// Confidential Litebox client work. "documented" entries have a full case
// study under src/content/work-private/<slug>.ts; the rest are placeholders
// until content + assets are ready.
export const PRIVATE_PROJECTS: PrivateProjectEntry[] = [
  { slug: "vu", title: "VU", status: "soon" },
  { slug: "coderabbit", title: "Coderabbit", status: "soon" },
  { slug: "causely", title: "Causely", status: "soon" },
  { slug: "workada", title: "Workada", status: "soon" },
  { slug: "emergence", title: "Emergence", status: "soon" },
  { slug: "dystil", title: "Dystil", status: "soon" },
  { slug: "resolve", title: "Resolve", status: "soon" },
  { slug: "superwall", title: "Superwall", status: "soon" },
  { slug: "arcade", title: "Arcade", status: "soon" },
  { slug: "keycard", title: "Keycard", status: "documented" },
];
