"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OriginButton } from "@/components/ui/OriginButton";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "romerogon98@gmail.com";

type Category = { name: string; items: string[] };

const CATEGORIES: Category[] = [
  { name: "Design", items: ["Figma", "Adobe Photoshop", "Adobe Illustrator", "After Effects"] },
  {
    name: "UX / UI",
    items: [
      "User Research",
      "Usability Testing",
      "Wireframing & Prototyping",
      "Design Systems",
      "Information Architecture",
    ],
  },
  { name: "No-Code Development", items: ["Framer", "Webflow", "WordPress (Elementor)"] },
  { name: "Frontend", items: ["HTML", "CSS", "Responsive Design"] },
  { name: "Motion & 3D", items: ["Motion Graphics", "After Effects", "3D basics"] },
];

export default function Skills() {
  const scope = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skills-row", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: scope.current, start: "top 70%" },
      });
      gsap.from(".skills-intro > *", {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: scope.current, start: "top 70%" },
      });
      gsap.to(".skills-arrow", {
        x: 14,
        duration: 1,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={scope}
      id="skills"
      className="bg-black px-6 py-28 text-white sm:px-10 md:py-40"
    >
      <div className="grid gap-16 md:grid-cols-2 md:gap-12">
        {/* Left — statement */}
        <div className="skills-intro flex flex-col">
          <span className="text-sm uppercase tracking-widest text-white/40">
            Skills
          </span>
          <h2 className="mt-6 max-w-md text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold uppercase leading-[1.1] tracking-[-0.02em]">
            Multimedia designer with 5+ years of experience, focused on{" "}
            <span className="text-accent-400">UX/UI</span> and{" "}
            <span className="text-accent-400">no-code</span> development.
          </h2>

          <OriginButton
            onClick={() => {
              window.location.href = `mailto:${EMAIL}`;
            }}
            className="mt-10 self-start"
          >
            Contact me
            <svg
              className="skills-arrow"
              width="34"
              height="14"
              viewBox="0 0 40 16"
              fill="none"
              aria-hidden
            >
              <path
                d="M32 1l7 7-7 7M0 8h39"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </OriginButton>
        </div>

        {/* Right — accordion */}
        <div>
          {CATEGORIES.map((cat, i) => {
            const isOpen = open === i;
            return (
              <div
                key={cat.name}
                className="skills-row border-b border-white/12"
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between py-6 text-left"
                >
                  <span className="text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
                    {cat.name}
                  </span>
                  <span className="text-2xl text-white/50">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div
                  className="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0">
                    <ul className="flex flex-wrap gap-x-6 gap-y-2 pb-6 text-base text-white/55">
                      {cat.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
