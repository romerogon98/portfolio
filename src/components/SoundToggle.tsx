"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Ambient background track, toggled from the nav (haoqi.design-style SOUND[·]).
// Drop your own loop at this path — browsers block autoplay, so it only ever
// starts from this button, and the whole control hides itself when no file is
// present so a missing track never ships a dead button.
const TRACK = "/audio/ambient.mp3";
const MAX_VOLUME = 0.35;
const FADE_MS = 700;

export default function SoundToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef(0);
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(TRACK);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audioRef.current = audio;

    const onReady = () => setAvailable(true);
    const onError = () => setAvailable(false);
    audio.addEventListener("canplaythrough", onReady);
    audio.addEventListener("error", onError);

    return () => {
      cancelAnimationFrame(rafRef.current);
      audio.pause();
      audio.removeEventListener("canplaythrough", onReady);
      audio.removeEventListener("error", onError);
      audioRef.current = null;
    };
  }, []);

  const fadeTo = useCallback((target: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    cancelAnimationFrame(rafRef.current);
    const from = audio.volume;
    const start = performance.now();
    const step = (now: number) => {
      const a = audioRef.current;
      if (!a) return;
      const k = Math.min(1, (now - start) / FADE_MS);
      a.volume = from + (target - from) * k;
      if (k < 1) rafRef.current = requestAnimationFrame(step);
      else if (target === 0) a.pause();
    };
    rafRef.current = requestAnimationFrame(step);
  }, []);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      setPlaying(false);
      fadeTo(0);
      return;
    }
    try {
      audio.volume = 0;
      await audio.play();
      setPlaying(true);
      fadeTo(MAX_VOLUME);
    } catch {
      // Autoplay/codec rejection — leave it off rather than surfacing an error.
    }
  }, [playing, fadeTo]);

  if (!available) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Turn sound off" : "Turn sound on"}
      className="tabular-nums opacity-60 transition-opacity hover:opacity-100"
    >
      SOUND[
      <span className={playing ? "text-accent-500" : ""}>
        {playing ? "•" : "·"}
      </span>
      ]
    </button>
  );
}
