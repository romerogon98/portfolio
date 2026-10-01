"use client";

import { useEffect, useRef, useState } from "react";
import AsciiNoisePlayground from "@/components/AsciiNoisePlayground";

// The ASCII controller shown as a live but inert "screenshot": rendered at a
// fixed desktop size, scaled to fit its frame, with every control disabled so
// it reads as documentation of the tool rather than a usable one.
const W = 1440;
const H = 900;

export default function AsciiControllerShot() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const fit = () => setScale(Math.min(box.clientWidth / W, box.clientHeight / H));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={boxRef} className="absolute inset-0 overflow-hidden bg-[#0c0c0b]" aria-hidden>
      <div
        inert
        className="pointer-events-none absolute left-1/2 top-1/2 select-none p-8"
        style={{ width: W, height: H, transform: `translate(-50%, -50%) scale(${scale})`, opacity: scale ? 1 : 0 }}
      >
        <AsciiNoisePlayground height={H - 64} />
      </div>
    </div>
  );
}
