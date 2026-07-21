"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Brief history, BS "split-paragraph" style. Emphasis words render in the serif accent.
const PARAGRAPH =
  "Since 2018, I've been turning ideas into digital products — first by founding my own studio, then leading design at Avans, and now shaping user-centered work at Litebox. Based in Germany, I build experiences that are as thoughtful as they are functional.";

const ACCENT_WORDS = new Set([
  "digital",
  "products",
  "user-centered",
  "thoughtful",
  "functional.",
]);

export default function HistoryReveal() {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".sp-word");
      gsap.set(words, { filter: "blur(12px)", opacity: 0.12 });

      gsap.to(words, {
        filter: "blur(0px)",
        opacity: 1,
        ease: "none",
        stagger: 0.12,
        scrollTrigger: {
          trigger: scope.current,
          start: "top 75%",
          end: "bottom 75%",
          scrub: true,
        },
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={scope}
      id="story"
      className="bg-black px-6 py-28 sm:px-10 md:py-44"
    >
      <p className="mx-auto max-w-5xl text-[clamp(1.75rem,4.5vw,4rem)] font-normal leading-[1.15] tracking-[-0.03em] text-white">
        {PARAGRAPH.split(" ").map((word, i) => {
          const accent = ACCENT_WORDS.has(word.toLowerCase());
          return (
            <span
              key={i}
              className={`sp-word inline-block ${
                accent ? "text-accent-600" : ""
              }`}
            >
              {word}
              {" "}
            </span>
          );
        })}
      </p>
    </section>
  );
}
