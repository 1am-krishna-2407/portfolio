import { CAPABILITIES, CASE_CODES, PROJECTS, focusFirst, type RoleId } from "@/lib/constants";
import Section from "@/components/shared/Section";

/** Project evidence reads as its case-study code + short name, e.g. "A.1 · AI Support". */
function evidenceLabel(evidence: { text: string; href: string }) {
  const id = evidence.href.startsWith("#work-") ? evidence.href.slice("#work-".length) : null;
  const project = id ? PROJECTS.find((p) => p.id === id) : undefined;
  return project ? `${CASE_CODES[project.id]} · ${project.short}` : evidence.text;
}

export default function Overview({ role }: { role: RoleId | null }) {
  const capabilities = focusFirst(CAPABILITIES, role);

  return (
    <Section
      id="overview"
      number="01"
      kicker="Overview"
      title="What I work on"
      intro="Six areas, each backed by work you can inspect."
    >
      <ul className="grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 xl:grid-cols-3">
        {capabilities.map((c, i) => {
          const external = c.evidence.href.startsWith("http");
          return (
            <li key={c.label} className="flex flex-col bg-paper p-6">
              <span className="label">1.{i + 1}</span>
              <h3 className="font-display mt-3 text-[1.5rem] leading-tight text-ink">{c.label}</h3>
              <p className="mt-2 text-[15px] text-graphite">{c.description}</p>
              {/* mt-auto pins the evidence line to the bottom so it aligns across a row */}
              <p className="mt-auto pt-5 font-mono text-[12px]">
                <span className="block uppercase tracking-[0.06em] text-pencil">Evidence →</span>
                <a
                  href={c.evidence.href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-link mt-1 inline-block whitespace-nowrap text-ink"
                >
                  {evidenceLabel(c.evidence)}
                </a>
              </p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
