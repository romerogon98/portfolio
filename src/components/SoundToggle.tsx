"use client";

import { useRef } from "react";
import { useSound } from "@/components/SoundProvider";
import ScrambleText, { type ScrambleHandle } from "@/components/ScrambleText";

// The single SOUND[·] switch in the nav. All audio state lives in SoundProvider;
// this is just the control. Always visible now — it governs the hover ticks,
// which exist regardless of whether an ambient track file is present. The word
// scrambles on hover like the nav links; the [·] stays put as the on/off dot.
export default function SoundToggle() {
  const { enabled, toggle } = useSound();
  const scramble = useRef<ScrambleHandle>(null);

  return (
    <button
      type="button"
      onClick={toggle}
      onMouseEnter={() => scramble.current?.scramble()}
      aria-pressed={enabled}
      aria-label={enabled ? "Turn sound off" : "Turn sound on"}
      className="tabular-nums opacity-60 transition-opacity hover:opacity-100"
    >
      <ScrambleText ref={scramble} text="SOUND" hoverTrigger={false} />[
      <span className={enabled ? "text-accent-500" : ""}>
        {enabled ? "•" : "·"}
      </span>
      ]
    </button>
  );
}
