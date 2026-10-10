"use client";

import { useState } from "react";
import { List, LayoutGrid } from "lucide-react";

export interface GridProject {
  id: string;
  code: string; // e.g. "A.1"
  short: string;
}

export interface GridRow {
  group: string;
  cells: string[][]; // skill names per project, in GridProject order
}

type View = "list" | "grid";

// Dot size grows with how many of the domain's skills a project uses.
const dotSize = (n: number) => (n >= 3 ? 16 : n === 2 ? 12 : 8);

function SkillsGrid({ projects, rows }: { projects: GridProject[]; rows: GridRow[] }) {
  const [active, setActive] = useState<{ r: number; c: number } | null>(null);
  const activeSkills = active ? rows[active.r].cells[active.c] : [];

  return (
    <figure className="m-0">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <caption className="sr-only">
            Skill domains by project. Each dot lists the skills from that domain used in that project.
          </caption>
          <thead>
            <tr className="border-b border-ink">
              <th scope="col" className="label sticky left-0 z-10 bg-paper py-3 pr-4 text-left font-normal">
                Domain
              </th>
              {projects.map((p) => (
                <th key={p.id} scope="col" className="px-2 py-3 text-center align-bottom font-normal">
                  <a href={`#work-${p.id}`} className="group inline-flex flex-col items-center gap-1">
                    <span className="font-mono text-[11px] text-seal">{p.code}</span>
                    <span className="text-[12px] leading-tight text-graphite group-hover:text-ink">{p.short}</span>
                  </a>
                </th>
              ))}
              <th scope="col" className="label px-2 py-3 text-right font-normal">
                Projects
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => {
              const used = row.cells.filter((c) => c.length > 0).length;
              return (
                <tr key={row.group} className={`border-b border-rule ${active?.r === r ? "bg-paper-raised" : ""}`}>
                  <th
                    scope="row"
                    className={`sticky left-0 z-10 py-3 pr-4 text-left text-[15px] font-medium text-ink ${
                      active?.r === r ? "bg-paper-raised" : "bg-paper"
                    }`}
                  >
                    {row.group}
                  </th>
                  {row.cells.map((skills, c) => {
                    const isActive = active?.r === r && active?.c === c;
                    return (
                      <td
                        key={projects[c].id}
                        className={`h-12 px-2 text-center ${active?.c === c ? "bg-paper-raised" : ""}`}
                      >
                        {skills.length > 0 ? (
                          <button
                            type="button"
                            onMouseEnter={() => setActive({ r, c })}
                            onFocus={() => setActive({ r, c })}
                            onClick={() => setActive({ r, c })}
                            aria-label={`${row.group} in ${projects[c].short}: ${skills.join(", ")}`}
                            aria-pressed={isActive}
                            className="inline-flex h-11 w-11 items-center justify-center"
                          >
                            <span
                              className={`rounded-full transition-colors ${isActive ? "bg-seal" : "bg-ink"}`}
                              style={{ width: dotSize(skills.length), height: dotSize(skills.length) }}
                              aria-hidden="true"
                            />
                          </button>
                        ) : (
                          <>
                            <span className="font-mono text-[12px] text-pencil" aria-hidden="true">
                              ·
                            </span>
                            <span className="sr-only">Not used</span>
                          </>
                        )}
                      </td>
                    );
                  })}
                  <td className="px-2 text-right font-mono text-[12px] text-pencil">
                    {used}/{projects.length}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto]">
        <div className="min-h-[3.5rem] border-l-2 border-seal pl-4" aria-live="polite">
          {active ? (
            <>
              <p className="label">
                {rows[active.r].group} × {projects[active.c].short}
              </p>
              <p className="mt-1 text-ink">{activeSkills.join(" · ")}</p>
            </>
          ) : (
            <>
              <p className="label">Reading the grid</p>
              <p className="mt-1 text-graphite">Hover, focus or tap a dot to see the skills behind it.</p>
            </>
          )}
        </div>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.06em] text-pencil" aria-label="Legend">
          {[1, 2, 3].map((n) => (
            <li key={n} className="flex items-center gap-2">
              <span className="rounded-full bg-ink" style={{ width: dotSize(n), height: dotSize(n) }} aria-hidden="true" />
              {n === 3 ? "3+ skills" : n === 1 ? "1 skill" : "2 skills"}
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}

export default function StackViews({
  list,
  projects,
  rows,
}: {
  list: React.ReactNode;
  projects: GridProject[];
  rows: GridRow[];
}) {
  const [view, setView] = useState<View>("list");

  const option = (value: View, label: string, Icon: typeof List) => (
    <button
      type="button"
      onClick={() => setView(value)}
      aria-pressed={view === value}
      className={`inline-flex min-h-[44px] items-center gap-2 border px-4 font-mono text-[12px] uppercase tracking-[0.06em] transition-colors ${
        view === value
          ? "border-ink bg-ink text-paper"
          : "border-rule text-graphite hover:border-ink hover:text-ink"
      }`}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
      {label}
    </button>
  );

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label="Stack view" className="inline-flex">
          {option("list", "List", List)}
          {option("grid", "Grid", LayoutGrid)}
        </div>
        <p className="label">{view === "list" ? "Every skill, by domain" : "Domains × projects"}</p>
      </div>
      {view === "list" ? list : <SkillsGrid projects={projects} rows={rows} />}
    </div>
  );
}
