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
  { slug: "vu", title: "VU", status: "documented" },
  { slug: "coderabbit", title: "CodeRabbit", status: "documented" },
  { slug: "causely", title: "Causely", status: "documented" },
  { slug: "workada", title: "Workada", status: "documented" },
  { slug: "emergence", title: "Emergence", status: "documented" },
  { slug: "dystil", title: "Distyl", status: "documented" },
  { slug: "resolve", title: "Resolve", status: "documented" },
  { slug: "superwall", title: "Superwall", status: "documented" },
  { slug: "arcade", title: "Arcade", status: "documented" },
  { slug: "keycard", title: "Keycard", status: "documented" },
];
