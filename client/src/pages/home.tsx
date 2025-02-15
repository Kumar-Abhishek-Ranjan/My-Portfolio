import { NavMenu } from "@/components/nav-menu";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { ContactSection } from "@/components/contact-section";
import { SciFiBackground } from "@/components/sci-fi-background";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SciFiBackground />
      <NavMenu />
      <main className="container mx-auto px-6">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </div>
  );
}