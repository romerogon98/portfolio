"use client";

import { useEffect, useRef } from "react";
import { marqueeBox, registerMarqueeZone } from "@/lib/marquee";

// WebGL "vector wordmark" (adapted from Originkit's Vector Wordmark 2): the
// lines are rasterised into a texture — red channel = solid glyphs, green =
// dotted outline. Outside the selection marquee the glyphs render soft and fade
// towards their baseline; inside it they switch to the crisp dotted outline.
// The marquee itself is the site-wide MarqueeCursor: this registers the host as
// a reveal zone (bigger box while the pointer is over it) and reads the
// cursor's box back each frame as the reveal mask.

const MAX_DPR = 2;
const MAX_TEX = 4096;
const FIT_W = 0.94; // max share of the box width the longest line may take
const FIT_H = 0.8; // max share of the box height all rows together may take
const COMPACT_BELOW = 640; // px box width at which compactLines take over

const DOT_DIAMETER = 4 / 440;
const DOT_PITCH = 12 / 440;
const MARQUEE_ROW = 0.85; // marquee height relative to one row
const MARQUEE_ASPECT = 0.6; // height / width

type RGBA = [number, number, number, number];

// Hex (#rgb, #rrggbb, #rrggbbaa) or rgb()/rgba() → 0..1 channels.
function parseColor(input: string, fallback: RGBA): RGBA {
  const s = input.trim();
  if (s[0] === "#") {
    let h = s.slice(1);
    if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join("");
    if (h.length === 6) h += "ff";
    if (h.length !== 8 || /[^0-9a-f]/i.test(h)) return fallback;
    return [0, 2, 4, 6].map((i) => parseInt(h.slice(i, i + 2), 16) / 255) as RGBA;
  }
  const m = s.match(/^rgba?\(([^)]*)\)$/i);
  if (!m) return fallback;
  const p = m[1].split(/[\s,/]+/).filter(Boolean).map(parseFloat);
  if (p.length < 3 || p.some((v) => !Number.isFinite(v))) return fallback;
  return [p[0] / 255, p[1] / 255, p[2] / 255, p[3] ?? 1];
}

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;

uniform sampler2D uMap;
uniform vec2 uRes;
uniform vec2 uAtlas;
uniform float uRows;
uniform vec2 uPtr;
uniform vec2 uHalf;
uniform vec3 uText;
uniform vec3 uShade;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

vec2 blurRG(vec2 uv, float e) {
  vec4 sum = vec4(0.0);
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    float th = radians(fi / 6.0 * 360.0);
    vec2 off = vec2(cos(th), sin(th)) * (hash(vec2(fi, uv.x + uv.y)) + e);
    off.y /= uRows;
    sum += texture2D(uMap, uv + off * e);
  }
  return (sum / 6.0).rg;
}

void main() {
  vec2 E = (vUv * uRes - (uRes - uAtlas) * 0.5) / uAtlas;
  float inside = step(0.0, E.x) * step(E.x, 1.0) * step(0.0, E.y) * step(E.y, 1.0);
  vec2 safeUv = clamp(E, 0.0, 1.0);
  // 1 at the top of each row, 0 at its bottom.
  float ly = fract(safeUv.y * uRows - 1e-4);

  float b = clamp(1.0 - ly * 3.5, 0.0, 1.0) * 0.008;
  vec2 soft = blurRG(safeUv, b);
  vec2 sharp = blurRG(safeUv, b * 0.1);

  vec2 p = vUv * uRes;
  vec2 c = uPtr * uRes;
  vec2 q = abs(p - c) - uHalf;
  float sd = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0);
  float k = 1.0 - smoothstep(-0.5, 0.5, sd);

  float mask = mix(soft.r, sharp.g, k) * inside;
  vec3 fill = mix(uShade, uText, smoothstep(0.0, 1.0, ly));
  vec4 card = vec4(fill * mask, mask) * pow(ly, 0.7);

  gl_FragColor = card;
}`;

function compile(gl: WebGLRenderingContext) {
  const make = (type: number, src: string) => {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    return sh;
  };
  const p = gl.createProgram()!;
  gl.attachShader(p, make(gl.VERTEX_SHADER, VERT));
  gl.attachShader(p, make(gl.FRAGMENT_SHADER, FRAG));
  gl.bindAttribLocation(p, 0, "aPos");
  gl.linkProgram(p);
  return p;
}

type FontSpec = { family: string; weight: string; letterSpacing: string };

// Glyph metrics at font size `px`, shared across rows so they stay equal height.
function measure(ctx: CanvasRenderingContext2D, lines: string[], f: FontSpec, px: number) {
  ctx.font = `${f.weight} ${px}px ${f.family}`;
  if ("letterSpacing" in ctx) {
    (ctx as unknown as { letterSpacing: string }).letterSpacing = f.letterSpacing;
  }
  let asc = 0;
  let desc = 0;
  const widths = lines.map((l) => {
    const m = ctx.measureText(l);
    asc = Math.max(asc, m.actualBoundingBoxAscent || px * 0.8);
    desc = Math.max(desc, m.actualBoundingBoxDescent || 0);
    return Math.max(1, m.width);
  });
  const pad = px * 0.12;
  return {
    widths,
    asc,
    desc,
    pad,
    w: Math.max(...widths) + pad * 2,
    rowH: asc + desc + pad * 2,
  };
}

// Stacked rows, each centred horizontally. Returns the canvas plus its size
// per CSS font pixel so the layout can be rescaled without a rebuild.
function buildAtlas(lines: string[], f: FontSpec, cssPx: number, dpr: number) {
  const probe = document.createElement("canvas").getContext("2d");
  if (!probe) return null;

  let px = Math.max(8, cssPx * dpr);
  let m = measure(probe, lines, f, px);
  const over = Math.max(m.w / MAX_TEX, (m.rowH * lines.length) / MAX_TEX);
  if (over > 1) {
    px = Math.max(8, px / over);
    m = measure(probe, lines, f, px);
  }

  const rowH = Math.ceil(m.rowH);
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(m.w);
  canvas.height = rowH * lines.length;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  measure(ctx, lines, f, px);
  ctx.textBaseline = "alphabetic";
  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = "#00ff00";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = Math.max(1, (m.asc + m.desc) * DOT_DIAMETER);
  ctx.setLineDash([0, Math.max(2, (m.asc + m.desc) * DOT_PITCH)]);
  ctx.fillStyle = "#ff0000";
  lines.forEach((l, i) => {
    const x = m.pad + (canvas.width - m.pad * 2 - m.widths[i]) / 2;
    const y = i * rowH + m.pad + m.asc;
    ctx.fillText(l, x, y);
    ctx.strokeText(l, x, y);
  });

  return { canvas, ratioW: canvas.width / px, ratioH: canvas.height / px };
}

export interface VectorWordmarkProps {
  lines: string[];
  /** Used instead of `lines` when the box is narrower than COMPACT_BELOW. */
  compactLines?: string[];
  weight?: number;
  letterSpacing?: string;
  textColor?: string;
  shade?: string;
  className?: string;
}

export default function VectorWordmark({
  lines,
  compactLines,
  weight = 700,
  letterSpacing = "-0.02em",
  textColor = "#f6f3ec",
  shade = "#1c1b19",
  className = "",
}: VectorWordmarkProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const live = useRef({ lines, compactLines, weight, letterSpacing, textColor, shade });
  // Keep the render loop reading the latest props without restarting GL.
  useEffect(() => {
    live.current = { lines, compactLines, weight, letterSpacing, textColor, shade };
  });

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const attrs: WebGLContextAttributes = {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      powerPreference: "high-performance",
    };
    const gl = (canvas.getContext("webgl2", attrs) ||
      canvas.getContext("webgl", attrs)) as WebGLRenderingContext | null;
    if (!gl) return;
    const isGL2 =
      typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext;

    const prog = compile(gl);
    const U = Object.fromEntries(
      ["uMap", "uRes", "uAtlas", "uRows", "uPtr", "uHalf", "uText", "uShade"].map(
        (n) => [n, gl.getUniformLocation(prog, n)]
      )
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.disable(gl.BLEND);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // next/font exposes a generated family name — read the resolved stack.
    const family = getComputedStyle(host).fontFamily || "system-ui, sans-serif";

    let alive = true;
    let boxW = 1;
    let boxH = 1;
    let boxDirty = true;
    let dpr = 1;
    let ratioW = 1; // atlas CSS size per CSS font pixel
    let ratioH = 1;
    let atlasKey = "";
    let fitKey = "";

    const rows = () => {
      const L = live.current;
      return boxW < COMPACT_BELOW && L.compactLines?.length ? L.compactLines : L.lines;
    };

    const font = (): FontSpec => ({
      family,
      weight: String(live.current.weight),
      letterSpacing: live.current.letterSpacing,
    });

    // Measure once per text/font so the font size can be fitted to the box.
    function refit() {
      const ctx = document.createElement("canvas").getContext("2d");
      if (!ctx) return;
      const m = measure(ctx, rows(), font(), 100);
      ratioW = m.w / 100;
      ratioH = (Math.ceil(m.rowH) * rows().length) / 100;
    }

    const fontPx = () => Math.max(8, Math.min((boxW * FIT_W) / ratioW, (boxH * FIT_H) / ratioH));

    function resize() {
      boxW = Math.max(1, host!.offsetWidth);
      boxH = Math.max(1, host!.offsetHeight);
      dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1);
      canvas!.width = Math.max(1, Math.round(boxW * dpr));
      canvas!.height = Math.max(1, Math.round(boxH * dpr));
    }

    function rebuildAtlas() {
      const atlas = buildAtlas(rows(), font(), fontPx(), dpr);
      if (!atlas) return;
      ratioW = atlas.ratioW;
      ratioH = atlas.ratioH;
      gl!.bindTexture(gl!.TEXTURE_2D, tex);
      gl!.pixelStorei(gl!.UNPACK_FLIP_Y_WEBGL, true);
      gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, atlas.canvas);
      gl!.pixelStorei(gl!.UNPACK_FLIP_Y_WEBGL, false);
      const { width: cw, height: ch } = atlas.canvas;
      const pot = (cw & (cw - 1)) === 0 && (ch & (ch - 1)) === 0;
      if (isGL2 || pot) {
        gl!.generateMipmap(gl!.TEXTURE_2D);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR_MIPMAP_LINEAR);
      } else {
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
      }
    }

    function marqueeHalf() {
      const rowCss = (ratioH * fontPx()) / rows().length;
      const hy = (rowCss * MARQUEE_ROW) / 2;
      return { hx: hy / MARQUEE_ASPECT, hy };
    }

    function sync() {
      if (boxDirty) {
        boxDirty = false;
        resize();
      }
      const f = font();
      const fk = [rows().join("\n"), f.weight, f.letterSpacing].join("|");
      if (fk !== fitKey) {
        fitKey = fk;
        refit();
      }
      const key = [fk, dpr, Math.ceil(fontPx() / 16)].join("|");
      if (key !== atlasKey) {
        atlasKey = key;
        rebuildAtlas();
      }
    }

    const unregister = registerMarqueeZone({ el: host, half: marqueeHalf });

    function draw() {
      const L = live.current;
      const tc = parseColor(L.textColor, [0.96, 0.95, 0.93, 1]);
      const sc = parseColor(L.shade, [0.1, 0.1, 0.1, 1]);
      const px = fontPx();
      const r = host!.getBoundingClientRect();
      const b = marqueeBox;
      // Hidden marquee → zero-size mask (no reveal).
      const shown = b.opacity > 0.01;

      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.useProgram(prog);
      gl!.uniform1i(U.uMap, 0);
      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, tex);
      gl!.uniform2f(U.uRes, boxW, boxH);
      gl!.uniform2f(U.uAtlas, ratioW * px, ratioH * px);
      gl!.uniform1f(U.uRows, rows().length);
      gl!.uniform2f(U.uPtr, (b.x - r.left) / r.width, 1 - (b.y - r.top) / r.height);
      gl!.uniform2f(U.uHalf, shown ? b.hx : -1, shown ? b.hy : -1);
      gl!.uniform3f(U.uText, tc[0], tc[1], tc[2]);
      gl!.uniform3f(U.uShade, sc[0], sc[1], sc[2]);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    }

    let raf = 0;
    let visible = true;

    const frame = () => {
      sync();
      draw();
      raf = requestAnimationFrame(frame);
    };

    // Only run while on screen and the tab is visible.
    const gate = () => {
      if (alive && visible && !document.hidden) {
        if (!raf) {
          raf = requestAnimationFrame(frame);
        }
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const ro = new ResizeObserver(() => {
      boxDirty = true;
    });
    ro.observe(host);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      gate();
    });
    io.observe(host);
    document.addEventListener("visibilitychange", gate);

    // Re-measure once web fonts land (the first atlas may use the fallback).
    document.fonts?.ready.then(
      () => {
        if (alive) fitKey = atlasKey = "";
      },
      () => {}
    );

    gate();

    return () => {
      alive = false;
      gate();
      ro.disconnect();
      io.disconnect();
      unregister();
      document.removeEventListener("visibilitychange", gate);
    };
  }, []);

  return (
    <div ref={hostRef} className={`overflow-hidden font-sans ${className || "relative"}`} aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
    </div>
  );
}
