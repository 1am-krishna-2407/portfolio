import type { ChartBar, Project } from "@/lib/constants";
import DocumentSpecimen from "./DocumentSpecimen";

const fill = (v: string) => ({ fill: `var(${v})` });
const stroke = (v: string) => ({ stroke: `var(${v})` });

// ─── Sequence diagram: DevFlow request lifecycle ─────────────────────────────
const LANES = ["Client", "Security", "Service", "Redis", "PostgreSQL"];
const LANE_X = [50, 165, 280, 395, 510];

const MESSAGES: { from: number; to: number; y: number; text: string; reply?: boolean }[] = [
  { from: 0, to: 1, y: 74, text: "GET /tasks + JWT" },
  { from: 1, to: 2, y: 108, text: "verified · role ok" },
  { from: 2, to: 3, y: 142, text: "lookup key" },
  { from: 3, to: 2, y: 172, text: "hit → return", reply: true },
  { from: 2, to: 4, y: 206, text: "miss → query" },
  { from: 4, to: 2, y: 236, text: "rows", reply: true },
  { from: 2, to: 3, y: 266, text: "cache set" },
  { from: 2, to: 0, y: 300, text: "200 OK", reply: true },
];

export function LifecycleFigure({ id }: { id: string }) {
  return (
    <svg
      viewBox="0 0 560 330"
      className="block h-auto w-full"
      role="img"
      aria-label="Sequence diagram. The client sends a request with a JWT; Spring Security verifies the token and role; the service checks Redis and returns on a hit; on a miss it queries PostgreSQL, stores the result in Redis, and responds 200 OK."
    >
      <defs>
        <marker id={`arrow-${id}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L8 4 L0 8 z" style={fill("--ink")} />
        </marker>
      </defs>
      {LANES.map((lane, i) => (
        <g key={lane}>
          <rect x={LANE_X[i] - 44} y="14" width="88" height="26" style={{ ...fill("--paper-raised"), ...stroke("--ink") }} strokeWidth="1" />
          <text x={LANE_X[i]} y="31" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10.5" style={fill("--ink")}>
            {lane}
          </text>
          <line x1={LANE_X[i]} y1="40" x2={LANE_X[i]} y2="318" strokeDasharray="3 4" strokeWidth="1" style={stroke("--rule")} />
        </g>
      ))}
      {MESSAGES.map((m, i) => {
        const x1 = LANE_X[m.from];
        const x2 = LANE_X[m.to];
        const dir = x2 > x1 ? 1 : -1;
        const mid = (x1 + x2) / 2;
        return (
          <g key={i}>
            <line
              x1={x1 + dir * 2}
              y1={m.y}
              x2={x2 - dir * 3}
              y2={m.y}
              strokeWidth="1.2"
              strokeDasharray={m.reply ? "4 3" : undefined}
              markerEnd={`url(#arrow-${id})`}
              style={stroke(i === 3 ? "--seal" : "--ink")}
            />
            <text x={mid} y={m.y - 6} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" style={fill(i === 3 ? "--seal" : "--graphite")}>
              {m.text}
            </text>
            <circle cx={x1 + dir * -12} cy={m.y} r="7" style={fill("--paper")} />
            <text x={x1 + dir * -12} y={m.y + 3.2} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" style={fill("--pencil")}>
              {i + 1}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Stage flow (HTML, wraps on small screens) ───────────────────────────────
export function FlowFigure({ stages }: { stages: string[] }) {
  return (
    <ol className="flex flex-wrap items-stretch gap-y-3" aria-label="Pipeline stages, in order">
      {stages.map((s, i) => (
        <li key={s} className="flex items-center">
          <span className="flex min-h-[64px] flex-col justify-center border border-ink bg-paper-raised px-3 py-2">
            <span className="font-mono text-[10px] text-pencil">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-[14px] leading-tight text-ink">{s}</span>
          </span>
          {i < stages.length - 1 && (
            <span className="px-2 font-mono text-graphite" aria-hidden="true">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

// ─── Measured-results chart (bar length on a linear 0–100 scale) ─────────────
export function ResultsChart({ bars, scale }: { bars: ChartBar[]; scale: "percent" | "ratio" }) {
  const ticks = [0, 25, 50, 75, 100];
  const tickLabel = (t: number) => (scale === "ratio" ? String(t / 100) : String(t));
  return (
    <div role="img" aria-label={bars.map((b) => `${b.label} ${b.display}`).join(", ")}>
      <div className="space-y-3">
        {bars.map((b, i) => (
          <div key={b.label} className="grid grid-cols-[104px_1fr_52px] items-center gap-3">
            <span className="font-mono text-[12px] text-graphite">{b.label}</span>
            <span className="relative h-5 border-l border-ink">
              <span
                className={`absolute inset-y-0 left-0 ${i === 0 ? "bg-seal" : "bg-ink"}`}
                style={{ width: `${b.value}%` }}
              />
            </span>
            <span className="text-right font-mono text-[13px] tabular-nums text-ink">{b.display}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-[104px_1fr_52px] gap-3" aria-hidden="true">
        <span />
        <span className="relative h-4 border-t border-rule">
          {ticks.map((t) => (
            <span
              key={t}
              className="absolute top-1 -translate-x-1/2 font-mono text-[10px] text-pencil"
              style={{ left: `${t}%` }}
            >
              {tickLabel(t)}
            </span>
          ))}
        </span>
        <span />
      </div>
    </div>
  );
}

// ─── Shared SVG box + connector helpers ──────────────────────────────────────
function Box({
  x,
  y,
  w,
  h = 40,
  label,
  sub,
  accent,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  label: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        strokeWidth={accent ? 1.6 : 1}
        style={{ ...fill("--paper-raised"), ...stroke(accent ? "--seal" : "--ink") }}
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 2 : y + h / 2 + 4}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="12.5"
        style={fill("--ink")}
      >
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" style={fill("--pencil")}>
          {sub}
        </text>
      )}
    </g>
  );
}

function Wire({ d, id, dashed, accent }: { d: string; id: string; dashed?: boolean; accent?: boolean }) {
  return (
    <path
      d={d}
      fill="none"
      strokeWidth="1.2"
      strokeDasharray={dashed ? "4 3" : undefined}
      markerEnd={`url(#arrow-${id})`}
      style={stroke(accent ? "--seal" : "--ink")}
    />
  );
}

function Arrowhead({ id }: { id: string }) {
  return (
    <defs>
      <marker id={`arrow-${id}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L8 4 L0 8 z" style={fill("--ink")} />
      </marker>
    </defs>
  );
}

// ─── Hybrid-retrieval RAG figure ─────────────────────────────────────────────
export function RagFigure({ id }: { id: string }) {
  return (
    <svg
      viewBox="0 0 560 310"
      className="block h-auto w-full"
      role="img"
      aria-label="A ticket is classified, then searched three ways: vector search, full-text search and exact-phrase match. Results are fused with Reciprocal Rank Fusion into evidence, the LLM drafts a resolution, the output is validated, and a human reviews it."
    >
      <Arrowhead id={id} />
      <Box x={10} y={80} w={84} label="Ticket" />
      <Box x={124} y={80} w={96} label="Classify" />
      <Box x={262} y={14} w={128} h={38} label="Vector · HNSW" />
      <Box x={262} y={81} w={128} h={38} label="Full-text" />
      <Box x={262} y={148} w={128} h={38} label="Exact phrase" />
      <text x="326" y="206" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" style={fill("--pencil")}>
        PostgreSQL · pgvector
      </text>
      <Box x={430} y={80} w={120} label="RRF fusion" sub="rank merge" accent />
      <Box x={430} y={236} w={120} label="Evidence" />
      <Box x={296} y={236} w={104} label="LLM draft" />
      <Box x={156} y={236} w={110} label="Validate" />
      <Box x={10} y={236} w={116} label="Human review" />
      <text x="211" y="296" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" style={fill("--pencil")}>
        schema · grounding · injection
      </text>

      <Wire id={id} d="M94 100 H122" />
      <Wire id={id} d="M220 100 H240 V33 H260" />
      <Wire id={id} d="M240 100 H260" />
      <Wire id={id} d="M240 100 V167 H260" />
      <Wire id={id} d="M390 33 H410 V100 H428" accent />
      <Wire id={id} d="M390 100 H428" accent />
      <Wire id={id} d="M390 167 H410 V100" accent />
      <Wire id={id} d="M490 120 V234" />
      <Wire id={id} d="M430 256 H402" />
      <Wire id={id} d="M296 256 H268" />
      <Wire id={id} d="M156 256 H128" />
    </svg>
  );
}

// ─── CodeFlow: queued execution in a locked-down container ───────────────────
const LIMITS = ["network   none", "memory    128 MB", "cpu       quota", "timeout   10 s", "output    512 KB"];

export function SandboxFigure({ id }: { id: string }) {
  return (
    <svg
      viewBox="0 0 560 290"
      className="block h-auto w-full"
      role="img"
      aria-label="The code editor posts to the REST API, which enqueues a job in Redis. A worker runs it inside a Docker sandbox with no network, 128 MB of memory, a CPU quota, a 10-second timeout and a 512 KB output cap. Results are stored in PostgreSQL and the dashboard polls for status."
    >
      <Arrowhead id={id} />
      <Box x={10} y={24} w={100} label="Code editor" />
      <Box x={144} y={24} w={100} label="REST API" />
      <Box x={278} y={24} w={112} label="Job queue" sub="Redis" />
      <Box x={424} y={24} w={126} label="Worker" />

      <rect x="300" y="110" width="250" height="168" fill="none" strokeWidth="1.4" strokeDasharray="5 4" style={stroke("--seal")} />
      <rect x="300" y="110" width="104" height="18" style={fill("--seal")} />
      <text x="307" y="123" fontFamily="var(--font-mono)" fontSize="10" style={fill("--paper")}>
        docker sandbox
      </text>
      {LIMITS.map((l, i) => (
        <text key={l} x="318" y={152 + i * 22} fontFamily="var(--font-mono)" fontSize="11" style={{ ...fill("--ink"), whiteSpace: "pre" }}>
          {l}
        </text>
      ))}

      <Box x={144} y={170} w={120} label="Results" sub="PostgreSQL" />
      <Box x={10} y={170} w={100} label="Dashboard" />

      <Wire id={id} d="M110 44 H142" />
      <Wire id={id} d="M244 44 H276" />
      <Wire id={id} d="M390 44 H422" />
      <Wire id={id} d="M487 64 V108" accent />
      <Wire id={id} d="M300 190 H266" />
      <Wire id={id} d="M144 190 H112" />
      <Wire id={id} d="M60 168 V110 H194 V66" dashed />
      <text x="127" y="104" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" style={fill("--pencil")}>
        poll status
      </text>
    </svg>
  );
}

export default function ProjectFigure({ project }: { project: Project }) {
  if (project.figure === "detection") {
    return (
      <div className="border border-rule bg-paper p-3">
        <DocumentSpecimen id={`fig-${project.id}`} className="mx-auto block h-auto w-full max-w-[380px]" />
      </div>
    );
  }
  const svg =
    project.figure === "lifecycle" ? (
      <LifecycleFigure id={project.id} />
    ) : project.figure === "rag" ? (
      <RagFigure id={project.id} />
    ) : project.figure === "sandbox" ? (
      <SandboxFigure id={project.id} />
    ) : null;

  if (svg) {
    return (
      <div className="dot-grid border border-rule p-3 sm:p-5">
        <div className="mx-auto max-w-[640px]">{svg}</div>
      </div>
    );
  }
  return (
    <div className="dot-grid border border-rule p-4 sm:p-6">
      <FlowFigure stages={project.architecture} />
    </div>
  );
}
