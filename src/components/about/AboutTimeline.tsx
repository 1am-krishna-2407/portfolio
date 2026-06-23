"use client";

import { motion } from "motion/react";
import { TIMELINE } from "@/lib/constants";

export default function AboutTimeline() {
  return (
    <section id="about" className="relative overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-accent-cyan glass mb-4">
            ABOUT
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            The <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-text-muted max-w-xl mx-auto">
            Focused on solving real-world problems with an engineering mindset
            — building systems end-to-end.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-2xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-[28px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue/50 via-accent-cyan/30 to-transparent" />

          {TIMELINE.map((milestone, i) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative flex items-start gap-6 mb-12 ${
                i % 2 === 0
                  ? "md:flex-row"
                  : "md:flex-row-reverse md:text-right"
              }`}
            >
              {/* Year badge - mobile */}
              <div className="md:hidden flex-shrink-0 w-14 h-14 rounded-full bg-bg-card border border-accent-blue/30 flex items-center justify-center z-10">
                <span className="text-xs font-mono font-bold text-accent-blue">
                  {milestone.year}
                </span>
              </div>

              {/* Content card - mobile */}
              <div className="md:hidden flex-1 p-5 rounded-xl bg-bg-card border border-border-subtle card-hover">
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {milestone.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {milestone.description}
                </p>
              </div>

              {/* Desktop layout */}
              <div className="hidden md:flex items-start gap-6 w-full">
                {i % 2 === 0 ? (
                  <>
                    <div className="flex-1 p-5 rounded-xl bg-bg-card border border-border-subtle card-hover text-right">
                      <h3 className="text-lg font-semibold text-text-primary mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-text-muted leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-bg-card border border-accent-blue/30 flex items-center justify-center z-10">
                      <span className="text-xs font-mono font-bold text-accent-blue">
                        {milestone.year}
                      </span>
                    </div>
                    <div className="flex-1" />
                  </>
                ) : (
                  <>
                    <div className="flex-1" />
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-bg-card border border-accent-cyan/30 flex items-center justify-center z-10">
                      <span className="text-xs font-mono font-bold text-accent-cyan">
                        {milestone.year}
                      </span>
                    </div>
                    <div className="flex-1 p-5 rounded-xl bg-bg-card border border-border-subtle card-hover text-left">
                      <h3 className="text-lg font-semibold text-text-primary mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-text-muted leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
