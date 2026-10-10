"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import DocumentSpecimen, { DETECTIONS } from "@/components/figures/DocumentSpecimen";

const SCAN_MS = 1700;
const ALL_SHOWN = DETECTIONS.map(() => true);

// Hero "Fig. 1": a scan line sweeps the document and boxes appear as it
// passes each region. Runs once on view; the button replays it.
export default function DetectionSpecimen() {
  const [scanY, setScanY] = useState<number | undefined>(undefined);
  const [shown, setShown] = useState<boolean[]>(ALL_SHOWN);
  const [running, setRunning] = useState(false);
  const frame = useRef(0);
  const wrapRef = useRef<HTMLElement>(null);

  const run = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(frame.current);
    setRunning(true);
    setShown(DETECTIONS.map(() => false));
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / SCAN_MS, 1);
      const y = 10 + t * 490;
      setScanY(y);
      setShown(DETECTIONS.map((d) => y >= d.y + d.h));
      if (t < 1) {
        frame.current = requestAnimationFrame(step);
      } else {
        setScanY(undefined);
        setShown(ALL_SHOWN);
        setRunning(false);
      }
    };
    frame.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          run();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, [run]);

  const found = shown.filter(Boolean).length;

  return (
    <figure ref={wrapRef} className="m-0">
      <div className="relative border border-rule bg-paper p-3 sm:p-4">
        <DocumentSpecimen id="hero" shown={shown} scanY={scanY} className="block h-auto w-full" />
      </div>
      <div className="mt-3 flex items-start justify-between gap-4">
        <figcaption className="text-[13px] leading-snug text-graphite">
          <span className="label mr-1 text-ink">Fig. 1</span> Seal &amp; signature
          detection on a sample document, illustrated.
        </figcaption>
        <button
          type="button"
          onClick={run}
          disabled={running}
          className="inline-flex min-h-[44px] shrink-0 items-center gap-2 font-mono text-[12px] uppercase tracking-[0.06em] text-graphite transition-colors hover:text-seal disabled:cursor-progress disabled:opacity-60"
        >
          <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
          Run detection
        </button>
      </div>
      <p className="label mt-1" aria-live="polite">
        {running ? "Scanning…" : `${found} detections · seal ×1 · signature ×2`}
      </p>
    </figure>
  );
}
