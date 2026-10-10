"use client";

import { useEffect, useRef, useState } from "react";
import { X, ArrowRight } from "lucide-react";

// "Read case study" button + side sheet. Uses a native <dialog>, which gives
// focus trapping and Escape-to-close for free. Content is server-rendered
// and passed in as children.
export default function CaseStudy({
  title,
  number,
  children,
}: {
  title: string;
  number: string;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const headingId = `case-${number}-title`;

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="btn btn-secondary">
        Read case study <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={headingId}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
        className="m-0 ml-auto h-dvh max-h-none w-full max-w-[820px] border-l border-rule bg-paper p-0 text-ink"
      >
        <article className="min-h-full">
            <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-rule bg-paper px-5 py-4 sm:px-10">
              <div>
                <p className="label">
                  <span className="text-seal">Case study {number}</span>
                </p>
                <h2 id={headingId} className="font-display mt-1 text-[1.75rem] leading-tight sm:text-[2.25rem]">
                  {title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close case study"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-graphite hover:text-ink"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </header>
            <div className="px-5 py-8 sm:px-10 sm:py-10">{children}</div>
        </article>
      </dialog>
    </>
  );
}
