"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { PERSONAL, RESUMES, ROLE_ALIASES, TERMINAL_COMMANDS, resumeFor, type Resume } from "@/lib/constants";
import { useRole } from "@/lib/role-context";
import { askPortfolio } from "@/lib/assistant/client";
import { setUi, useUi } from "@/lib/ui-store";
import Seal from "@/components/shared/Seal";

type Line = { kind: "in" | "out"; text: string };

const WELCOME: Line[] = [{ kind: "out", text: "kkj/terminal — type 'help' to list commands." }];

function isTyping(target: EventTarget | null) {
  const el = target as HTMLElement | null;
  return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
}

export default function Terminal() {
  const open = useUi("terminal");
  const hired = useUi("hired");
  const role = useRole();
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [past, setPast] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  // ` toggles, Escape closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "`" && !isTyping(e.target)) {
        e.preventDefault();
        setUi({ terminal: !open });
      } else if (e.key === "Escape" && open) {
        setUi({ terminal: false });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      inputRef.current?.focus();
    } else {
      returnFocus.current?.focus?.();
    }
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  // HIRED stamp auto-dismisses
  useEffect(() => {
    if (!hired) return;
    const t = setTimeout(() => setUi({ hired: false }), 2800);
    return () => clearTimeout(t);
  }, [hired]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase().replace(/\s+/g, " ");
    if (!cmd) return;
    setPast((p) => [raw, ...p].slice(0, 30));
    setCursor(-1);

    if (cmd === "clear") {
      setLines([]);
      return;
    }

    // ask <question>: the portfolio assistant, answered inline.
    if (cmd === "ask" || cmd.startsWith("ask ")) {
      const question = raw.trim().slice(3).trim();
      if (!question) {
        setLines((l) => [...l, { kind: "in", text: raw }, { kind: "out", text: "usage: ask <question>   e.g. ask what has he built with RAG?" }]);
        return;
      }
      setLines((l) => [...l, { kind: "in", text: raw }, { kind: "out", text: "reading the portfolio…" }]);
      askPortfolio(question).then((r) => {
        const text =
          r.kind === "answer"
            ? [r.headline, r.details, `sources: ${r.citations.map((c) => c.label).join(", ")}`]
                .filter(Boolean)
                .join("\n\n")
                .replace(/\*\*/g, "")
            : r.kind === "fallback"
              ? [r.message, ...r.citations.map((c) => `  ${c.label}`)].join("\n")
              : r.message;
        setLines((l) => [...l.slice(0, -1), { kind: "out", text }]);
      });
      return;
    }

    let out: string;
    if (cmd === "sudo hire krishna") {
      out = "Permission granted. Stamping…";
      setUi({ hired: true, terminal: false });
    } else if (cmd === "resume" || cmd.startsWith("resume ")) {
      // "resume" follows the page's edition; "resume ai" / "resume fullstack" pick one.
      const arg = cmd.slice("resume".length).trim();
      const wanted = arg ? ROLE_ALIASES[arg] : role;
      const openResume = (r: Resume) => {
        window.open(r.href, "_blank", "noopener");
        return `Opening ${r.label} resume…`;
      };
      if (wanted) {
        out = openResume(resumeFor(wanted));
      } else if (arg) {
        out = `unknown resume: ${arg}\ntry: resume ai   or   resume fullstack`;
      } else {
        const options = RESUMES.map((r) => `  resume ${r.role.padEnd(10)}${r.label}`).join("\n");
        out = `Two versions:\n${options}`;
      }
    } else if (cmd === "github") {
      out = TERMINAL_COMMANDS.github;
      window.open(PERSONAL.githubUrl, "_blank", "noopener");
    } else if (cmd === "sudo") {
      out = "usage: sudo <command>   (try: sudo hire krishna)";
    } else {
      out = TERMINAL_COMMANDS[cmd] ?? `command not found: ${cmd}\ntype 'help' to list commands.`;
    }
    setLines((l) => [...l, { kind: "in", text: raw }, { kind: "out", text: out }]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" && past.length) {
      e.preventDefault();
      const next = Math.min(cursor + 1, past.length - 1);
      setCursor(next);
      setInput(past[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = cursor - 1;
      setCursor(Math.max(next, -1));
      setInput(next >= 0 ? past[next] : "");
    }
  };

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Terminal"
          className="no-print fixed right-4 bottom-4 left-4 z-[60] border border-ink bg-paper-raised shadow-[6px_6px_0_0_var(--rule)] sm:left-auto sm:w-[520px]"
        >
          <div className="flex items-center justify-between border-b border-ink px-4 py-1.5">
            <span className="label text-ink">kkj@portfolio:~</span>
            <button
              type="button"
              onClick={() => setUi({ terminal: false })}
              aria-label="Close terminal"
              className="inline-flex h-9 w-9 items-center justify-center text-graphite hover:text-ink"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
          <div ref={bodyRef} className="h-72 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed" aria-live="polite">
            {lines.map((l, i) =>
              l.kind === "in" ? (
                <p key={i} className="mt-2 text-ink">
                  <span className="text-seal">$</span> {l.text}
                </p>
              ) : (
                <pre key={i} className="whitespace-pre-wrap text-graphite">
                  {l.text}
                </pre>
              )
            )}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              run(input);
              setInput("");
            }}
            className="flex items-center gap-2 border-t border-rule px-4 py-2"
          >
            <span className="font-mono text-seal" aria-hidden="true">$</span>
            <label htmlFor="terminal-input" className="sr-only">
              Command
            </label>
            <input
              id="terminal-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              spellCheck={false}
              placeholder="help"
              className="min-h-[36px] flex-1 bg-transparent font-mono text-[13px] text-ink placeholder:text-pencil focus:outline-none focus-visible:outline-none"
            />
          </form>
        </div>
      )}

      {hired && (
        <div
          role="status"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-paper/70"
          onClick={() => setUi({ hired: false })}
        >
          <span className="sr-only">Hired.</span>
          <div className="stamp-in text-seal" style={{ "--stamp-rot": "-10deg" } as React.CSSProperties}>
            <Seal id="hired" word="HIRED" size={300} ring="KRISHNA KUMAR JHA · OFFER STAMPED · 2026 · " />
          </div>
        </div>
      )}
    </>
  );
}
