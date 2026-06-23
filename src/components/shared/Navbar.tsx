"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, PERSONAL } from "@/lib/constants";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Active section detection
      const sections = NAV_ITEMS.map((item) =>
        document.querySelector(item.href)
      );
      const scrollY = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i] as HTMLElement | null;
        if (section && section.offsetTop <= scrollY) {
          setActiveSection(NAV_ITEMS[i].href.slice(1));
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass-heavy shadow-lg shadow-black/20" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#hero"
              className="flex items-center gap-2 text-lg font-bold font-mono gradient-text"
            >
              <span className="relative h-9 w-9 overflow-hidden rounded-full border border-border-subtle bg-bg-card">
                <Image
                  src="/instant.jpeg"
                  alt="Krishna Kumar Jha"
                  width={400}
                  height={400}
                  priority
                  className="h-full w-full object-cover"
                />
              </span>
              <span>{PERSONAL.initials}</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                    activeSection === item.href.slice(1)
                      ? "text-accent-blue bg-accent-blue/10"
                      : "text-text-muted hover:text-text-primary hover:bg-bg-card-hover"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-card-hover transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 glass-heavy border-b border-border-subtle md:hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm transition-colors ${
                    activeSection === item.href.slice(1)
                      ? "text-accent-blue bg-accent-blue/10"
                      : "text-text-muted hover:text-text-primary hover:bg-bg-card-hover"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
