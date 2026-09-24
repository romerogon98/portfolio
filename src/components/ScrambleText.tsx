"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const SWAP_MS = 35; // how often a still-scrambling character flips glyph
const BASE_MS = 140; // scramble time before the centre characters resolve
const STEP_MS = 55; // extra scramble time per step out from the centre

type Cell = { ch: string; done: boolean };
export type ScrambleHandle = { scramble: () => void };

// Scramble-from-centre hover effect, mirroring Motion+'s scrambleText with
// stagger({ from: "center" }): on hover every character cycles random glyphs,
// then settles to its final letter on a stagger that radiates out from the
// middle of the word. Built for the mono/uppercase nav, so it relies on the
// monospace font to keep every glyph the same width (no reflow while cycling).
//
// Set hoverTrigger={false} and drive it through the imperative `scramble()`
// handle when a larger parent (e.g. the SOUND[·] button) should own the hover.
const ScrambleText = forwardRef<
  ScrambleHandle,
  {
    text: string;
    className?: string;
    scrambleClassName?: string;
    hoverTrigger?: boolean;
  }
>(function ScrambleText(
  { text, className = "", scrambleClassName = "", hoverTrigger = true },
  ref
) {
  const [cells, setCells] = useState<Cell[]>(() =>
    text.split("").map((ch) => ({ ch, done: true }))
  );
  const raf = useRef(0);

  const run = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(raf.current);

    const chars = text.split("");
    const center = (chars.length - 1) / 2;
    const glyphs = chars.map(() => CHARS[(Math.random() * CHARS.length) | 0]);
    const start = performance.now();
    let lastSwap = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const swap = now - lastSwap >= SWAP_MS;
      if (swap) lastSwap = now;

      let allDone = true;
      const next = chars.map((ch, i) => {
        if (ch === " ") return { ch: " ", done: true };
        const revealAt = BASE_MS + Math.abs(i - center) * STEP_MS;
        if (elapsed >= revealAt) return { ch, done: true };
        allDone = false;
        if (swap) glyphs[i] = CHARS[(Math.random() * CHARS.length) | 0];
        return { ch: glyphs[i], done: false };
      });
      setCells(next);

      if (!allDone) raf.current = requestAnimationFrame(tick);
      else setCells(chars.map((c) => ({ ch: c, done: true })));
    };
    raf.current = requestAnimationFrame(tick);
  };

  // Keep the imperative handle pointed at the latest closure so parents can
  // start the scramble on their own hover.
  const runRef = useRef(run);
  runRef.current = run;
  useImperativeHandle(ref, () => ({ scramble: () => runRef.current() }), []);

  // Re-sync to the resolved text whenever it changes (e.g. a locale switch),
  // and stop any in-flight scramble.
  useEffect(() => {
    cancelAnimationFrame(raf.current);
    setCells(text.split("").map((ch) => ({ ch, done: true })));
    return () => cancelAnimationFrame(raf.current);
  }, [text]);

  return (
    <span onMouseEnter={hoverTrigger ? run : undefined} className={className}>
      {cells.map((c, i) => (
        <span key={i} className={c.done ? undefined : scrambleClassName}>
          {c.ch}
        </span>
      ))}
    </span>
  );
});

export default ScrambleText;
