"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { getLenis } from "@/components/SmoothScroll";
import TransitionLink from "@/components/TransitionLink";
import SoundToggle from "@/components/SoundToggle";
import Wordmark from "@/components/Wordmark";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav({ light = false }: { light?: boolean }) {
  const header = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Dark text over light pages (e.g. the white CV). Open menu is always a dark
  // overlay, so bar text/lines flip back to white while the menu is open.
  const darkText = light && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Staggered entrance on mount. fromTo with explicit values (rather than
  // .from) so React's dev double-invoke can't capture the mid-animation state
  // as the target and leave items stuck. Only y is per-item — the fade is on
  // the whole bar, so each link keeps its own resting opacity.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.12 })
        .fromTo(header.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 })
        .fromTo(
          ".nav-item",
          { y: -10 },
          { y: 0, duration: 0.55, stagger: 0.08, ease: "power3.out" },
          0.08
        );
    }, header);
    return () => ctx.revert();
  }, []);

  // Freeze the page (native scroll + Lenis) behind the full-screen mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) getLenis()?.stop();
    else getLenis()?.start();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        ref={header}
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 transition-colors duration-300 print:hidden sm:px-10 ${
          darkText ? "text-neutral-900" : "text-white"
        } ${
          open
            ? "bg-black"
            : scrolled
              ? light
                ? "bg-white/60 backdrop-blur-xl"
                : "bg-black/40 backdrop-blur-xl"
              : ""
        }`}
      >
        <TransitionLink
          href="/"
          aria-label="Gonzalo Romero — home"
          className="nav-item"
        >
          <Wordmark className="h-6 w-auto sm:h-7" />
        </TransitionLink>

        <nav className="hidden items-center gap-7 text-base font-semibold tracking-[-0.02em] sm:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-item opacity-80 transition-opacity hover:opacity-100"
            >
              {link.label}
            </a>
          ))}
          <SoundToggle />
          <span className="nav-item opacity-50">EN</span>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="nav-item relative z-10 -mr-2 flex h-10 w-10 items-center justify-center sm:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 block h-[1.5px] w-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                darkText ? "bg-neutral-900" : "bg-white"
              } ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`absolute bottom-0 left-0 block h-[1.5px] w-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                darkText ? "bg-neutral-900" : "bg-white"
              } ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </header>

      {/* Full-screen mobile menu */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-40 flex flex-col bg-black pt-24 text-white transition-opacity duration-300 sm:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-1 flex-col justify-center px-6">
          {LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-4 border-t border-white/10 py-5 text-[clamp(2rem,9vw,3rem)] font-normal tracking-[-0.03em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                i === LINKS.length - 1 ? "border-b" : ""
              } ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ transitionDelay: open ? `${i * 60 + 120}ms` : "0ms" }}
            >
              <span className="text-sm font-medium tabular-nums text-accent-500">
                0{i + 1}
              </span>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-between px-6 py-6 text-sm text-white/40">
          <span>© {new Date().getFullYear()} Gonzalo Romero</span>
          <span>EN</span>
        </div>
      </div>
    </>
  );
}
