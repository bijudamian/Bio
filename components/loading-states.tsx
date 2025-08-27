"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 bg-quantum-dark flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Quantum Logo Animation */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-quantum-primary via-quantum-secondary to-quantum-accent p-1 animate-quantum-rotate">
            <div className="w-full h-full rounded-full bg-quantum-dark flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-quantum-primary/20 to-quantum-secondary/20 flex items-center justify-center">
                <span className="text-2xl font-bold quantum-gradient-text">Q</span>
              </div>
            </div>
          </div>
          <div className="absolute -inset-8 bg-gradient-to-r from-quantum-primary via-quantum-secondary to-quantum-accent rounded-full opacity-20 blur-xl animate-quantum-pulse"></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold quantum-gradient-text">Initializing Quantum Portfolio</h2>
          <p className="text-quantum-muted">Preparing an extraordinary experience...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto space-y-2">
          <div className="w-full h-2 bg-quantum-border rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-quantum-primary to-quantum-secondary transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-quantum-muted">{Math.round(progress)}%</p>
        </div>
      </div>
    </div>
  )
}

export function LazyImage({ src, alt, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !isError && (
        <div className="absolute inset-0 bg-quantum-card animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-quantum-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {isError && (
        <div className="absolute inset-0 bg-quantum-card flex items-center justify-center">
          <span className="text-quantum-muted text-sm">Failed to load image</span>
        </div>
      )}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt || ""}
        fill
        className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"} object-cover`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...(props as any)}
      />
    </div>
  )
}
