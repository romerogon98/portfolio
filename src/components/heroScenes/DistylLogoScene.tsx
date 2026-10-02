"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// The Distyl logo from distyl.ai (same glTF we shipped there), spinning on its
// own and draggable: a horizontal drag flings it with inertia, and the cursor
// tilts it slightly. Reduced motion gets a single still frame.

const MODEL = "/work/dystil/distyl-vector.gltf";
const BG = "#efe9de"; // Distyl hero cream
const IDLE_SPEED = (Math.PI * 2) / 14; // rad/s, one turn every 14s
const DRAG_GAIN = 0.012; // rad per px dragged
const FRICTION = 2.2; // how fast a fling settles back to idle (1/s)

export default function DistylLogoScene() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;
    renderer.domElement.style.opacity = "0";
    renderer.domElement.style.transition = "opacity 900ms ease";
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    // Dim the room light so faces separate into the warm greys of distyl.ai.
    scene.environment = env;
    scene.environmentIntensity = 0.45;
    const key = new THREE.DirectionalLight(0xfff4e6, 2.4);
    key.position.set(-4, 5, 4);
    scene.add(key);

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    // Tilt (cursor) wraps spin (drag + idle) so the two never fight.
    const tilt = new THREE.Group();
    const spin = new THREE.Group();
    tilt.add(spin);
    scene.add(tilt);

    let radius = 3;
    let angle = -0.6;
    let velocity = 0; // extra rad/s from flings, decays to 0
    let dragging = false;
    let lastX = 0;
    let lastT = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const frame = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = width / height;
      // Fit the spinning logo's bounding sphere, then sit it near the centre,
      // nudged up and right of the title on wide screens, above it on narrow.
      const fov = THREE.MathUtils.degToRad(camera.fov);
      const fitH = radius / Math.sin(fov / 2);
      const fitW = radius / Math.sin(Math.atan(Math.tan(fov / 2) * camera.aspect));
      const wide = camera.aspect > 1.1;
      const dist = Math.max(fitH, fitW) * (wide ? 1.35 : 1.15);
      camera.position.set(0, 0, dist);
      const visH = 2 * Math.tan(fov / 2) * dist;
      const visW = visH * camera.aspect;
      tilt.position.set(wide ? visW * 0.06 : 0, wide ? visH * 0.1 : visH * 0.16, 0);
      camera.updateProjectionMatrix();
    };

    let loaded = false;
    new GLTFLoader().load(MODEL, (gltf) => {
      // Only the logo: drop the exported studio rig (reflection sphere) and camera.
      // (GLTFLoader sanitizes names, so "HDR Studio Rig" arrives as "HDR_Studio_Rig".)
      const extras: THREE.Object3D[] = [];
      gltf.scene.traverse((o) => {
        if (/studio_rig/i.test(o.name) || (o as THREE.Camera).isCamera) extras.push(o);
      });
      extras.forEach((o) => o.removeFromParent());
      const logo = gltf.scene;
      // Re-centre on the logo itself so it spins in place.
      const box = new THREE.Box3().setFromObject(logo);
      const center = box.getCenter(new THREE.Vector3());
      logo.position.sub(center);
      radius = box.getBoundingSphere(new THREE.Sphere()).radius;
      spin.add(logo);
      loaded = true;
      frame();
      renderer.render(scene, camera);
      renderer.domElement.style.opacity = "1";
    });

    const onResize = () => {
      frame();
      if (still && loaded) renderer.render(scene, camera);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(el);

    if (still) {
      return () => {
        ro.disconnect();
        env.dispose();
        pmrem.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      target.y = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (!dragging) return;
      const now = performance.now();
      const dx = e.clientX - lastX;
      const dt = Math.max(1, now - lastT) / 1000;
      angle += dx * DRAG_GAIN;
      velocity = (dx * DRAG_GAIN) / dt - IDLE_SPEED;
      lastX = e.clientX;
      lastT = now;
    };
    const onDown = (e: PointerEvent) => {
      // Let links and buttons in the hero keep their own clicks.
      if ((e.target as HTMLElement).closest("a, button")) return;
      dragging = true;
      lastX = e.clientX;
      lastT = performance.now();
      velocity = 0;
      el.style.cursor = "grabbing";
    };
    const onUp = () => {
      dragging = false;
      el.style.cursor = "";
    };
    const hero = el.parentElement ?? el;
    hero.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    // Only render while the hero is on screen.
    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(el);

    let raf = 0;
    let prev = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      if (!visible || !loaded || document.hidden) return;
      if (!dragging) {
        velocity *= Math.exp(-FRICTION * dt);
        angle += (IDLE_SPEED + velocity) * dt;
      }
      current.x += (target.x - current.x) * Math.min(1, dt * 4);
      current.y += (target.y - current.y) * Math.min(1, dt * 4);
      spin.rotation.y = angle;
      tilt.rotation.x = current.y * 0.25;
      tilt.rotation.z = -current.x * 0.08;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      hero.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      env.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={wrap}
      aria-hidden
      className="absolute inset-0 -z-10 cursor-grab touch-pan-y"
      style={{ background: BG }}
    />
  );
}
