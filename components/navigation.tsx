"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Home, User, Code2, FolderKanban, Mail, Menu, X, Bot, Shield } from "lucide-react"

interface NavigationProps {
  onCycleVisualization?: () => void
}

export function Navigation({ onCycleVisualization }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
            setActiveSection(entry.target.id)
          }
        })
      },
      { root: null, rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    )
    sections.forEach((section) => observer.observe(section))
    return () => sections.forEach((section) => observer.unobserve(section))
  }, [])

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "chatbot", label: "AI", icon: Bot },
    { id: "ctf", label: "CTF", icon: Shield },
    { id: "contact", label: "Contact", icon: Mail },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
    setActiveSection(sectionId)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Floating Dock */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block transition-all duration-500 ${
          isScrolled ? "top-4" : "top-6"
        }`}
      >
        <div className="relative">
          {/* Glassmorphism Background */}
          <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-xl rounded-2xl border border-gray-800/50 shadow-2xl shadow-black/20" />

          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-emerald-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />

          {/* Navigation Items */}
          <div className="relative flex items-center gap-1 px-2 py-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative group flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                    isActive ? "text-cyan-400" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {/* Active Background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl border border-cyan-500/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  <Icon className="relative z-10 w-4 h-4" />
                  <span className="relative z-10 text-sm font-medium hidden lg:block">{item.label}</span>

                  {/* Tooltip for smaller screens */}
                  <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs text-gray-300 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap lg:hidden">
                    {item.label}
                  </span>
                </button>
              )
            })}

            {/* Divider */}
            <div className="w-px h-8 bg-gray-700/50 mx-2" />

            {/* CTA Button */}
            <Button
              size="sm"
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-medium px-4 py-2 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20"
              onClick={() => scrollToSection("contact")}
            >
              Hire Me
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 md:hidden"
      >
        <div
          className={`transition-all duration-300 ${
            isScrolled ? "bg-gray-900/90 backdrop-blur-xl border-b border-gray-800/50" : "bg-transparent"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-4">
            {/* Logo */}
            <button onClick={onCycleVisualization} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-white">BD</span>
              </div>
              <span className="text-lg font-bold text-white">Biju</span>
            </button>

            {/* Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30"
                          : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  )
                })}

                <Button
                  className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold py-3 rounded-xl"
                  onClick={() => scrollToSection("contact")}
                >
                  Hire Me
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
