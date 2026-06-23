"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Download,
  User,
  Wrench,
  Briefcase,
  Trophy,
  FileText,
  Mail,
} from "lucide-react";
import { PERSONAL, EXPERIENCE, ACHIEVEMENTS } from "@/lib/constants";

export default function RecruiterMode() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 px-4 py-2.5 rounded-xl bg-accent-blue/10 border border-accent-blue/30 text-accent-blue text-sm font-medium hover:bg-accent-blue/20 transition-all duration-300"
      >
        👋 Recruiter Summary
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-bg-card border border-border-subtle"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between p-6 glass-heavy rounded-t-2xl">
                <div>
                  <h2 className="text-xl font-bold text-text-primary">
                    Recruiter Summary
                  </h2>
                  <p className="text-xs text-text-dim">
                    30-second profile overview
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-bg-card-hover text-text-dim hover:text-text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Who I Am */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-accent-blue" />
                  </div>
                  <div>
                    <h3 className="text-sm font-mono text-accent-cyan uppercase tracking-wider mb-1">
                      Who I Am
                    </h3>
                    <p className="text-lg font-bold text-text-primary">
                      {PERSONAL.name}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {PERSONAL.roles.map((role) => (
                        <span
                          key={role}
                          className="px-2 py-1 text-xs rounded-md bg-accent-blue/10 text-accent-blue"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* What I Build */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent-purple/10 border border-accent-purple/30 flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-5 h-5 text-accent-purple" />
                  </div>
                  <div>
                    <h3 className="text-sm font-mono text-accent-cyan uppercase tracking-wider mb-1">
                      What I Build
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {PERSONAL.description}
                    </p>
                    <div className="mt-3 space-y-1 text-sm text-text-muted">
                      <div>
                        ▸ Seal & Signature Detection (97.1% mAP@50)
                      </div>
                      <div>▸ DevFlow — 15+ API Enterprise Backend</div>
                      <div>▸ Heart Disease ML Prediction Dashboard</div>
                    </div>
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-accent-cyan" />
                  </div>
                  <div>
                    <h3 className="text-sm font-mono text-accent-cyan uppercase tracking-wider mb-2">
                      Core Technologies
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Python",
                        "Java",
                        "C++",
                        "YOLOv8",
                        "OpenCV",
                        "TensorFlow",
                        "Spring Boot",
                        "MongoDB",
                        "Docker",
                        "Kubernetes",
                        "Redis",
                        "AWS",
                      ].map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-[11px] rounded bg-bg-primary/50 text-text-dim border border-border-subtle"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent-green/10 border border-accent-green/30 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-accent-green" />
                  </div>
                  <div>
                    <h3 className="text-sm font-mono text-accent-cyan uppercase tracking-wider mb-1">
                      Experience
                    </h3>
                    <p className="text-sm text-text-primary font-medium">
                      {EXPERIENCE[0].company} — {EXPERIENCE[0].role}
                    </p>
                    <p className="text-xs text-text-dim">
                      {EXPERIENCE[0].period}
                    </p>
                  </div>
                </div>

                {/* Achievements */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent-amber/10 border border-accent-amber/30 flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-5 h-5 text-accent-amber" />
                  </div>
                  <div>
                    <h3 className="text-sm font-mono text-accent-cyan uppercase tracking-wider mb-2">
                      Achievements
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {ACHIEVEMENTS.map((a) => (
                        <div
                          key={a.title}
                          className="text-sm text-text-muted"
                        >
                          <span
                            className="font-bold font-mono"
                            style={{ color: a.color }}
                          >
                            {a.value}
                            {a.suffix}
                          </span>{" "}
                          {a.title}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-border-subtle">
                  <a
                    href={PERSONAL.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-blue text-white text-sm font-medium hover:bg-accent-blue/90 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download Resume
                  </a>
                  <a
                    href={`mailto:${PERSONAL.email}`}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg glass text-text-muted text-sm font-medium hover:text-text-primary transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Contact Me
                  </a>
                </div>

                {/* Availability */}
                <div className="p-4 rounded-xl bg-bg-primary/50 border border-border-subtle">
                  <div className="text-xs font-mono text-text-dim uppercase tracking-wider mb-3">
                    Availability
                  </div>
                  <div className="space-y-2 text-sm text-text-muted">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                      Open to Software Engineering Roles
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                      Open to Machine Learning Roles
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                      Open to Backend Engineering Roles
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
