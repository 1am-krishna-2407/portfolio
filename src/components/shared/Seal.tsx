// Circular ink-stamp mark. Default shows the "KKJ" monogram; pass `word`
// for the VERIFIED / RECEIVED / HIRED variants. Colour comes from currentColor.

const RING_TEXT = "MACHINE LEARNING · COMPUTER VISION · BACKEND · 2026 · ";

export default function Seal({
  id,
  word,
  ring = RING_TEXT,
  size = 40,
  rough = true,
  className,
  title,
}: {
  id: string; // unique per page; used for the SVG path/filter ids
  word?: string;
  ring?: string;
  size?: number;
  rough?: boolean;
  className?: string;
  title?: string;
}) {
  const pathId = `seal-ring-${id}`;
  const filterId = `seal-rough-${id}`;

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {rough && (
        <defs>
          <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
            <feDisplacementMap in="SourceGraphic" scale="2.2" />
          </filter>
        </defs>
      )}
      <defs>
        <path id={pathId} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
      </defs>
      <g
        filter={rough ? `url(#${filterId})` : undefined}
        fill="none"
        stroke="currentColor"
      >
        <circle cx="60" cy="60" r="57" strokeWidth="3" />
        <circle cx="60" cy="60" r="34" strokeWidth="1.5" />
        <text
          fill="currentColor"
          stroke="none"
          fontFamily="var(--font-mono)"
          fontSize="9.5"
          fontWeight="500"
        >
          <textPath href={`#${pathId}`} textLength="272" lengthAdjust="spacing">
            {ring}
          </textPath>
        </text>
        {word ? (
          <>
            <line x1="30" y1="50" x2="90" y2="50" strokeWidth="1.2" />
            <line x1="30" y1="70" x2="90" y2="70" strokeWidth="1.2" />
            <text
              x="60"
              y="64"
              textAnchor="middle"
              fill="currentColor"
              stroke="none"
              fontFamily="var(--font-mono)"
              fontWeight="500"
              fontSize={word.length > 6 ? 10.5 : 13}
              letterSpacing="1"
            >
              {word}
            </text>
          </>
        ) : (
          <text
            x="60"
            y="69"
            textAnchor="middle"
            fill="currentColor"
            stroke="none"
            fontFamily="var(--font-display)"
            fontWeight="600"
            fontSize="27"
          >
            KKJ
          </text>
        )}
      </g>
    </svg>
  );
}
