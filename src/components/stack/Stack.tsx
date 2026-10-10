import {
  CASE_CODES,
  DOMAINS,
  EDITIONS,
  PROFICIENCY,
  PROJECTS,
  STACK,
  focusFirst,
  type RoleId,
  type StackGroup,
} from "@/lib/constants";
import Section from "@/components/shared/Section";
import { slug } from "@/lib/assistant/citations";
import StackViews, { type GridProject, type GridRow } from "./StackViews";

/** Grid data for an edition: columns follow its domain order, rows its focus. */
function gridFor(role: RoleId | null, groups: StackGroup[]) {
  const order = role ? EDITIONS[role].domainOrder : DOMAINS.map((d) => d.id);
  const projects: GridProject[] = order.flatMap((domain) =>
    PROJECTS.filter((p) => p.domain === domain).map((p) => ({ id: p.id, code: CASE_CODES[p.id], short: p.short }))
  );
  // Rows: for each skill domain, which of its skills each project uses.
  const rows: GridRow[] = groups.map((group) => ({
    group: group.group,
    cells: projects.map((p) =>
      group.items.filter((item) => item.usedIn.some((u) => u.href === `#work-${p.id}`)).map((item) => item.name)
    ),
  }));
  return { projects, rows };
}

function Level({ level, showLabel = false }: { level: 1 | 2 | 3; showLabel?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="inline-flex gap-[3px]" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <span key={n} className={`h-2.5 w-2.5 border ${n <= level ? "border-ink bg-ink" : "border-pencil"}`} />
        ))}
      </span>
      <span className={showLabel ? "font-mono text-[12px] text-graphite" : "sr-only"}>{PROFICIENCY[level - 1]}</span>
    </span>
  );
}

export default function Stack({ role }: { role: RoleId | null }) {
  const groups = focusFirst(STACK, role);
  const grid = gridFor(role, groups);
  const total = STACK.reduce((n, g) => n + g.items.length, 0);

  const list = (
    <div className="space-y-12">
      {groups.map((group, gi) => (
        <section key={group.group} id={`stack-${slug(group.group)}`} aria-labelledby={`stack-${gi}`} className="scroll-mt-24">
          <header className="flex items-baseline justify-between gap-4 border-b border-ink pb-2">
            <h3 id={`stack-${gi}`} className="font-display text-[1.4rem] leading-tight text-ink">
              {group.group}
            </h3>
            <span className="label">{String(group.items.length).padStart(2, "0")}</span>
          </header>
          <ul className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
            {group.items.map((item) => (
              <li
                key={item.name}
                className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-b border-rule py-3"
              >
                <span className="text-[15px] font-medium text-ink">{item.name}</span>
                <Level level={item.level} />
                <span className="col-span-2 mt-0.5 text-[13px] text-graphite">
                  {item.usedIn.length === 0 ? (
                    <span className="text-pencil">—</span>
                  ) : (
                    item.usedIn.map((u, i) => (
                      <span key={u.text}>
                        {i > 0 && <span className="text-pencil">, </span>}
                        {u.href ? (
                          <a href={u.href} className="text-link">
                            {u.text}
                          </a>
                        ) : (
                          u.text
                        )}
                      </span>
                    ))
                  )}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );

  return (
    <Section
      id="stack"
      number="04"
      kicker="Stack"
      title="Instruments"
      intro={`${total} tools across ${STACK.length} domains: what I use, how well, and where you can see it.`}
      margin={
        <dl className="space-y-3">
          <dt className="label">Key · list view</dt>
          {([1, 2, 3] as const).map((l) => (
            <dd key={l} className="m-0">
              <Level level={l} showLabel />
            </dd>
          ))}
        </dl>
      }
    >
      <StackViews projects={grid.projects} rows={grid.rows} list={list} />
    </Section>
  );
}
