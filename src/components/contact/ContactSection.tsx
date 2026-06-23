"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "motion/react";
import { Send, Mail, Download } from "lucide-react";
import { PERSONAL } from "@/lib/constants";

// Custom SVG brand icons
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

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: PERSONAL.email,
          reply_to: formData.email,
        },
        { publicKey }
      );

      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden">
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
            MISSION CONTROL
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Let&apos;s Build Something{" "}
            <span className="gradient-text">Meaningful</span>
          </h2>
          <p className="text-text-muted max-w-lg mx-auto">
            Whether you have a role, project, or idea in mind — I&apos;d love to
            connect.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-mono text-text-dim uppercase tracking-wider mb-2"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-bg-card border border-border-subtle text-text-primary placeholder:text-text-dim text-sm focus:outline-none focus:border-accent-blue/50 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-mono text-text-dim uppercase tracking-wider mb-2"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-bg-card border border-border-subtle text-text-primary placeholder:text-text-dim text-sm focus:outline-none focus:border-accent-blue/50 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono text-text-dim uppercase tracking-wider mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-bg-card border border-border-subtle text-text-primary placeholder:text-text-dim text-sm focus:outline-none focus:border-accent-blue/50 transition-colors resize-none"
                  placeholder="Tell me about the opportunity..."
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-blue text-white font-medium hover:bg-accent-blue/90 disabled:opacity-50 transition-all duration-300 hover:shadow-lg hover:shadow-accent-blue/25"
              >
                {status === "sending" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : status === "sent" ? (
                  <>Message Sent!</>
                ) : status === "error" ? (
                  <>✕ Error — try again</>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2 space-y-6"
          >
            {/* Links */}
            <div className="space-y-3">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: PERSONAL.email,
                  href: `mailto:${PERSONAL.email}`,
                },
                {
                  icon: GithubIcon,
                  label: "GitHub",
                  value: PERSONAL.github,
                  href: `https://github.com/${PERSONAL.github}`,
                },
                {
                  icon: LinkedinIcon,
                  label: "LinkedIn",
                  value: "Krishna Kumar Jha",
                  href: PERSONAL.linkedin,
                },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-bg-card border border-border-subtle text-text-muted hover:text-accent-blue hover:border-accent-blue/30 transition-all duration-300"
                >
                  <link.icon className="w-4 h-4 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[10px] text-text-dim uppercase tracking-wider">
                      {link.label}
                    </div>
                    <div className="text-sm truncate">{link.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Resume */}
            <a
              href={PERSONAL.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-accent-blue/10 border border-accent-blue/30 text-accent-blue hover:bg-accent-blue/20 transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Download Resume</span>
            </a>

            {/* Availability */}
            <div className="p-4 rounded-xl bg-bg-card border border-border-subtle">
              <div className="text-[10px] font-mono text-text-dim uppercase tracking-wider mb-3">
                Availability Status
              </div>
              <div className="space-y-2">
                {[
                  "Software Engineering Roles",
                  "Machine Learning Roles",
                  "Backend Engineering Roles",
                ].map((role) => (
                  <div
                    key={role}
                    className="flex items-center gap-2 text-xs text-text-muted"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                    Open to {role}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
