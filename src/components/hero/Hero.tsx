import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { EDITIONS, PERSONAL, type RoleId } from "@/lib/constants";
import Annotate from "@/components/shared/Annotate";
import ResumeMenu from "@/components/shared/ResumeMenu";
import DetectionSpecimen from "./DetectionSpecimen";

const LINKS = [
  { label: "GitHub", href: PERSONAL.githubUrl },
  { label: "LinkedIn", href: PERSONAL.linkedin },
  { label: "LeetCode", href: PERSONAL.leetcode },
  { label: "Email", href: `mailto:${PERSONAL.email}` },
];

const EDITION_LINKS: { role: RoleId | null; label: string; href: string }[] = [
  { role: null, label: "General", href: "/" },
  { role: "ai", label: "AI / ML", href: "/?role=ai" },
  { role: "fullstack", label: "Full-stack", href: "/?role=fullstack" },
];

export default function Hero({ role }: { role: RoleId | null }) {
  const edition = role ? EDITIONS[role] : null;
  const roles = edition?.roles ?? PERSONAL.roles;
  const thesis = edition?.thesis ?? PERSONAL.thesis;
  const abstract = edition?.abstract ?? PERSONAL.abstract;

  return (
    <section id="top" aria-labelledby="hero-name" className="dot-grid">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-x-6 gap-y-14 px-4 pt-14 pb-16 sm:px-6 md:pt-20 lg:grid-cols-12 lg:pb-20">
        {/* Title block */}
        <div className="lg:col-span-7">
          <p className="label flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>Portfolio</span>
            <span aria-hidden="true">·</span>
            <span>Rev. {PERSONAL.revision}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5 text-verify">
              Status: open to roles
              <span className="status-dot h-2 w-2 rounded-full bg-verify" aria-hidden="true" />
            </span>
          </p>

          {/* Edition switcher: the same document, ordered for a role */}
          <nav aria-label="Portfolio edition" className="mt-3 flex flex-wrap items-center gap-x-1 gap-y-1">
            <span className="label mr-1">Edition</span>
            {EDITION_LINKS.map((e) => {
              const current = e.role === role;
              return (
                <a
                  key={e.label}
                  href={e.href}
                  aria-current={current ? "page" : undefined}
                  className={`border px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.06em] transition-colors ${
                    current ? "border-ink bg-ink text-paper" : "border-rule text-graphite hover:border-ink hover:text-ink"
                  }`}
                >
                  {e.label}
                </a>
              );
            })}
          </nav>

          <h1 id="hero-name" className="mt-8">
            <Annotate label="name" score={0.99} as="span">
              <span className="font-display block text-[3.2rem] leading-[0.98] text-ink sm:text-[4.25rem] lg:text-[4.25rem] xl:text-[4.75rem]">
                {PERSONAL.name}
              </span>
            </Annotate>
          </h1>

          <p className="font-display mt-8 max-w-[22ch] text-[1.6rem] leading-[1.2] text-ink sm:text-[2rem]">
            {thesis}
          </p>

          {/* Author line */}
          <div className="mt-10 flex items-start gap-5">
            <Annotate label="person" score={0.99} trigger="hover" tag="bottom" className="shrink-0">
              <div className="relative h-[84px] w-[84px] overflow-hidden border border-rule bg-paper-raised">
                <Image
                  src={PERSONAL.photo}
                  alt={`Portrait of ${PERSONAL.name}`}
                  width={168}
                  height={168}
                  priority
                  className="h-full w-full object-cover grayscale contrast-[1.1]"
                />
                {/* Duotone: shadows → ink, highlights → paper */}
                <span className="absolute inset-0 bg-[var(--duo-dark)] mix-blend-lighten" aria-hidden="true" />
                <span className="absolute inset-0 bg-[var(--duo-light)] mix-blend-darken" aria-hidden="true" />
              </div>
            </Annotate>
            <div>
              <p className="label">Author · roles</p>
              <ul className="mt-2 space-y-0.5 font-mono text-[14px] text-ink">
                {roles.map((r, i) => (
                  <li key={r}>
                    <span className="text-pencil">{String(i + 1).padStart(2, "0")}</span> {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Abstract */}
          <div className="mt-10 border-l-2 border-seal pl-5">
            <p className="label text-ink">Abstract</p>
            <p className="measure mt-2 text-graphite">{abstract}</p>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn btn-primary">
              View selected work <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>
            <ResumeMenu variant="secondary" />
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[13px]">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-link inline-flex min-h-[44px] items-center text-graphite"
                >
                  {l.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Specimen */}
        <div className="lg:col-span-5 lg:pt-10">
          <DetectionSpecimen />
        </div>
      </div>
    </section>
  );
}
