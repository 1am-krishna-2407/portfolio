"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";
import { ARCHITECTURES } from "@/lib/constants";

export default function SystemArchitecture() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="architecture" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-accent-cyan glass mb-4">
            SYSTEM DESIGN
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            How I <span className="gradient-text">Engineer Systems</span>
          </h2>
          <p className="text-text-muted max-w-lg mx-auto">
            Interactive architecture diagrams showing my approach to building
            production-grade systems.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {ARCHITECTURES.map((arch, i) => (
            <button
              key={arch.id}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === i
                  ? "text-white shadow-lg"
                  : "text-text-muted glass hover:text-text-primary"
              }`}
              style={
                activeTab === i
                  ? {
                      background: arch.color,
                      boxShadow: `0 0 20px ${arch.color}40`,
                    }
                  : {}
              }
            >
              {arch.title}
            </button>
          ))}
        </div>

        {/* Architecture Diagram */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            {/* Pipeline flow */}
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              {ARCHITECTURES[activeTab].nodes.map((node, i) => (
                <motion.div
                  key={node}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center gap-3 md:gap-4"
                >
                  <div
                    className="arch-node group relative px-5 py-4 rounded-xl bg-bg-card border border-border-subtle text-center cursor-default"
                    style={{
                      minWidth: "120px",
                    }}
                  >
                    {/* Node number */}
                    <div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold"
                      style={{
                        background: ARCHITECTURES[activeTab].color,
                        color: "#fff",
                      }}
                    >
                      {i + 1}
                    </div>

                    {/* Glow on hover */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        boxShadow: `0 0 25px ${ARCHITECTURES[activeTab].color}25`,
                      }}
                    />

                    <span className="relative z-10 text-sm font-medium text-text-primary">
                      {node}
                    </span>
                  </div>

                  {/* Arrow */}
                  {i < ARCHITECTURES[activeTab].nodes.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.08 + 0.2 }}
                    >
                      <ChevronRight
                        className="w-5 h-5 hidden md:block"
                        style={{ color: ARCHITECTURES[activeTab].color }}
                      />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Data flow indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs text-text-dim font-mono">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{
                    background: ARCHITECTURES[activeTab].color,
                  }}
                />
                Data flows left to right • Click tabs to switch views
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
