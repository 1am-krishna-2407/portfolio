"use client";

import { motion } from "motion/react";
import { Briefcase, Lightbulb, Cpu, Zap } from "lucide-react";
import { EXPERIENCE } from "@/lib/constants";

export default function ExperienceTimeline() {
  const exp = EXPERIENCE[0];

  return (
    <section id="experience" className="relative overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-accent-cyan glass mb-4">
            EXPERIENCE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Company Header */}
          <div className="rounded-xl bg-bg-card border border-border-subtle overflow-hidden">
            <div className="p-6 border-b border-border-subtle">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-accent-blue" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text-primary">
                        {exp.company}
                      </h3>
                      <p className="text-sm text-accent-blue font-medium">
                        {exp.role}
                      </p>
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono text-text-dim glass">
                  {exp.period}
                </span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border-subtle">
              {[
                {
                  icon: Lightbulb,
                  label: "Problem",
                  text: exp.problem,
                  color: "#F59E0B",
                },
                {
                  icon: Cpu,
                  label: "Approach",
                  text: exp.approach,
                  color: "#3B82F6",
                },
              ].map((detail) => (
                <div key={detail.label} className="p-5 bg-bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <detail.icon
                      className="w-4 h-4"
                      style={{ color: detail.color }}
                    />
                    <span className="text-xs font-mono uppercase tracking-wider text-text-dim">
                      {detail.label}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {detail.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Tech + Impact */}
            <div className="p-5 border-t border-border-subtle">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-accent-green" />
                <span className="text-xs font-mono uppercase tracking-wider text-text-dim">
                  Impact & Technology
                </span>
              </div>
              <p className="text-sm text-text-muted leading-relaxed mb-4">
                {exp.impact}
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.technology.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-lg bg-accent-blue/10 text-accent-blue border border-accent-blue/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="p-5 border-t border-border-subtle bg-bg-primary/30">
              <div className="text-xs font-mono text-text-dim uppercase tracking-wider mb-3">
                Highlights
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {exp.highlights.map((h) => (
                  <div
                    key={h}
                    className="flex items-start gap-2 text-sm text-text-muted"
                  >
                    <span className="text-accent-green mt-0.5">▸</span>
                    {h}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
