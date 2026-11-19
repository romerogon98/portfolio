/**
 * A gallery item: an image path, or an object for videos / wide items.
 * Anything ending in .webm or .mp4 renders as a muted looping video.
 * Media shows at its natural aspect ratio; `wide` spans the full row.
 */
export type CaseMedia =
  | string
  | {
      src: string;
      poster?: string;
      alt?: string;
      wide?: boolean;
      /** Lottie JSON played over `src`, which doubles as the still fallback. */
      lottie?: string;
    };

export type CaseSection = {
  heading: string;
  body?: string[];
  list?: string[];
  closing?: string;
  image?: string;
  /** Media grid rendered under the section text. */
  media?: CaseMedia[];
};

/** Interactive hero scenes; see src/components/heroScenes. */
export type HeroSceneId = "distyl-logo";

/**
 * My own part in the project, set apart from the team-level story. Rendered
 * right after the intro so the case reads "what the studio did → what I did".
 */
export type MyPart = {
  /**
   * First-person lead that narrows the focus from the whole project to my
   * contribution, e.g. "This case isn't about the whole site — it's about…".
   */
  lead: string;
  /** Optional follow-up paragraphs (how I worked, tools, decisions). */
  body?: string[];
  /** Concrete pieces I designed, built or owned — rendered as a numbered list. */
  owned: string[];
  /** Shots of the pieces I owned, rendered under the list. */
  media?: CaseMedia[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  client: string;
  role: string;
  duration: string;
  /**
   * Where the work was made — the studio for agency work ("Litebox", "Avans"),
   * or "Freelance". Shown in the hero meta next to the client.
   */
  studio?: string;
  /** My contribution, shown as its own block after the intro. */
  myPart?: MyPart;
  /** Local hero image. When absent, the case renders a gradient hero using `tint`. */
  heroImage?: string;
  /** Portrait crop of the hero for phones; falls back to `heroImage`. */
  heroImageMobile?: string;
  /** Thumbnail for lists and next-case links; falls back to `heroImage`. */
  cover?: string;
  /**
   * Video hero rendered through the interactive mosaic effect. Takes priority
   * over `heroImage` on the case page; `heroImage` still feeds thumbnails.
   */
  heroVideo?: { sources: string[]; fallback: string };
  /**
   * Interactive hero rendered behind the title. Takes priority over
   * `heroVideo` and `heroImage` on the case page; `heroImage` still feeds
   * thumbnails and the no-JS view.
   */
  heroScene?: HeroSceneId;
  /** Tailwind gradient classes for the placeholder hero when `heroImage` is missing. */
  tint?: string;
  /** Page treatment. "light" reads better under bright imagery. Defaults to dark. */
  theme?: "dark" | "light";
  intro: string;
  context?: string;
  sections: CaseSection[];
  /** Extra shots rendered as a grid after the sections. */
  gallery?: CaseMedia[];
  liveUrl?: string;
};
