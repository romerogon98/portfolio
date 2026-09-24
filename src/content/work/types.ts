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

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  client: string;
  role: string;
  duration: string;
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
