"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Real project stills placed around a big wheel; only the top arc is visible.
const IMAGES = [
  "/work/dicaba/hero-interior.jpg",
  "/work/entuitive/hero.jpg",
  "/work/kapi/hero.jpg",
  "/work/dicaba/exterior-1.jpg",
  "/work/tidli/hero.jpg",
  "/work/facturante/hero.jpg",
  "/work/dicaba/exterior-2.jpg",
  "/work/entuitive/01.jpg",
  "/work/kapi/01.jpg",
  "/work/facturante/01.jpg",
  "/work/dicaba/bedroom.webp",
  "/work/kapi/02.jpg",
];

const COUNT = IMAGES.length;
const STEP = 360 / COUNT;

const PHRASE = "Every project is a chance to learn, experiment and grow.";
const ACCENT_WORDS = new Set(["learn,", "experiment", "grow."]);

export default function CircleGallery() {
  const scope = useRef<HTMLElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ring.current, {
        rotation: -270,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: pin.current,
        },
      });

      gsap.from(".cg-word", {
        autoAlpha: 0.12,
        filter: "blur(8px)",
        stagger: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "45% bottom",
          scrub: true,
        },
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} className="relative h-[400vh] bg-black">
      <div ref={pin} className="relative h-screen overflow-hidden">
        {/* Central phrase */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6">
          <p className="max-w-2xl text-center text-[clamp(1.75rem,4vw,3rem)] font-normal leading-[1.15] tracking-[-0.03em] text-white">
            {PHRASE.split(" ").map((word, i) => (
              <span
                key={i}
                className={`cg-word inline-block ${
                  ACCENT_WORDS.has(word) ? "font-serif italic text-accent-400" : ""
                }`}
              >
                {word}
                {" "}
              </span>
            ))}
          </p>
        </div>

        {/* Rotating wheel */}
        <div ref={ring} className="absolute left-1/2 top-[92vh] h-0 w-0">
          {IMAGES.map((src, i) => (
            <div
              key={src}
              className="absolute -ml-[13vh] -mt-[8.5vh] h-[17vh] w-[26vh] overflow-hidden rounded-xl border border-white/10"
              style={{ transform: `rotate(${i * STEP}deg) translateY(-90vh)` }}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="26vh"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
