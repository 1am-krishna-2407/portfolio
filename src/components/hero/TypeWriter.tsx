"use client";

import { useState, useEffect, useCallback } from "react";
import { PERSONAL } from "@/lib/constants";

export default function TypeWriter() {
  const [currentTagline, setCurrentTagline] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const taglines = PERSONAL.taglines;

  const tick = useCallback(() => {
    const fullText = taglines[currentTagline];

    if (!isDeleting) {
      setDisplayText(fullText.substring(0, displayText.length + 1));
      if (displayText.length + 1 === fullText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }
    } else {
      setDisplayText(fullText.substring(0, displayText.length - 1));
      if (displayText.length - 1 === 0) {
        setIsDeleting(false);
        setCurrentTagline((prev) => (prev + 1) % taglines.length);
        return;
      }
    }
  }, [displayText, isDeleting, currentTagline, taglines]);

  useEffect(() => {
    const speed = isDeleting ? 30 : 50;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  return (
    <span className="inline-block font-mono text-text-muted">
      {displayText}
      <span className="animate-blink text-accent-blue">|</span>
    </span>
  );
}
