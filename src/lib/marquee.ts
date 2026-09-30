// Shared state for the site-wide selection-marquee cursor (MarqueeCursor).
// The cursor owns the animation loop and writes its eased box here every
// frame; "reveal zones" (e.g. the hero's VectorWordmark) register to grow the
// box while the pointer is over them and read the box back to mask their
// effect.

/** Centre + half-size in client (viewport) px. */
export type MarqueeBox = { x: number; y: number; hx: number; hy: number };

export type MarqueeZone = {
  el: HTMLElement;
  /** Box half-size while the pointer is inside `el`. */
  half: () => { hx: number; hy: number };
};

const zones = new Set<MarqueeZone>();

export function registerMarqueeZone(zone: MarqueeZone) {
  zones.add(zone);
  return () => {
    zones.delete(zone);
  };
}

export function marqueeZones(): ReadonlySet<MarqueeZone> {
  return zones;
}

/** The eased box as last drawn; `opacity` 0 means hidden. */
export const marqueeBox: MarqueeBox & { opacity: number } = {
  x: -1000,
  y: -1000,
  hx: 0,
  hy: 0,
  opacity: 0,
};
