import { ACHIEVEMENTS, CERTIFICATIONS } from "@/lib/constants";
import Section from "@/components/shared/Section";
import CountUp from "@/components/shared/CountUp";

function LedgerHeading({ id, title, count }: { id: string; title: string; count: number }) {
  return (
    <header className="flex items-baseline justify-between gap-4 border-b border-ink pb-2">
      <h3 id={id} className="font-display text-[1.4rem] leading-tight text-ink">
        {title}
      </h3>
      <span className="label">{String(count).padStart(2, "0")}</span>
    </header>
  );
}

export default function Record() {
  return (
    <Section
      id="record"
      number="06"
      kicker="Record"
      title="Achievements & certifications"
      margin={
        <dl className="space-y-1 font-mono text-[12px]">
          <dt className="label">In this section</dt>
          <dd className="m-0 text-ink">
            {ACHIEVEMENTS.length} achievements · {CERTIFICATIONS.length} certifications
          </dd>
        </dl>
      }
    >
      {/* Two ledgers side by side on wide screens */}
      <div className="grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-2">
        <section aria-labelledby="record-achievements">
          <LedgerHeading id="record-achievements" title="Achievements" count={ACHIEVEMENTS.length} />
          <ol className="m-0 list-none p-0">
            {ACHIEVEMENTS.map((r) => (
              <li key={r.label} className="grid grid-cols-[128px_1fr] items-baseline gap-x-4 border-b border-rule py-4">
                <span className="font-display text-[1.75rem] leading-none text-ink">
                  {r.value !== null ? <CountUp value={r.value} suffix={r.suffix} /> : r.display}
                </span>
                <span className="min-w-0">
                  <span className="block text-ink">{r.label}</span>
                  <span className="block text-[14px] text-graphite">{r.detail}</span>
                  {(r.date !== "—" || r.link) && (
                    <span className="mt-1 flex flex-wrap gap-x-3 font-mono text-[12px] text-pencil">
                      {r.date !== "—" && (
                        <span>
                          <span className="sr-only">Date: </span>
                          {r.date}
                        </span>
                      )}
                      {r.link && (
                        <a href={r.link.href} target="_blank" rel="noopener noreferrer" className="text-link text-graphite">
                          {r.link.text} ↗
                        </a>
                      )}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="record-certifications">
          <LedgerHeading id="record-certifications" title="Certifications" count={CERTIFICATIONS.length} />
          <ol className="m-0 list-none p-0">
            {CERTIFICATIONS.map((c) => (
              <li key={c.name} className="grid grid-cols-[64px_1fr] items-baseline gap-x-4 border-b border-rule py-4">
                <span className="font-display text-[1.35rem] leading-none text-graphite">
                  <span className="sr-only">Year: </span>
                  {c.year}
                </span>
                <span className="min-w-0">
                  <span className="block text-ink">{c.name}</span>
                  <span className="block text-[14px] text-graphite">
                    {c.issuer}
                    {c.platform !== c.issuer && <span className="font-mono text-[12px] text-pencil"> · {c.platform}</span>}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </Section>
  );
}
