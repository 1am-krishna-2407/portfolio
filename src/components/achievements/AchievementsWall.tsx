"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Code, Trophy, GraduationCap, Rocket, type LucideProps } from "lucide-react";
import { ACHIEVEMENTS } from "@/lib/constants";

type IconComponent = React.FC<LucideProps>;

const iconMap: Record<string, IconComponent> = {
  Code,
  Trophy,
  GraduationCap,
  Rocket,
};

function AnimatedCounter({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label?: string;
}) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [hasStarted, target]);

  return (
    <div ref={ref} className="text-3xl md:text-4xl font-bold font-mono">
      {label || `${count}${suffix}`}
    </div>
  );
}

export default function AchievementsWall() {
  return (
    <section className="relative overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-accent-cyan glass mb-4">
            ACHIEVEMENTS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Achievement <span className="gradient-text">Wall</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {ACHIEVEMENTS.map((achievement, i) => {
            const IconComponent = iconMap[achievement.icon] || Code;
            return (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative p-6 rounded-xl glass text-center card-hover"
              >
                {/* Glass shine effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.03] to-transparent" />

                <div className="relative z-10">
                  <div
                    className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${achievement.color}15`,
                      border: `1px solid ${achievement.color}30`,
                    }}
                  >
                    <IconComponent
                      className="w-7 h-7"
                      style={{ color: achievement.color }}
                    />
                  </div>

                  <div style={{ color: achievement.color }}>
                    <AnimatedCounter
                      target={achievement.value}
                      suffix={achievement.suffix}
                      label={achievement.label}
                    />
                  </div>

                  <h3 className="text-sm font-semibold text-text-primary mt-2 mb-1">
                    {achievement.title}
                  </h3>
                  <p className="text-xs text-text-dim leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
