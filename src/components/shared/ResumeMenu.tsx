"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowDown, ChevronDown } from "lucide-react";
import { RESUMES, resumeFor } from "@/lib/constants";
import { useRole } from "@/lib/role-context";

// Resume download control used everywhere a resume is offered.
// General site: "Resume ▾" opens a picker with both resumes.
// Role edition: one click downloads that role's resume; ▾ offers the other.
export default function ResumeMenu({
  variant = "primary",
  align = "left",
  className = "",
}: {
  variant?: "primary" | "secondary";
  align?: "left" | "right";
  className?: string;
}) {
  const role = useRole();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const ordered = role ? [resumeFor(role), ...RESUMES.filter((r) => r.role !== role)] : RESUMES;
  const btn = `btn ${variant === "primary" ? "btn-primary" : "btn-secondary"}`;

  return (
    <div ref={wrapRef} className={`relative inline-flex ${className}`}>
      {role ? (
        <>
          <a href={resumeFor(role).href} download className={btn}>
            Resume · {resumeFor(role).short} <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.5} />
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label="Other resume versions"
            className={`${btn} px-3 ${variant === "primary" ? "border-l-paper/30" : "border-l-0"}`}
          >
            <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
        </>
      ) : (
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls={menuId} className={btn}>
          Resume <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.5} />
        </button>
      )}

      {open && (
        <div
          id={menuId}
          className={`absolute top-full z-[55] mt-2 w-[min(320px,calc(100vw-2rem))] border border-ink bg-paper-raised shadow-[6px_6px_0_0_var(--rule)] ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <p className="label border-b border-rule px-4 py-2">Choose a resume</p>
          <ul className="m-0 list-none p-0">
            {ordered.map((r) => (
              <li key={r.role} className="border-b border-rule last:border-b-0">
                <a
                  href={r.href}
                  download
                  onClick={() => setOpen(false)}
                  className="group flex items-start justify-between gap-3 px-4 py-3 hover:bg-paper"
                >
                  <span>
                    <span className="block text-[15px] text-ink group-hover:text-seal">{r.label}</span>
                    <span className="block text-[13px] text-graphite">{r.summary}</span>
                    {r.role === role && (
                      <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.06em] text-seal">
                        Matches this page
                      </span>
                    )}
                  </span>
                  <span className="shrink-0 pt-0.5 font-mono text-[12px] text-pencil group-hover:text-seal">PDF ↓</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
