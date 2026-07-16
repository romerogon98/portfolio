import Image from "next/image";
import Link from "next/link";
import { dicaba } from "@/content/work/dicaba";

type WorkCard = {
  title: string;
  meta: string;
  bullets: string[];
  color: string;
  href?: string;
  image?: string;
};

const CARDS: WorkCard[] = [
  {
    title: dicaba.title,
    meta: "Real Estate · 2023",
    bullets: [
      "End-to-end design & Framer development",
      "Modular CMS for dynamic property showcases",
      "Scroll-driven storytelling and motion",
    ],
    color: "#C3C7FF",
    href: `/work/${dicaba.slug}`,
    image: dicaba.heroImage,
  },
  {
    title: "Entuitive Engineering",
    meta: "One-Page Site · Framer",
    bullets: ["Case study coming soon"],
    color: "#A7F3D0",
  },
  {
    title: "Tidli",
    meta: "Task Management App · UX/UI",
    bullets: ["Case study coming soon"],
    color: "#FDE68A",
  },
  {
    title: "Kapi",
    meta: "Product Strategy · UX/UI",
    bullets: ["Case study coming soon"],
    color: "#FBCFE8",
  },
];

function Pill({ href }: { href?: string }) {
  const label = href ? "View project" : "Coming soon";
  const classes =
    "group inline-flex items-center gap-1.5 self-start rounded-full border border-black/10 bg-black/5 px-3 py-2 text-sm font-medium text-black transition-colors";
  const arrow = (
    <span className="transition-transform group-hover:translate-x-0.5">↗</span>
  );
  return href ? (
    <Link href={href} className={`${classes} hover:border-black/60`}>
      {label} {arrow}
    </Link>
  ) : (
    <span className={`${classes} opacity-60`}>{label}</span>
  );
}

export default function WorkCards() {
  return (
    <section id="work" className="bg-white px-6 py-20 sm:px-10 md:py-28">
      <h2 className="mb-12 text-center text-[clamp(2.25rem,5vw,4rem)] font-normal tracking-[-0.04em] text-black md:mb-16">
        Selected <em className="font-serif italic text-accent-600">work</em>
      </h2>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {CARDS.map((card) => (
          <div
            key={card.title}
            className="flex flex-col justify-between overflow-hidden rounded-[36px] p-8"
            style={{ backgroundColor: card.color }}
          >
            <div>
              <div className="mb-5 flex items-center justify-between gap-4">
                <h3 className="text-2xl font-normal tracking-[-0.03em] text-black">
                  {card.title}
                </h3>
                <Pill href={card.href} />
              </div>
              <p className="mb-4 text-sm font-medium text-black/60">
                {card.meta}
              </p>
              <ul className="flex flex-col gap-1.5 border-t border-black/10 pt-4">
                {card.bullets.map((b) => (
                  <li key={b} className="text-sm text-black/70">
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {card.image ? (
              <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 90vw, 40vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="mt-8 aspect-[16/10] rounded-2xl bg-black/5" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
