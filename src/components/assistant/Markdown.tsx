// Minimal, safe markdown for assistant answers: paragraphs, **bold**,
// `code`, [links](url), "- " bullets, "1. " steps and | tables |.
// Builds React elements directly — no HTML injection.
import type { ReactNode } from "react";

function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const key = `${keyBase}-${i++}`;
    if (m[1] !== undefined) {
      out.push(
        <strong key={key} className="font-semibold text-ink">
          {m[1]}
        </strong>
      );
    } else if (m[2] !== undefined) {
      out.push(
        <code key={key} className="bg-paper-raised px-1 font-mono text-[0.9em]">
          {m[2]}
        </code>
      );
    } else {
      const href = m[4];
      const external = /^https?:\/\//.test(href);
      out.push(
        <a
          key={key}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="text-link text-ink"
        >
          {m[3]}
        </a>
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Inline-only rendering (bold, code, links) for one-line text like headlines. */
export function InlineMarkdown({ text }: { text: string }) {
  return <>{inline(text.replace(/\s*\n\s*/g, " "), "i")}</>;
}

const isTableRow = (l: string) => l.startsWith("|") && l.endsWith("|");
const isDivider = (l: string) => /^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?$/.test(l);
const cells = (l: string) =>
  l
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());

export default function Markdown({ text }: { text: string }) {
  const lines = text.replace(/\r/g, "").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let k = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i++;
      continue;
    }

    // Table
    if (isTableRow(line)) {
      const rows: string[] = [];
      while (i < lines.length && isTableRow(lines[i].trim())) rows.push(lines[i++].trim());
      const body = rows.filter((r) => !isDivider(r));
      const [head, ...rest] = body;
      blocks.push(
        <div key={k++} className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-[13px]">
            <thead>
              <tr className="border-b border-ink">
                {cells(head).map((c, j) => (
                  <th key={j} className="py-1.5 pr-3 font-mono text-[11px] font-normal uppercase tracking-[0.06em] text-pencil">
                    {inline(c, `h${k}-${j}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rest.map((r, ri) => (
                <tr key={ri} className="border-b border-rule align-top">
                  {cells(r).map((c, j) => (
                    <td key={j} className="py-1.5 pr-3 text-graphite">
                      {inline(c, `c${k}-${ri}-${j}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Bullets
    if (/^[-*•]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*•]\s+/.test(lines[i].trim())) items.push(lines[i++].trim().replace(/^[-*•]\s+/, ""));
      blocks.push(
        <ul key={k++} className="space-y-1.5">
          {items.map((it, j) => (
            <li key={j} className="flex gap-2">
              <span className="font-mono text-seal" aria-hidden="true">
                –
              </span>
              <span>{inline(it, `b${k}-${j}`)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered steps
    if (/^\d+[.)]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) items.push(lines[i++].trim().replace(/^\d+[.)]\s+/, ""));
      blocks.push(
        <ol key={k++} className="space-y-1.5">
          {items.map((it, j) => (
            <li key={j} className="flex gap-2">
              <span className="w-5 shrink-0 font-mono text-[12px] leading-6 text-pencil">{String(j + 1).padStart(2, "0")}</span>
              <span>{inline(it, `n${k}-${j}`)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Heading-ish line ("### x") → small label
    if (/^#{1,6}\s+/.test(line)) {
      blocks.push(
        <p key={k++} className="label pt-1 text-ink">
          {line.replace(/^#{1,6}\s+/, "")}
        </p>
      );
      i++;
      continue;
    }

    // Paragraph (consecutive plain lines)
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !isTableRow(lines[i].trim()) &&
      !/^([-*•]|\d+[.)]|#{1,6})\s+/.test(lines[i].trim())
    ) {
      para.push(lines[i++].trim());
    }
    blocks.push(<p key={k++}>{inline(para.join(" "), `p${k}`)}</p>);
  }

  return <div className="space-y-3 text-[14px] leading-relaxed text-graphite">{blocks}</div>;
}
