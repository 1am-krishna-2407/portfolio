"use client";

import { motion } from "motion/react";
import {
  Brain,
  Eye,
  Server,
  Container,
  Network,
  Code,
  type LucideProps,
} from "lucide-react";
import { SNAPSHOT_CARDS } from "@/lib/constants";

type IconComponent = React.FC<LucideProps>;

const iconMap: Record<string, IconComponent> = {
  Brain,
  Eye,
  Server,
  Container,
  Network,
  Code,
};

export default function RecruiterSnapshot() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-dots opacity-30" />

      <div className="section-container relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-accent-cyan glass mb-4">
            QUICK OVERVIEW
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            What I <span className="gradient-text">Build</span>
          </h2>
          <p className="text-text-muted max-w-lg mx-auto">
            A snapshot of my engineering domains — understand my profile in 10 seconds.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SNAPSHOT_CARDS.map((card, i) => {
            const IconComponent = iconMap[card.icon] || Code;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative p-6 rounded-xl bg-bg-card border border-border-subtle card-hover cursor-default"
              >
                {/* Top glow line */}
                <div
                  className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`,
                  }}
                />

                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${card.color}15`,
                    border: `1px solid ${card.color}30`,
                  }}
                >
                  <IconComponent
                    className="w-6 h-6"
                    style={{ color: card.color }}
                  />
                </div>

                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
