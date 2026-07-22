"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@/#%";

type Cell = { ch: string; done: boolean };

// Terminal-style "decode": the label resolves left-to-right out of scrambling
// glyphs. Characters still decoding are rendered with `scrambleClassName`
// (e.g. brand orange); resolved characters inherit the surrounding colour.
// Runs on mount and on hover, and optionally re-runs on an interval.
export default function DecodeText({
  text,
  className = "",
  scrambleClassName = "",
  intervalMs,
}: {
  text: string;
  className?: string;
  scrambleClassName?: string;
  intervalMs?: number;
}) {
  const [cells, setCells] = useState<Cell[]>(() =>
    text.split("").map((ch) => ({ ch, done: true }))
  );
  const raf = useRef(0);

  const run = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(raf.current);
    let frame = 0;
    const tick = () => {
      const revealed = Math.floor(frame / 4); // slow enough to read the scramble
      setCells(
        text.split("").map((ch, i) => {
          if (ch === " ") return { ch: " ", done: true };
          if (i < revealed) return { ch, done: true };
          return { ch: GLYPHS[(Math.random() * GLYPHS.length) | 0], done: false };
        })
      );
      frame += 1;
      if (revealed < text.length) raf.current = requestAnimationFrame(tick);
      else setCells(text.split("").map((ch) => ({ ch, done: true })));
    };
    raf.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    run();
    const id = intervalMs ? setInterval(run, intervalMs) : undefined;
    return () => {
      cancelAnimationFrame(raf.current);
      if (id) clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span onMouseEnter={run} className={className}>
      {cells.map((c, i) => (
        <span key={i} className={c.done ? undefined : scrambleClassName}>
          {c.ch}
        </span>
      ))}
    </span>
  );
}
