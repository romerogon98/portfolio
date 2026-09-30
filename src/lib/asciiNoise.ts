// ASCII noise field — a framework-free engine that samples an animated noise map
// per character cell and draws it through a character ramp onto a 2D canvas.
// Same model as After Effects' Fractal Noise: a scalar field in [0,1] that
// evolves over time (z) and drifts in x/y, then gets contrast/brightness,
// optional contour banding ("isolines"), and finally a threshold into glyphs.
//
// Config keys match the JSON exported by the design canvas's "Copy JSON"
// button, so a tuned setup can be pasted straight into <AsciiNoiseField>.

export type NoiseType = "fbm" | "turbulent" | "ridged" | "cellular" | "warp" | "waves" | "plasma";
export type Mapping = "ramp" | "contour";
export type ColorMode = "mono" | "twotone" | "gradient" | "steps";
export type CursorMode = "off" | "lens" | "repel" | "swirl";

export type AsciiNoiseConfig = {
  /** Noise generator. */
  type: NoiseType;
  /** Feature size in px — bigger means larger, calmer shapes. */
  scale: number;
  /** Layers of detail (fBm octaves), 1–6. */
  octaves: number;
  contrast: number;
  brightness: number;
  /** Speed at which the field morphs in place (AE "Evolution"). */
  evolution: number;
  /** Speed at which the field slides across the canvas. */
  drift: number;
  /** Drift direction in degrees. */
  angle: number;
  invert: boolean;
  /** "ramp" maps brightness straight to glyphs; "contour" slices it into isolines. */
  mapping: Mapping;
  /** Contour band height, in field units (0–1). */
  spacing: number;
  /** Portion of each band drawn as a lit line (0–1). */
  lineWidth: number;
  /** Extra glow on steep contour lines. */
  slope: number;
  /** Glyph ramp, darkest → lightest. A leading space leaves dark areas empty. */
  chars: string;
  /** Font size in px. */
  cell: number;
  /** Cell width as a multiple of the font size. */
  tracking: number;
  /** Cell height as a multiple of the font size. */
  leading: number;
  /** Values at or below this stay empty. */
  minT: number;
  /** Ramp curve: <1 pushes cells toward brighter glyphs, >1 toward darker. */
  gamma: number;
  bg: string;
  fg: string;
  hi: string;
  colorMode: ColorMode;
  /** Height in px of the fade-out at the bottom edge. */
  fade: number;
  cursor: CursorMode;
  radius: number;
  strength: number;
  /** Draw 1 of every N frames — >1 gives a steppy, terminal-like motion. */
  frameSkip: number;
  seed: number;
};

export const DEFAULT_CONFIG: AsciiNoiseConfig = {
  type: "fbm",
  scale: 280,
  octaves: 3,
  contrast: 2,
  brightness: 0,
  evolution: 0.3,
  drift: 0.3,
  angle: 0,
  invert: false,
  mapping: "ramp",
  spacing: 0.08,
  lineWidth: 0.24,
  slope: 1,
  chars: " .:-=+*#%@",
  cell: 14,
  tracking: 0.66,
  leading: 1.02,
  minT: 0,
  gamma: 1,
  bg: "#000000",
  fg: "#8a877f",
  hi: "#ff4d00",
  colorMode: "gradient",
  fade: 0,
  cursor: "off",
  radius: 180,
  strength: 1,
  frameSkip: 1,
  seed: 1337,
};

export const PRESETS = {
  // Contour lines over a sine-interference field, stepped greys and a $/£ ramp.
  // Inspired by the hero banner on griffin.com.
  ledger: { type: "plasma", scale: 110, octaves: 3, contrast: 1.1, brightness: 0, evolution: 0.35, drift: 0, angle: 0, chars: "·/$£", cell: 12, tracking: 1, leading: 1.17, bg: "#0c0c0b", fg: "#524e4a", hi: "#959089", colorMode: "steps", cursor: "off", mapping: "contour", spacing: 0.08, lineWidth: 0.24, slope: 1, minT: 0.06, gamma: 0.66, frameSkip: 2, fade: 50 },
  currency: { type: "fbm", scale: 280, octaves: 3, contrast: 2.2, brightness: 0, evolution: 0.25, drift: 0.4, angle: 200, chars: " ·.:$£", cell: 14, bg: "#0c1b13", fg: "#5e9c74", hi: "#d9f99d", colorMode: "twotone", cursor: "lens", radius: 180, strength: 0.9 },
  terminal: { type: "turbulent", scale: 220, octaves: 4, contrast: 2.0, brightness: -0.05, evolution: 0.5, drift: 0.6, angle: 90, chars: " .:-=+*#%@", cell: 12, bg: "#0e0f0c", fg: "#bdb8a8", hi: "#ff7a45", colorMode: "gradient", cursor: "repel", radius: 160, strength: 1 },
  topo: { type: "ridged", scale: 360, octaves: 3, contrast: 2.6, brightness: -0.15, evolution: 0.15, drift: 0.15, angle: 45, chars: "  .-~=≈", cell: 13, bg: "#f2efe6", fg: "#6b6a63", hi: "#1f3fbf", colorMode: "twotone", cursor: "swirl", radius: 220, strength: 1 },
  cells: { type: "cellular", scale: 120, octaves: 2, contrast: 1.8, brightness: -0.1, evolution: 0.8, drift: 0, angle: 0, chars: " .oO0@", cell: 16, bg: "#111016", fg: "#8e86b8", hi: "#f4b8e4", colorMode: "gradient", cursor: "lens", radius: 200, strength: 1 },
  silk: { type: "warp", scale: 420, octaves: 4, contrast: 2.4, brightness: 0, evolution: 0.2, drift: 0.2, angle: 300, chars: " ░▒▓█", cell: 12, bg: "#0a0f1e", fg: "#3553a8", hi: "#9fd3ff", colorMode: "gradient", cursor: "swirl", radius: 240, strength: 1.2 },
  binary: { type: "waves", scale: 300, octaves: 3, contrast: 1.8, brightness: 0, evolution: 0.6, drift: 0.5, angle: 0, chars: "  01", cell: 14, bg: "#050505", fg: "#2f6b3a", hi: "#7cff8a", colorMode: "twotone", cursor: "repel", radius: 180, strength: 1 },
} satisfies Record<string, Partial<AsciiNoiseConfig>>;

export type PresetName = keyof typeof PRESETS;

export function resolveConfig(preset?: PresetName, overrides?: Partial<AsciiNoiseConfig>): AsciiNoiseConfig {
  return { ...DEFAULT_CONFIG, ...(preset ? PRESETS[preset] : null), ...overrides };
}

function hexToRgb(h: string): [number, number, number] {
  const n = parseInt((h || "#000000").replace("#", "").slice(0, 6), 16) || 0;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const mixRgb = (a: number[], b: number[], t: number) =>
  `rgb(${Math.round(a[0] + (b[0] - a[0]) * t)},${Math.round(a[1] + (b[1] - a[1]) * t)},${Math.round(a[2] + (b[2] - a[2]) * t)})`;

function grad(h: number, x: number, y: number, z: number) {
  h &= 15;
  const a = h < 8 ? x : y;
  const b = h < 4 ? y : h === 12 || h === 14 ? x : z;
  return (h & 1 ? -a : a) + (h & 2 ? -b : b);
}

export type Pointer = { x: number; y: number } | null;

/**
 * Which step of the pipeline to draw — for explaining how the field is built.
 * "field": the raw noise as grey cells · "contour": after contour banding ·
 * "glyphs": the finished character render (default).
 */
export type RenderStage = "field" | "contour" | "glyphs";

export type FrameStats = { cols: number; rows: number };

export class AsciiNoiseEngine {
  private perm = new Uint8Array(512);
  private permSeed = NaN;
  private vals = new Float32Array(0);
  private lens = new Float32Array(0);
  private buckets: number[][] = [];
  cols = 0;
  rows = 0;

  private seedPerm(seed: number) {
    let s = seed >>> 0 || 1;
    const rnd = () => {
      s ^= s << 13;
      s ^= s >>> 17;
      s ^= s << 5;
      return (s >>> 0) / 4294967296;
    };
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      const t = p[i];
      p[i] = p[j];
      p[j] = t;
    }
    for (let i = 0; i < 512; i++) this.perm[i] = p[i & 255];
    this.permSeed = seed;
  }

  // Improved Perlin noise (Ken Perlin, 2002), ~[-1, 1].
  private perlin(x: number, y: number, z: number) {
    const p = this.perm;
    let X = Math.floor(x), Y = Math.floor(y), Z = Math.floor(z);
    x -= X; y -= Y; z -= Z;
    X &= 255; Y &= 255; Z &= 255;
    const u = x * x * x * (x * (x * 6 - 15) + 10);
    const v = y * y * y * (y * (y * 6 - 15) + 10);
    const w = z * z * z * (z * (z * 6 - 15) + 10);
    const A = p[X] + Y, AA = p[A] + Z, AB = p[A + 1] + Z;
    const B = p[X + 1] + Y, BA = p[B] + Z, BB = p[B + 1] + Z;
    const l = (t: number, a: number, b: number) => a + t * (b - a);
    return l(w,
      l(v, l(u, grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z)), l(u, grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z))),
      l(v, l(u, grad(p[AA + 1], x, y, z - 1), grad(p[BA + 1], x - 1, y, z - 1)), l(u, grad(p[AB + 1], x, y - 1, z - 1), grad(p[BB + 1], x - 1, y - 1, z - 1))));
  }

  private fbm(x: number, y: number, z: number, oct: number) {
    let s = 0, a = 0.5, f = 1, n = 0;
    for (let i = 0; i < oct; i++) { s += a * this.perlin(x * f, y * f, z + i * 7.13); n += a; a *= 0.5; f *= 2; }
    return s / n;
  }

  // Distance to the nearest of a jittered grid of moving feature points (F1).
  private worley(x: number, y: number, z: number) {
    const p = this.perm;
    const xi = Math.floor(x), yi = Math.floor(y);
    let d1 = 9;
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
      const cx = xi + dx, cy = yi + dy;
      const h = p[(p[cx & 255] + (cy & 255)) & 255];
      const h2 = p[(h + 91) & 255];
      const px = cx + 0.5 + 0.42 * Math.sin(z * 1.3 + h * 0.0246);
      const py = cy + 0.5 + 0.42 * Math.cos(z * 1.1 + h2 * 0.0246);
      const d = (px - x) * (px - x) + (py - y) * (py - y);
      if (d < d1) d1 = d;
    }
    return Math.sqrt(d1);
  }

  /** The raw field in ~[0, 1] at (x, y) in scale units and time z. */
  field(type: NoiseType, x: number, y: number, z: number, oct: number): number {
    switch (type) {
      case "fbm":
        return 0.5 + this.fbm(x, y, z, oct) * 0.9;
      case "turbulent": {
        let s = 0, a = 0.5, f = 1, n = 0;
        for (let i = 0; i < oct; i++) { s += a * Math.abs(this.perlin(x * f, y * f, z + i * 7.13)); n += a; a *= 0.5; f *= 2; }
        return (s / n) * 1.8;
      }
      case "ridged": {
        let s = 0, a = 0.5, f = 1, n = 0;
        for (let i = 0; i < oct; i++) { const r = 1 - Math.abs(this.perlin(x * f, y * f, z + i * 7.13)); s += a * r * r; n += a; a *= 0.5; f *= 2; }
        return s / n;
      }
      case "cellular": {
        let s = 0, a = 0.6, f = 1, n = 0;
        const o = Math.min(oct, 3);
        for (let i = 0; i < o; i++) { s += a * (1 - Math.min(1, this.worley(x * f, y * f, z * (1 + i * 0.5)))); n += a; a *= 0.45; f *= 2.1; }
        return s / n;
      }
      case "warp": {
        const o = Math.min(oct, 4);
        const q = this.fbm(x, y, z, o), r = this.fbm(x + 5.2, y + 1.3, z, o);
        return 0.5 + 0.9 * this.fbm(x + 3 * q, y + 3 * r, z, o);
      }
      case "plasma": {
        // Interfering sine/cosine waves; each octave is rotated so ridges don't align to the grid.
        let s = 0, a = 1, f = 1, n = 0, u = x, v = y;
        for (let i = 0; i < oct; i++) {
          s += a * (Math.sin(u * f * 1.1 + z * 0.7 + i * 1.3) * Math.cos(v * f * 0.9 - z * 0.5 + i * 2.1) * 0.6
            + Math.sin((u * 0.6 + v * 0.8) * f + z * 0.9 + i) * 0.4);
          n += a; a *= 0.45; f *= 2.1;
          const ru = u * 0.825 - v * 0.565;
          v = u * 0.565 + v * 0.825;
          u = ru;
        }
        return 0.5 + (0.5 * s) / n;
      }
      case "waves":
      default: {
        const w = this.fbm(x * 0.6, y * 0.6, z * 0.5, oct);
        return 0.5 + 0.5 * Math.sin((x + y * 0.35) * 4 + w * 6 + z * 2);
      }
    }
  }

  /**
   * Draws one frame. `ctx` must already be scaled for devicePixelRatio;
   * `width`/`height` are CSS px. With `transparent`, the background is left clear
   * and the bottom fade erases glyphs instead of painting `bg` over them.
   */
  render(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    S: AsciiNoiseConfig,
    t: number,
    pointer: Pointer,
    fontFamily: string,
    transparent = false,
    stage: RenderStage = "glyphs",
  ): FrameStats {
    if (this.permSeed !== S.seed) this.seedPerm(S.seed);
    const W = width, H = height;
    if (transparent) ctx.clearRect(0, 0, W, H);
    else {
      ctx.fillStyle = S.bg;
      ctx.fillRect(0, 0, W, H);
    }

    let ramp = Array.from(S.chars || "");
    if (ramp.length < 2) ramp = [" "].concat(ramp.length ? ramp : ["#"]);
    const n = ramp.length;
    const size = S.cell;
    const cw = size * S.tracking, ch = size * S.leading;
    const cols = Math.ceil(W / cw), rows = Math.ceil(H / ch);
    this.cols = cols;
    this.rows = rows;

    const fg = hexToRgb(S.fg), hi = hexToRgb(S.hi), bgc = hexToRgb(S.bg);
    const colors: string[] = [];
    for (let i = 0; i < n; i++) {
      const k = n > 1 ? i / (n - 1) : 1;
      if (S.colorMode === "steps") colors.push(mixRgb(bgc, hi, Math.pow((i + 1) / n, 1.6)));
      else if (S.colorMode === "gradient") colors.push(mixRgb(fg, hi, k));
      else if (S.colorMode === "twotone" && k >= 0.75) colors.push(`rgb(${hi.join(",")})`);
      else colors.push(`rgba(${fg.join(",")},${(0.3 + 0.7 * k).toFixed(3)})`);
      if (!this.buckets[i]) this.buckets[i] = [];
      this.buckets[i].length = 0;
    }

    const z = t * S.evolution;
    const ang = (S.angle * Math.PI) / 180;
    const ox = Math.cos(ang) * t * S.drift * 60;
    const oy = Math.sin(ang) * t * S.drift * 60;
    const scale = S.scale, oct = S.octaves;
    const m = S.cursor !== "off" ? pointer : null;
    const R = S.radius, R2 = R * R, str = S.strength;

    const count = cols * rows;
    if (this.vals.length !== count) {
      this.vals = new Float32Array(count);
      this.lens = new Float32Array(count);
    }
    const vals = this.vals, lens = this.lens;

    // Pass 1: sample the field (with cursor displacement) and apply contrast/brightness.
    for (let j = 0; j < rows; j++) {
      const py0 = (j + 0.5) * ch;
      for (let i = 0; i < cols; i++) {
        let px = (i + 0.5) * cw, py = py0;
        let f = 0;
        if (m) {
          const dx = px - m.x, dy = py - m.y;
          const d2 = dx * dx + dy * dy;
          f = Math.exp(-d2 / R2);
          if (S.cursor === "repel" && f > 0.001) {
            const d = Math.sqrt(d2) + 0.0001;
            px -= (dx / d) * f * R * 0.6 * str;
            py -= (dy / d) * f * R * 0.6 * str;
          } else if (S.cursor === "swirl" && f > 0.001) {
            const a = f * str * Math.PI;
            const ca = Math.cos(a), sa = Math.sin(a);
            px = m.x + dx * ca - dy * sa;
            py = m.y + dx * sa + dy * ca;
          }
        }
        let v = this.field(S.type, (px + ox) / scale, (py + oy) / scale, z, oct);
        v = (v - 0.5) * S.contrast + 0.5 + S.brightness;
        vals[j * cols + i] = v < 0 ? 0 : v > 1 ? 1 : v;
        lens[j * cols + i] = f;
      }
    }

    // Pass 2: optional contour banding, then threshold into the ramp.
    const contour = S.mapping === "contour";
    const sp = S.spacing, half = S.lineWidth / 2, slope = S.slope;
    const gScale = scale / (2 * cw);
    const minT = S.minT, gamma = S.gamma;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const idx = j * cols + i;
        let v = vals[idx];
        if (contour && stage !== "field") {
          const s = (v % sp) / sp;
          if (s < half || s > 1 - half) {
            v = 0.22 + 0.78 * v;
            if (slope > 0) {
              const gx = vals[j * cols + (i < cols - 1 ? i + 1 : i)] - vals[j * cols + (i > 0 ? i - 1 : i)];
              const gy = vals[(j < rows - 1 ? j + 1 : j) * cols + i] - vals[(j > 0 ? j - 1 : j) * cols + i];
              v += slope * 0.25 * Math.sqrt(gx * gx + gy * gy) * gScale;
            }
          } else {
            v *= 0.55;
          }
        }
        if (S.cursor === "lens") v += lens[idx] * str * 0.8;
        if (S.invert) v = 1 - v;
        if (stage !== "glyphs") {
          // Pipeline view: each cell as a flat tone from background to highlight.
          const g = v < 0 ? 0 : v > 1 ? 1 : v;
          ctx.fillStyle = mixRgb(bgc, hi, g);
          ctx.fillRect(i * cw, j * ch, cw + 0.5, ch + 0.5);
          continue;
        }
        if (v <= minT) continue;
        let k = Math.floor(Math.pow(Math.min(1, (v - minT) / (1 - minT)), gamma) * n);
        if (k >= n) k = n - 1;
        this.buckets[k].push(i, j);
      }
    }

    // Draw, batched by glyph so fillStyle changes once per level.
    ctx.font = `${size}px ${fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let k = 0; k < n; k++) {
      const chr = ramp[k];
      if (chr === " ") continue;
      const b = this.buckets[k];
      if (!b.length) continue;
      ctx.fillStyle = colors[k];
      for (let q = 0; q < b.length; q += 2) ctx.fillText(chr, (b[q] + 0.5) * cw, (b[q + 1] + 0.5) * ch);
    }

    if (S.fade > 0) {
      const fade = Math.min(S.fade, H);
      const g = ctx.createLinearGradient(0, H - fade, 0, H);
      g.addColorStop(0, `rgba(${bgc.join(",")},0)`);
      g.addColorStop(1, `rgba(${bgc.join(",")},1)`);
      if (transparent) ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = g;
      ctx.fillRect(0, H - fade, W, fade);
      ctx.globalCompositeOperation = "source-over";
    }

    return { cols, rows };
  }
}
