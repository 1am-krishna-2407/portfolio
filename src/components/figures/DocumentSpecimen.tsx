// A sample legal document with a seal and two signatures, plus detection
// boxes. Pure SVG so it renders on the server; the hero animates it by
// passing `shown` and `scanY`.

export const DETECTIONS = [
  { cls: "seal", score: 0.96, x: 58, y: 343, w: 104, h: 104 },
  { cls: "signature", score: 0.93, x: 236, y: 350, w: 126, h: 44 },
  { cls: "signature", score: 0.88, x: 240, y: 420, w: 112, h: 42 },
] as const;

// Paragraph line widths (in px) — reads like justified body text
const LINES = [
  [300, 312, 296, 308, 170],
  [312, 290, 305, 240],
  [306, 300, 150],
];

const fill = (v: string) => ({ fill: `var(${v})` });
const stroke = (v: string) => ({ stroke: `var(${v})` });

export default function DocumentSpecimen({
  id,
  shown = [true, true, true],
  scanY,
  className,
}: {
  id: string;
  shown?: readonly boolean[];
  scanY?: number;
  className?: string;
}) {
  let y = 104;
  const lineRects: { x: number; y: number; w: number }[] = [];
  LINES.forEach((para) => {
    para.forEach((w) => {
      lineRects.push({ x: 44, y, w });
      y += 13;
    });
    y += 11;
  });

  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      role="img"
      aria-label="Sample deed of agreement with an official seal and two signatures, each outlined by a detection box with a class label and confidence score."
    >
      <defs>
        <path id={`spec-seal-${id}`} d="M110,395 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0" />
        <clipPath id={`spec-clip-${id}`}>
          <rect x="0" y="0" width="400" height="500" />
        </clipPath>
      </defs>

      {/* Paper */}
      <rect x="0.5" y="0.5" width="399" height="499" style={{ ...fill("--paper-raised"), ...stroke("--rule") }} />

      {/* Header */}
      <text x="200" y="52" textAnchor="middle" fontFamily="var(--font-display)" fontSize="19" style={fill("--ink")}>
        Deed of Agreement
      </text>
      <text x="200" y="70" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7.5" letterSpacing="1" style={fill("--pencil")}>
        NO. 2026 / 014 · SPECIMEN
      </text>
      <line x1="44" y1="84" x2="356" y2="84" strokeWidth="0.75" style={stroke("--rule")} />

      {/* Body text */}
      {lineRects.map((l, i) => (
        <rect key={i} x={l.x} y={l.y} width={l.w} height="4.5" rx="1" style={fill("--rule")} />
      ))}

      {/* Signature lines */}
      <line x1="236" y1="398" x2="362" y2="398" strokeWidth="0.75" style={stroke("--pencil")} />
      <text x="236" y="410" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="0.8" style={fill("--pencil")}>
        SIGNED
      </text>
      <line x1="240" y1="466" x2="352" y2="466" strokeWidth="0.75" style={stroke("--pencil")} />
      <text x="240" y="478" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="0.8" style={fill("--pencil")}>
        WITNESS
      </text>

      {/* Seal (rotated, faint, overlapping text — the hard case) */}
      <g transform="rotate(-14 110 395)" opacity="0.8" style={stroke("--graphite")} fill="none">
        <circle cx="110" cy="395" r="46" strokeWidth="2.4" />
        <circle cx="110" cy="395" r="26" strokeWidth="1" />
        <text fontFamily="var(--font-mono)" fontSize="8" stroke="none" style={fill("--graphite")}>
          <textPath href={`#spec-seal-${id}`} textLength="208" lengthAdjust="spacing">
            REGISTRAR · DISTRICT OFFICE · SEALED ·
          </textPath>
        </text>
        <path d="M100 384 l10 -8 l10 8 v18 h-20 z M104 402 v-10 h12 v10" strokeWidth="1.2" />
      </g>

      {/* Signatures */}
      <path
        d="M244 384 c6 -16 13 -24 15 -13 c2 10 -9 22 -2 17 c8 -6 11 -27 19 -20 c6 5 -5 18 4 14 c8 -4 10 -16 17 -10 c5 5 -1 11 7 7 c9 -5 15 -9 26 -8 M258 391 c24 -3 54 -6 92 -12"
        fill="none"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={stroke("--ink")}
      />
      <path
        d="M248 452 c4 -12 10 -20 14 -12 c4 8 -6 16 0 13 c7 -4 9 -21 16 -16 c5 4 -2 14 5 11 c8 -3 11 -14 18 -9 c6 4 0 9 8 6 c6 -2 12 -5 22 -4"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={stroke("--ink")}
      />

      {/* Scan line */}
      {scanY !== undefined && (
        <g clipPath={`url(#spec-clip-${id})`}>
          <rect x="0" y={scanY - 40} width="400" height="40" style={fill("--seal")} opacity="0.06" />
          <line x1="0" y1={scanY} x2="400" y2={scanY} strokeWidth="1" style={stroke("--seal")} />
        </g>
      )}

      {/* Detections */}
      {DETECTIONS.map((d, i) => {
        const tag = `${d.cls} ${d.score.toFixed(2)}`;
        const tagW = tag.length * 5.1 + 10;
        return (
          <g key={i} opacity={shown[i] ? 1 : 0} style={{ transition: "opacity 200ms" }}>
            <rect x={d.x} y={d.y} width={d.w} height={d.h} fill="none" strokeWidth="1.4" style={stroke("--seal")} />
            {/* corner ticks */}
            <path
              d={`M${d.x - 3} ${d.y + 8} v-11 h11 M${d.x + d.w - 8} ${d.y - 3} h11 v11 M${d.x - 3} ${d.y + d.h - 8} v11 h11 M${d.x + d.w - 8} ${d.y + d.h + 3} h11 v-11`}
              fill="none"
              strokeWidth="2"
              style={stroke("--seal")}
            />
            <rect x={d.x} y={d.y - 14} width={tagW} height="13" style={fill("--seal")} />
            <text x={d.x + 5} y={d.y - 4.5} fontFamily="var(--font-mono)" fontSize="8.5" style={fill("--paper")}>
              {tag}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
