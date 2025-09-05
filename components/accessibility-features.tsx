"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Eye, EyeOff, Type, Contrast, Volume2 } from "lucide-react"

export function AccessibilityFeatures() {
  const [isVisible, setIsVisible] = useState(false)
  const [settings, setSettings] = useState({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
  })

  useEffect(() => {
    // Check for accessibility preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const prefersHighContrast = window.matchMedia("(prefers-contrast: high)").matches

    setSettings((prev) => ({
      ...prev,
      reducedMotion: prefersReducedMotion,
      highContrast: prefersHighContrast,
    }))

    // Keyboard shortcut to toggle accessibility panel (Alt + A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "a") {
        e.preventDefault()
        setIsVisible((prev) => !prev)
      }
      // Skip to main content (Tab)
      if (e.key === "Tab" && !e.shiftKey && document.activeElement === document.body) {
        e.preventDefault()
        const mainContent = document.getElementById("home")
        if (mainContent) {
          mainContent.focus()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    // Apply accessibility settings
    const root = document.documentElement

    if (settings.highContrast) {
      root.style.setProperty("--quantum-dark", "#000000")
      root.style.setProperty("--quantum-light", "#ffffff")
      root.style.setProperty("--quantum-primary", "#00ffff")
    } else {
      root.style.removeProperty("--quantum-dark")
      root.style.removeProperty("--quantum-light")
      root.style.removeProperty("--quantum-primary")
    }

    if (settings.largeText) {
      root.style.fontSize = "18px"
    } else {
      root.style.fontSize = "16px"
    }

    if (settings.reducedMotion) {
      root.style.setProperty("--animation-duration", "0s")
    } else {
      root.style.removeProperty("--animation-duration")
    }
  }, [settings])

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 z-50 w-12 h-12 rounded-full bg-quantum-card border border-quantum-border hover:border-quantum-primary transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/30"
        aria-label="Open accessibility options"
      >
        <Eye size={20} className="text-quantum-primary" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 left-4 z-50 p-6 bg-quantum-card/90 backdrop-blur-md border-quantum-border max-w-sm">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-quantum-light">Accessibility</h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-quantum-muted hover:text-quantum-light"
            aria-label="Close accessibility options"
          >
            <EyeOff size={20} />
          </button>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => toggleSetting("highContrast")}
            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
              settings.highContrast
                ? "bg-quantum-primary/20 border-quantum-primary text-quantum-primary"
                : "bg-quantum-darker border-quantum-border text-quantum-muted hover:border-quantum-primary"
            }`}
          >
            <div className="flex items-center space-x-3">
              <Contrast size={18} />
              <span className="text-sm font-medium">High Contrast</span>
            </div>
            <div
              className={`w-4 h-4 rounded border-2 ${
                settings.highContrast ? "bg-quantum-primary border-quantum-primary" : "border-quantum-border"
              }`}
            />
          </button>

          <button
            onClick={() => toggleSetting("largeText")}
            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
              settings.largeText
                ? "bg-quantum-primary/20 border-quantum-primary text-quantum-primary"
                : "bg-quantum-darker border-quantum-border text-quantum-muted hover:border-quantum-primary"
            }`}
          >
            <div className="flex items-center space-x-3">
              <Type size={18} />
              <span className="text-sm font-medium">Large Text</span>
            </div>
            <div
              className={`w-4 h-4 rounded border-2 ${
                settings.largeText ? "bg-quantum-primary border-quantum-primary" : "border-quantum-border"
              }`}
            />
          </button>

          <button
            onClick={() => toggleSetting("reducedMotion")}
            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
              settings.reducedMotion
                ? "bg-quantum-primary/20 border-quantum-primary text-quantum-primary"
                : "bg-quantum-darker border-quantum-border text-quantum-muted hover:border-quantum-primary"
            }`}
          >
            <div className="flex items-center space-x-3">
              <Volume2 size={18} />
              <span className="text-sm font-medium">Reduce Motion</span>
            </div>
            <div
              className={`w-4 h-4 rounded border-2 ${
                settings.reducedMotion ? "bg-quantum-primary border-quantum-primary" : "border-quantum-border"
              }`}
            />
          </button>
        </div>

        <div className="pt-3 border-t border-quantum-border">
          <p className="text-xs text-quantum-muted">
            Press <kbd className="px-1 py-0.5 bg-quantum-darker rounded text-quantum-light">Alt + A</kbd> to toggle this
            panel
          </p>
        </div>
      </div>
    </Card>
  )
}
