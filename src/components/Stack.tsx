"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// "My stack" — a bordered grid of cells with corner "+" markers (à la the
// Daytona sponsors grid). The 10 visible slots continuously cycle through a
// larger pool of tools, so the grid keeps shuffling between the AI stack and
// the design/dev tools. Logos are white monochrome marks under /public/stack
// (simpleicons, plus svgl for OpenAI and LobeHub for Sora); brands Simple Icons
// doesn't carry — Adobe apps, and the generic "LLMs" — use a lettermark.
type Tool = { name: string; logo?: string; mark?: string };

const POOL: Tool[] = [
  { name: "LLMs", mark: "AI" },
  { name: "OpenAI", logo: "/stack/openai.svg" },
  { name: "Claude", logo: "/stack/claude.svg" },
  { name: "Claude Code", logo: "/stack/claude-code.svg" },
  { name: "Sora", logo: "/stack/sora.svg" },
  { name: "v0", logo: "/stack/v0.svg" },
  { name: "Next.js", logo: "/stack/nextjs.svg" },
  { name: "React", logo: "/stack/react.svg" },
  { name: "Vercel", logo: "/stack/vercel.svg" },
  { name: "Vue", logo: "/stack/vue.svg" },
  { name: "Figma", logo: "/stack/figma.svg" },
  { name: "Framer", logo: "/stack/framer.svg" },
  { name: "Webflow", logo: "/stack/webflow.svg" },
  { name: "Cursor", logo: "/stack/cursor.svg" },
  { name: "GitHub", logo: "/stack/github.svg" },
  { name: "WordPress", logo: "/stack/wordpress.svg" },
  { name: "Notion", logo: "/stack/notion.svg" },
  { name: "Photoshop", mark: "Ps" },
  { name: "Illustrator", mark: "Ai" },
  { name: "After Effects", mark: "Ae" },
];

const SLOTS = 10;
const SWAP_MS = 1800;

function Corner({ className }: { className: string }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute z-10 block h-3 w-3 ${className}`}>
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/30" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/30" />
    </span>
  );
}

function ToolMark({ tool }: { tool: Tool }) {
  return (
    <div className="flex items-center justify-center gap-2.5">
      {tool.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={tool.logo} alt="" aria-hidden className="h-6 w-6 shrink-0 opacity-90" />
      ) : (
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-white/[0.06] text-[9px] font-semibold text-white/90 ring-1 ring-white/10">
          {tool.mark}
        </span>
      )}
      <span className="whitespace-nowrap text-sm font-medium tracking-[-0.01em] text-white/85">
        {tool.name}
      </span>
    </div>
  );
}

export default function Stack() {
  const [slots, setSlots] = useState<Tool[]>(() => POOL.slice(0, SLOTS));
  const counter = useRef(SLOTS);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setSlots((prev) => {
        const next = [...prev];
        // Replace the round-robin slot with the next tool in the pool. The 10
        // visible slots always hold a window of 10 consecutive pool entries, so
        // no tool is ever shown twice at once.
        next[counter.current % SLOTS] = POOL[counter.current % POOL.length];
        counter.current += 1;
        return next;
      });
    }, SWAP_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="stack" className="bg-black px-6 py-24 sm:px-10 md:py-32">
      <span className="text-sm uppercase tracking-widest text-white/40">
        (My stack)
      </span>
      <h2 className="mt-2 text-[clamp(1.5rem,3.5vw,2.5rem)] font-normal tracking-[-0.03em] text-white">
        Tools I use{" "}
        <em className="not-italic text-accent-500">every day</em>
      </h2>

      <div className="relative mt-10 border-l border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-5">
          {slots.map((tool, i) => (
            <div
              key={i}
              className="relative flex h-[92px] items-center justify-center overflow-hidden border-b border-r border-white/10 px-3 sm:h-[104px]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ToolMark tool={tool} />
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </div>

        <Corner className="left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
        <Corner className="right-0 top-0 translate-x-1/2 -translate-y-1/2" />
        <Corner className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
        <Corner className="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />
      </div>
    </section>
  );
}
