import Image from "next/image";
import Link from "next/link";
import { dicaba } from "@/content/work/dicaba";

const projects = [dicaba];

export default function WorkPreview() {
  return (
    <section id="work" className="bg-black px-6 py-24 text-white sm:px-10">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-white/40">
        Selected Work
      </h2>

      <div className="mt-10 grid gap-px overflow-hidden rounded-sm bg-white/10 sm:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group relative flex aspect-[4/3] items-end bg-black p-8"
          >
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              className="object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="relative">
              <h3 className="text-3xl font-semibold tracking-tight">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-white/60">{project.subtitle}</p>
            </div>
          </Link>
        ))}

        <div className="flex aspect-[4/3] flex-col items-start justify-end bg-black p-8">
          <p className="text-sm text-white/40">More case studies coming soon</p>
        </div>
      </div>
    </section>
  );
}
