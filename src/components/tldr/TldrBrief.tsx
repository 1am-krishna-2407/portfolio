"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import {
  CASE_CODES,
  EDITIONS,
  EXPERIENCE,
  PERSONAL,
  PROJECTS,
  RESUMES,
  TLDR_DEFAULT,
  TLDR_METRICS,
} from "@/lib/constants";
import { useRole } from "@/lib/role-context";
import { setUi, useUi } from "@/lib/ui-store";
import { useReducedMotion } from "@/lib/use-reduced-motion";

// The whole document "folds" into a one-screen recruiter brief.
export default function TldrBrief() {
  const open = useUi("tldr");
  const role = useRole();
  const edition = role ? EDITIONS[role] : null;
  const projectIds = edition?.tldrProjects ?? TLDR_DEFAULT.projects;
  const stack = edition?.tldrStack ?? TLDR_DEFAULT.stack;
  const resumes = [...RESUMES].sort((a, b) => Number(b.role === role) - Number(a.role === role));
  const reduced = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    headingRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setUi({ tldr: false });
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const exp = EXPERIENCE[0];
  const close = () => setUi({ tldr: false });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="tldr"
          role="region"
          aria-label="TL;DR brief"
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-paper"
          style={{ transformOrigin: "top center", perspective: 1200 }}
          initial={reduced ? { opacity: 0 } : { opacity: 0, scaleY: 0.35, rotateX: -18 }}
          animate={{ opacity: 1, scaleY: 1, rotateX: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, scaleY: 0.35, rotateX: 18 }}
          transition={{ duration: reduced ? 0.01 : 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 md:py-14">
            <div className="border border-ink bg-paper-raised p-6 sm:p-10">
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-ink pb-5">
                <p className="label">
                  <span className="text-seal">TL;DR</span> · One-page brief{edition ? ` · ${edition.name}` : ""} · Rev. {PERSONAL.revision}
                </p>
                <p className="label inline-flex items-center gap-2 text-verify">
                  <span className="status-dot h-2 w-2 rounded-full bg-verify" aria-hidden="true" />
                  Available now
                </p>
              </div>

              <div className="grid grid-cols-1 gap-x-10 gap-y-8 pt-8 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <h2 ref={headingRef} tabIndex={-1} className="font-display text-[2.75rem] leading-none text-ink outline-none sm:text-[3.5rem]">
                    {PERSONAL.name}
                  </h2>
                  <p className="mt-4 font-mono text-[14px] leading-relaxed text-graphite">
                    {(edition?.roles ?? PERSONAL.roles).join(" · ")}
                  </p>
                  <p className="font-display mt-6 text-[1.4rem] leading-snug text-ink">{edition?.thesis ?? PERSONAL.thesis}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {resumes.map((r, i) => (
                      <a
                        key={r.role}
                        href={r.href}
                        download
                        className={`btn ${i === 0 && role ? "btn-primary" : "btn-secondary"}`}
                      >
                        Resume · {r.short} <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </a>
                    ))}
                    <a href={`mailto:${PERSONAL.email}`} className="btn btn-secondary">
                      Email
                    </a>
                  </div>
                </div>

                <dl className="m-0 lg:col-span-7">
                  <div className="border-b border-rule pb-5">
                    <dt className="label">Selected work</dt>
                    <dd className="m-0 mt-3">
                      <ul className="space-y-2">
                        {projectIds.map((id) => {
                          const p = PROJECTS.find((x) => x.id === id)!;
                          return (
                            <li key={id} className="grid grid-cols-[32px_1fr] gap-2 sm:grid-cols-[32px_1fr_auto] sm:gap-4">
                              <span className="font-mono text-[12px] leading-6 text-pencil">{CASE_CODES[id]}</span>
                              <a href={`#work-${id}`} onClick={close} className="text-link text-ink">
                                {p.short}
                              </a>
                              <span className="col-start-2 font-mono text-[13px] text-seal sm:col-start-auto sm:text-right">
                                {TLDR_METRICS[id]}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </dd>
                  </div>
                  <div className="border-b border-rule py-5">
                    <dt className="label">Experience</dt>
                    <dd className="m-0 mt-2 text-ink">
                      {exp.company} — {exp.role} <span className="font-mono text-[13px] text-pencil">· {exp.period}</span>
                    </dd>
                  </div>
                  <div className="border-b border-rule py-5">
                    <dt className="label">Core stack</dt>
                    <dd className="m-0 mt-2 font-mono text-[13px] leading-relaxed text-ink">{stack.join(" · ")}</dd>
                  </div>
                  <div className="py-5">
                    <dt className="label">Open to</dt>
                    <dd className="m-0 mt-2 text-ink">{PERSONAL.openTo.join(" · ")} roles</dd>
                  </div>
                </dl>
              </div>
            </div>

            <button type="button" onClick={close} className="btn btn-secondary mt-6">
              Unfold full document <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
