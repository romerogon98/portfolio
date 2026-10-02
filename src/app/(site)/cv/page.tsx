import Image from "next/image";
import Nav from "@/components/Nav";
import DownloadCvButton from "@/components/DownloadCvButton";

export const metadata = {
  title: "CV — Gonzalo Romero",
  description:
    "Curriculum vitae of Gonzalo Romero — UX/UI Designer, Web & Product Design, No-Code Developer.",
};

const CONTACT = [
  { value: "romerogon98@gmail.com", href: "mailto:romerogon98@gmail.com" },
  { value: "+54 11 6523 9897", href: "tel:+541165239897" },
  { value: "Germany · Available worldwide" },
  {
    value: "linkedin.com/in/romero-gonzalo",
    href: "https://www.linkedin.com/in/romero-gonzalo",
  },
  { value: "behance.net/romerogonzalo", href: "https://www.behance.net/romerogonzalo" },
  { value: "romerogon.vercel.app", href: "https://romerogon.vercel.app" },
];

const ABOUT = [
  "Multimedia designer with 5+ years of experience, focused on UX/UI since 2022.",
  "My background spans graphic design, motion graphics, web design and front-end development. Early in my career I founded and ran my own creative agency, managing graphic-design and digital-marketing projects for a range of clients.",
  "I currently work at Litebox as a UX/UI Designer and hybrid developer. Alongside design, I use AI no-code tools like Claude to ship previews and full pages built entirely from code and wired into a pre-built design system — bridging design and development so the work stays creative but also practical and technically sound.",
  "On the design side I work with Figma and the Adobe Suite, and on the build side with Framer, Webflow, WordPress, HTML/CSS, React, Next.js and Vue. I ship from code with Claude, Claude Code, Cursor, v0, GitHub and Vercel, and I'm very comfortable across no-code and AI-assisted workflows. I enjoy turning ideas into real experiences, working as a team, and finding smart, functional solutions to problems.",
];

const EXPERIENCE = [
  {
    role: "UX/UI Designer & Hybrid Developer",
    org: "Litebox",
    period: "October 2025 — Present",
    bullets: [
      "User-centered website and product design — UX, information architecture and design systems.",
      "Ship previews and full pages built entirely from code with AI no-code tools like Claude, wired into a pre-built design system.",
      "Build and deploy straight from code using Claude, Vercel and GitHub.",
    ],
  },
  {
    role: "UX/UI Designer & Brand Strategist",
    org: "Avans",
    period: "August 2022 — October 2025",
    bullets: [
      "Led within the UI team, taking an active part in client meetings and defining project direction.",
      "Designed responsive web platforms using Figma, Webflow, Framer and WordPress.",
      "Created and maintained design systems to keep brand consistency across projects.",
      "Ran UX research and usability testing to improve user flows and product performance.",
      "Built wireframes and interactive prototypes to support discovery phases and design sprints.",
      "Used metrics and user feedback to iterate and optimize design decisions.",
    ],
  },
  {
    role: "Founder & Creative Director",
    org: "Sayes",
    period: "January 2018 — August 2022",
    bullets: [
      "Creative direction and end-to-end execution of digital projects.",
      "Direct client management, from initial pitch to final delivery.",
      "Website design and development in WordPress (Elementor), ensuring responsive UX/UI experiences.",
      "Visual assets for social media, marketing and branding.",
      "Collaborated with UX research and copywriting to integrate user insights.",
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
  { name: "Spanish", level: "Native" },
  { name: "English", level: "B2 Intermediate · Oral & written (Advanced)" },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
      {children}
    </h2>
  );
}

export default function CvPage() {
  return (
    <>
      <Nav light />
      <main className="cv-page min-h-screen bg-white px-6 pb-24 pt-32 text-neutral-700 sm:px-10">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <header className="flex flex-col gap-10 border-b border-neutral-200 pb-10 md:flex-row md:items-start md:justify-between">
            <div className="flex items-center gap-6">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border border-neutral-200 sm:h-36 sm:w-36">
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
                <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1] tracking-[-0.03em] text-neutral-900">
                  Gonzalo Romero<span className="cv-accent text-accent-600">.</span>
                </h1>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-500">
                  UX/UI Designer · Web &amp; Product Design · No-Code Developer
                  (Claude / Framer / Webflow)
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5 md:items-end">
              <div className="text-sm md:text-right">
                <SectionTitle>Info</SectionTitle>
                <div className="mt-3 flex flex-col gap-1 text-neutral-600">
                  {CONTACT.map((c) =>
                    c.href ? (
                      <a
                        key={c.value}
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="transition-colors hover:text-accent-600"
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
          <div className="grid gap-x-14 gap-y-12 pt-12 md:grid-cols-2">
            {/* Left column */}
            <div className="flex flex-col gap-12">
              <section>
                <SectionTitle>About</SectionTitle>
                <div className="mt-4 flex flex-col gap-3 leading-relaxed text-neutral-600">
                  {ABOUT.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>

              <section>
                <SectionTitle>Courses</SectionTitle>
                <div className="mt-4 flex flex-col gap-4">
                  {COURSES.map((c) => (
                    <div key={c.title}>
                      <h3 className="font-medium text-neutral-900">{c.title}</h3>
                      <p className="mt-0.5 text-sm text-neutral-400">{c.detail}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <SectionTitle>Academics</SectionTitle>
                <div className="mt-4 flex flex-col gap-4">
                  {ACADEMICS.map((a) => (
                    <div key={a.title}>
                      <h3 className="font-medium text-neutral-900">{a.title}</h3>
                      <p className="mt-0.5 text-sm text-neutral-400">{a.detail}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <SectionTitle>Language</SectionTitle>
                <div className="mt-4 flex flex-col gap-2">
                  {LANGUAGES.map((l) => (
                    <div key={l.name}>
                      <span className="font-medium text-neutral-900">{l.name}</span>
                      <span className="text-neutral-500"> — {l.level}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right column */}
            <div>
              <SectionTitle>Experience</SectionTitle>
              <div className="mt-4 flex flex-col divide-y divide-neutral-200">
                {EXPERIENCE.map((e) => (
                  <div key={e.org} className="py-6 first:pt-0">
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {e.role} <span className="text-neutral-500">· {e.org}</span>
                    </h3>
                    <p className="mt-0.5 text-sm italic text-neutral-400">
                      {e.period}
                    </p>
                    <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 text-neutral-600 marker:text-accent-500">
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
