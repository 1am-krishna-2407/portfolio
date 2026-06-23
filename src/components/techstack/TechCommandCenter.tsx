"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Terminal,
  Brain,
  Server,
  Database,
  Cloud,
  Wrench,
  type LucideProps,
} from "lucide-react";
import { TECH_STACK, type TechCategory } from "@/lib/constants";

type IconComponent = React.FC<LucideProps>;

const iconMap: Record<string, IconComponent> = {
  Terminal,
  Brain,
  Server,
  Database,
  Cloud,
  Wrench,
};

function TechCard({
  item,
  color,
}: {
  item: { name: string; description: string; projects: string[] };
  color: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative p-3 rounded-lg bg-bg-primary/50 border border-border-subtle transition-all duration-300 cursor-default hover:border-opacity-50"
      style={{
        borderColor: isHovered ? `${color}50` : undefined,
        boxShadow: isHovered ? `0 0 15px ${color}15` : undefined,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold"
          style={{
            background: `${color}15`,
            color: color,
          }}
        >
          {item.name.slice(0, 2).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-text-primary truncate">
            {item.name}
          </div>
          <div className="text-[11px] text-text-dim truncate">
            {item.description}
          </div>
        </div>
      </div>

      {/* Hover detail */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-2 pt-2 border-t border-border-subtle"
        >
          <div className="text-[10px] text-text-dim uppercase tracking-wider mb-1">
            Used in
          </div>
          <div className="flex flex-wrap gap-1">
            {item.projects.map((p) => (
              <span
                key={p}
                className="text-[10px] px-1.5 py-0.5 rounded bg-bg-card text-text-muted"
              >
                {p}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function CategorySection({
  category,
  index,
}: {
  category: TechCategory;
  index: number;
}) {
  const IconComponent = iconMap[category.icon] || Terminal;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-xl bg-bg-card border border-border-subtle p-5"
    >
      {/* Category header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{
            background: `${category.color}15`,
            border: `1px solid ${category.color}30`,
          }}
        >
          <IconComponent className="w-5 h-5" style={{ color: category.color }} />
        </div>
        <div>
          <h3 className="text-base font-semibold text-text-primary">
            {category.category}
          </h3>
          <div className="text-[11px] text-text-dim">
            {category.items.length} technologies
          </div>
        </div>
      </div>

      {/* Tech items */}
      <div className="space-y-2">
        {category.items.map((item) => (
          <TechCard key={item.name} item={item} color={category.color} />
        ))}
      </div>
    </motion.div>
  );
}

export default function TechCommandCenter() {
  return (
    <section id="skills" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-20" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-accent-cyan glass mb-4">
            COMMAND CENTER
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Tech Stack <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="text-text-muted max-w-lg mx-auto">
            Technologies I use to build intelligent systems — hover to see how I
            use each one.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_STACK.map((category, i) => (
            <CategorySection key={category.category} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
