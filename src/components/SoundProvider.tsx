"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// Single global sound switch for the whole site (haoqi.design-style SOUND[·]).
// Off by default — browsers block audio until a user gesture anyway, and the
// SOUND toggle click is that gesture. While enabled it drives two layers:
//
//   1. Hover ticks — a short synthesized blip on every interactive element,
//      wired once here via a delegated pointer listener (no per-component code).
//   2. An optional ambient loop at /audio/ambient.mp3, faded in/out. If the file
//      isn't present it simply never plays; the toggle still governs the ticks.
//
// PLACEHOLDER: the tick is synthesized with the Web Audio API so nothing needs
// to be downloaded yet. To ship a real one, drop a file and swap the marked
// block in `playTick` for buffer playback — that's the only edit needed.

const AMBIENT_TRACK = "/audio/ambient.mp3";
const AMBIENT_MAX_VOLUME = 0.35;
const AMBIENT_FADE_MS = 700;

// Elements that should tick on hover, and an opt-out for regions that shouldn't.
const TICK_SELECTOR = "a[href], button, [role='button'], summary, [data-tick]";
const NO_TICK_SELECTOR = "[data-no-tick]";

type SoundContextValue = {
  enabled: boolean;
  toggle: () => void;
  playTick: () => void;
};

const SoundContext = createContext<SoundContextValue>({
  enabled: false,
  toggle: () => {},
  playTick: () => {},
});

export function useSound() {
  return useContext(SoundContext);
}

export default function SoundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [enabled, setEnabled] = useState(false);

  // Refs let the stable, mount-once listener read live state without re-binding.
  const enabledRef = useRef(false);
  const acRef = useRef<AudioContext | null>(null);
  const ambientRef = useRef<HTMLAudioElement | null>(null);
  const ambientAvailable = useRef(false);
  const fadeRaf = useRef(0);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  // Lazily create/resume the shared AudioContext. Must run from a user gesture,
  // so it's only ever called out of `toggle`.
  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!acRef.current) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) return null;
      acRef.current = new Ctor();
    }
    if (acRef.current.state === "suspended") void acRef.current.resume();
    return acRef.current;
  }, []);

  const playTick = useCallback(() => {
    if (!enabledRef.current) return;
    const ac = acRef.current;
    if (!ac || ac.state !== "running") return;

    // ---- PLACEHOLDER TICK (Web Audio synth) --------------------------------
    // A short, gentle blip that pitches down for a "tick" feel. Replace this
    // block with AudioBufferSourceNode playback of your own sample later.
    const now = ac.currentTime;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(1500, now);
    osc.frequency.exponentialRampToValueAtTime(680, now + 0.03);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.05, now + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
    osc.connect(gain).connect(ac.destination);
    osc.start(now);
    osc.stop(now + 0.06);
    // ------------------------------------------------------------------------
  }, []);

  // Prepare the optional ambient loop once. Mirrors the "drop a file and it just
  // works" pattern: no file → never marked available → never plays.
  useEffect(() => {
    const audio = new Audio(AMBIENT_TRACK);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    ambientRef.current = audio;

    const onReady = () => {
      ambientAvailable.current = true;
    };
    const onError = () => {
      ambientAvailable.current = false;
    };
    audio.addEventListener("canplaythrough", onReady);
    audio.addEventListener("error", onError);

    return () => {
      cancelAnimationFrame(fadeRaf.current);
      audio.pause();
      audio.removeEventListener("canplaythrough", onReady);
      audio.removeEventListener("error", onError);
      ambientRef.current = null;
    };
  }, []);

  const fadeAmbientTo = useCallback((target: number) => {
    const audio = ambientRef.current;
    if (!audio) return;
    cancelAnimationFrame(fadeRaf.current);
    const from = audio.volume;
    const start = performance.now();
    const step = (nowMs: number) => {
      const a = ambientRef.current;
      if (!a) return;
      const k = Math.min(1, (nowMs - start) / AMBIENT_FADE_MS);
      a.volume = from + (target - from) * k;
      if (k < 1) fadeRaf.current = requestAnimationFrame(step);
      else if (target === 0) a.pause();
    };
    fadeRaf.current = requestAnimationFrame(step);
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      enabledRef.current = next;

      if (next) {
        // Unlock audio for the ticks (this call runs inside the click gesture).
        getAudioContext();
        const audio = ambientRef.current;
        if (audio && ambientAvailable.current) {
          audio.volume = 0;
          audio
            .play()
            .then(() => fadeAmbientTo(AMBIENT_MAX_VOLUME))
            .catch(() => {
              // Autoplay/codec rejection — ticks still work, so ignore.
            });
        }
      } else {
        fadeAmbientTo(0);
      }

      return next;
    });
  }, [getAudioContext, fadeAmbientTo]);

  // One delegated hover listener for the whole document. Self-gates on
  // `enabledRef`, so it's cheap while sound is off and never needs re-binding.
  useEffect(() => {
    let lastHovered: Element | null = null;

    const onPointerOver = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      const target = event.target as Element | null;
      if (!target || typeof target.closest !== "function") return;
      if (target.closest(NO_TICK_SELECTOR)) {
        lastHovered = null;
        return;
      }
      const el = target.closest(TICK_SELECTOR);
      if (!el) {
        lastHovered = null;
        return;
      }
      if (el === lastHovered) return;
      lastHovered = el;
      playTick();
    };

    document.addEventListener("pointerover", onPointerOver);
    return () => document.removeEventListener("pointerover", onPointerOver);
  }, [playTick]);

  return (
    <SoundContext.Provider value={{ enabled, toggle, playTick }}>
      {children}
    </SoundContext.Provider>
  );
}
