"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Mail,
  Code2,
  ChevronDown,
  Download,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import { PERSONAL } from "@/lib/constants";
import TypeWriter from "./TypeWriter";

const NeuralBackground = dynamic(() => import("./NeuralBackground"), {
  ssr: false,
});

// Custom SVG icons for brands (lucide dropped brand icons)
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24"
    >
      {/* Neural network background */}
      <NeuralBackground />

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-bg-primary/30 to-bg-primary" />

      {/* Grid pattern */}
      <div className="absolute inset-0 z-[1] bg-grid opacity-40" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center max-w-4xl mx-auto px-6"
      >
        {/* Status badge */}
        <motion.div variants={item} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-text-muted">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            Open to opportunities
          </span>
        </motion.div>

        {/* Profile Photo */}
        <motion.div variants={item} className="mb-8 flex justify-center">
          <div className="relative group">
            {/* Outer glow ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-purple opacity-50 blur-sm group-hover:opacity-75 transition-opacity duration-500" />
            {/* Photo container */}
            <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-border-subtle bg-bg-card">
              <Image
                src="/instant.jpeg"
                alt="Krishna Kumar Jha"
                width={400}
                height={400}
                priority
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to initials if no photo found
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector(".initials-fallback")) {
                    const fallback = document.createElement("div");
                    fallback.className = "initials-fallback w-full h-full flex items-center justify-center text-3xl font-bold gradient-text";
                    fallback.textContent = "KKJ";
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="gradient-text">{PERSONAL.name}</span>
        </motion.h1>

        {/* Roles */}
        <motion.div
          variants={item}
          className="flex flex-wrap justify-center gap-3 mb-6"
        >
          {PERSONAL.roles.map((role) => (
            <span
              key={role}
              className="px-4 py-1.5 rounded-full text-sm font-medium glass glow-border text-accent-blue"
            >
              {role}
            </span>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          variants={item}
          className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-4"
        >
          {PERSONAL.description}
        </motion.p>

        {/* Typewriter tagline */}
        <motion.div variants={item} className="h-8 mb-10">
          <TypeWriter />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={item}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          <a
            href="#projects"
            className="group flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-blue text-white font-medium hover:bg-accent-blue/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent-blue/25"
          >
            View Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#architecture"
            className="flex items-center gap-2 px-6 py-3 rounded-lg glass glow-border text-text-primary font-medium hover:bg-bg-card-hover transition-all duration-300"
          >
            Explore Architecture
          </a>
          <a
            href={PERSONAL.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-lg glass text-text-muted font-medium hover:text-text-primary hover:bg-bg-card-hover transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            Resume
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 px-6 py-3 rounded-lg glass text-text-muted font-medium hover:text-text-primary hover:bg-bg-card-hover transition-all duration-300"
          >
            <MessageSquare className="w-4 h-4" />
            Contact
          </a>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          variants={item}
          className="flex justify-center gap-5"
        >
          {[
            {
              icon: GithubIcon,
              href: `https://github.com/${PERSONAL.github}`,
              label: "GitHub",
            },
            { icon: LinkedinIcon, href: PERSONAL.linkedin, label: "LinkedIn" },
            {
              icon: Mail,
              href: `mailto:${PERSONAL.email}`,
              label: "Email",
            },
            { icon: Code2, href: PERSONAL.leetcode, label: "LeetCode" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="p-3 rounded-lg glass text-text-dim hover:text-accent-blue hover:glow-border transition-all duration-300"
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-text-dim uppercase tracking-widest">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-text-dim animate-scroll" />
      </motion.div>
    </section>
  );
}
