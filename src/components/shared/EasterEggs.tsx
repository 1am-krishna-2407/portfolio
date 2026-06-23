"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function EasterEggs() {
  const [konamiActive, setKonamiActive] = useState(false);
  const [hireActive, setHireActive] = useState(false);

  // Konami code: ↑↑↓↓←→←→BA
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ];

  const handleKonami = useCallback(() => {
    let index = 0;
    const handler = (e: KeyboardEvent) => {
      if (e.code === konamiCode[index]) {
        index++;
        if (index === konamiCode.length) {
          setKonamiActive(true);
          setTimeout(() => setKonamiActive(false), 5000);
          index = 0;
        }
      } else {
        index = 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    return handleKonami();
  }, [handleKonami]);

  // Listen for hire command from terminal (custom event)
  useEffect(() => {
    const handler = () => {
      setHireActive(true);
      setTimeout(() => setHireActive(false), 3000);
    };
    window.addEventListener("hire-krishna", handler);
    return () => window.removeEventListener("hire-krishna", handler);
  }, []);

  return (
    <>
      {/* Konami Code - Neural Network Overlay */}
      <AnimatePresence>
        {konamiActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-bg-primary/80" />

            {/* Matrix-like rain effect */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -100, opacity: 0 }}
                  animate={{
                    y: "100vh",
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                  }}
                  className="absolute text-accent-blue/30 font-mono text-xs"
                  style={{ left: `${Math.random() * 100}%` }}
                >
                  {Array.from({ length: 10 })
                    .map(() =>
                      Math.random() > 0.5
                        ? String.fromCharCode(0x30a0 + Math.random() * 96)
                        : Math.floor(Math.random() * 2).toString()
                    )
                    .join("\n")}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="relative z-10 text-center"
            >
              <div className="text-6xl mb-4">🧠</div>
              <div className="text-2xl font-bold gradient-text mb-2">
                Neural Network Unlocked
              </div>
              <div className="text-text-muted text-sm font-mono">
                ↑↑↓↓←→←→BA — You found the secret!
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hire confirmation */}
      <AnimatePresence>
        {hireActive && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[200] text-center p-8 rounded-2xl glass-heavy"
          >
            <div className="text-5xl mb-4">🚀</div>
            <div className="text-2xl font-bold text-accent-green mb-2">
              Candidate Accepted!
            </div>
            <div className="text-text-muted text-sm font-mono">
              sudo hire krishna — command executed successfully
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
