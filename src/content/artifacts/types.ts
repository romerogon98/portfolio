import type { ArtifactId } from "@/artifacts/registry";

// Artifacts: custom code (components, motion, generative assets…) built for
// SaaS clients' production sites, documented as a per-client mini-blog under
// /work/private/artifacts.

export type ArtifactPreview = (
  | { type: "component"; id: ArtifactId }
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string }
) & {
  /** CSS aspect-ratio for the frame, e.g. "16 / 9". Defaults to a 420px-tall frame. */
  aspect?: string;
};

/** A still or live shot in the entry's gallery. */
export type ArtifactShot = {
  preview: ArtifactPreview;
  caption: string;
  /** Span the full gallery row. */
  wide?: boolean;
};

/** One step of the "how it was built" section. */
export type ArtifactStep = {
  title: string;
  body: string;
  figure?: ArtifactPreview;
  /** Show the figure full width under the text instead of beside it. */
  wide?: boolean;
};

export type ArtifactEntry = {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD) — entries are listed newest first. */
  date: string;
  /** What kind of asset it is, e.g. "Component", "Motion", "Generative". */
  kind: string;
  summary: string;
  tags?: string[];
  /** What I did on it, e.g. "Design · Motion · Front-end". */
  role?: string;
  /** Thumbnail (4:3) for the client log, under /public. Falls back to the client cover. */
  cover?: string;
  preview?: ArtifactPreview;
  /** Write-up paragraphs: context, decisions, how it was used. */
  body?: string[];
  /** Gallery of stills / live variations. */
  shots?: ArtifactShot[];
  /** "How it was built", step by step. */
  process?: ArtifactStep[];
  /** A full-bleed live section the visitor can interact with (e.g. scroll through). */
  live?: { id: ArtifactId; title: string; hint?: string };
  /** Drafts only render in development. */
  draft?: boolean;
};

export type ArtifactClient = {
  slug: string;
  name: string;
  url: string;
  /** SaaS category, e.g. "Banking-as-a-Service". */
  category: string;
  /** One line for the clients index. */
  tagline: string;
  /** Cover image (4:3) for the clients index, under /public. */
  cover?: string;
  /** Where the shipped work got recognised (e.g. SaaSpo). `url` optional
   *  until the exact listing link is known. */
  featured?: { name: string; url?: string }[];
  /** Intro under the page title: `lead` in full colour, `rest` muted. */
  intro: { lead: string; rest: string };
  /** The client page borrows the client's palette. */
  theme: { bg: string; fg: string; muted: string; surface: string; border: string };
  entries: ArtifactEntry[];
};
