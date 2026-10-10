// Every section the assistant may cite, with where it lives on the page.
// The server rejects any citation that isn't in this catalog, so answers can
// only point at real content. Safe to import on the client.
import { CASE_CODES, PROJECTS, STACK } from "@/lib/constants";

export interface Citation {
  id: string;
  label: string;
  href: string;
}

export const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const CITATIONS: Citation[] = [
  { id: "profile", label: "Profile", href: "#top" },
  ...PROJECTS.map((p) => ({
    id: CASE_CODES[p.id],
    label: `${CASE_CODES[p.id]} · ${p.short}`,
    href: `#work-${p.id}`,
  })),
  ...STACK.map((g) => ({
    id: `stack:${slug(g.group)}`,
    label: `Stack · ${g.group}`,
    href: `#stack-${slug(g.group)}`,
  })),
  { id: "systems", label: "Systems", href: "#systems" },
  { id: "experience", label: "Experience · CodSoft", href: "#experience" },
  { id: "education", label: "Education", href: "#experience" },
  { id: "achievements", label: "Achievements", href: "#record-achievements" },
  { id: "certifications", label: "Certifications", href: "#record-certifications" },
  { id: "contact", label: "Contact", href: "#contact" },
];

const BY_ID = new Map(CITATIONS.map((c) => [c.id.toLowerCase(), c]));

/** "[A.1]", " a.1 ", "A.1 · AI Support" → "a.1" */
function normaliseId(raw: string): string {
  return raw
    .trim()
    .replace(/^\[|\]$/g, "")
    .split(" · ")[0]
    .trim()
    .toLowerCase();
}

/** Keeps only known citation IDs (case-insensitive), de-duplicated, in order. */
export function resolveCitations(ids: unknown): Citation[] {
  if (!Array.isArray(ids)) return [];
  const seen = new Set<string>();
  const out: Citation[] = [];
  for (const raw of ids) {
    if (typeof raw !== "string") continue;
    const c = BY_ID.get(normaliseId(raw));
    if (c && !seen.has(c.id)) {
      seen.add(c.id);
      out.push(c);
    }
  }
  return out;
}

/** Scrolls to a cited section and briefly frames it, like a detection box. */
export function goToCitation(c: Citation) {
  const target = document.querySelector<HTMLElement>(c.href) ?? document.querySelector<HTMLElement>("#stack");
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  target.classList.remove("cite-flash");
  void target.offsetWidth; // restart the animation
  target.classList.add("cite-flash");
  window.setTimeout(() => target.classList.remove("cite-flash"), 2200);
}
