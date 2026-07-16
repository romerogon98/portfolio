"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 text-white transition-colors duration-300 sm:px-10 ${
        scrolled ? "bg-black/40 backdrop-blur-xl" : ""
      }`}
    >
      <span className="text-base font-semibold tracking-[-0.02em]">
        Gonzalo Romero
      </span>
      <nav className="flex items-center gap-7 text-base font-semibold tracking-[-0.02em]">
        <a href="#work" className="opacity-80 transition-opacity hover:opacity-100">
          Work
        </a>
        <a href="#about" className="opacity-80 transition-opacity hover:opacity-100">
          About
        </a>
        <a
          href="#contact"
          className="opacity-80 transition-opacity hover:opacity-100"
        >
          Contact
        </a>
        <span className="opacity-50">EN</span>
      </nav>
    </header>
  );
}
