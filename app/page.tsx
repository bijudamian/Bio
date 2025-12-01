"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection, type VisualizationType } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ChatbotSection } from "@/components/chatbot-section"
import { CtfSection } from "@/components/ctf-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

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
  const [visualization, setVisualization] = useState<VisualizationType>(
    () => visualizationTypes[Math.floor(Math.random() * visualizationTypes.length)],
  )

  const cycleVisualization = () => {
    setVisualization((current) => {
      const currentIndex = visualizationTypes.indexOf(current)
      const nextIndex = (currentIndex + 1) % visualizationTypes.length
      return visualizationTypes[nextIndex]
    })
  }

  return (
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
    </main>
  )
}
