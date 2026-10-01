"use client";

import { useEffect, useId, useMemo, useRef, useState, type RefObject } from "react";
import { STACK_MARKUP, STACK_VIEWBOX } from "./platformStackSvg";

// Griffin "platform stack" — the scroll-driven section from griffin.com: four
// steps (app → tech → platform → license) with an isometric stack whose active
// layer always sits dead centre while the others part above and below.
//
// Everything is driven by one number, the step position `l`:
//   l < 0      intro (layers stacked tight)
//   l = k+0.5  step k+1 at rest — its layer centred, annotations drawn
// The stage renders a fixed 1440×900 composition scaled to fit its box.

const W = 1440;
const H = 900;

export const STEPS = [
  { num: "01", title: "Your app", heading: "Differentiate", body: "Embed banking in your app, own your customer relationship.", accent: "#00d7ca" },
  { num: "02", title: "Your tech", heading: "Integrate", body: "Layer your unique tech onto our platform via our simple API.", accent: "#f5be0e" },
  { num: "03", title: "Our platform", heading: "Power", body: "Scale your offering with superior banking infrastructure.", accent: "#85eda5" },
  { num: "04", title: "Our bank license", heading: "Secure", body: "Protect your customer’s money with our regulatory cover.", accent: "#f35c95" },
];
const N = STEPS.length;
const LAYERS = ["app", "tech", "platform", "license"];

/** Resting offset (viewBox units) of layer i while `active` is shown (null = intro). */
function restY(i: number, active: number | null) {
  if (active === null) return 105 * (i - 1.5);
  if (i === active) return 0;
  const n = i - active;
  return Math.sign(n) * (320 + 60 * (Math.abs(n) - 1));
}

/** Layer offsets at step position l — each step's rest pose is reached at its midpoint. */
function layerOffsets(l: number) {
  const u = Math.max(0, Math.min(N, l + 0.5));
  const seg = Math.min(Math.floor(u), N - 1);
  const a = u - seg;
  const from = seg === 0 ? null : seg - 1;
  return LAYERS.map((_, i) => restY(i, from) + (restY(i, seg) - restY(i, from)) * a);
}

function stepAt(l: number) {
  if (l < 0) return { idx: 0, t: 0 };
  return { idx: Math.min(1 + Math.floor(l), N), t: Math.min(1, l - Math.floor(l)) };
}

const PANEL_H = 14 + 8 + 44 + 12 + 56;
const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const SERIF = "var(--font-artifact-serif), Georgia, serif";

function stageCss(id: string) {
  const g = `.pstk-${id}`;
  return `
${g} .stackLayer{transform-box:view-box;transform-origin:50% 50%}
${g} .layerArt *{transition:fill .4s ease-out,stroke .4s ease-out}
${g} .stackLayer[data-state="active"] .layerArt{--color-stone-900:#959089}
${g} .stackLayer[data-state="active"] [fill="url(#${id}a)"]{fill:url(#${id}aon)}
${g} .stackLayer[data-state="active"] [fill="url(#${id}c)"]{fill:url(#${id}con)}
${g} .stackLayer[data-state="active"] [fill="url(#${id}d)"]{fill:url(#${id}don)}
${g} .layerAnnotations{pointer-events:none}
${g} .layerAnnotations circle,${g} .layerAnnotations path:not([pathLength]):not([pathlength]){opacity:0}
${g} .layerAnnotations path[pathLength],${g} .layerAnnotations path[pathlength]{stroke-dasharray:1;stroke-dashoffset:1}
${g} .stackLayer[data-state="active"] .layerAnnotations circle,
${g} .stackLayer[data-state="active"] .layerAnnotations path:not([pathLength]):not([pathlength]){animation:pstk-fade .3s ease-out .6s forwards}
${g} .stackLayer[data-state="active"] .layerAnnotations path[pathLength],
${g} .stackLayer[data-state="active"] .layerAnnotations path[pathlength]{animation:pstk-draw .55s ease-out .1s forwards}
${g} .pstk-enter{animation:pstk-enter .5s ease-out both}
${g} .pstk-wipe{animation:pstk-wipe .5s ease-out .05s both}
${g} .pstk-d1{animation-delay:.06s}${g} .pstk-d2{animation-delay:.12s}
@keyframes pstk-fade{to{opacity:1}}
@keyframes pstk-draw{to{stroke-dashoffset:0}}
@keyframes pstk-enter{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@keyframes pstk-wipe{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
@media (prefers-reduced-motion:reduce){${g} *{animation-duration:1ms!important;animation-delay:0s!important;transition:none!important}}
`;
}

/** The composition itself, driven by a ref holding the step position. */
export function PlatformStackStage({
  progress,
  className,
  artOnly = false,
}: {
  progress: RefObject<number>;
  className?: string;
  /** Crop to the illustration column (800×900). */
  artOnly?: boolean;
}) {
  const id = "p" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const boxRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [idx, setIdx] = useState(0);
  const markup = useMemo(() => STACK_MARKUP.replaceAll("__ID__", id), [id]);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const fit = () => setScale(Math.min(box.clientWidth / (artOnly ? 800 : W), box.clientHeight / H));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    return () => ro.disconnect();
  }, [artOnly]);

  useEffect(() => {
    const box = boxRef.current;
    const svg = svgRef.current;
    if (!box || !svg) return;
    // The art is injected here, once, rather than through React props — React
    // would re-apply it on every render and drop the nodes being animated.
    svg.innerHTML = markup;
    const groups = LAYERS.map((name) => svg.querySelector<SVGGElement>(`[data-layer="${name}"]`));
    let raf = 0;
    let last = NaN;
    let lastIdx = -1;

    const apply = () => {
      const l = progress.current ?? -1;
      if (l === last) return;
      last = l;
      const ys = layerOffsets(l);
      const { idx: k, t } = stepAt(l);
      groups.forEach((g, i) => {
        if (!g) return;
        g.setAttribute("transform", `translate(0 ${ys[i].toFixed(2)})`);
        g.setAttribute("data-state", k === 0 ? "all" : k - 1 === i ? "active" : "inactive");
      });
      // Beam on the rail: grows down from the marker (first step), fills the
      // rail (middle steps), or grows from the top into the marker (last step).
      const beam = beamRef.current;
      if (beam) {
        const markerY = H / 2 - (PANEL_H + (k === N ? 68 : 0)) / 2 + 7;
        const c = markerY / H;
        if (k === 0) beam.style.height = "0px";
        else {
          const acc = STEPS[k - 1].accent;
          const top = k === 1 ? markerY : 0;
          const end = k === 1 ? c + (1 - c) * t : k === N ? c * t : t;
          beam.style.top = `${top}px`;
          beam.style.height = `${Math.max(0, end * H - top)}px`;
          beam.style.background = k === 1 ? acc : `linear-gradient(to bottom, transparent, ${acc} 200px)`;
        }
      }
      if (k !== lastIdx) {
        lastIdx = k;
        setIdx(k);
      }
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      apply();
    };
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) raf = requestAnimationFrame(tick);
      else apply();
    });
    io.observe(box);
    apply();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [progress, markup]);

  const step = idx > 0 ? STEPS[idx - 1] : null;

  return (
    <div ref={boxRef} className={`pstk-${id} overflow-hidden ${className ?? "relative"}`}>
      <style>{stageCss(id)}</style>
      <div
        className="absolute left-1/2 top-1/2 text-[#f9f5ef]"
        style={{
          width: W,
          height: H,
          // artOnly: shift so the illustration column (x 640–1440) is centred.
          transform: `translate(-50%, -50%) scale(${scale}) translateX(${artOnly ? -320 : 0}px)`,
          opacity: scale ? 1 : 0,
        }}
      >
        <div className="absolute inset-y-0 left-0" style={{ width: 640 }}>
          <div aria-hidden className="absolute bg-[#262523]" style={{ left: 48, top: 0, width: 1, height: H }} />
          <div ref={beamRef} aria-hidden className="absolute" style={{ left: 48, top: 0, width: 1, height: 0 }} />

          <ul className="absolute flex flex-col" style={{ left: 88, top: 96 }}>
            {STEPS.slice(0, Math.max(0, idx - 1)).map((s) => (
              <NavItem key={s.num} step={s} />
            ))}
          </ul>

          <div className="absolute flex flex-col justify-center" style={{ left: 88, right: 40, top: 0, height: H }}>
            {step ? (
              <div key={idx} className="relative flex flex-col">
                <span
                  aria-hidden
                  className="absolute rounded-full"
                  style={{ left: -44.5, top: 3, width: 8, height: 8, background: step.accent, boxShadow: `0 0 0 4px ${step.accent}4d` }}
                />
                <div className="pstk-wipe flex gap-3 uppercase" style={{ fontFamily: MONO, fontSize: 14, lineHeight: "14px", letterSpacing: "0.84px" }}>
                  <span className="text-[#959089]">{step.num}</span>
                  <span className="text-[#d4cfc6]">{step.title}</span>
                </div>
                <p className="pstk-enter pstk-d1" style={{ marginTop: 8, fontFamily: SERIF, fontWeight: 300, fontSize: 40, lineHeight: "44px", letterSpacing: "-1px" }}>
                  {step.heading}
                </p>
                <p className="pstk-enter pstk-d2" style={{ marginTop: 12, maxWidth: "40ch", fontSize: 20, lineHeight: "28px", fontWeight: 300 }}>
                  {step.body}
                </p>
                {idx === N && (
                  <span
                    className="pstk-enter pstk-d2 inline-flex items-center gap-2 self-start rounded-full border border-[#514e4b] px-5 uppercase"
                    style={{ marginTop: 24, height: 44, fontFamily: MONO, fontSize: 12, letterSpacing: "0.72px" }}
                  >
                    Contact sales <span aria-hidden>→</span>
                  </span>
                )}
              </div>
            ) : (
              <div key="intro" className="flex flex-col" style={{ maxWidth: 520 }}>
                <p className="pstk-enter" style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 40, lineHeight: "44px", letterSpacing: "-1px" }}>
                  Banking infrastructure built to <em>evolve</em>
                </p>
                <p className="pstk-enter pstk-d1" style={{ marginTop: 12, maxWidth: "40ch", fontSize: 20, lineHeight: "28px", fontWeight: 300 }}>
                  Our own core banking platform and license means we adapt as quickly as money changes. Agentic finance.
                  Stablecoins. Whatever comes next.
                </p>
              </div>
            )}
          </div>

          <ul className="absolute flex flex-col" style={{ left: 88, bottom: 96 }}>
            {STEPS.slice(idx).map((s) => (
              <NavItem key={s.num} step={s} />
            ))}
          </ul>
        </div>

        <div className="absolute inset-y-0 right-0" style={{ width: 800 }}>
          <svg
            ref={svgRef}
            viewBox={STACK_VIEWBOX}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
            className="absolute left-1/2 top-1/2 overflow-visible"
            style={{ width: 600, height: 517, transform: "translate(-50%, -50%)" }}
          />
        </div>
      </div>
    </div>
  );
}

function NavItem({ step }: { step: (typeof STEPS)[number] }) {
  return (
    <li className="relative flex items-center gap-3 uppercase" style={{ height: 44, fontFamily: MONO, fontSize: 14, letterSpacing: "0.84px" }}>
      <span
        aria-hidden
        className="absolute box-border rounded-full border border-[#514e4b] bg-[#0c0c0b]"
        style={{ left: -44.5, top: "50%", width: 8, height: 8, marginTop: -4 }}
      />
      <span className="text-[#514e4b]">{step.num}</span>
      <span className="text-[#959089]">{step.title}</span>
    </li>
  );
}

// ---------------------------------------------------------------------------
// Autoplay: the section inside a browser frame, scrolling itself on a loop.

const INTRO = -0.8;
const TIMELINE: { to: number; move: number; hold: number }[] = [
  { to: INTRO, move: 0, hold: 1.4 },
  { to: 0.5, move: 1.2, hold: 1.9 },
  { to: 1.5, move: 1.2, hold: 1.9 },
  { to: 2.5, move: 1.2, hold: 1.9 },
  { to: 3.5, move: 1.2, hold: 2.4 },
  { to: INTRO, move: 1.6, hold: 0 },
];
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

export function PlatformStackAutoplay({ className, url = "griffin.com" }: { className?: string; url?: string }) {
  const progress = useRef(INTRO);
  const frameRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      progress.current = 1.5;
      return;
    }
    const total = TIMELINE.reduce((s, k) => s + k.move + k.hold, 0);
    let raf = 0;
    let t0 = performance.now();
    let pausedAt = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      let t = ((now - t0) / 1000) % total;
      let from = TIMELINE[TIMELINE.length - 1].to;
      let l = INTRO;
      for (const k of TIMELINE) {
        if (t < k.move) {
          l = from + (k.to - from) * ease(t / k.move);
          break;
        }
        t -= k.move;
        if (t < k.hold) {
          l = k.to;
          break;
        }
        t -= k.hold;
        from = k.to;
      }
      progress.current = l;
      if (thumbRef.current) thumbRef.current.style.transform = `translateY(${((l - INTRO) / (N - INTRO)) * 260}%)`;
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        t0 += pausedAt ? performance.now() - pausedAt : 0;
        pausedAt = 0;
        raf = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(raf);
        pausedAt = performance.now();
      }
    });
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={frameRef} className={`overflow-hidden rounded-[10px] border border-white/10 bg-[#0c0c0b] ${className ?? ""}`}>
      <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-[#141413] px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="mx-auto rounded-md bg-white/[0.06] px-8 py-1 font-mono text-[11px] text-white/45">{url}</span>
        <span className="w-[42px]" />
      </div>
      <div className="relative aspect-[1440/900]">
        <PlatformStackStage progress={progress} className="absolute inset-0" />
        <div aria-hidden className="absolute bottom-2 right-1.5 top-2 w-[3px] rounded-full bg-white/[0.04]">
          <div ref={thumbRef} className="h-[28%] w-full rounded-full bg-white/25" />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Live: a real sticky section driven by the page scroll, as on griffin.com.

export function PlatformStackScroll({ className }: { className?: string }) {
  const progress = useRef(INTRO);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    const read = () => {
      const vh = window.innerHeight;
      const p = -el.getBoundingClientRect().top;
      progress.current = (p - 0.4 * vh) / (0.7 * vh);
    };
    const tick = () => {
      raf = requestAnimationFrame(tick);
      read();
    };
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    read();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className={`relative ${className ?? ""}`} style={{ height: "420vh" }}>
      <div className="sticky top-0 h-screen">
        <PlatformStackStage progress={progress} className="relative h-full w-full" />
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Still: the stage frozen at one step position (for shots).

export function PlatformStackStill({ l, className }: { l: number; className?: string }) {
  const progress = useRef(l);
  return <PlatformStackStage progress={progress} className={className ?? "absolute inset-0"} />;
}

// ---------------------------------------------------------------------------
// Process figures.

const POSES = [
  { l: INTRO, label: "Intro" },
  ...STEPS.map((s, k) => ({ l: k + 0.5, label: `${s.num} · ${s.title}` })),
];

/** The five rest poses the scroll interpolates between. */
export function PlatformStackPoses() {
  return (
    <div className="grid h-full grid-cols-2 gap-3 p-3 sm:grid-cols-3 lg:grid-cols-5">
      {POSES.map((p) => (
        <Pose key={p.label} l={p.l} label={p.label} />
      ))}
    </div>
  );
}

function Pose({ l, label }: { l: number; label: string }) {
  const progress = useRef(l);
  return (
    <figure className="flex flex-col gap-2">
      <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-white/10 bg-[#0c0c0b]">
        <PlatformStackStage progress={progress} className="absolute inset-0" artOnly />
      </div>
      <figcaption className="font-mono text-[10px] uppercase tracking-[0.06em] text-white/45">{label}</figcaption>
    </figure>
  );
}

/** Each layer's vertical offset across the section's scroll distance. */
export function PlatformStackTimeline() {
  const VW = 1000, VH = 300, top = 40, plotH = 200;
  const span = 3.2; // scrollable distance in viewports: 0.4 intro + 4 × 0.7
  const x = (vp: number) => (vp / span) * VW;
  const y = (off: number) => top + plotH / 2 + (off / 520) * (plotH / 2);
  const curves = LAYERS.map((_, i) => {
    let d = "";
    for (let s = 0; s <= 160; s++) {
      const vp = (s / 160) * span;
      const l = (vp - 0.4) / 0.7;
      d += `${s ? "L" : "M"}${x(vp).toFixed(1)} ${y(layerOffsets(l)[i]).toFixed(1)}`;
    }
    return d;
  });
  const bounds = [0, 0.4, 1.1, 1.8, 2.5, 3.2];
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="h-full w-full" role="img" aria-label="Layer offsets across the scroll distance">
      {bounds.slice(0, -1).map((b, k) => (
        <g key={k}>
          <rect x={x(b)} y={top} width={x(bounds[k + 1]) - x(b)} height={plotH} fill={k ? STEPS[k - 1].accent : "#f9f5ef"} opacity={0.035 + (k % 2) * 0.02} />
          <text x={x(b) + 8} y={top - 14} fill="#959089" fontSize="12" fontFamily="ui-monospace, monospace" letterSpacing="0.7">
            {k ? `${STEPS[k - 1].num} ${STEPS[k - 1].title.toUpperCase()}` : "INTRO"}
          </text>
          {k > 0 && <line x1={x(b + 0.35)} x2={x(b + 0.35)} y1={top} y2={top + plotH} stroke="#f9f5ef" strokeOpacity="0.18" strokeDasharray="3 4" />}
        </g>
      ))}
      <line x1="0" x2={VW} y1={y(0)} y2={y(0)} stroke="#f9f5ef" strokeOpacity="0.25" />
      <text x={VW - 8} y={y(0) - 8} textAnchor="end" fill="#959089" fontSize="11" fontFamily="ui-monospace, monospace">
        CENTRE
      </text>
      {curves.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={STEPS[i].accent} strokeWidth="2" />
      ))}
      <text x="0" y={VH - 12} fill="#959089" fontSize="11" fontFamily="ui-monospace, monospace">
        0
      </text>
      <text x={VW} y={VH - 12} textAnchor="end" fill="#959089" fontSize="11" fontFamily="ui-monospace, monospace">
        3.2 VIEWPORTS OF SCROLL
      </text>
    </svg>
  );
}
