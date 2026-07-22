import Image from "next/image";
import Link from "next/link";
import { dicaba } from "@/content/work/dicaba";
import { entuitive } from "@/content/work/entuitive";
import { tidli } from "@/content/work/tidli";
import { kapi } from "@/content/work/kapi";
import { facturante } from "@/content/work/facturante";
import type { CaseStudy } from "@/content/work/types";

type Card = {
  title: string;
  subtitle: string;
  href?: string;
  image?: string;
  tint?: string;
};

const toCard = (c: CaseStudy): Card => ({
  title: c.title,
  subtitle: c.subtitle,
  href: `/work/${c.slug}`,
  image: c.heroImage,
  tint: c.tint,
});

const cards: Card[] = [dicaba, entuitive, tidli, kapi, facturante].map(toCard);

function CardInner({ card }: { card: Card }) {
  const linked = Boolean(card.href);
  return (
    <div
      className={`group relative flex aspect-[4/3] items-end p-8 ${
        card.image ? "bg-black" : linked ? "bg-neutral-950" : "bg-neutral-950"
      }`}
    >
      {card.image && (
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-90"
        />
      )}
      {card.tint && (
        <div
          className={`absolute inset-0 bg-gradient-to-br opacity-70 transition-opacity duration-500 group-hover:opacity-90 ${card.tint}`}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      {!linked && (
        <span className="absolute right-8 top-8 text-xs uppercase tracking-widest text-white/30">
          Coming soon
        </span>
      )}
      <div className="relative">
        <h3
          className={`text-[clamp(1.75rem,3vw,2.75rem)] font-normal tracking-[-0.04em] ${
            linked ? "" : "text-white/40"
          }`}
        >
          {card.title}
        </h3>
        <p
          className={`mt-1 text-base font-medium tracking-[-0.02em] ${
            linked ? "text-white/60" : "text-white/25"
          }`}
        >
          {card.subtitle}
        </p>
      </div>
    </div>
  );
}

export default function WorkPreview() {
  return (
    <section id="work" className="bg-black px-6 py-24 text-white sm:px-10">
      <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.04em]">
        Selected <em className="font-serif italic text-accent-600">work</em>
      </h2>

      <div className="mt-12 grid gap-px overflow-hidden rounded-sm bg-white/10 sm:grid-cols-2">
        {cards.map((card) =>
          card.href ? (
            <Link key={card.title} href={card.href} className="block">
              <CardInner card={card} />
            </Link>
          ) : (
            <CardInner key={card.title} card={card} />
          )
        )}
      </div>
    </section>
  );
}
