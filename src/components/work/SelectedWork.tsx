import { Check } from "lucide-react";
import { CASE_CODES, DOMAINS, EDITIONS, PROJECTS, type Project, type RoleId } from "@/lib/constants";
import Section from "@/components/shared/Section";
import Annotate from "@/components/shared/Annotate";
import ProjectFigure, { FlowFigure, ResultsChart } from "@/components/figures/ProjectFigures";
import CaseStudy from "./CaseStudy";

/** Domains in the order this edition shows them. Codes (A.1, B.2…) never change. */
function domainsFor(role: RoleId | null) {
  if (!role) return DOMAINS;
  return EDITIONS[role].domainOrder.map((id) => DOMAINS.find((d) => d.id === id)!);
}
const SCORES = [0.98, 0.97, 0.95, 0.96, 0.94, 0.93];

function Metrics({ metrics }: { metrics: Project["metrics"] }) {
  return (
    <dl className="grid grid-cols-2 border-y border-rule sm:flex sm:flex-wrap">
      {metrics.map((m, i) => (
        <div
          key={m.label}
          className={`border-rule py-4 pr-4 sm:pr-6 ${i % 2 === 1 ? "border-l pl-4 sm:pl-6" : ""} ${
            i > 0 && i % 2 === 0 ? "sm:border-l sm:pl-6" : ""
          } ${i >= 2 ? "border-t sm:border-t-0" : ""}`}
        >
          <dt className="label flex flex-wrap items-center gap-2">
            {m.label}
            {m.verified && (
              <span className="verified">
                <Check className="h-2.5 w-2.5" strokeWidth={2.5} aria-hidden="true" />
                VERIFIED
              </span>
            )}
          </dt>
          <dd className="font-display m-0 mt-1 text-[1.6rem] leading-none text-ink">{m.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function CaseStudyBody({ project, code, fig }: { project: Project; code: string; fig: number }) {
  const block = (label: string, children: React.ReactNode) => (
    <section className="grid grid-cols-1 gap-3 border-t border-rule py-7 sm:grid-cols-[150px_1fr] sm:gap-6">
      <h3 className="label pt-1 text-ink">{label}</h3>
      <div className="min-w-0 space-y-3 text-graphite">{children}</div>
    </section>
  );

  return (
    <>
      <p className="font-display text-[1.4rem] leading-snug text-ink">{project.outcome}</p>
      <p className="label mt-4">
        {code} · {project.kind} · {project.year}
      </p>
      <div className="mt-8">
        {block(
          "Problem",
          project.problem.map((t) => <p key={t}>{t}</p>)
        )}
        {block(
          "Constraints",
          <ul className="space-y-2">
            {project.constraints.map((c) => (
              <li key={c} className="flex gap-3">
                <span className="font-mono text-seal" aria-hidden="true">–</span>
                {c}
              </li>
            ))}
          </ul>
        )}
        {block(
          "Approach",
          project.approach.map((t) => <p key={t}>{t}</p>)
        )}
        {block(
          "Architecture",
          <figure className="m-0">
            <div className="dot-grid border border-rule p-4">
              <FlowFigure stages={project.architecture} />
            </div>
            <figcaption className="mt-2 text-[13px]">
              <span className="label mr-1 text-ink">Fig. {fig}.1</span>{" "}
              {project.architectureNote ?? "System stages, in order of data flow."}
            </figcaption>
          </figure>
        )}
        {block(
          "Results",
          <>
            {project.results.map((t) => (
              <p key={t}>{t}</p>
            ))}
            {project.chart && (
              <figure className="m-0 pt-4">
                <ResultsChart
                  bars={project.chart.bars}
                  scale={project.chart.bars[0].display.endsWith("%") ? "percent" : "ratio"}
                />
                <figcaption className="mt-3 text-[13px]">
                  <span className="label mr-1 text-ink">Fig. {fig}.2</span> {project.chart.caption}
                </figcaption>
              </figure>
            )}
            <table className="mt-4 w-full border-collapse text-left text-[14px]">
              <caption className="sr-only">Project metrics</caption>
              <tbody>
                {project.metrics.map((m) => (
                  <tr key={m.label} className="border-b border-rule">
                    <th scope="row" className="py-2 pr-4 font-mono text-[12px] font-normal uppercase tracking-[0.06em] text-pencil">
                      {m.label}
                    </th>
                    <td className="py-2 text-right font-mono tabular-nums text-ink">{m.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        {block(
          "What I'd do next",
          <ol className="list-decimal space-y-2 pl-5 marker:font-mono marker:text-pencil">
            {project.next.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ol>
        )}
        {block(
          "Stack & links",
          <>
            <p className="font-mono text-[13px] text-ink">{project.tech.join(" · ")}</p>
            {project.github ? (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-2">
                Source on GitHub ↗
              </a>
            ) : (
              <p className="font-mono text-[12px] text-pencil">Source not public.</p>
            )}
          </>
        )}
      </div>
    </>
  );
}

function Entry({
  project,
  code,
  index,
  fig,
  first,
}: {
  project: Project;
  code: string;
  index: number;
  fig: number; // figure number in page order; Fig. 1 is the hero specimen
  first: boolean;
}) {
  // Tall figures sit beside the text; wide diagrams run full width beneath it.
  const sideFigure = project.figure === "detection";

  return (
    <article
      id={`work-${project.id}`}
      aria-labelledby={`work-${project.id}-title`}
      className={`scroll-mt-24 pb-14 ${first ? "" : "border-t border-rule pt-14"}`}
    >
      <p className="label">
        <span className="text-seal">Project {code}</span> · {project.kind}
      </p>

      <div className={`mt-4 grid grid-cols-1 gap-x-10 gap-y-8 ${sideFigure ? "md:grid-cols-12" : ""}`}>
        <div className={sideFigure ? "md:col-span-7" : ""}>
          <h4 id={`work-${project.id}-title`} className="mt-2">
            <Annotate label="project" score={SCORES[index % SCORES.length]} as="span">
              <span className="font-display block text-[2rem] leading-[1.05] text-ink sm:text-[2.6rem]">
                {project.title}
              </span>
            </Annotate>
          </h4>
          <p className="measure mt-5 text-[19px] leading-snug text-ink">{project.outcome}</p>
          <p className="measure mt-3 text-graphite">{project.description}</p>
          <dl className="mt-6 grid grid-cols-[80px_1fr] gap-y-1 font-mono text-[13px]">
            <dt className="text-pencil">Year</dt>
            <dd className="m-0 text-ink">{project.year}</dd>
            <dt className="text-pencil">Stack</dt>
            <dd className="m-0 text-ink">{project.tech.join(" · ")}</dd>
          </dl>
        </div>
        <figure className={`m-0 ${sideFigure ? "md:col-span-5" : ""}`}>
          <ProjectFigure project={project} />
          <figcaption className="mt-3 text-[13px] leading-snug text-graphite">
            <span className="label mr-1 text-ink">Fig. {fig}</span> {project.figureCaption}
          </figcaption>
        </figure>
      </div>

      <div className="mt-10">
        <Metrics metrics={project.metrics} />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <CaseStudy title={project.title} number={code}>
          <CaseStudyBody project={project} code={code} fig={fig} />
        </CaseStudy>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link inline-flex min-h-[44px] items-center font-mono text-[13px] text-graphite"
          >
            Source on GitHub ↗
          </a>
        )}
      </div>
    </article>
  );
}

export default function SelectedWork({ role }: { role: RoleId | null }) {
  const domains = domainsFor(role);
  const ordered = domains.flatMap((d) => PROJECTS.filter((p) => p.domain === d.id));

  return (
    <Section
      id="work"
      number="02"
      kicker="Selected work"
      title="Case studies"
      intro="Six projects in two domains, each documented from problem to result. Measured numbers carry a verified mark."
      margin={
        <nav aria-label="Project domains">
          <p className="label">Domains</p>
          <ul className="mt-3 space-y-2">
            {domains.map((d) => (
              <li key={d.id}>
                <a href={`#domain-${d.id}`} className="text-link text-[15px] text-ink">
                  <span className="font-mono text-seal">{d.letter}</span> {d.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      }
    >
      {domains.map((domain, di) => {
        const projects = PROJECTS.filter((p) => p.domain === domain.id);
        return (
          <section
            key={domain.id}
            id={`domain-${domain.id}`}
            aria-labelledby={`domain-${domain.id}-title`}
            className={`scroll-mt-24 ${di > 0 ? "mt-6" : ""}`}
          >
            <header className="mb-10 border-y-2 border-ink py-5">
              <p className="label">
                <span className="text-seal">Domain {domain.letter}</span> · {projects.length} projects
              </p>
              <h3 id={`domain-${domain.id}-title`} className="font-display mt-2 text-[1.75rem] leading-tight text-ink sm:text-[2rem]">
                {domain.title}
              </h3>
              <p className="mt-1 text-[15px] text-graphite">{domain.summary}</p>
            </header>
            {projects.map((p, i) => (
              <Entry
                key={p.id}
                project={p}
                code={CASE_CODES[p.id]}
                index={ordered.indexOf(p)}
                fig={ordered.indexOf(p) + 2}
                first={i === 0}
              />
            ))}
          </section>
        );
      })}
    </Section>
  );
}
