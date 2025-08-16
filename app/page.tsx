"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { InteractiveSection } from "@/components/interactive-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { AccessibilityFeatures } from "@/components/accessibility-features"
import { LoadingScreen } from "@/components/loading-states"
import { ChatbotPanel } from "@/components/chatbot-panel"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"

export default function HomePage() {
  const [isChatbotPanelOpen, setIsChatbotPanelOpen] = useState(false)

  return (
    <>
      <LoadingScreen />
      <PanelGroup direction="horizontal">
        <Panel defaultSize={100}>
          <main className="relative">
            <Navigation />
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <InteractiveSection onOpenChatbot={() => setIsChatbotPanelOpen(true)} />
            <ContactSection />
            <Footer />

            {/* Performance & Accessibility Features */}
            <PerformanceMonitor />
            <AccessibilityFeatures />
          </main>
        </Panel>
        {isChatbotPanelOpen && (
          <>
            <PanelResizeHandle className="w-2 bg-quantum-border hover:bg-quantum-primary transition-colors" />
            <Panel defaultSize={30} minSize={20}>
              <ChatbotPanel isOpen={isChatbotPanelOpen} onClose={() => setIsChatbotPanelOpen(false)} />
            </Panel>
          </>
        )}
      </PanelGroup>
    </>
  )
}
