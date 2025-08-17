"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Zap } from "lucide-react"

interface PerformanceMetrics {
  fcp: number
  lcp: number
  cls: number
  fid: number
}

interface LayoutShiftEntry extends PerformanceEntry {
  value: number
}

interface FirstInputEntry extends PerformanceEntry {
  processingStart: number
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Performance monitoring
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const newMetrics: Partial<PerformanceMetrics> = {}

      entries.forEach((entry) => {
        if (entry.entryType === "paint" && entry.name === "first-contentful-paint") {
          newMetrics.fcp = entry.startTime
        }
        if (entry.entryType === "largest-contentful-paint") {
          newMetrics.lcp = entry.startTime
        }
        if (entry.entryType === "layout-shift") {
          newMetrics.cls = (newMetrics.cls || 0) + (entry as LayoutShiftEntry).value
        }
        if (entry.entryType === "first-input") {
          newMetrics.fid = (entry as FirstInputEntry).processingStart - entry.startTime
        }
      })

      setMetrics((prev) => ({ ...prev, ...newMetrics }) as PerformanceMetrics)
    })

    observer.observe({ entryTypes: ["paint", "largest-contentful-paint", "layout-shift", "first-input"] })

    // Konami code easter egg
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "KeyB",
      "KeyA",
    ]
    let konamiIndex = 0

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++
        if (konamiIndex === konamiCode.length) {
          setIsVisible(true)
          konamiIndex = 0
          // Achievement unlocked!
          const achievement = document.createElement("div")
          achievement.className =
            "fixed top-4 right-4 z-50 p-4 bg-gradient-to-r from-quantum-primary to-quantum-secondary text-quantum-dark rounded-lg quantum-glow animate-bounce"
          achievement.innerHTML = "🎉 Achievement Unlocked: Konami Master!"
          document.body.appendChild(achievement)
          setTimeout(() => achievement.remove(), 3000)
        }
      } else {
        konamiIndex = 0
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      observer.disconnect()
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  if (!isVisible || !metrics) return null

  const getScoreColor = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return "text-quantum-accent"
    if (value <= thresholds[1]) return "text-quantum-warning"
    return "text-quantum-danger"
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 p-4 bg-quantum-card/90 backdrop-blur-md border-quantum-border max-w-xs">
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Zap size={16} className="text-quantum-primary" />
          <span className="text-sm font-semibold text-quantum-light">Performance Metrics</span>
          <button onClick={() => setIsVisible(false)} className="ml-auto text-quantum-muted hover:text-quantum-light">
            ×
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-quantum-muted">FCP:</span>
            <span className={getScoreColor(metrics.fcp, [1800, 3000])}>{Math.round(metrics.fcp)}ms</span>
          </div>
          <div className="flex justify-between">
            <span className="text-quantum-muted">LCP:</span>
            <span className={getScoreColor(metrics.lcp, [2500, 4000])}>{Math.round(metrics.lcp)}ms</span>
          </div>
          <div className="flex justify-between">
            <span className="text-quantum-muted">CLS:</span>
            <span className={getScoreColor(metrics.cls * 1000, [100, 250])}>{metrics.cls.toFixed(3)}</span>
          </div>
          {metrics.fid && (
            <div className="flex justify-between">
              <span className="text-quantum-muted">FID:</span>
              <span className={getScoreColor(metrics.fid, [100, 300])}>{Math.round(metrics.fid)}ms</span>
            </div>
          )}
        </div>

        <Badge variant="secondary" className="w-full justify-center bg-quantum-primary/20 text-quantum-primary text-xs">
          Konami Code Activated!
        </Badge>
      </div>
    </Card>
  )
}
