// Evaluates the portfolio assistant against scripts/assistant-cases.json.
//
// Usage (with the site running and GEMINI_API_KEY set):
//   npm run dev            # in one terminal
//   npm run eval:assistant # in another (or: node scripts/assistant-eval.mjs http://localhost:3000)
//
// Checks per case: response kind, required citations, required / forbidden
// text, and (for job matching) the status of named requirements.
// "not_met" in a case means the requirement must be "partial" or "not_shown".
import { readFile } from "node:fs/promises";

const base = process.argv[2] ?? "http://localhost:3000";
// Pause between cases; raise for free-tier keys, lower for paid ones (EVAL_DELAY_MS=500).
const DELAY_MS = Number(process.env.EVAL_DELAY_MS ?? 4500);
const cases = JSON.parse(await readFile(new URL("./assistant-cases.json", import.meta.url), "utf8"));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function check(c, r) {
  const problems = [];
  if (c.expect !== "any" && r.kind !== c.expect) problems.push(`kind ${r.kind} ≠ ${c.expect}`);

  // Text checks look at the answer itself, not the suggested follow-up questions.
  const text = JSON.stringify({ ...r, followUps: undefined });
  for (const s of c.mustInclude ?? []) if (!text.toLowerCase().includes(s.toLowerCase())) problems.push(`missing "${s}"`);
  for (const s of c.mustNotInclude ?? []) if (text.toLowerCase().includes(s.toLowerCase())) problems.push(`contains "${s}"`);

  // Richness checks (answers)
  const words = (r.details ?? "").split(/\s+/).filter(Boolean).length;
  if (c.minDetailsWords && words < c.minDetailsWords) problems.push(`details ${words} words < ${c.minDetailsWords}`);
  if (c.minFollowUps && (r.followUps ?? []).length < c.minFollowUps) problems.push(`only ${(r.followUps ?? []).length} follow-ups`);
  if (c.format === "table" && !/^\s*\|.*\|\s*$/m.test(r.details ?? "")) problems.push("expected a table");
  // Richness checks (job match)
  if (c.minProjects && (r.projects ?? []).length < c.minProjects) problems.push(`only ${(r.projects ?? []).length} relevant projects`);
  if (c.minTalkingPoints && (r.talkingPoints ?? []).length < c.minTalkingPoints) problems.push(`only ${(r.talkingPoints ?? []).length} talking points`);

  const cited = (r.citations ?? []).map((x) => x.id);
  for (const id of c.cites ?? []) if (!cited.includes(id)) problems.push(`not cited: ${id}`);

  if (c.statuses && r.kind === "match") {
    for (const [needle, want] of Object.entries(c.statuses)) {
      const row = r.requirements.find((x) => x.requirement.toLowerCase().includes(needle.toLowerCase()));
      if (!row) {
        problems.push(`no requirement mentioning "${needle}"`);
        continue;
      }
      const ok = want === "not_met" ? row.status !== "met" : row.status === want;
      if (!ok) problems.push(`"${needle}" is ${row.status}, expected ${want}`);
      if (row.status !== "not_shown" && row.citations.length === 0) problems.push(`"${needle}" has no citation`);
    }
  }
  return problems;
}

let passed = 0;
const rows = [];
for (const c of cases) {
  let r;
  try {
    const res = await fetch(`${base}/api/assistant`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": `eval-${c.id}` },
      body: JSON.stringify({ mode: c.mode, text: c.text }),
    });
    r = await res.json();
  } catch (e) {
    r = { kind: "error", message: String(e) };
  }
  if (r.kind === "fallback") console.warn(`! ${c.id}: got the keyword fallback — is GEMINI_API_KEY set?`);
  const problems = check(c, r);
  if (problems.length === 0) passed++;
  rows.push({ id: c.id, result: problems.length ? "FAIL" : "pass", notes: problems.join("; ") });
  await sleep(DELAY_MS); // free-tier keys allow only ~15 requests/minute
}

console.table(rows);
const rate = passed / cases.length;
console.log(`\n${passed}/${cases.length} passed (${(rate * 100).toFixed(0)}%)`);
process.exit(rate >= 0.9 ? 0 : 1);
