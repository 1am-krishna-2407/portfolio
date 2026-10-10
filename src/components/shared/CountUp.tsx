"use client";

import { useEffect, useRef } from "react";

// Renders the final value on the server (correct without JS), then counts up
// once when scrolled into view and finishes with a small stamp "thunk".
export default function CountUp({
  value,
  decimals = 0,
  suffix = "",
  className,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const format = (n: number) =>
      n.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }) + suffix;

    let frame = 0;
    const run = () => {
      const start = performance.now();
      const duration = 1100;
      const step = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = format(value * eased);
        if (t < 1) {
          frame = requestAnimationFrame(step);
        } else {
          el.textContent = format(value);
          el.classList.add("thunk");
        }
      };
      frame = requestAnimationFrame(step);
    };

    el.textContent = format(0);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          run();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = format(value);
    };
  }, [value, decimals, suffix]);

  return (
    <span ref={ref} className={`inline-block tabular-nums ${className ?? ""}`}>
      {`${value.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`}
    </span>
  );
}
