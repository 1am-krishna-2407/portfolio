"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, X } from "lucide-react";
import { setUi, useUi } from "@/lib/ui-store";
import { useRole } from "@/lib/role-context";
import { goToCitation, type Citation } from "@/lib/assistant/citations";
import {
  askPortfolio,
  matchJobDescription,
  type AskResponse,
  type MatchResponse,
} from "@/lib/assistant/client";
import type { MatchRow, MatchStatus } from "@/lib/assistant/engine";
import type { RoleId } from "@/lib/constants";
import Markdown, { InlineMarkdown } from "./Markdown";

const MAX_QUESTION = 500;
const MAX_JD = 8000;

const SUGGESTIONS: Record<"general" | RoleId, string[]> = {
  general: [
    "Give me a quick overview of Krishna's profile",
    "What has Krishna built with LLMs?",
    "Does he have production React experience?",
    "What's his education?",
  ],
  ai: [
    "What has Krishna built with RAG, and how was it evaluated?",
    "Summarise his AI and ML projects with results",
    "What computer vision work has he done?",
    "Which ML frameworks does he know, and how well?",
  ],
  fullstack: [
    "Summarise his full-stack projects and their stacks",
    "How does CodeFlow isolate untrusted code?",
    "Which backend frameworks does he use, and where?",
    "How does he handle authentication and security?",
  ],
};

type Exchange = { question: string; response: AskResponse | null };
type Tab = "ask" | "match";

const STATUS: Record<MatchStatus, { label: string; mark: string }> = {
  met: { label: "Met", mark: "bg-ink border-ink" },
  partial: { label: "Partly", mark: "bg-[linear-gradient(90deg,var(--ink)_50%,transparent_50%)] border-ink" },
  not_shown: { label: "Not shown", mark: "border-pencil" },
};

function StatusMark({ status }: { status: MatchStatus }) {
  return <span className={`mt-[5px] h-3 w-3 shrink-0 border ${STATUS[status].mark}`} aria-hidden="true" />;
}

function CitationChips({ citations, onPick, label = "Sources" }: { citations: Citation[]; onPick: (c: Citation) => void; label?: string }) {
  if (citations.length === 0) return null;
  return (
    <div className="mt-3 flex flex-wrap items-center gap-1.5">
      {label && <span className="label mr-1">{label}</span>}
      {citations.map((c) => (
        <button
          key={c.id}
          type="button"
          onClick={() => onPick(c)}
          className="min-h-[32px] border border-seal px-2 font-mono text-[11px] text-seal transition-colors hover:bg-seal hover:text-paper"
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}

function ReportSection({ title, count, children }: { title: string; count?: number; children: React.ReactNode }) {
  return (
    <section className="border-t border-rule pt-4">
      <h3 className="label flex items-baseline justify-between text-ink">
        {title}
        {count !== undefined && <span className="text-pencil">{String(count).padStart(2, "0")}</span>}
      </h3>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function RequirementList({ rows, onPick }: { rows: MatchRow[]; onPick: (c: Citation) => void }) {
  return (
    <ul className="space-y-3">
      {rows.map((r, i) => (
        <li key={i} className="flex items-start gap-3">
          <StatusMark status={r.status} />
          <div className="min-w-0 flex-1">
            <p className="text-[14px] text-ink">
              {r.requirement} <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-pencil">· {STATUS[r.status].label}</span>
            </p>
            {r.status !== "not_shown" && (
              <p className="text-[13px] text-graphite">
                <InlineMarkdown text={r.evidence} />
              </p>
            )}
            <CitationChips citations={r.citations} onPick={onPick} label="" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function AssistantPanel() {
  const open = useUi("assistant");
  const role = useRole();
  const [tab, setTab] = useState<Tab>("ask");
  const [question, setQuestion] = useState("");
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [jd, setJd] = useState("");
  const [match, setMatch] = useState<MatchResponse | null>(null);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const lastRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setUi({ assistant: false });
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Keep the newest question in view (its top, so long answers read from the start).
  useEffect(() => {
    lastRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [exchanges]);

  const pick = (c: Citation) => {
    setUi({ tldr: false });
    // On narrow screens the panel covers the page, so close it to show the source.
    if (window.matchMedia("(max-width: 639px)").matches) setUi({ assistant: false });
    goToCitation(c);
  };

  const submitQuestion = async (q: string) => {
    const text = q.trim();
    if (!text || busy) return;
    setQuestion("");
    setBusy(true);
    setExchanges((ex) => [...ex, { question: text, response: null }]);
    const response = await askPortfolio(text);
    setExchanges((ex) => ex.map((e, i) => (i === ex.length - 1 ? { ...e, response } : e)));
    setBusy(false);
  };

  const submitJd = async () => {
    const text = jd.trim();
    if (!text || busy) return;
    setBusy(true);
    setMatch(null);
    setMatch(await matchJobDescription(text));
    setBusy(false);
    bodyRef.current?.scrollTo({ top: 0 });
  };

  if (!open) return null;

  const suggestions = SUGGESTIONS[role ?? "general"];

  return (
    <aside
      aria-label="Ask the portfolio"
      className="no-print fixed top-16 right-0 bottom-0 z-[45] flex w-full flex-col border-l border-ink bg-paper sm:w-[500px]"
    >
      {/* Header */}
      <div className="border-b border-rule px-5 pt-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="label">
              <span className="text-seal">Assistant</span> · grounded in this portfolio
            </p>
            <h2 className="font-display mt-1 text-[1.6rem] leading-tight text-ink">Ask the portfolio</h2>
          </div>
          <button
            type="button"
            onClick={() => setUi({ assistant: false })}
            aria-label="Close assistant"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-graphite hover:text-ink"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
        <div role="tablist" aria-label="Assistant mode" className="mt-3 flex gap-1">
          {(
            [
              ["ask", "Ask a question"],
              ["match", "Match a job"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`-mb-px min-h-[44px] border-b-2 px-3 font-mono text-[12px] uppercase tracking-[0.06em] ${
                tab === id ? "border-seal text-ink" : "border-transparent text-graphite hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div ref={bodyRef} className="flex-1 overflow-y-auto px-5 py-5" aria-live="polite">
        {tab === "ask" ? (
          exchanges.length === 0 ? (
            <div>
              <p className="text-[15px] text-graphite">
                Ask about Krishna&apos;s skills, projects, experience or education. Answers come only from this
                portfolio and cite where they found it.
              </p>
              <p className="label mt-6">Try</p>
              <ul className="mt-2 space-y-2">
                {suggestions.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => submitQuestion(s)}
                      className="w-full border border-rule px-3 py-2.5 text-left text-[14px] text-ink transition-colors hover:border-ink"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <ol className="space-y-8">
              {exchanges.map((ex, i) => {
                const r = ex.response;
                return (
                  <li key={i} ref={i === exchanges.length - 1 ? lastRef : undefined} className="scroll-mt-2">
                    <p className="font-mono text-[13px] text-graphite">
                      <span className="text-seal">Q.</span> {ex.question}
                    </p>
                    <div className="mt-3 border-l-2 border-ink pl-4">
                      {!r ? (
                        <p className="label animate-pulse">Reading the portfolio…</p>
                      ) : r.kind === "answer" ? (
                        <>
                          <p className="font-display text-[1.2rem] leading-snug text-ink">
                            <InlineMarkdown text={r.headline} />
                          </p>
                          {r.details && (
                            <div className="mt-3">
                              <Markdown text={r.details} />
                            </div>
                          )}
                          <CitationChips citations={r.citations} onPick={pick} />
                          {r.followUps.length > 0 && i === exchanges.length - 1 && (
                            <div className="mt-4">
                              <p className="label">Ask next</p>
                              <div className="mt-1.5 flex flex-col items-start gap-1.5">
                                {r.followUps.map((f) => (
                                  <button
                                    key={f}
                                    type="button"
                                    disabled={busy}
                                    onClick={() => submitQuestion(f)}
                                    className="text-link text-left text-[13px] text-ink disabled:opacity-50"
                                  >
                                    → {f}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      ) : r.kind === "fallback" ? (
                        <>
                          <p className="text-[14px] text-graphite">{r.message}</p>
                          <CitationChips citations={r.citations} onPick={pick} />
                        </>
                      ) : (
                        <p className="text-[15px] text-graphite">{r.message}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          )
        ) : (
          <div>
            {!match || match.kind !== "match" ? (
              <>
                <p className="text-[15px] text-graphite">
                  Paste a job description to get a fit report: matching skills, relevant projects, gaps and interview
                  talking points, each backed by sources from the portfolio.
                </p>
                <label htmlFor="jd-input" className="label mt-5 block">
                  Job description
                </label>
                <textarea
                  id="jd-input"
                  value={jd}
                  onChange={(e) => setJd(e.target.value.slice(0, MAX_JD))}
                  rows={9}
                  placeholder="Paste the role's responsibilities and requirements…"
                  className="mt-1 w-full resize-y border border-rule bg-paper-raised p-3 text-[14px] text-ink placeholder:text-pencil focus:border-ink focus:outline-none"
                />
                <div className="mt-2 flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] text-pencil">
                    {jd.length.toLocaleString()} / {MAX_JD.toLocaleString()}
                  </span>
                  <button type="button" onClick={submitJd} disabled={busy || !jd.trim()} className="btn btn-primary">
                    {busy ? "Matching…" : "Match against portfolio"}
                  </button>
                </div>
                {match && match.kind === "fallback" && (
                  <div className="mt-6">
                    <p className="text-[14px] text-graphite">{match.message}</p>
                    <CitationChips citations={match.citations} onPick={pick} />
                  </div>
                )}
                {match && (match.kind === "not_job_description" || match.kind === "error") && (
                  <p className="mt-6 text-[15px] text-graphite">{match.message}</p>
                )}
              </>
            ) : (
              <MatchReport
                report={match}
                onPick={pick}
                onReset={() => {
                  setMatch(null);
                }}
              />
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-rule px-5 py-3">
        {tab === "ask" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitQuestion(question);
            }}
            className="mb-2 flex items-center gap-2 border border-ink bg-paper-raised pl-3"
          >
            <label htmlFor="assistant-question" className="sr-only">
              Your question
            </label>
            <input
              id="assistant-question"
              ref={inputRef}
              value={question}
              onChange={(e) => setQuestion(e.target.value.slice(0, MAX_QUESTION))}
              placeholder="Ask about skills, projects, experience…"
              autoComplete="off"
              className="min-h-[44px] flex-1 bg-transparent text-[15px] text-ink placeholder:text-pencil focus:outline-none focus-visible:outline-none"
            />
            <button
              type="submit"
              disabled={busy || !question.trim()}
              aria-label="Ask"
              className="inline-flex h-11 w-11 items-center justify-center bg-ink text-paper disabled:opacity-40"
            >
              <ArrowUp className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </form>
        )}
        <p className="font-mono text-[11px] leading-snug text-pencil">
          Answers use only this portfolio&apos;s content (Gemini). Check the cited sections before relying on them.
        </p>
      </div>
    </aside>
  );
}

function MatchReport({
  report,
  onPick,
  onReset,
}: {
  report: Extract<MatchResponse, { kind: "match" }>;
  onPick: (c: Citation) => void;
  onReset: () => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const rows = report.requirements;
  const count = (s: MatchStatus) => rows.filter((r) => r.status === s).length;
  const matchingSkills = rows.filter((r) => r.category === "skill" && r.status !== "not_shown");
  const experience = rows.filter((r) => (r.category === "experience" || r.category === "education") && r.status !== "not_shown");
  const missing = rows.filter((r) => r.status === "not_shown");

  return (
    <div className="space-y-5">
      {/* Verdict */}
      <div>
        <p className="label">Fit report{report.title ? ` · ${report.title}` : ""}</p>
        <div className="mt-2 flex items-baseline justify-between gap-4">
          <p className="font-display text-[1.75rem] leading-none text-ink">{report.fit}</p>
          <p className="font-mono text-[13px] text-ink">{report.score}/100</p>
        </div>
        <div className="mt-2 h-1.5 w-full bg-rule" aria-hidden="true">
          <div className="h-full bg-seal" style={{ width: `${report.score}%` }} />
        </div>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.06em] text-pencil">
          {count("met")} met · {count("partial")} partly · {count("not_shown")} not shown · score from requirement statuses
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-ink">
          <InlineMarkdown text={report.summary} />
        </p>
      </div>

      {matchingSkills.length > 0 && (
        <ReportSection title="Matching skills" count={matchingSkills.length}>
          <RequirementList rows={matchingSkills} onPick={onPick} />
        </ReportSection>
      )}

      {report.projects.length > 0 && (
        <ReportSection title="Relevant projects" count={report.projects.length}>
          <ul className="space-y-3">
            {report.projects.map((p) => (
              <li key={p.citation.id}>
                <button type="button" onClick={() => onPick(p.citation)} className="text-link text-left text-[14px] text-ink">
                  {p.citation.label}
                </button>
                <p className="text-[13px] text-graphite">
                  <InlineMarkdown text={p.why} />
                </p>
              </li>
            ))}
          </ul>
        </ReportSection>
      )}

      {experience.length > 0 && (
        <ReportSection title="Supporting experience" count={experience.length}>
          <RequirementList rows={experience} onPick={onPick} />
        </ReportSection>
      )}

      {missing.length > 0 && (
        <ReportSection title="Not shown in the portfolio" count={missing.length}>
          <ul className="space-y-1.5">
            {missing.map((r, i) => (
              <li key={i} className="flex items-start gap-3 text-[14px] text-ink">
                <StatusMark status="not_shown" />
                {r.requirement}
              </li>
            ))}
          </ul>
        </ReportSection>
      )}

      {report.talkingPoints.length > 0 && (
        <ReportSection title="Interview talking points" count={report.talkingPoints.length}>
          <ol className="space-y-3">
            {report.talkingPoints.map((t, i) => (
              <li key={i} className="flex gap-2">
                <span className="w-5 shrink-0 font-mono text-[12px] leading-6 text-pencil">{String(i + 1).padStart(2, "0")}</span>
                <div className="min-w-0">
                  <p className="text-[14px] text-ink">
                    <InlineMarkdown text={t.point} />
                  </p>
                  <CitationChips citations={t.citations} onPick={onPick} label="" />
                </div>
              </li>
            ))}
          </ol>
        </ReportSection>
      )}

      <ReportSection title="Every requirement" count={rows.length}>
        {showAll ? (
          <RequirementList rows={rows} onPick={onPick} />
        ) : (
          <button type="button" onClick={() => setShowAll(true)} className="text-link text-[13px] text-ink">
            Show all {rows.length} requirements with evidence →
          </button>
        )}
      </ReportSection>

      <button type="button" onClick={onReset} className="btn btn-secondary">
        Match another job
      </button>
    </div>
  );
}
