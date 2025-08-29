"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Circle } from "lucide-react"

interface NavigationProps {
  onCycleVisualization: () => void;
}

export function Navigation({ onCycleVisualization }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isOnline] = useState(true)
  const [visitedSections, setVisitedSections] = useState<string[]>(["home"])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            setActiveSection(sectionId)
            setVisitedSections((prev) => (!prev.includes(sectionId) ? [...prev, sectionId] : prev))
          }
        })
      },
      { root: null, rootMargin: "-80px 0px -50% 0px", threshold: 0 }
    )
    sections.forEach((section) => observer.observe(section))
    return () => sections.forEach((section) => observer.unobserve(section))
  }, [])

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

  const visibleNavItems = navItems.filter((item) => visitedSections.includes(item.id) || item.id === "home")

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
    setActiveSection(sectionId)
  }

  // This part is unchanged from the previous suggestion
  const openWhatsApp = () => {
    const whatsappUrl = `https://wa.me/918790882114?text=${encodeURIComponent(
      "Hello Biju, I saw your portfolio and wanted to connect!"
    )}`
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-quantum-dark/80 backdrop-blur-md border-b border-quantum-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with Online Status */}
          <div className="flex items-center space-x-3">
            {/* THIS IS THE NEW BUTTON */}
            <button
              onClick={onCycleVisualization}
              className="w-8 h-8 bg-gradient-to-br from-quantum-primary to-quantum-secondary rounded-lg quantum-glow transition-transform duration-200 hover:scale-110 active:scale-105"
              aria-label="Change background visualization"
              title="Change Visualization"
            />
            
            <span className="text-xl font-bold quantum-gradient-text">Biju Damian </span>
            {/* ... rest of the navigation is the same ... */}
            <div
              className="flex items-center space-x-2 px-3 py-1 rounded-full bg-quantum-card/50 border border-quantum-border"
              title={isOnline ? "I'm online!" : "Currently offline"}
            >
              <Circle
                size={8}
                className={`${
                  isOnline ? "text-green-400 fill-green-400 animate-pulse" : "text-gray-400 fill-gray-400"
                }`}
              />
              <span className="text-xs text-quantum-muted">{isOnline ? "Online" : "Offline"}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {visibleNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-all duration-200 hover:text-quantum-primary relative ${
                  activeSection === item.id ? "text-quantum-primary" : "text-quantum-muted"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-quantum-primary rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            className="bg-gradient-to-r from-quantum-primary to-quantum-secondary hover:opacity-90 text-quantum-dark font-semibold px-6 py-2 rounded-lg transition-all duration-200 quantum-glow"
            onClick={openWhatsApp}
          >
            Let&apos;s Connect
          </Button>
        </div>
      </div>
    </nav>
  )
}
