"use client";

import { useEffect, useRef } from "react";

// Flowing organic gradient rendered with a single fullscreen WebGL fragment shader,
// reproducing the Luke Baffait look procedurally: a domain-warped grayscale noise
// field whose luminance is remapped through a warm "gradient map" (near-black →
// oxblood → brand red #FF1E00 → orange → peach). Lightweight — one quad, one shader —
// and it pauses while offscreen. Falls back to a CSS gradient if WebGL is unavailable.

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_time;

vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
vec2 mod289(vec2 x){return x - floor(x*(1.0/289.0))*289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for(int i=0;i<4;i++){ v += a*snoise(p); p *= 2.0; a *= 0.5; }
  return v;
}

// Warm "gradient map": remap a grayscale luminance x in [0,1] through Luke's
// ramp — near-black -> maroon -> blood -> brand red (#FF1E00) -> red-orange.
// No pink/peach at the top: Luke's brightest cores stay saturated red-orange.
vec3 grade(float x){
  vec3 c = vec3(0.035, 0.028, 0.032);                                // near-black
  c = mix(c, vec3(0.090, 0.030, 0.035), smoothstep(0.00, 0.30, x));  // dark maroon
  c = mix(c, vec3(0.300, 0.055, 0.045), smoothstep(0.30, 0.52, x));  // blood
  c = mix(c, vec3(0.640, 0.090, 0.030), smoothstep(0.52, 0.68, x));  // deep red
  c = mix(c, vec3(0.902, 0.118, 0.000), smoothstep(0.68, 0.82, x));  // red
  c = mix(c, vec3(1.000, 0.290, 0.110), smoothstep(0.82, 0.92, x));  // #ff4a1c
  c = mix(c, vec3(1.000, 0.470, 0.230), smoothstep(0.92, 1.00, x));  // orange peak
  return c;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  vec2 ac = vec2(aspect, 1.0);
  float t = u_time * 0.03;

  // Big, gentle domain warp so the glow gets soft organic (non-circular) edges.
  vec2 q = vec2(fbm(uv * ac * 0.55 + t * 0.5),
                fbm(uv * ac * 0.55 + vec2(2.7, 4.3) - t * 0.4));
  vec2 w = uv + 0.16 * q + (u_mouse - vec2(0.5)) * 0.02; // faint pointer parallax

  // Two soft, slowly drifting hotspots in the UPPER band (UV y is bottom-up, so
  // high y = top of screen) — defocused "lights", biased center-right like Luke.
  vec2 h1 = vec2(0.50 + 0.05 * sin(t * 0.6), 0.74 + 0.04 * cos(t * 0.5));
  vec2 h2 = vec2(0.80 + 0.05 * cos(t * 0.4), 0.66 + 0.05 * sin(t * 0.5));
  float glow = smoothstep(0.92, 0.0, length((w - h1) * ac))
             + 0.90 * smoothstep(0.98, 0.0, length((w - h2) * ac));
  glow = min(glow, 1.0);

  // Broad envelope biased upper-right (bleeds off-edge) + fade lower band to black.
  float env   = smoothstep(1.45, 0.12, length((w - vec2(0.64, 0.70)) * ac));
  float lower = smoothstep(0.58, 0.04, w.y); // 1 near the bottom -> 0 toward the top

  // Defocused internal "folds": low-freq noise darkens parts of the glow.
  float folds = 0.62 + 0.40 * (fbm(w * ac * 1.3 + t * 0.6) * 0.5 + 0.5);

  float field = glow * env * folds * (1.0 - 0.82 * lower);
  field += 0.02 * (fbm(w * ac * 2.2 + t) * 0.5 + 0.5); // faint smooth texture
  field = pow(clamp(field, 0.0, 1.0), 1.15);

  vec3 col = grade(field);

  // Mild corner vignette to seat it into the page.
  float vig = smoothstep(1.35, 0.25, length(uv - 0.5));
  col *= mix(0.55, 1.0, vig);

  // Very light grain to kill banding on the dark ramp.
  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (grain - 0.5) * 0.015;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export default function GradientField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      premultipliedAlpha: false,
    });
    if (!gl) {
      canvas.style.background =
        "radial-gradient(120% 120% at 55% 40%, #ff1e00 0%, #5e1410 32%, #0a0808 72%)";
      return;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uTime = gl.getUniformLocation(program, "u_time");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const target = { x: 0.5, y: 0.5 };
    const cur = { x: 0.5, y: 0.5 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = 1 - (e.clientY - r.top) / r.height;
    };
    window.addEventListener("pointermove", onMove);

    // Pause rendering while the canvas is scrolled out of view.
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => (visible = entry.isIntersecting),
      { rootMargin: "100px" }
    );
    io.observe(canvas);

    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, cur.x, cur.y);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
    />
  );
}
