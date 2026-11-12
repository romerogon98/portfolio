import Image from "next/image";
import Nav from "@/components/Nav";
import DownloadCvButton from "@/components/DownloadCvButton";

// Source of truth: Figma "CV & Portfolio" → CV → CV_Romero-2026-November-EN.
// `**text**` renders as SemiBold ink; everything else uses the body grey.

export const metadata = {
  title: "CV — Gonzalo Romero",
  description:
    "Product designer with 8 years in digital design — design systems, SaaS and AI-assisted prototyping. I design in Figma and use Claude daily to turn ideas into clickable interfaces in hours.",
};

const HEADLINE =
  "Senior Product Designer (UI/UX) · Design systems, SaaS & AI-assisted prototyping · Remote / Frankfurt";

const CONTACT = [
  { value: "romerogon98@gmail.com", href: "mailto:romerogon98@gmail.com" },
  { value: "+49 172 284 1502", href: "tel:+491722841502" },
  { value: "Frankfurt am Main, Germany" },
  {
    value: "linkedin.com/in/romero-gonzalo",
    href: "https://www.linkedin.com/in/romero-gonzalo",
  },
  { value: "behance.net/romerogonzalo", href: "https://www.behance.net/romerogonzalo" },
  { value: "romerogon.vercel.app", href: "https://romerogon.vercel.app" },
];

const ABOUT = [
  "Product designer with **8 years in digital design** and **4 focused on UX/UI**, owning product work end to end — framing the problem, mapping flows, prototyping and shipping the final interface.",
  "At Litebox I design **B2B SaaS and developer-facing products** for Silicon Valley clients — LLM platforms, API companies and fintech — inside a **shared design system in Figma**, working directly with front-end engineers.",
  "**AI is part of my daily workflow**: I design in Figma and use Claude to research, explore and prototype, so ideas become clickable interfaces **in hours, not weeks**. Background in graphic design, motion and web; I founded and ran my own design studio.",
];

const SKILLS = [
  "**Design** — Figma (auto-layout, variables, components), design systems, UX research, usability testing, prototyping",
  "**Build** — Framer, Webflow, HTML/CSS, React / Next.js",
  "**AI** — Claude, Claude Code, Cursor, v0, ChatGPT",
];

const EXPERIENCE = [
  {
    role: "Hybrid Designer",
    org: "Litebox",
    period: "October 2025 — Present",
    bullets: [
      "Design B2B SaaS and product interfaces for LLM platforms, API companies and fintech — user flows, wireframes, interactive prototypes and the final responsive UI.",
      "Key projects: Griffin, the UK's first full-stack Banking-as-a-Service platform, and VU Security — shaping the design direction with the client from early stages through to build.",
      "Work inside a shared design system in Figma (auto-layout, components, design tokens), extending and maintaining it so patterns stay consistent across projects.",
      "Rapid prototyping with AI tooling (Claude, Cursor, v0), turning concepts into clickable interfaces in hours rather than weeks.",
      "Hand off and collaborate closely with front-end engineers so designs ship as specified. 6+ products and sites delivered since October 2025.",
    ],
  },
  {
    role: "UX/UI Designer & Brand Strategist",
    org: "Avans",
    period: "August 2022 — October 2025",
    bullets: [
      "Created and maintained scalable design systems that held UI and brand consistency across concurrent SaaS and enterprise web products.",
      "Ran user research and usability testing, translating findings into information architecture and interaction design decisions.",
      "Built wireframes, user flows and interactive prototypes to drive discovery phases and design sprints.",
      "Lead designer within the UI team — ran client and stakeholder workshops and defined project direction.",
      "Used product metrics and user feedback to iterate and optimize design decisions.",
    ],
  },
  {
    role: "Founder & Creative Director",
    org: "Sayes",
    period: "January 2018 — August 2022",
    bullets: [
      "Founded and ran a digital design studio, leading creative direction and end-to-end delivery, with direct client management from pitch to launch.",
      "Website design and development in WordPress, ensuring responsive UX/UI experiences.",
      "Worked in agile teams alongside developers, marketers and product managers.",
    ],
  },
];

const COURSES = [
  {
    title: "UX/UI Design Career — Coderhouse",
    detail: "Oct 2021 – Feb 2022 · Final grade 10",
  },
];

const ACADEMICS = [
  {
    title: "Multimedia Designer — Escuela Multimedial DaVinci",
    detail: "Mar 2017 – Dec 2020 · Final grade 8.20",
  },
];

const LANGUAGES = [
  "**Spanish** — Native",
  "**English** — B2 · Professional working proficiency",
  "**German** — A1 · Currently learning",
];

// Renders `**bold**` spans as SemiBold ink.
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
        part.startsWith("**") ? (
          <strong key={i} className="font-semibold text-[#1a1a1a]">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-bold uppercase tracking-wider text-[#1a1a1a] print:text-[8.5pt]">
      {children}
    </h2>
  );
}

function Entry({ title, detail }: { title: string; detail: string }) {
  return (
    <div>
      <h3 className="font-medium text-[#1a1a1a]">{title}</h3>
      <p className="mt-0.5 text-sm text-neutral-500 print:mt-0 print:text-[8pt]">{detail}</p>
    </div>
  );
}

export default function CvPage() {
  return (
    <>
      {/* Inline because the global CSS pipeline drops @page rules. No page
          margin so the cream reaches the paper edge; .cv-page pads instead. */}
      <style>{"@page { size: A4; margin: 0; }"}</style>
      <Nav light />
      <main className="cv-page min-h-screen bg-[#faf8f5] px-6 pb-24 pt-32 text-[#3d3d3d] sm:px-10 print:min-h-0 print:px-[13mm] print:py-[12mm] print:text-[9pt] print:leading-[1.42]">
        <div className="mx-auto max-w-4xl print:max-w-none">
          {/* Header */}
          <header className="flex flex-col gap-10 border-b border-neutral-200 pb-10 md:flex-row md:items-start md:justify-between print:flex-row print:items-start print:justify-between print:gap-6 print:pb-5">
            <div className="flex items-center gap-6 print:gap-4">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border border-neutral-200 sm:h-36 sm:w-36 print:h-[22mm] print:w-[22mm]">
                <Image
                  src="/cv/portrait.jpg"
                  alt="Gonzalo Romero"
                  fill
                  sizes="144px"
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1] tracking-[-0.03em] text-[#1a1a1a] print:text-[24pt]">
                  Gonzalo Romero<span className="cv-accent text-[#ff4d00]">.</span>
                </h1>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-500 print:mt-1.5 print:max-w-[78mm] print:text-[8.5pt] print:leading-snug">
                  {HEADLINE}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5 md:items-end print:items-end">
              <div className="text-sm md:text-right print:text-right print:text-[8pt]">
                <SectionTitle>Info</SectionTitle>
                <div className="mt-3 flex flex-col gap-1 print:mt-1.5 print:gap-0">
                  {CONTACT.map((c) =>
                    c.href ? (
                      <a
                        key={c.value}
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="transition-colors hover:text-[#ff4d00]"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <span key={c.value}>{c.value}</span>
                    )
                  )}
                </div>
              </div>
              <DownloadCvButton />
            </div>
          </header>

          {/* Body */}
          <div className="grid gap-x-14 gap-y-12 pt-12 md:grid-cols-2 print:grid-cols-[1fr_1.15fr] print:gap-x-8 print:pt-5">
            {/* Left column */}
            <div className="flex flex-col gap-12 print:gap-4">
              <section>
                <SectionTitle>About</SectionTitle>
                <div className="mt-4 flex flex-col gap-3 leading-relaxed print:mt-1.5 print:gap-1.5 print:leading-[1.4]">
                  {ABOUT.map((p) => (
                    <p key={p}>
                      <Rich text={p} />
                    </p>
                  ))}
                </div>
              </section>

              <section>
                <SectionTitle>Skills</SectionTitle>
                <ul className="mt-4 flex flex-col gap-2 leading-relaxed print:mt-1.5 print:gap-1 print:leading-[1.4]">
                  {SKILLS.map((s) => (
                    <li key={s}>
                      <Rich text={s} />
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <SectionTitle>Courses</SectionTitle>
                <div className="mt-4 flex flex-col gap-4 print:mt-1.5">
                  {COURSES.map((c) => (
                    <Entry key={c.title} {...c} />
                  ))}
                </div>
              </section>

              <section>
                <SectionTitle>Academics</SectionTitle>
                <div className="mt-4 flex flex-col gap-4 print:mt-1.5">
                  {ACADEMICS.map((a) => (
                    <Entry key={a.title} {...a} />
                  ))}
                </div>
              </section>

              <section>
                <SectionTitle>Language</SectionTitle>
                <ul className="mt-4 flex flex-col gap-2 print:mt-1.5 print:gap-0.5">
                  {LANGUAGES.map((l) => (
                    <li key={l}>
                      <Rich text={l} />
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Right column */}
            <div>
              <SectionTitle>Experience</SectionTitle>
              <div className="mt-4 flex flex-col divide-y divide-neutral-200 print:mt-1.5">
                {EXPERIENCE.map((e) => (
                  <div key={e.org} className="py-6 first:pt-0 print:py-3 print:first:pt-0">
                    <h3 className="text-lg font-semibold text-[#1a1a1a] print:text-[10pt]">
                      {e.role} <span className="text-neutral-500">· {e.org}</span>
                    </h3>
                    <p className="mt-0.5 text-sm italic text-neutral-500 print:mt-0 print:text-[8pt]">
                      {e.period}
                    </p>
                    <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 marker:text-[#ff4d00] print:mt-1.5 print:gap-1 print:pl-4">
                      {e.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
