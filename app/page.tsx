"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ChatbotSection } from "@/components/chatbot-section"
import { CtfSection } from "@/components/ctf-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { AccessibilityFeatures } from "@/components/accessibility-features"
import { AccessibilityPanel } from "@/components/accessibility-panel"
import { LoadingScreen } from "@/components/loading-states"

export default function HomePage() {
  return (
    <>
      <LoadingScreen />
      <main className="relative">
        <Navigation />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ChatbotSection />
        <CtfSection />
        <ContactSection />
        <Footer />

        {/* Performance & Accessibility Features */}
        <PerformanceMonitor />
        <AccessibilityFeatures />
        <AccessibilityPanel />
      </main>
    </>
  )
}
