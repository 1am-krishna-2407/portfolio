// Detection-style bounding box: thin accent rectangle, corner ticks and a
// "[ class · score ]" tag. Purely decorative, so it is hidden from assistive
// tech. trigger="view" draws it when scrolled into view (AnnotationObserver),
// trigger="hover" only on hover/focus.

export default function Annotate({
  label,
  score,
  trigger = "view",
  tag = "top",
  as: Tag = "div",
  className = "",
  children,
}: {
  label: string;
  score: number;
  trigger?: "view" | "hover";
  tag?: "top" | "bottom";
  as?: "div" | "span";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={`annot ${Tag === "span" ? "inline-block" : ""} ${className}`}
      data-annotate={trigger === "view" ? "" : undefined}
    >
      {children}
      <span className="annot-box" aria-hidden="true">
        <svg preserveAspectRatio="none">
          <rect x="0" y="0" width="100%" height="100%" pathLength="1" />
        </svg>
        <span className="annot-tick tl" />
        <span className="annot-tick tr" />
        <span className="annot-tick bl" />
        <span className="annot-tick br" />
        <span className={`annot-tag ${tag === "bottom" ? "bottom" : ""}`}>
          {label} · {score.toFixed(2)}
        </span>
      </span>
    </Tag>
  );
}
