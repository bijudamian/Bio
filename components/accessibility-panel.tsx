"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Type, Palette, Volume2, VolumeX, Sun, Moon, Minus, Plus, RotateCcw, Accessibility } from "lucide-react"

interface AccessibilitySettings {
  highContrast: boolean
  fontSize: number
  reducedMotion: boolean
  soundEnabled: boolean
  darkMode: boolean
}

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    fontSize: 16,
    reducedMotion: false,
    soundEnabled: true,
    darkMode: true,
  })

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("accessibility-settings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement

    // High contrast mode
    if (settings.highContrast) {
      root.classList.add("high-contrast")
    } else {
      root.classList.remove("high-contrast")
    }

    // Font size
    root.style.setProperty("--base-font-size", `${settings.fontSize}px`)

    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add("reduce-motion")
    } else {
      root.classList.remove("reduce-motion")
    }

    // Dark mode
    if (settings.darkMode) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    // Save to localStorage
    localStorage.setItem("accessibility-settings", JSON.stringify(settings))
  }, [settings])

  const updateSetting = <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const resetSettings = () => {
    setSettings({
      highContrast: false,
      fontSize: 16,
      reducedMotion: false,
      soundEnabled: true,
      darkMode: true,
    })
  }

  const increaseFontSize = () => {
    if (settings.fontSize < 24) {
      updateSetting("fontSize", settings.fontSize + 2)
    }
  }

  const decreaseFontSize = () => {
    if (settings.fontSize > 12) {
      updateSetting("fontSize", settings.fontSize - 2)
    }
  }

  return (
    <>
      {/* Floating Accessibility Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-quantum-primary hover:bg-quantum-primary/90 text-quantum-dark shadow-lg quantum-glow"
          aria-label="Open accessibility panel"
        >
          <Accessibility size={24} />
        </Button>
      </div>

      {/* Accessibility Panel */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 max-w-[calc(100vw-3rem)] p-6 bg-quantum-card border-quantum-border shadow-2xl z-40 quantum-glow">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Accessibility className="text-quantum-primary" size={20} />
                <h3 className="font-semibold text-quantum-light">Accessibility</h3>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-quantum-muted hover:text-quantum-light"
              >
                ×
              </Button>
            </div>

            {/* Visual Settings */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-quantum-muted uppercase tracking-wide">Visual</h4>

              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Palette size={16} className="text-quantum-muted" />
                  <span className="text-quantum-light">High Contrast</span>
                </div>
                <Button
                  onClick={() => updateSetting("highContrast", !settings.highContrast)}
                  variant={settings.highContrast ? "default" : "outline"}
                  size="sm"
                  className={settings.highContrast ? "bg-quantum-primary text-quantum-dark" : ""}
                >
                  {settings.highContrast ? "On" : "Off"}
                </Button>
              </div>

              {/* Font Size */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Type size={16} className="text-quantum-muted" />
                  <span className="text-quantum-light">Font Size</span>
                  <Badge variant="secondary" className="ml-auto">
                    {settings.fontSize}px
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={decreaseFontSize}
                    variant="outline"
                    size="sm"
                    disabled={settings.fontSize <= 12}
                    className="flex-1 bg-transparent"
                  >
                    <Minus size={14} />
                  </Button>
                  <Button
                    onClick={increaseFontSize}
                    variant="outline"
                    size="sm"
                    disabled={settings.fontSize >= 24}
                    className="flex-1"
                  >
                    <Plus size={14} />
                  </Button>
                </div>
              </div>

              {/* Dark Mode */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {settings.darkMode ? (
                    <Moon size={16} className="text-quantum-muted" />
                  ) : (
                    <Sun size={16} className="text-quantum-muted" />
                  )}
                  <span className="text-quantum-light">Dark Mode</span>
                </div>
                <Button
                  onClick={() => updateSetting("darkMode", !settings.darkMode)}
                  variant={settings.darkMode ? "default" : "outline"}
                  size="sm"
                  className={settings.darkMode ? "bg-quantum-primary text-quantum-dark" : ""}
                >
                  {settings.darkMode ? "On" : "Off"}
                </Button>
              </div>
            </div>

            {/* Motion & Sound Settings */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-quantum-muted uppercase tracking-wide">Motion & Sound</h4>

              {/* Reduced Motion */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Eye size={16} className="text-quantum-muted" />
                  <span className="text-quantum-light">Reduce Motion</span>
                </div>
                <Button
                  onClick={() => updateSetting("reducedMotion", !settings.reducedMotion)}
                  variant={settings.reducedMotion ? "default" : "outline"}
                  size="sm"
                  className={settings.reducedMotion ? "bg-quantum-primary text-quantum-dark" : ""}
                >
                  {settings.reducedMotion ? "On" : "Off"}
                </Button>
              </div>

              {/* Sound */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {settings.soundEnabled ? (
                    <Volume2 size={16} className="text-quantum-muted" />
                  ) : (
                    <VolumeX size={16} className="text-quantum-muted" />
                  )}
                  <span className="text-quantum-light">Sound Effects</span>
                </div>
                <Button
                  onClick={() => updateSetting("soundEnabled", !settings.soundEnabled)}
                  variant={settings.soundEnabled ? "default" : "outline"}
                  size="sm"
                  className={settings.soundEnabled ? "bg-quantum-primary text-quantum-dark" : ""}
                >
                  {settings.soundEnabled ? "On" : "Off"}
                </Button>
              </div>
            </div>

            {/* Reset Button */}
            <Button
              onClick={resetSettings}
              variant="outline"
              className="w-full border-quantum-border hover:border-quantum-primary text-quantum-muted hover:text-quantum-primary bg-transparent"
            >
              <RotateCcw size={16} className="mr-2" />
              Reset to Defaults
            </Button>
          </div>
        </Card>
      )}
    </>
  )
}
