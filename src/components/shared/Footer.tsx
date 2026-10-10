"use client";

import { PERSONAL } from "@/lib/constants";
import { setUi } from "@/lib/ui-store";
import Seal from "./Seal";

export default function Footer() {
  return (
    <footer className="border-t border-ink">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-12">
        <div className="flex items-start gap-4 lg:col-span-3">
          <Seal id="footer" size={56} className="text-seal" title="KKJ seal" />
        </div>
        <div className="lg:col-span-6">
          <p className="label text-ink">Colophon</p>
          <p className="mt-2 text-[15px] text-graphite">
            Set in Newsreader &amp; IBM Plex. Built with Next.js. Rev. {PERSONAL.revision}.
            <br />© {PERSONAL.name}.
          </p>
          <p className="mt-4 font-mono text-[12px] text-pencil">
            Press <kbd className="border border-rule px-1.5 text-ink">`</kbd> to open the terminal ·{" "}
            <button
              type="button"
              onClick={() => setUi({ terminal: true })}
              className="text-link min-h-[44px] text-graphite"
            >
              open it
            </button>
          </p>
        </div>
        <ul className="space-y-1 font-mono text-[13px] lg:col-span-3 lg:text-right">
          {[
            { k: "GitHub", href: PERSONAL.githubUrl },
            { k: "LinkedIn", href: PERSONAL.linkedin },
            { k: "LeetCode", href: PERSONAL.leetcode },
          ].map((l) => (
            <li key={l.k}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-link text-graphite">
                {l.k} ↗
              </a>
            </li>
          ))}
          <li>
            <a href="#top" className="text-link text-graphite">
              Back to top ↑
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
