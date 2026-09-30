"use client";

import type { ComponentType } from "react";
import AsciiNoiseField from "@/components/AsciiNoiseField";
import AsciiControllerShot from "./griffin/AsciiControllerShot";
import CurrencyField from "./griffin/CurrencyField";
import {
  PlatformStackAutoplay,
  PlatformStackScroll,
  PlatformStackStill,
} from "./griffin/PlatformStack";

// Live previews for artifact entries, keyed "<client>/<artifact>". Each fills
// the frame it's rendered in (the entry sets the frame's aspect ratio).
export const ARTIFACT_PREVIEWS = {
  "griffin/currency-field": () => <CurrencyField className="h-full w-full" />,

  // ASCII noise field
  "griffin/ascii-ledger": () => <AsciiNoiseField preset="ledger" />,
  "griffin/ascii-closeup": () => <AsciiNoiseField preset="ledger" config={{ cell: 22, fade: 0 }} />,
  "griffin/ascii-lens": () => (
    <AsciiNoiseField preset="ledger" config={{ cursor: "lens", radius: 220, strength: 0.9, fade: 0 }} />
  ),
  "griffin/ascii-accent": () => (
    <AsciiNoiseField preset="ledger" config={{ hi: "#00d7ca", fg: "#1f4a47", fade: 0, seed: 88 }} />
  ),
  "griffin/ascii-stage-field": () => <AsciiNoiseField preset="ledger" stage="field" config={{ fade: 0 }} />,
  "griffin/ascii-stage-contour": () => <AsciiNoiseField preset="ledger" stage="contour" config={{ fade: 0 }} />,
  "griffin/ascii-stage-glyphs": () => <AsciiNoiseField preset="ledger" config={{ fade: 0 }} />,
  "griffin/ascii-controller": () => <AsciiControllerShot />,

  // Platform stack scroll
  "griffin/platform-autoplay": () => <PlatformStackAutoplay className="h-full w-full" />,
  "griffin/platform-intro": () => <PlatformStackStill l={-0.8} />,
  "griffin/platform-step-2": () => <PlatformStackStill l={1.5} />,
  "griffin/platform-step-4": () => <PlatformStackStill l={3.5} />,
  "griffin/platform-scroll": () => <PlatformStackScroll />,
} satisfies Record<string, ComponentType>;

export type ArtifactId = keyof typeof ARTIFACT_PREVIEWS;
