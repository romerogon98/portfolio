export type CaseSection = {
  heading: string;
  body?: string[];
  list?: string[];
  closing?: string;
  image?: string;
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
  /** Tailwind gradient classes for the placeholder hero when `heroImage` is missing. */
  tint?: string;
  intro: string;
  context?: string;
  sections: CaseSection[];
  liveUrl?: string;
};
