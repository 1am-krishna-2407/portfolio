"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { PERSONAL } from "@/lib/constants";

// Dynamic imports for code splitting
const BootSequence = dynamic(
  () => import("@/components/boot/BootSequence"),
  { ssr: false }
);
const HeroSection = dynamic(
  () => import("@/components/hero/HeroSection"),
  { ssr: false }
);
const RecruiterSnapshot = dynamic(
  () => import("@/components/snapshot/RecruiterSnapshot"),
  { ssr: false }
);
const AboutTimeline = dynamic(
  () => import("@/components/about/AboutTimeline"),
  { ssr: false }
);
const ProjectsSection = dynamic(
  () => import("@/components/projects/ProjectsSection"),
  { ssr: false }
);
const SystemArchitecture = dynamic(
  () => import("@/components/architecture/SystemArchitecture"),
  { ssr: false }
);
const TechCommandCenter = dynamic(
  () => import("@/components/techstack/TechCommandCenter"),
  { ssr: false }
);
const ExperienceTimeline = dynamic(
  () => import("@/components/experience/ExperienceTimeline"),
  { ssr: false }
);
const AchievementsWall = dynamic(
  () => import("@/components/achievements/AchievementsWall"),
  { ssr: false }
);
const GitHubDashboard = dynamic(
  () => import("@/components/github/GitHubDashboard"),
  { ssr: false }
);
const ContactSection = dynamic(
  () => import("@/components/contact/ContactSection"),
  { ssr: false }
);
const Navbar = dynamic(
  () => import("@/components/shared/Navbar"),
  { ssr: false }
);
const TerminalMode = dynamic(
  () => import("@/components/terminal/TerminalMode"),
  { ssr: false }
);
const RecruiterMode = dynamic(
  () => import("@/components/recruiter/RecruiterMode"),
  { ssr: false }
);
const CursorGlow = dynamic(
  () => import("@/components/shared/CursorGlow"),
  { ssr: false }
);
const EasterEggs = dynamic(
  () => import("@/components/shared/EasterEggs"),
  { ssr: false }
);

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBootComplete(true);
  }, []);

  return (
    <>
      {/* Boot Sequence */}
      {!bootComplete && <BootSequence onComplete={handleBootComplete} />}

      {/* Main Content */}
      {bootComplete && (
        <>
          <Navbar />
          <CursorGlow />
          <EasterEggs />

          <main className="relative">
            <HeroSection />
            <RecruiterSnapshot />
            <AboutTimeline />
            <ProjectsSection />
            <SystemArchitecture />
            <TechCommandCenter />
            <ExperienceTimeline />
            <AchievementsWall />
            <GitHubDashboard />
            <ContactSection />
          </main>

          {/* Footer */}
          <footer className="py-8 text-center border-t border-border-subtle">
            <p className="text-xs text-text-dim font-mono">
              Designed & Built by{" "}
              <span className="text-accent-blue">{PERSONAL.name}</span> ·{" "}
              {new Date().getFullYear()}
            </p>
          </footer>

          {/* Floating Features */}
          <TerminalMode />
          <RecruiterMode />
        </>
      )}
    </>
  );
}
