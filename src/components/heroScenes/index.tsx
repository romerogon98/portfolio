"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { HeroSceneId } from "@/content/work/types";

// Interactive case heroes, loaded on demand so three.js and friends only ship
// with the case that uses them.
export const HERO_SCENES: Record<HeroSceneId, ComponentType> = {
  "distyl-logo": dynamic(() => import("./DistylLogoScene"), { ssr: false }),
};
