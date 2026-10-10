// Builds the assistant's knowledge from the same data the site renders, so
// the two can never drift apart. Each block is tagged with the citation ID
// the model must use. Server-only by convention (imported by the API route).
import {
  ACHIEVEMENTS,
  CASE_CODES,
  CERTIFICATIONS,
  DOMAINS,
  EDUCATION,
  EXPERIENCE,
  PERSONAL,
  PROFICIENCY,
  PROJECTS,
  SCHEMATICS,
  STACK,
} from "@/lib/constants";
import { slug } from "./citations";

export interface ProfileSection {
  id: string;
  text: string;
}

function projectSection(p: (typeof PROJECTS)[number]): ProfileSection {
  const code = CASE_CODES[p.id];
  const domain = DOMAINS.find((d) => d.id === p.domain)!;
  const lines = [
    `${p.title} (${p.year}) — ${domain.title}; ${p.kind}`,
    `Outcome: ${p.outcome}`,
    `Problem: ${p.problem.join(" ")}`,
    `Constraints: ${p.constraints.join(" ")}`,
    `Approach: ${p.approach.join(" ")}`,
    `Architecture: ${p.architecture.join(" → ")}`,
    `Results: ${p.results.join(" ")}`,
    `Metrics: ${p.metrics.map((m) => `${m.label} ${m.value}${m.verified ? " (measured)" : ""}`).join("; ")}`,
    `Stack: ${p.tech.join(", ")}`,
    `Next steps: ${p.next.join(" ")}`,
    `Source code: ${p.github ?? "not public"}`,
  ];
  return { id: code, text: lines.join("\n") };
}

export const PROFILE_SECTIONS: ProfileSection[] = [
  {
    id: "profile",
    text: [
      `Name: ${PERSONAL.name}`,
      `Roles: ${PERSONAL.roles.join(", ")}`,
      `Summary: ${PERSONAL.abstract}`,
      `Open to: ${PERSONAL.openTo.join(", ")} roles`,
    ].join("\n"),
  },
  ...PROJECTS.map(projectSection),
  ...STACK.map((g) => ({
    id: `stack:${slug(g.group)}`,
    text:
      `${g.group} skills (proficiency: ${PROFICIENCY.join(" < ")}):\n` +
      g.items
        .map((i) => {
          const used = i.usedIn.map((u) => u.text).join(", ");
          return `- ${i.name}: ${PROFICIENCY[i.level - 1]}${used ? `; used in ${used}` : ""}`;
        })
        .join("\n"),
  })),
  {
    id: "systems",
    text: SCHEMATICS.map((s) => `${s.title}: ${s.nodes.map((n) => n.label).join(" → ")}. ${s.caption}`).join("\n"),
  },
  ...EXPERIENCE.map((e) => ({
    id: "experience",
    text: [
      `${e.role} at ${e.company} (${e.period}, remote internship)`,
      `Context: ${e.context}`,
      `Built: ${e.built}`,
      `Impact: ${e.impact}`,
      `Highlights: ${e.highlights.join("; ")}`,
      `Stack: ${e.technology.join(", ")}`,
      "This internship is the only professional work experience in the profile; everything else is project work.",
    ].join("\n"),
  })),
  {
    id: "education",
    text: EDUCATION.map((e) => `${e.degree}, ${e.institution} (${e.period}) — ${e.result}`).join("\n"),
  },
  {
    id: "achievements",
    text: ACHIEVEMENTS.map(
      (a) => `- ${a.label}: ${a.value !== null ? `${a.value}${a.suffix ?? ""}` : a.display} — ${a.detail}`
    ).join("\n"),
  },
  {
    id: "certifications",
    text: CERTIFICATIONS.map(
      (c) => `- ${c.name} — ${c.issuer}${c.platform !== c.issuer ? ` (${c.platform})` : ""}${c.year !== "—" ? `, ${c.year}` : ""}`
    ).join("\n"),
  },
  {
    id: "contact",
    text: [`Email: ${PERSONAL.email}`, `LinkedIn: ${PERSONAL.linkedin}`, `GitHub: ${PERSONAL.githubUrl}`, `LeetCode: ${PERSONAL.leetcode}`].join(
      "\n"
    ),
  },
];

/** The full profile as the model sees it. */
export const PROFILE_TEXT = PROFILE_SECTIONS.map((s) => `[${s.id}]\n${s.text}`).join("\n\n");
