"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { dicaba } from "@/content/work/dicaba";

type CaseCard = {
  title: string;
  subtitle: string;
  href?: string;
  image?: string;
  tint?: string;
};

const CASES: CaseCard[] = [
  {
    title: dicaba.title,
    subtitle: dicaba.subtitle,
    href: `/work/${dicaba.slug}`,
    image: dicaba.heroImage,
  },
  {
    title: "Entuitive Engineering",
    subtitle: "One-Page Site on Framer",
    tint: "from-accent-500 to-accent-800",
  },
  {
    title: "Tidli",
    subtitle: "Task Management App — UX/UI",
    tint: "from-accent-400 to-accent-700",
  },
  {
    title: "Kapi",
    subtitle: "UX/UI Overhaul & Product Strategy",
    tint: "from-accent-600 to-accent-950",
  },
];

function Card({ item }: { item: CaseCard }) {
  const inner = (
    <div className="group relative aspect-[4/5] w-[clamp(15rem,28vw,22rem)] shrink-0 overflow-hidden rounded-xl bg-neutral-950">
      {item.image ? (
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 60vw, 28vw"
          className="object-cover opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${item.tint}`} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      {!item.href && (
        <span className="absolute right-5 top-5 text-xs uppercase tracking-widest text-white/50">
          Coming soon
        </span>
      )}
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="text-xl font-normal tracking-[-0.03em] text-white">
          {item.title}
        </h3>
        <p className="mt-1 text-sm font-medium tracking-[-0.02em] text-white/60">
          {item.subtitle}
        </p>
      </div>
    </div>
  );

  return item.href ? (
    <Link href={item.href} className="block">
      {inner}
    </Link>
  ) : (
    inner
  );
}

export default function CaseCarousel() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = track.current;
      if (!el) return;

      // Track holds two identical sets; moving by -50% loops seamlessly.
      const tween = gsap.to(el, {
        xPercent: -50,
        duration: 32,
        ease: "none",
        repeat: -1,
      });

      const slow = () => gsap.to(tween, { timeScale: 0, duration: 0.4 });
      const resume = () => gsap.to(tween, { timeScale: 1, duration: 0.4 });
      el.addEventListener("mouseenter", slow);
      el.addEventListener("mouseleave", resume);
    }, track);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="overflow-hidden bg-black py-16">
      <h2 className="px-6 text-[clamp(2rem,5vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.04em] text-white sm:px-10">
        Selected <em className="font-serif italic text-accent-600">work</em>
      </h2>

      <div className="mt-12 flex w-max gap-5 px-6 sm:px-10" ref={track}>
        {[...CASES, ...CASES].map((item, i) => (
          <Card key={`${item.title}-${i}`} item={item} />
        ))}
      </div>
    </section>
  );
}
