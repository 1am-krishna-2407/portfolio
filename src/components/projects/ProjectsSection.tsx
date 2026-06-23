"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, X, ChevronRight } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/constants";

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onClick={onOpen}
      className="group relative rounded-xl bg-bg-card border border-border-subtle overflow-hidden cursor-pointer card-hover"
    >
      {/* Top accent bar */}
      <div
        className="h-1 w-full"
        style={{
          background: `linear-gradient(90deg, ${project.color}, ${project.color}80)`,
        }}
      />

      <div className="p-6">
        {/* Subtitle */}
        <span
          className="inline-block text-xs font-mono mb-3 px-2 py-1 rounded"
          style={{
            color: project.color,
            background: `${project.color}15`,
          }}
        >
          {project.subtitle}
        </span>

        {/* Title */}
        <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-accent-blue transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-muted mb-5 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {project.metrics.slice(0, 4).map((metric) => (
            <div
              key={metric.label}
              className="text-center p-2 rounded-lg bg-bg-primary/50 border border-border-subtle"
            >
              <div
                className="text-lg font-bold font-mono"
                style={{ color: project.color }}
              >
                {metric.value}
              </div>
              <div className="text-[10px] text-text-dim uppercase tracking-wider">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-md bg-bg-primary/50 text-text-dim border border-border-subtle"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* View button */}
        <div className="flex items-center text-sm text-text-dim group-hover:text-accent-blue transition-colors">
          View Case Study
          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl bg-bg-card border border-border-subtle"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 glass-heavy rounded-t-2xl">
          <div>
            <span
              className="inline-block text-xs font-mono mb-1 px-2 py-1 rounded"
              style={{
                color: project.color,
                background: `${project.color}15`,
              }}
            >
              {project.subtitle}
            </span>
            <h2 className="text-2xl font-bold text-text-primary">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-bg-card-hover text-text-dim hover:text-text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Problem / Approach / Impact */}
          {[
            { label: "Problem", text: project.problem, emoji: "🔍" },
            { label: "Approach", text: project.approach, emoji: "⚡" },
            { label: "Impact", text: project.impact, emoji: "🚀" },
          ].map((section) => (
            <div key={section.label}>
              <h3 className="text-sm font-mono text-accent-cyan uppercase tracking-wider mb-2">
                {section.emoji} {section.label}
              </h3>
              <p className="text-text-muted leading-relaxed">{section.text}</p>
            </div>
          ))}

          {/* Metrics */}
          <div>
            <h3 className="text-sm font-mono text-accent-cyan uppercase tracking-wider mb-4">
              📊 Key Metrics
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="text-center p-3 rounded-lg bg-bg-primary/50 border border-border-subtle"
                >
                  <div
                    className="text-xl font-bold font-mono"
                    style={{ color: project.color }}
                  >
                    {metric.value}
                  </div>
                  <div className="text-[10px] text-text-dim uppercase tracking-wider mt-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture */}
          <div>
            <h3 className="text-sm font-mono text-accent-cyan uppercase tracking-wider mb-4">
              🏗️ Architecture
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              {project.architecture.map((node, i) => (
                <div key={node} className="flex items-center gap-2">
                  <span className="px-3 py-2 rounded-lg bg-bg-primary/80 border border-border-subtle text-sm text-text-primary font-medium">
                    {node}
                  </span>
                  {i < project.architecture.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-text-dim" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-sm font-mono text-accent-cyan uppercase tracking-wider mb-3">
              🛠️ Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-sm rounded-lg bg-bg-primary/50 border border-border-subtle text-text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* GitHub Link */}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-blue text-white font-medium hover:bg-accent-blue/90 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View on GitHub
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-accent-cyan glass mb-4">
            FEATURED WORK
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Featured <span className="gradient-text">Engineering</span>
          </h2>
          <p className="text-text-muted max-w-lg mx-auto">
            Each project is a case study in end-to-end engineering — from problem
            definition to production deployment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
