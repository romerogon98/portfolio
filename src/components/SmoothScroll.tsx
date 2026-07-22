"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Module-level handle so other components (e.g. the mobile nav overlay) can
// pause/resume the scroller without threading props through the tree.
let activeLenis: Lenis | null = null;
export function getLenis() {
  return activeLenis;
}

// Buttery smooth scrolling (Lenis) driven by the GSAP ticker so ScrollTrigger and
// Lenis stay perfectly in sync. Renders nothing; hooks onto the window scroller.
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true });
    activeLenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      activeLenis = null;
    };
  }, []);

  return null;
}
