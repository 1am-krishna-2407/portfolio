"use client";

import { useState } from "react";
import { EDITIONS, PROJECTS, SCHEMATICS } from "@/lib/constants";
import { useRole } from "@/lib/role-context";
import { useReducedMotion } from "@/lib/use-reduced-motion";

// Serpentine layout: first row left→right, second row right→left.
const W = 880;
const NODE_W = 172;
const NODE_H = 62;
const PER_ROW = 4;
const GAP_X = (W - 40 - PER_ROW * NODE_W) / (PER_ROW - 1);
const ROW_Y = [46, 210];

function nodePos(i: number) {
  const row = Math.floor(i / PER_ROW);
  const col = i % PER_ROW;
  const visualCol = row % 2 === 0 ? col : PER_ROW - 1 - col;
  return { x: 20 + visualCol * (NODE_W + GAP_X), y: ROW_Y[row], row };
}

/** Orthogonal connector from node i to node i+1, as start/end points. */
function connector(i: number) {
  const a = nodePos(i);
  const b = nodePos(i + 1);
  if (a.row === b.row) {
    const forward = b.x > a.x;
    const y = a.y + NODE_H / 2;
    return { x1: forward ? a.x + NODE_W : a.x, y1: y, x2: forward ? b.x : b.x + NODE_W, y2: y };
  }
  // Row change: drop down from the bottom of a into the top of b.
  const x = a.x + NODE_W / 2;
  return { x1: x, y1: a.y + NODE_H, x2: x, y2: b.y };
}

export default function Systems() {
  const role = useRole();
  // A role edition opens on its most relevant schematic.
  const [tab, setTab] = useState(() =>
    role ? Math.max(0, SCHEMATICS.findIndex((s) => s.id === EDITIONS[role].firstSchematic)) : 0
  );
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const schematic = SCHEMATICS[tab];
  const nodes = schematic.nodes;
  const segments = nodes.slice(0, -1).map((_, i) => connector(i));
  const paths = segments.map((c) => `M${c.x1} ${c.y1} L${c.x2} ${c.y2}`);
  // One continuous route for the travelling packet (passes through each node)
  const route = segments
    .map((c, i) => `${i === 0 ? "M" : "L"}${c.x1} ${c.y1} L${c.x2} ${c.y2}`)
    .join(" ");

  const selectTab = (i: number) => {
    setTab(i);
    setActive(0);
  };

  return (
    <div>
      {/* Tabs */}
      <div role="tablist" aria-label="Architecture diagrams" className="flex flex-wrap gap-x-1 border-b border-rule">
        {SCHEMATICS.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            id={`tab-${s.id}`}
            aria-selected={tab === i}
            aria-controls={`panel-${s.id}`}
            tabIndex={tab === i ? 0 : -1}
            onClick={() => selectTab(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                const next = (i + (e.key === "ArrowRight" ? 1 : SCHEMATICS.length - 1)) % SCHEMATICS.length;
                selectTab(next);
                document.getElementById(`tab-${SCHEMATICS[next].id}`)?.focus();
              }
            }}
            className={`-mb-px min-h-[44px] border-b-2 px-4 font-mono text-[12px] uppercase tracking-[0.06em] transition-colors ${
              tab === i ? "border-seal text-ink" : "border-transparent text-graphite hover:text-ink"
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${schematic.id}`} aria-labelledby={`tab-${schematic.id}`} className="pt-8">
        {/* Desktop / tablet: schematic */}
        <figure className="m-0 hidden md:block">
          <div className="dot-grid border border-rule p-4">
            <svg viewBox={`0 0 ${W} 300`} className="block h-auto w-full" role="img" aria-label={`${schematic.title}: ${nodes.map((n) => n.label).join(", then ")}.`}>
              <defs>
                <marker id="sch-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M0 0 L8 4 L0 8 z" style={{ fill: "var(--ink)" }} />
                </marker>
              </defs>

              {paths.map((d, i) => (
                <path key={`${schematic.id}-c${i}`} d={d} fill="none" strokeWidth="1.2" markerEnd="url(#sch-arrow)" style={{ stroke: "var(--ink)" }} />
              ))}

              {!reduced && (
                <circle key={schematic.id} r="4.5" style={{ fill: "var(--seal)" }}>
                  <animateMotion dur={`${nodes.length * 0.9}s`} repeatCount="indefinite" path={route} />
                </circle>
              )}

              {nodes.map((n, i) => {
                const p = nodePos(i);
                const isActive = active === i;
                return (
                  <g
                    key={`${schematic.id}-${n.label}`}
                    tabIndex={0}
                    role="button"
                    aria-pressed={isActive}
                    aria-label={`Step ${i + 1}: ${n.label}. ${n.note}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="cursor-pointer outline-none"
                  >
                    <rect
                      x={p.x}
                      y={p.y}
                      width={NODE_W}
                      height={NODE_H}
                      strokeWidth={isActive ? 1.6 : 1}
                      style={{ fill: "var(--paper-raised)", stroke: isActive ? "var(--seal)" : "var(--ink)", transition: "stroke 150ms" }}
                    />
                    <text x={p.x + 12} y={p.y + 21} fontFamily="var(--font-mono)" fontSize="11" style={{ fill: isActive ? "var(--seal)" : "var(--pencil)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </text>
                    <text x={p.x + 12} y={p.y + 44} fontFamily="var(--font-sans)" fontSize="16" style={{ fill: "var(--ink)" }}>
                      {n.label}
                    </text>
                    {isActive && (
                      <>
                        <path
                          d={`M${p.x - 5} ${p.y + 6} v-11 h11 M${p.x + NODE_W - 6} ${p.y - 5} h11 v11 M${p.x - 5} ${p.y + NODE_H - 6} v11 h11 M${p.x + NODE_W - 6} ${p.y + NODE_H + 5} h11 v-11`}
                          fill="none"
                          strokeWidth="2"
                          style={{ stroke: "var(--seal)" }}
                        />
                      </>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto]">
            <div className="border-l-2 border-seal pl-4" aria-live="polite">
              <p className="label">
                Note {String(active + 1).padStart(2, "0")} · {nodes[active].label}
              </p>
              <p className="mt-1 text-ink">{nodes[active].note}</p>
            </div>
            <ul className="flex flex-wrap items-start gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-[0.06em] text-pencil" aria-label="Legend">
              <li className="flex items-center gap-2"><span className="inline-block h-px w-5 bg-ink" />→ data flow</li>
              <li className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-seal" />packet</li>
              <li>01 step · hover a node</li>
            </ul>
          </div>
          <figcaption className="mt-4 text-[13px] text-graphite">
            <span className="label mr-1 text-ink">Fig. {PROJECTS.length + 2 + tab}</span> {schematic.caption}
          </figcaption>
        </figure>

        {/* Mobile: vertical list with notes */}
        <figure className="m-0 md:hidden">
          <ol className="relative">
            {nodes.map((n, i) => (
              <li key={n.label} className="relative grid grid-cols-[40px_1fr] pb-5 last:pb-0">
                {i < nodes.length - 1 && (
                  <span className="absolute top-9 bottom-0 left-[15px] w-px bg-ink" aria-hidden="true" />
                )}
                <span className="relative z-10 flex h-8 w-8 items-center justify-center border border-ink bg-paper-raised font-mono text-[11px] text-graphite">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-1">
                  <p className="font-medium text-ink">{n.label}</p>
                  <p className="mt-1 text-[14px] text-graphite">{n.note}</p>
                </div>
              </li>
            ))}
          </ol>
          <figcaption className="mt-6 text-[13px] text-graphite">
            <span className="label mr-1 text-ink">Fig. {PROJECTS.length + 2 + tab}</span> {schematic.caption}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
