"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Moon, Sun, Menu, X, MessageSquareText } from "lucide-react";
import { NAV_ITEMS, PERSONAL, RESUMES } from "@/lib/constants";
import { setUi, useUi } from "@/lib/ui-store";
import { useRole } from "@/lib/role-context";
import ResumeMenu from "./ResumeMenu";
import Seal from "./Seal";

// ─── Theme (data-theme on <html>, falls back to the OS preference) ───────────
const DARK_QUERY = "(prefers-color-scheme: dark)";

function subscribeTheme(callback: () => void) {
  const mql = window.matchMedia(DARK_QUERY);
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
  mql.addEventListener("change", callback);
  return () => {
    observer.disconnect();
    mql.removeEventListener("change", callback);
  };
}

function getTheme(): "light" | "dark" {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

function useTheme() {
  return useSyncExternalStore(subscribeTheme, getTheme, () => "light" as const);
}

function toggleTheme() {
  const next = getTheme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    // storage unavailable: the choice lasts for this page view only
  }
}

export default function TopBar() {
  const theme = useTheme();
  const role = useRole();
  const tldr = useUi("tldr");
  const assistant = useUi("assistant");
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const progressRef = useRef<HTMLDivElement>(null);

  // Reading progress (written straight to the DOM; no re-render per scroll)
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${ratio})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Active section
  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.querySelector(n.href)).filter(
      (s): s is Element => s !== null
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Escape closes the mobile menu
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const toggleAssistant = () => {
    setUi({ assistant: !assistant });
    setMenuOpen(false);
  };

  const toggleTldr = () => {
    setUi({ tldr: !tldr });
    setMenuOpen(false);
  };

  const ThemeIcon = theme === "dark" ? Sun : Moon;

  return (
    <header className="no-print sticky top-0 z-50 border-b border-rule bg-paper">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-paper focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6">
        <a
          href="#top"
          onClick={() => setUi({ tldr: false })}
          className="flex items-center gap-3 text-ink"
        >
          <Seal id="nav" size={34} className="shrink-0 text-seal" />
          <span className="font-display whitespace-nowrap text-[17px] leading-none sm:text-[19px]">{PERSONAL.name}</span>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setUi({ tldr: false })}
              aria-current={active === item.href ? "location" : undefined}
              className={`px-3 py-2 font-mono text-[12px] uppercase tracking-[0.06em] transition-colors ${
                active === item.href && !tldr
                  ? "text-seal"
                  : "text-graphite hover:text-ink"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleAssistant}
            aria-pressed={assistant}
            className={`hidden min-h-[44px] items-center gap-2 border px-3 font-mono text-[12px] uppercase tracking-[0.06em] transition-colors sm:inline-flex ${
              assistant
                ? "border-seal bg-seal-tint text-seal"
                : "border-rule text-graphite hover:border-ink hover:text-ink"
            }`}
          >
            <MessageSquareText className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
            Ask
          </button>
          <button
            type="button"
            onClick={toggleTldr}
            aria-pressed={tldr}
            className={`hidden min-h-[44px] items-center gap-2 border px-3 font-mono text-[12px] uppercase tracking-[0.06em] transition-colors sm:inline-flex ${
              tldr
                ? "border-seal bg-seal-tint text-seal"
                : "border-rule text-graphite hover:border-ink hover:text-ink"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full border ${tldr ? "border-seal bg-seal" : "border-current"}`}
              aria-hidden="true"
            />
            TL;DR
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className="inline-flex h-11 w-11 items-center justify-center text-graphite transition-colors hover:text-ink"
          >
            <ThemeIcon className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </button>
          <div className="hidden md:block">
            <ResumeMenu align="right" />
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center text-ink lg:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Reading progress */}
      <div
        ref={progressRef}
        className="progress-line absolute bottom-[-1px] left-0 h-[2px] w-full bg-seal"
        style={{ transform: "scaleX(0)" }}
        aria-hidden="true"
      />

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-rule bg-paper lg:hidden">
          <nav aria-label="Sections" className="mx-auto max-w-[1200px] px-4 py-3 sm:px-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => {
                  setMenuOpen(false);
                  setUi({ tldr: false });
                }}
                className="flex min-h-[48px] items-center gap-4 border-b border-rule text-ink last:border-b-0"
              >
                <span className="label w-8">{item.number}</span>
                <span className="font-display text-xl">{item.label}</span>
              </a>
            ))}
            <div className="flex flex-wrap gap-3 pt-4 pb-2">
              <button type="button" onClick={toggleAssistant} className="btn btn-primary" aria-pressed={assistant}>
                Ask the portfolio
              </button>
              <button type="button" onClick={toggleTldr} className="btn btn-secondary" aria-pressed={tldr}>
                {tldr ? "Full document" : "TL;DR brief"}
              </button>
            </div>
            <div className="border-t border-rule pt-3 pb-2">
              <p className="label">Resume</p>
              <ul className="mt-1">
                {[...RESUMES]
                  .sort((a, b) => Number(b.role === role) - Number(a.role === role))
                  .map((r) => (
                    <li key={r.role}>
                      <a
                        href={r.href}
                        download
                        className="flex min-h-[48px] items-center justify-between gap-3 border-b border-rule text-ink last:border-b-0"
                      >
                        <span>
                          {r.label}
                          {r.role === role && <span className="ml-2 font-mono text-[11px] text-seal">MATCHES</span>}
                        </span>
                        <span className="font-mono text-[12px] text-pencil">PDF ↓</span>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
