"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import { clsx } from "clsx";
import AsciiNoiseField, { type AsciiSnapshot } from "@/components/AsciiNoiseField";
import {
  PRESETS,
  resolveConfig,
  type AsciiNoiseConfig,
  type PresetName,
} from "@/lib/asciiNoise";

// Interactive controller for <AsciiNoiseField>: every engine parameter exposed
// as a control, plus presets and a "Copy JSON" that yields a config you can
// paste straight into the component.

type NumKey = { [K in keyof AsciiNoiseConfig]: AsciiNoiseConfig[K] extends number ? K : never }[keyof AsciiNoiseConfig];
type Option<T extends string> = { id: T; label: string };

const PRESET_LABELS: Record<PresetName, string> = {
  ledger: "Ledger",
  currency: "$ £ Currency",
  terminal: "Terminal",
  topo: "Topographic",
  cells: "Cells",
  silk: "Silk",
  binary: "Binary",
};

const TYPES: Option<AsciiNoiseConfig["type"]>[] = [
  { id: "fbm", label: "Fractal" },
  { id: "turbulent", label: "Turbulent" },
  { id: "ridged", label: "Ridged" },
  { id: "cellular", label: "Cellular" },
  { id: "warp", label: "Warp" },
  { id: "waves", label: "Waves" },
  { id: "plasma", label: "Sine" },
];
const MAPPINGS: Option<AsciiNoiseConfig["mapping"]>[] = [
  { id: "ramp", label: "Brightness → ramp" },
  { id: "contour", label: "Contour lines" },
];
const COLOR_MODES: Option<AsciiNoiseConfig["colorMode"]>[] = [
  { id: "mono", label: "Mono" },
  { id: "twotone", label: "Two-tone" },
  { id: "gradient", label: "Gradient" },
  { id: "steps", label: "Stepped" },
];
const CURSORS: Option<AsciiNoiseConfig["cursor"]>[] = [
  { id: "off", label: "Off" },
  { id: "lens", label: "Lens" },
  { id: "repel", label: "Repel" },
  { id: "swirl", label: "Swirl" },
];
const RAMPS = [
  { label: "·/$£", chars: "·/$£" },
  { label: "·.:$£", chars: " ·.:$£" },
  { label: ".:=+#@", chars: " .:-=+*#%@" },
  { label: "░▒▓█", chars: " ░▒▓█" },
  { label: "0 1", chars: "  01" },
  { label: ".·•●", chars: " .·•●" },
];

type SliderDef = { key: NumKey; label: string; min: number; max: number; step: number; fmt?: (v: number) => string };
const f2 = (v: number) => v.toFixed(2);
const px = (v: number) => `${v} px`;
const times = (v: number) => `×${v.toFixed(2)}`;

const NOISE_SLIDERS: SliderDef[] = [
  { key: "scale", label: "Scale", min: 40, max: 800, step: 1, fmt: px },
  { key: "octaves", label: "Complexity (octaves)", min: 1, max: 6, step: 1 },
  { key: "contrast", label: "Contrast", min: 0.2, max: 5, step: 0.05, fmt: f2 },
  { key: "brightness", label: "Brightness", min: -0.6, max: 0.6, step: 0.01, fmt: f2 },
  { key: "evolution", label: "Evolution (speed)", min: 0, max: 2, step: 0.01, fmt: f2 },
  { key: "drift", label: "Drift (speed)", min: 0, max: 3, step: 0.01, fmt: f2 },
  { key: "angle", label: "Direction", min: 0, max: 360, step: 1, fmt: (v) => `${v}°` },
  { key: "frameSkip", label: "Frame skip", min: 1, max: 6, step: 1, fmt: (v) => (v === 1 ? "smooth" : `1 in ${v}`) },
];
const CONTOUR_SLIDERS: SliderDef[] = [
  { key: "spacing", label: "Contour spacing", min: 0.02, max: 0.3, step: 0.005, fmt: f2 },
  { key: "lineWidth", label: "Line width", min: 0.04, max: 0.6, step: 0.01, fmt: f2 },
  { key: "slope", label: "Slope glow", min: 0, max: 3, step: 0.05, fmt: f2 },
];
const CHAR_SLIDERS: SliderDef[] = [
  { key: "cell", label: "Font size", min: 8, max: 36, step: 1, fmt: px },
  { key: "tracking", label: "Cell width", min: 0.5, max: 1.5, step: 0.01, fmt: times },
  { key: "leading", label: "Cell height", min: 0.8, max: 1.8, step: 0.01, fmt: times },
  { key: "minT", label: "Min threshold", min: 0, max: 0.6, step: 0.01, fmt: f2 },
  { key: "gamma", label: "Ramp curve", min: 0.3, max: 3, step: 0.05, fmt: f2 },
];
const CURSOR_SLIDERS: SliderDef[] = [
  { key: "radius", label: "Radius", min: 40, max: 420, step: 1, fmt: px },
  { key: "strength", label: "Strength", min: 0, max: 2, step: 0.01, fmt: f2 },
];

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-3.5 border-t border-white/10 pt-5 first:border-t-0 first:pt-0">
      <legend className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/55">{title}</legend>
      {children}
    </fieldset>
  );
}

function Chips<T extends string>({
  options,
  value,
  onPick,
  cols = 3,
}: {
  options: Option<T>[];
  value: T | null;
  onPick: (id: T) => void;
  cols?: 2 | 3 | 4;
}) {
  return (
    <div className={clsx("grid gap-2", cols === 2 && "grid-cols-2", cols === 3 && "grid-cols-3", cols === 4 && "grid-cols-4")}>
      {options.map((o) => {
        const on = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={on}
            onClick={() => onPick(o.id)}
            className={clsx(
              "min-h-11 rounded-lg border px-2.5 py-2 text-left font-mono text-xs transition-colors",
              on ? "border-accent-500 bg-accent-500 text-black" : "border-white/15 text-white/85 hover:border-white/35",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function Slider({ def, value, onChange }: { def: SliderDef; value: number; onChange: (v: number) => void }) {
  const id = `ascii-${def.key}`;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between gap-3 font-mono text-xs">
        <label htmlFor={id} className="text-white/80">
          {def.label}
        </label>
        <span className="tabular-nums text-white/50">{def.fmt ? def.fmt(value) : value}</span>
      </div>
      <input
        id={id}
        type="range"
        min={def.min}
        max={def.max}
        step={def.step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="h-6 w-full accent-accent-500"
      />
    </div>
  );
}

function ColorInput({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-mono text-xs text-white/80">
        {label}
      </label>
      <input
        id={id}
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full cursor-pointer rounded-lg border border-white/15 bg-transparent p-1"
      />
    </div>
  );
}

export default function AsciiNoisePlayground({
  initialPreset = "ledger",
  height,
}: {
  initialPreset?: PresetName;
  /** Fixed pixel height with the desktop two-column layout — for framed, scaled showcase shots. */
  height?: number;
}) {
  const [preset, setPreset] = useState<PresetName | null>(initialPreset);
  const [cfg, setCfg] = useState<AsciiNoiseConfig>(() => resolveConfig(initialPreset));
  const [playing, setPlaying] = useState(true);
  const [stats, setStats] = useState("Loading field…");
  const [copied, setCopied] = useState("");
  const [snapScale, setSnapScale] = useState<"1" | "2" | "3">("2");
  const [pngMsg, setPngMsg] = useState("");
  const snapshot = useRef<AsciiSnapshot | null>(null);

  const set = (patch: Partial<AsciiNoiseConfig>) => {
    setPreset(null);
    setCfg((c) => ({ ...c, ...patch }));
  };
  const pickPreset = (id: PresetName) => {
    setPreset(id);
    setCfg((c) => ({ ...resolveConfig(id), seed: c.seed }));
  };
  const onStats = useCallback(
    (s: { cols: number; rows: number; fps: number }) => setStats(`${s.cols} × ${s.rows} cells · ${s.fps} fps`),
    [],
  );
  const copy = async () => {
    const done = (msg: string) => {
      setCopied(msg);
      setTimeout(() => setCopied(""), 1600);
    };
    try {
      await navigator.clipboard.writeText(JSON.stringify(cfg, null, 2));
      done("Copied");
    } catch {
      done("No access");
    }
  };

  const fileName = () => `ascii-noise-${preset ?? "custom"}-${cfg.seed}.png`;
  const saveBlob = (blob: Blob | null) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName();
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };
  const downloadPng = async () => {
    saveBlob((await snapshot.current?.(Number(snapScale))) ?? null);
    setPngMsg("Saved ✓");
    setTimeout(() => setPngMsg(""), 1800);
  };

  const slider = (d: SliderDef) => <Slider key={d.key} def={d} value={cfg[d.key]} onChange={(v) => set({ [d.key]: v })} />;
  const presetOptions = (Object.keys(PRESETS) as PresetName[]).map((id) => ({ id, label: PRESET_LABELS[id] }));

  return (
    <div
      className={`grid overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b] ${
        height ? "grid-cols-[minmax(0,1fr)_380px]" : "lg:grid-cols-[minmax(0,1fr)_380px]"
      }`}
    >
      <div className={height ? "relative" : "relative h-[62vh] min-h-[420px] lg:h-[78vh]"} style={height ? { height } : undefined}>
        <AsciiNoiseField config={cfg} paused={!playing} onStats={onStats} snapshotRef={snapshot} />
        <div className="pointer-events-none absolute bottom-4 left-4 rounded-md bg-black/70 px-3 py-2 font-mono text-[11px] tracking-[0.04em] text-white/85">
          {stats}
        </div>
      </div>

      <div
        data-lenis-prevent
        className={
          height
            ? "flex flex-col gap-5 overflow-hidden border-l border-white/10 p-6"
            : "flex flex-col gap-5 border-t border-white/10 p-6 lg:h-[78vh] lg:overflow-y-auto lg:border-l lg:border-t-0"
        }
        style={height ? { height } : undefined}
      >
        <Group title="Presets">
          <Chips options={presetOptions} value={preset} onPick={pickPreset} />
        </Group>

        <Group title="Noise type">
          <Chips options={TYPES} value={cfg.type} onPick={(type) => set({ type })} />
          {NOISE_SLIDERS.map(slider)}
          <Chips
            options={[{ id: "on", label: cfg.invert ? "Invert: on" : "Invert: off" }]}
            value={cfg.invert ? "on" : null}
            onPick={() => set({ invert: !cfg.invert })}
            cols={2}
          />
        </Group>

        <Group title="Mapping">
          <Chips options={MAPPINGS} value={cfg.mapping} onPick={(mapping) => set({ mapping })} cols={2} />
          {cfg.mapping === "contour" && (
            <>
              <p className="font-mono text-xs leading-relaxed text-white/50">
                The noise is read as terrain and sliced into bands: cells on the edge of each band light up and draw isolines.
              </p>
              {CONTOUR_SLIDERS.map(slider)}
            </>
          )}
        </Group>

        <Group title="Characters">
          <Chips
            options={RAMPS.map((r) => ({ id: r.chars, label: r.label }))}
            value={cfg.chars}
            onPick={(chars) => set({ chars })}
          />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="ascii-chars" className="font-mono text-xs text-white/80">
              Ramp (dark → light)
            </label>
            <input
              id="ascii-chars"
              type="text"
              spellCheck={false}
              value={cfg.chars}
              onChange={(e) => set({ chars: e.target.value })}
              className="min-h-11 whitespace-pre rounded-lg border border-white/15 bg-black px-3 py-2 font-mono text-base tracking-[0.2em] text-white"
            />
            <span className="font-mono text-xs leading-relaxed text-white/50">
              The first character fills the darkest areas; a space leaves them empty.
            </span>
          </div>
          {CHAR_SLIDERS.map(slider)}
        </Group>

        <Group title="Color">
          <div className="grid grid-cols-3 gap-2">
            <ColorInput id="ascii-bg" label="Background" value={cfg.bg} onChange={(bg) => set({ bg })} />
            <ColorInput id="ascii-fg" label="Base" value={cfg.fg} onChange={(fg) => set({ fg })} />
            <ColorInput id="ascii-hi" label="Highlights" value={cfg.hi} onChange={(hi) => set({ hi })} />
          </div>
          <Chips options={COLOR_MODES} value={cfg.colorMode} onPick={(colorMode) => set({ colorMode })} cols={2} />
          {slider({ key: "fade", label: "Bottom fade", min: 0, max: 400, step: 1, fmt: px })}
        </Group>

        <Group title="Cursor">
          <Chips options={CURSORS} value={cfg.cursor} onPick={(cursor) => set({ cursor })} cols={4} />
          {CURSOR_SLIDERS.map(slider)}
        </Group>

        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="min-h-11 flex-1 rounded-lg bg-accent-500 px-3 font-mono text-xs font-medium text-black"
          >
            {playing ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            onClick={() => setCfg((c) => ({ ...c, seed: Math.floor(Math.random() * 99999) + 1 }))}
            className="min-h-11 rounded-lg border border-white/15 px-3 font-mono text-xs text-white/85 hover:border-white/35"
          >
            New seed
          </button>
          <button
            type="button"
            onClick={copy}
            className="min-h-11 rounded-lg border border-white/15 px-3 font-mono text-xs text-white/85 hover:border-white/35"
          >
            {copied || "Copy JSON"}
          </button>
        </div>

        <Group title="Snapshot">
          <Chips
            options={[
              { id: "1", label: "1×" },
              { id: "2", label: "2×" },
              { id: "3", label: "3×" },
            ]}
            value={snapScale}
            onPick={setSnapScale}
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={downloadPng}
              className="min-h-11 flex-1 rounded-lg border border-accent-500 px-3 font-mono text-xs font-medium text-accent-500"
            >
              {pngMsg || "Save snapshot"}
            </button>
          </div>
          <p className="font-mono text-xs leading-relaxed text-white/50">
            Saves the current frame as a {snapScale}× PNG, without the stats label.
          </p>
        </Group>
      </div>
    </div>
  );
}
