"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection, type VisualizationType } from "@/components/hero-section" // Import the type here
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ChatbotSection } from "@/components/chatbot-section"
import { CtfSection } from "@/components/ctf-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { AccessibilityFeatures } from "@/components/accessibility-features"
import { LoadingScreen } from "@/components/loading-states"
import { AdminPanel } from "@/components/admin-panel"
import { RealTimeChat } from "@/components/real-time-chat"
import { AdminChatPanel } from "@/components/admin-chat-panel"

const visualizationTypes: VisualizationType[] = [
  "neural",
  "particles",
  "waves",
  "matrix",
  "constellation",
  "hyperspace",
  "circuit",
  "glitch",
]

export default function HomePage() {
  // State is now managed by the parent component
  const [visualization, setVisualization] = useState<VisualizationType>(
    () => visualizationTypes[Math.floor(Math.random() * visualizationTypes.length)],
  )

  // Function to cycle to the next visualization
  const cycleVisualization = () => {
    setVisualization((current) => {
      const currentIndex = visualizationTypes.indexOf(current)
      const nextIndex = (currentIndex + 1) % visualizationTypes.length
      return visualizationTypes[nextIndex]
    })
  }

  return (
    <>
      <LoadingScreen />
      <main className="relative">
        <Navigation onCycleVisualization={cycleVisualization} />
        <HeroSection visualizationType={visualization} />
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

        {/* Admin Panel for authenticated users */}
        <AdminPanel />

        {/* Real-time Chat System */}
        <RealTimeChat />
        <AdminChatPanel />
      </main>
    </>
  )
}
