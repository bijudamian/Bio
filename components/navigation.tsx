"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Circle, Menu, X } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isOnline] = useState(true)
  const [visitedSections, setVisitedSections] = useState<string[]>(["home"])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isMobile = useIsMobile()

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

            // Track visited sections for dynamic navigation
            setVisitedSections((prev) => {
              if (!prev.includes(sectionId)) {
                return [...prev, sectionId]
              }
              return prev
            })
          }
        })
      },
      {
        root: null,
        rootMargin: "-80px 0px -50% 0px",
        threshold: 0,
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
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
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
      setIsMobileMenuOpen(false)
    }
  }

  const handlePing = () => {
    if (isOnline) {
      // Open quick chat modal or scroll to contact
      const contactSection = document.getElementById("contact")
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" })
        // Trigger ping animation or notification
        const event = new CustomEvent("pingUser", { detail: { message: "User wants to connect!" } })
        window.dispatchEvent(event)
      }
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-quantum-dark/95 backdrop-blur-md border-b border-quantum-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo with Online Status - Mobile Optimized */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-quantum-primary to-quantum-secondary rounded-lg quantum-glow"></div>
              <span className="text-lg sm:text-xl font-bold quantum-gradient-text">
                {isMobile ? "BD" : "Biju Damian"}
              </span>
              <button
                onClick={handlePing}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 rounded-full bg-quantum-card/50 border border-quantum-border hover:border-quantum-primary transition-all duration-200 group min-h-[44px] min-w-[44px] sm:min-h-auto sm:min-w-auto"
                title={isOnline ? "I'm online - Click to ping me!" : "Currently offline"}
              >
                <Circle
                  size={8}
                  className={`${isOnline ? "text-green-400 fill-green-400" : "text-gray-400 fill-gray-400"} ${isOnline ? "animate-pulse" : ""}`}
                />
                {!isMobile && (
                  <span className="text-xs text-quantum-muted group-hover:text-quantum-primary transition-colors">
                    {isOnline ? "Online" : "Offline"}
                  </span>
                )}
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {visibleNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-all duration-200 hover:text-quantum-primary relative min-h-[44px] px-2 flex items-center ${
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

            {/* Mobile Menu Button & CTA */}
            <div className="flex items-center space-x-2">
              {/* CTA Button - Mobile Optimized */}
              <Button
                className="bg-gradient-to-r from-quantum-primary to-quantum-secondary hover:opacity-90 text-quantum-dark font-semibold px-3 sm:px-6 py-2 rounded-lg transition-all duration-200 quantum-glow text-sm min-h-[44px]"
                onClick={() => scrollToSection("contact")}
              >
                {isMobile ? "Connect" : "Let's Connect"}
              </Button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-quantum-card/50 border border-quantum-border hover:border-quantum-primary transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-[72px] left-0 right-0 bg-quantum-dark/95 backdrop-blur-md border-b border-quantum-border">
            <div className="px-4 py-6 space-y-4">
              {visibleNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 min-h-[44px] flex items-center ${
                    activeSection === item.id
                      ? "text-quantum-primary bg-quantum-primary/10 border border-quantum-primary/20"
                      : "text-quantum-muted hover:text-quantum-primary hover:bg-quantum-card/50"
                  }`}
                >
                  <span className="text-lg font-medium">{item.label}</span>
                  {activeSection === item.id && <div className="ml-auto w-2 h-2 bg-quantum-primary rounded-full"></div>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
