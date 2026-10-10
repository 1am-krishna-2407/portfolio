import { ArrowUpRight } from "lucide-react";
import { CASE_CODES, PERSONAL, PROJECTS, type Project } from "@/lib/constants";
import { fetchGitHubSummary, type GitHubRepo } from "@/lib/github";

// Muted ramp derived from the palette instead of GitHub's language colours
const LANG_TONES = ["var(--ink)", "var(--seal)", "var(--graphite)", "var(--pencil)", "var(--rule)"];

const dateFmt = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" });

const ACRONYMS = new Set(["ai", "ml", "cv", "llm", "rag", "api", "nlp", "ui", "qa", "lms", "yolo"]);
const SMALL_WORDS = new Set(["and", "for", "of", "the", "to", "in", "on", "a", "with"]);

/** "resume_ai_analyzer" → "Resume AI Analyzer" */
function humanise(slug: string): string {
  return slug
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((w, i) => {
      const lower = w.toLowerCase();
      if (ACRONYMS.has(lower)) return lower.toUpperCase();
      if (i > 0 && SMALL_WORDS.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

/** A pinned repo that is also a case study on this page. */
function caseStudyFor(repo: GitHubRepo): Project | undefined {
  const url = repo.html_url.toLowerCase();
  return PROJECTS.find((p) => p.github?.toLowerCase() === url);
}

export default async function GitHubPanel() {
  const data = await fetchGitHubSummary(PERSONAL.github);

  if (!data || data.pinned.length === 0) {
    return (
      <div className="border border-rule p-6" role="status">
        <p className="label text-ink">Couldn&apos;t reach GitHub</p>
        <p className="mt-2 text-graphite">
          The pinned repositories will appear here once GitHub responds. Meanwhile they&apos;re on{" "}
          <a href={PERSONAL.githubUrl} target="_blank" rel="noopener noreferrer" className="text-link text-ink">
            github.com/{PERSONAL.github}
          </a>
          .
        </p>
      </div>
    );
  }

  const { publicRepos, pinned, languages } = data;
  const totalLang = languages.reduce((s, [, n]) => s + n, 0);
  const topLangs = languages.slice(0, 4);
  const otherCount = languages.slice(4).reduce((s, [, n]) => s + n, 0);
  const bars: [string, number][] = otherCount > 0 ? [...topLangs, ["Other", otherCount]] : topLangs;

  return (
    <div>
      {/* Summary line + language composition */}
      <div className="border-y border-ink py-4">
        <p className="font-mono text-[13px] text-graphite">
          <span className="text-ink">{pinned.length} pinned</span> of {publicRepos} public repositories ·
          refreshed hourly from{" "}
          <a href={PERSONAL.githubUrl} target="_blank" rel="noopener noreferrer" className="text-link">
            github.com/{PERSONAL.github}
          </a>
        </p>
        {totalLang > 0 && (
          <figure className="m-0 mt-4">
            <div
              className="flex h-2 w-full"
              role="img"
              aria-label={`Languages across pinned repositories: ${bars
                .map(([l, n]) => `${l} ${Math.round((n / totalLang) * 100)}%`)
                .join(", ")}`}
            >
              {bars.map(([lang, n], i) => (
                <span
                  key={lang}
                  className="h-full border-r-2 border-paper last:border-r-0"
                  style={{ width: `${(n / totalLang) * 100}%`, background: LANG_TONES[i] }}
                />
              ))}
            </div>
            <figcaption className="mt-2 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-[0.06em] text-pencil">
              {bars.map(([lang, n], i) => (
                <span key={lang} className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 border border-rule" style={{ background: LANG_TONES[i] }} aria-hidden="true" />
                  {lang} {Math.round((n / totalLang) * 100)}%
                </span>
              ))}
            </figcaption>
          </figure>
        )}
      </div>

      {/* References */}
      <ol className="m-0 list-none p-0">
        {pinned.map((repo, i) => {
          const project = caseStudyFor(repo);
          const title = project?.title ?? humanise(repo.name);
          const description = repo.description ?? project?.description;
          const titleId = `ref-${i + 1}-title`;

          return (
            <li
              key={repo.name}
              aria-labelledby={titleId}
              className="grid grid-cols-[44px_1fr] gap-x-4 border-b border-rule py-7 sm:grid-cols-[64px_1fr] lg:grid-cols-[64px_1fr_200px] lg:gap-x-8"
            >
              <span className="font-display pt-0.5 text-[1.6rem] leading-none text-pencil sm:text-[2rem]" aria-hidden="true">
                R{i + 1}
              </span>

              <div className="min-w-0">
                <h3 id={titleId} className="font-display text-[1.4rem] leading-tight text-ink sm:text-[1.6rem]">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="group">
                    <span className="group-hover:text-seal">{title}</span>
                    <ArrowUpRight
                      className="ml-1 inline h-4 w-4 text-pencil group-hover:text-seal"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <span className="sr-only"> (opens on GitHub)</span>
                  </a>
                </h3>
                <p className="mt-1 break-all font-mono text-[12px] text-pencil">
                  {PERSONAL.github}/{repo.name}
                </p>
                {description && <p className="measure mt-3 text-[15px] text-graphite">{description}</p>}
              </div>

              {/* Metadata: beside the entry on wide screens, beneath it otherwise */}
              <dl className="col-start-2 mt-4 grid content-start self-start grid-cols-[auto_1fr] gap-x-3 gap-y-1 font-mono text-[12px] lg:col-start-3 lg:mt-1">
                <dt className="text-pencil">Lang</dt>
                <dd className="m-0 text-ink">{repo.language ?? "—"}</dd>
                <dt className="text-pencil">Updated</dt>
                <dd className="m-0 text-ink">{dateFmt.format(new Date(repo.pushed_at))}</dd>
                {repo.stargazers_count > 0 && (
                  <>
                    <dt className="text-pencil">Stars</dt>
                    <dd className="m-0 text-ink">{repo.stargazers_count}</dd>
                  </>
                )}
                {project && (
                  <>
                    <dt className="text-pencil">See</dt>
                    <dd className="m-0">
                      <a href={`#work-${project.id}`} className="text-link text-seal">
                        Case study {CASE_CODES[project.id]} →
                      </a>
                    </dd>
                  </>
                )}
              </dl>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
