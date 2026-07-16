"use client";

// "My stack" — the tools used day to day, as a scrolling row of logo cards
// (à la the Framer marquee). Monogram + brand-ish tint keeps it recognizable
// without shipping copyrighted logo art.
const TOOLS = [
  { name: "Figma", mark: "Fi", bg: "#2c2c2c" },
  { name: "Framer", mark: "Fr", bg: "#0055ff" },
  { name: "Webflow", mark: "Wf", bg: "#4353ff" },
  { name: "Photoshop", mark: "Ps", bg: "#001e36" },
  { name: "Illustrator", mark: "Ai", bg: "#330000" },
  { name: "After Effects", mark: "Ae", bg: "#00005b" },
  { name: "WordPress", mark: "Wp", bg: "#1d2327" },
  { name: "Notion", mark: "No", bg: "#111111" },
];

function Card({ name, mark, bg }: { name: string; mark: string; bg: string }) {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4">
      <span
        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-sm font-semibold text-white ring-1 ring-white/10"
        style={{ backgroundColor: bg }}
      >
        {mark}
      </span>
      <span className="whitespace-nowrap text-lg font-medium tracking-[-0.01em] text-white">
        {name}
      </span>
    </div>
  );
}

function Group() {
  return (
    <div className="flex shrink-0 gap-4 pr-4">
      {TOOLS.map((t) => (
        <Card key={t.name} {...t} />
      ))}
    </div>
  );
}

export default function Stack() {
  return (
    <section id="stack" className="overflow-hidden bg-black py-16 sm:py-20">
      <div className="mb-8 px-6 sm:px-10">
        <span className="text-sm uppercase tracking-widest text-white/40">
          (My stack)
        </span>
        <h2 className="mt-2 text-[clamp(1.5rem,3.5vw,2.5rem)] font-normal tracking-[-0.03em] text-white">
          Tools I use{" "}
          <em className="font-serif italic text-accent-500">every day</em>
        </h2>
      </div>

      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="marquee-track flex w-max">
          <Group />
          <Group />
        </div>
      </div>
    </section>
  );
}
