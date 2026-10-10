import { EXPERIENCE, TIMELINE } from "@/lib/constants";
import Section from "@/components/shared/Section";

function Timeline() {
  return (
    <div>
      <p className="label">Timeline</p>
      <ol className="relative mt-4 border-l border-rule pl-5">
        {TIMELINE.map((t) => (
          <li key={t.year} className="relative pb-5 last:pb-0">
            <span
              className={`absolute top-[7px] -left-[24.5px] h-2 w-2 rounded-full border ${
                t.current ? "border-seal bg-seal" : "border-ink bg-paper"
              }`}
              aria-hidden="true"
            />
            <p className={`font-mono text-[12px] ${t.current ? "text-seal" : "text-pencil"}`}>{t.year}</p>
            <p className="text-[15px] leading-snug text-ink">{t.title}</p>
            <p className="text-[13px] text-graphite">{t.note}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Experience() {
  return (
    <Section id="experience" number="05" kicker="Experience" title="Work & timeline" margin={<Timeline />}>
      {EXPERIENCE.map((exp) => (
        <article key={exp.company} aria-labelledby={`exp-${exp.company}`}>
          <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-ink pb-4">
            <div>
              <h3 id={`exp-${exp.company}`} className="font-display text-[2rem] leading-tight text-ink">
                {exp.company}
              </h3>
              <p className="font-mono text-[14px] text-graphite">{exp.role}</p>
            </div>
            <p className="label">{exp.period}</p>
          </header>

          <dl className="m-0">
            {[
              ["Context", exp.context],
              ["What I built", exp.built],
              ["Impact", exp.impact],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-1 gap-2 border-b border-rule py-5 sm:grid-cols-[160px_1fr] sm:gap-6">
                <dt className="label pt-1 text-ink">{k}</dt>
                <dd className="measure m-0 text-graphite">{v}</dd>
              </div>
            ))}
            <div className="grid grid-cols-1 gap-2 border-b border-rule py-5 sm:grid-cols-[160px_1fr] sm:gap-6">
              <dt className="label pt-1 text-ink">Highlights</dt>
              <dd className="m-0">
                <ul className="grid grid-cols-1 gap-x-8 gap-y-2 text-graphite sm:grid-cols-2">
                  {exp.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span className="font-mono text-seal" aria-hidden="true">–</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[160px_1fr] sm:gap-6">
              <dt className="label pt-1 text-ink">Stack</dt>
              <dd className="m-0 font-mono text-[13px] text-ink">{exp.technology.join(" · ")}</dd>
            </div>
          </dl>
        </article>
      ))}
    </Section>
  );
}
