"use client";

import { useEffect } from "react";

// Marks [data-annotate] elements as seen the first time they scroll into
// view, which draws their bounding box (see .annot in globals.css).
export default function AnnotationObserver() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-annotate]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-seen", "");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.6 }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return null;
}
