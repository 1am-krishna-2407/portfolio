"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, X, Minus } from "lucide-react";
import { TERMINAL_COMMANDS, PERSONAL } from "@/lib/constants";

export default function TerminalMode() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<
    { type: "input" | "output"; text: string }[]
  >([
    {
      type: "output",
      text: `Welcome to KKJ Terminal v1.0.0\nType 'help' for available commands.\n`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const typeOutput = useCallback(
    (text: string) => {
      setIsTyping(true);
      let current = "";
      let i = 0;

      const timer = setInterval(() => {
        if (i < text.length) {
          current += text[i];
          i++;
          // Update output in chunks for performance
          if (i % 3 === 0 || i === text.length) {
            setHistory((prev) => {
              const newHist = [...prev];
              const lastItem = newHist[newHist.length - 1];
              if (lastItem && lastItem.type === "output" && lastItem.text !== text) {
                newHist[newHist.length - 1] = { type: "output", text: current };
              }
              return newHist;
            });
          }
        } else {
          clearInterval(timer);
          setHistory((prev) => {
            const newHist = [...prev];
            newHist[newHist.length - 1] = { type: "output", text };
            return newHist;
          });
          setIsTyping(false);
        }
      }, 8);

      return () => clearInterval(timer);
    },
    []
  );

  const handleCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();

      setHistory((prev) => [...prev, { type: "input", text: cmd }]);

      if (trimmed === "clear") {
        setHistory([]);
        return;
      }

      if (trimmed === "sudo hire krishna") {
        setHistory((prev) => [
          ...prev,
          {
            type: "output",
            text: `\n🚀 CANDIDATE ACCEPTED! 🚀\n\n✨ Krishna Kumar Jha has been hired!\n✨ Deploying to production...\n✨ Welcome to the team!\n`,
          },
        ]);
        return;
      }

      if (trimmed === "resume") {
        setHistory((prev) => [
          ...prev,
          { type: "output", text: TERMINAL_COMMANDS.resume },
        ]);
        window.open(PERSONAL.resumeUrl, "_blank");
        return;
      }

      if (trimmed === "github") {
        setHistory((prev) => [
          ...prev,
          { type: "output", text: TERMINAL_COMMANDS.github },
        ]);
        window.open(`https://github.com/${PERSONAL.github}`, "_blank");
        return;
      }

      const response = TERMINAL_COMMANDS[trimmed];
      if (response) {
        setHistory((prev) => [...prev, { type: "output", text: "" }]);
        typeOutput(response);
      } else {
        setHistory((prev) => [
          ...prev,
          {
            type: "output",
            text: `Command not found: '${trimmed}'\nType 'help' for available commands.`,
          },
        ]);
      }
    },
    [typeOutput]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    handleCommand(input);
    setInput("");
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-bg-card border border-border-subtle text-text-muted hover:text-accent-cyan hover:glow-border transition-all duration-300 ${
          isOpen ? "hidden" : ""
        }`}
        aria-label="Open Terminal"
      >
        <Terminal className="w-5 h-5" />
      </motion.button>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 w-[min(480px,calc(100vw-3rem))] rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-border-subtle"
            style={{ background: "#0a0e18" }}
          >
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-bg-card border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-3 h-3 rounded-full bg-accent-red/80 hover:bg-accent-red transition-colors"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-3 h-3 rounded-full bg-accent-amber/80 hover:bg-accent-amber transition-colors"
                  />
                  <div className="w-3 h-3 rounded-full bg-accent-green/80" />
                </div>
                <span className="text-xs font-mono text-text-dim ml-2">
                  kkj@portfolio:~
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded hover:bg-bg-card-hover text-text-dim hover:text-text-primary transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded hover:bg-bg-card-hover text-text-dim hover:text-text-primary transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Terminal content */}
            <div className="h-80 overflow-y-auto p-4 font-mono text-sm">
              {history.map((entry, i) => (
                <div key={i} className="mb-2">
                  {entry.type === "input" ? (
                    <div className="flex items-center gap-2">
                      <span className="text-accent-green">❯</span>
                      <span className="text-text-primary">{entry.text}</span>
                    </div>
                  ) : (
                    <pre className="text-text-muted whitespace-pre-wrap text-xs leading-relaxed">
                      {entry.text}
                    </pre>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-4 py-3 border-t border-border-subtle"
            >
              <span className="text-accent-green text-sm">❯</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
                placeholder="Type a command..."
                className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-dim outline-none font-mono"
                autoComplete="off"
                spellCheck={false}
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
