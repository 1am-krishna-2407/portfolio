import type { RoleId } from "@/lib/constants";
import { RoleProvider } from "@/lib/role-context";
import TopBar from "@/components/shared/TopBar";
import Footer from "@/components/shared/Footer";
import Section from "@/components/shared/Section";
import AnnotationObserver from "@/components/shared/AnnotationObserver";
import Hero from "@/components/hero/Hero";
import Overview from "@/components/overview/Overview";
import SelectedWork from "@/components/work/SelectedWork";
import Systems from "@/components/systems/Systems";
import Stack from "@/components/stack/Stack";
import Experience from "@/components/experience/Experience";
import Record from "@/components/record/Record";
import GitHubPanel from "@/components/github/GitHubPanel";
import Contact from "@/components/contact/Contact";
import TldrBrief from "@/components/tldr/TldrBrief";
import Terminal from "@/components/terminal/Terminal";
import AssistantPanel from "@/components/assistant/AssistantPanel";

// The whole document. `role` selects an edition (null = general site): it
// reorders sections around that role and makes its resume the default.
export default function Portfolio({ role }: { role: RoleId | null }) {
  return (
    <RoleProvider role={role}>
      <TopBar />
      <main id="main">
        <Hero role={role} />
        <Overview role={role} />
        <SelectedWork role={role} />
        <Section
          id="systems"
          number="03"
          kicker="Systems"
          title="How I engineer"
          intro="Four schematics of how I structure work, from LLM pipelines to backend services. Hover or focus a step to read the reasoning behind it."
        >
          <Systems />
        </Section>
        <Stack role={role} />
        <Experience />
        <Record />
        <Section
          id="github"
          number="07"
          kicker="Open source"
          title="Live from GitHub"
          intro="References: the repositories pinned on my GitHub profile. Change the pins and this list follows within the hour."
        >
          <GitHubPanel />
        </Section>
        <Section id="contact" number="08" kicker="Correspondence" title="Get in touch">
          <Contact />
        </Section>
      </main>
      <Footer />
      <TldrBrief />
      <AssistantPanel />
      <Terminal />
      <AnnotationObserver />
    </RoleProvider>
  );
}
