"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Circle } from 'lucide-react'

interface NavigationProps {
  onCycleVisualization: () => void;
}

export function Navigation({ onCycleVisualization }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isOnline] = useState(true)
  const [visitedSections, setVisitedSections] = useState<string[]>(["home"])
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const navRef = useRef<HTMLNavElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 50)
      
      // Calculate scroll progress
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      const totalScroll = docHeight - windowHeight
      const progress = totalScroll > 0 ? (scrollY / totalScroll) * 100 : 0
      setScrollProgress(progress)
      
      // Show popup at 25% scroll
      if (progress > 25 && !showPopup) {
        setShowPopup(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [showPopup])

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

  const openWhatsApp = () => {
    const whatsappUrl = `https://wa.me/918790882114?text=${encodeURIComponent(
      "Hello Biju, I saw your portfolio and wanted to connect!"
    )}`
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-glass-light/30 backdrop-blur-xl border-b border-glass-border shadow-glass" 
            : "bg-transparent"
        }`}
        style={{
          background: isScrolled 
            ? "rgba(10, 10, 15, 0.2)" 
            : "transparent",
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          borderBottom: isScrolled ? "1px solid rgba(0, 212, 255, 0.1)" : "none",
        }}
      >
        {/* Scroll progress indicator */}
        <div 
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-quantum-primary via-quantum-secondary to-quantum-accent transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo with Online Status */}
            <div className="flex items-center space-x-3">
              <button
                onClick={onCycleVisualization}
                className="w-8 h-8 bg-gradient-to-br from-quantum-primary to-quantum-secondary rounded-lg quantum-glow transition-all duration-200 hover:scale-110 active:scale-105"
                aria-label="Change background visualization"
                title="Change Visualization"
              />
              
              <span className="text-xl font-bold quantum-gradient-text">Biju Damian</span>
              
              <div
                className="flex items-center space-x-2 px-3 py-1 rounded-full glass-card"
                style={{
                  background: "rgba(0, 212, 255, 0.1)",
                  border: "1px solid rgba(0, 212, 255, 0.2)",
                  backdropFilter: "blur(10px)",
                }}
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
                  className={`text-sm font-medium transition-all duration-200 hover:text-quantum-primary relative group ${
                    activeSection === item.id ? "text-quantum-primary" : "text-quantum-muted"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-quantum-primary rounded-full"></div>
                  )}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-quantum-primary to-transparent group-hover:w-full transition-all duration-300" />
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

      {showPopup && (
        <div
          className="fixed bottom-8 right-8 z-40 animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={{
            animation: "slideUp 0.5s ease-out forwards",
          }}
        >
          <div
            className="p-6 rounded-2xl shadow-2xl border border-opacity-20"
            style={{
              background: "rgba(10, 10, 15, 0.8)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0, 212, 255, 0.2)",
            }}
          >
            <p className="text-quantum-light text-sm font-medium mb-3">
              Interested in collaboration?
            </p>
            <button
              onClick={openWhatsApp}
              className="w-full bg-gradient-to-r from-quantum-primary to-quantum-secondary hover:opacity-90 text-quantum-dark font-semibold py-2 px-4 rounded-lg transition-all duration-200"
            >
              Start a conversation
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="w-full mt-2 text-quantum-muted hover:text-quantum-light text-sm transition-colors duration-200"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        html {
          scroll-behavior: smooth;
          scroll-padding-top: 80px;
        }

        /* Apple-like scroll momentum for mobile */
        body {
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </>
  )
}
