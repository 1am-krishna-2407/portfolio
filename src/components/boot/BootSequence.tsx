"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BOOT_MESSAGES } from "@/lib/constants";

export default function BootSequence({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Skip if already seen this session
    if (sessionStorage.getItem("boot_done")) {
      onComplete();
      return;
    }

    let currentLine = 0;
    const totalLines = BOOT_MESSAGES.length;

    const showNextLine = () => {
      if (currentLine < totalLines) {
        currentLine++;
        setVisibleLines(currentLine);
        setProgress((currentLine / totalLines) * 100);

        setTimeout(showNextLine, BOOT_MESSAGES[currentLine - 1]?.delay || 300);
      } else {
        setTimeout(() => {
          setIsDone(true);
          sessionStorage.setItem("boot_done", "true");
          setTimeout(onComplete, 500);
        }, 400);
      }
    };

    setTimeout(showNextLine, 500);
  }, [onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem("boot_done", "true");
    setIsDone(true);
    setTimeout(onComplete, 200);
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "#050810" }}
          onClick={handleSkip}
        >
          {/* Scan line effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59,130,246,0.1) 2px, rgba(59,130,246,0.1) 4px)",
            }}
          />

          <div className="w-full max-w-xl px-6">
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-4 opacity-40">
              <div className="w-3 h-3 rounded-full bg-accent-red/60" />
              <div className="w-3 h-3 rounded-full bg-accent-amber/60" />
              <div className="w-3 h-3 rounded-full bg-accent-green/60" />
              <span className="ml-3 text-xs font-mono text-text-dim">
                system.init
              </span>
            </div>

            {/* Boot messages */}
            <div className="font-mono text-sm space-y-2 mb-8">
              {BOOT_MESSAGES.slice(0, visibleLines).map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-accent-green">✓</span>
                  <span className="text-text-muted">{msg.text}</span>
                </motion.div>
              ))}
              {visibleLines < BOOT_MESSAGES.length && (
                <div className="flex items-center gap-3">
                  <span className="text-accent-blue animate-blink">▸</span>
                  <span className="text-accent-blue">Processing...</span>
                </div>
              )}
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-bg-card rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, var(--accent-blue), var(--accent-cyan))",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            {/* Skip hint */}
            <p className="text-center text-xs text-text-dim mt-6 opacity-50">
              Click anywhere to skip
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
