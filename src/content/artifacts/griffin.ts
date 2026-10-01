import type { ArtifactClient } from "./types";

// Griffin — UK banking-as-a-service (griffin.com). Palette sampled from their
// site: near-black ground, warm cream type, stone greys.
export const griffin: ArtifactClient = {
  slug: "griffin",
  name: "Griffin",
  url: "https://www.griffin.com",
  category: "Banking-as-a-Service",
  tagline: "The bank you can build on — custom builds for griffin.com.",
  // TODO: add the exact SaaSpo listing URL.
  featured: [{ name: "SaaSpo" }],
  cover: "/artifacts/griffin/cover.jpg",
  intro: {
    lead: "Custom components, motion and generated assets built for Griffin's site.",
    rest: "Each entry documents what was built, why, and how it came together.",
  },
  theme: {
    bg: "#0c0c0b",
    fg: "#f9f5ef",
    muted: "#959089",
    surface: "#1a1918",
    border: "#2e2c2a",
  },
  entries: [
    {
      slug: "ascii-noise-field",
      title: "ASCII Noise Field",
      date: "2026-09-28",
      kind: "Generative",
      role: "Design · Motion · Front-end",
      summary:
        "The hero texture for griffin.com: a live noise field typed out in $ and £, built as a tunable motion system rather than a baked video.",
      tags: ["Generative", "Canvas 2D", "Motion system"],
      preview: { type: "component", id: "griffin/ascii-ledger", aspect: "16 / 7" },
      body: [
        "Griffin wanted the homepage to feel like infrastructure in motion — money moving underneath the product. Instead of a looping video, the hero banner is generated live in the browser: a field of currency glyphs that slowly redraws itself.",
        "I approached it the way I'd build a Fractal Noise layer in After Effects: one animated noise map, then a stack of controls on top — scale, complexity, evolution, contrast — so the look could be art-directed in real time with the team instead of re-rendered for every note.",
        "The shipped version reads the field as terrain and draws only its contour lines in $ and £, over a quiet hatch of · and / in Griffin's stone greys. It pauses off-screen and holds a single still frame for reduced-motion users.",
      ],
      shots: [
        {
          preview: { type: "component", id: "griffin/ascii-closeup", aspect: "4 / 3" },
          caption: "Close-up — the glyph ramp · / $ £",
        },
        {
          preview: { type: "component", id: "griffin/ascii-lens", aspect: "4 / 3" },
          caption: "Exploration — cursor lens (move over it)",
        },
        {
          preview: { type: "component", id: "griffin/ascii-accent", aspect: "16 / 6" },
          caption: "Exploration — accent colourway",
          wide: true,
        },
      ],
      process: [
        {
          title: "A noise map",
          body: "Every character cell samples a smooth interference field — layered sine waves, rotated each octave so ridges never line up with the grid. Time moves it through a third axis, like Evolution in After Effects.",
          figure: { type: "component", id: "griffin/ascii-stage-field", aspect: "16 / 10" },
        },
        {
          title: "Contour lines",
          body: "Rather than mapping brightness straight to glyphs, the field is sliced into bands like a topographic map. Cells on a band's edge light up, cells inside it dim, and steeper slopes glow brighter — that's what makes the currency trace lines instead of blobs.",
          figure: { type: "component", id: "griffin/ascii-stage-contour", aspect: "16 / 10" },
        },
        {
          title: "Typed out",
          body: "The final value is thresholded into a four-step ramp — · / $ £ — each glyph with its own grey, drawn in batches on a pixel-density-aware canvas. Every frame is generated; nothing is pre-rendered.",
          figure: { type: "component", id: "griffin/ascii-stage-glyphs", aspect: "16 / 10" },
        },
        {
          title: "Art-directed in a custom controller",
          body: "To land the look with the team I built a controller exposing every parameter — noise type, contour spacing, line width, ramp curve, colour steps, frame skip — with presets and PNG export for design comps.",
          figure: { type: "component", id: "griffin/ascii-controller", aspect: "16 / 10" },
        },
      ],
    },
    {
      slug: "platform-stack-scroll",
      title: "Platform Stack Scroll",
      date: "2026-09-29",
      kind: "Motion",
      role: "Illustration · Motion · Front-end",
      summary:
        "A scroll-driven story for Griffin's platform: four isometric layers that part as you scroll, keeping the active one centred while its annotations draw in.",
      tags: ["Scroll-driven", "SVG", "Illustration"],
      preview: { type: "component", id: "griffin/platform-autoplay", aspect: "auto" },
      body: [
        "Griffin's pitch is a stack: your app and your tech on top, their platform and banking licence underneath. The section had to explain that in four beats without turning into a slide deck.",
        "I drew the stack as four isometric plates and pinned the section for a few viewports of scroll. Each step hands its layer the centre of the stage — the plates above lift away, the ones below drop — while the copy, the rail and the annotations change with it.",
      ],
      shots: [
        {
          preview: { type: "component", id: "griffin/platform-intro", aspect: "1440 / 900" },
          caption: "Intro — the stack at rest",
        },
        {
          preview: { type: "component", id: "griffin/platform-step-2", aspect: "1440 / 900" },
          caption: "02 · Your tech — active plate and annotations",
        },
        {
          preview: { type: "component", id: "griffin/platform-step-4", aspect: "1440 / 900" },
          caption: "04 · Our bank license — end of the sequence",
          wide: true,
        },
      ],
      process: [
        {
          title: "Drawing the stack",
          body: "Four plates on one isometric grid, each with its own texture — hatching, dot grids, circuitry — so they read as different materials when stacked. Every plate carries its own annotation set, only revealed while it's active.",
        },
      ],
      live: {
        id: "griffin/platform-scroll",
        title: "Scroll through it",
        hint: "The real sticky section, driven by this page's scroll",
      },
    },
  ],
};
