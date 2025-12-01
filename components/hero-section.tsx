"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown, Github, Linkedin, Mail, Download, Twitter } from "lucide-react"
import { Spotlight } from "@/components/ui/spotlight"

export type VisualizationType =
  | "neural"
  | "particles"
  | "waves"
  | "matrix"
  | "constellation"
  | "hyperspace"
  | "circuit"
  | "glitch"

interface HeroSectionProps {
  visualizationType?: VisualizationType
}

export function HeroSection({ visualizationType = "neural" }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)

  const words = ["Full-Stack Developer", "Problem Solver", "Tech Explorer", "Always Learning"]
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Typewriter effect
  useEffect(() => {
    const currentWord = words[currentWordIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentWord.length) {
            setDisplayText(currentWord.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentWordIndex((prev) => (prev + 1) % words.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )
    return () => clearTimeout(timeout)
  }, [displayText, currentWordIndex, isDeleting, words])

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string }[] =
      []
    const colors = ["#00d4ff", "#7c3aed", "#10b981"]

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${Math.floor(p.opacity * 255)
          .toString(16)
          .padStart(2, "0")}`
        ctx.fill()

        // Draw connections
        particles.slice(i + 1).forEach((other) => {
          const d = Math.sqrt((p.x - other.x) ** 2 + (p.y - other.y) ** 2)
          if (d < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `${p.color}${Math.floor((1 - d / 120) * 0.2 * 255)
              .toString(16)
              .padStart(2, "0")}`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
    }
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const socialLinks = [
    { icon: Github, href: "https://github.com/bijudamian", label: "GitHub" },
    { icon: Linkedin, href: "https://in.linkedin.com/in/biju-damian-24904a271", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/bijudamian", label: "Twitter" },
    { icon: Mail, href: "mailto:bijucoder@gmail.com", label: "Email" },
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Spotlight Effect */}
      <Spotlight className="z-10" fill="rgba(0, 212, 255, 0.15)" />

      {/* Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Aurora Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[128px]" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-8"
            >
              <div className="relative group">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-emerald-400 p-[3px]">
                  <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center">
                    <span className="text-3xl font-bold font-mono bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                      BD
                    </span>
                  </div>
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 rounded-full opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
              </div>
            </motion.div>

            {/* Name and Title */}
            <div className="space-y-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <span className="text-sm md:text-base font-mono text-cyan-400 tracking-wider uppercase">
                  Welcome to my portfolio
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
              >
                <span className="text-white">Hi, I'm </span>
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent">
                  Biju Damian
                </span>
              </motion.h1>

              {/* Typewriter Effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="h-12 flex items-center justify-center"
              >
                <h2 className="text-xl md:text-2xl lg:text-3xl font-mono text-gray-400">
                  <span className="text-purple-400">&lt;</span>
                  <span className="text-cyan-400">{displayText}</span>
                  <span className="animate-pulse text-cyan-400">|</span>
                  <span className="text-purple-400">/&gt;</span>
                </h2>
              </motion.div>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              Building the future one line at a time. At the intersection of{" "}
              <span className="text-cyan-400">creativity</span> and <span className="text-purple-400">logic</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
            >
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold px-8 py-6 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/25"
                onClick={() => scrollToSection("projects")}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </span>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="group border-2 border-gray-700 hover:border-cyan-500 text-gray-300 hover:text-cyan-400 bg-transparent hover:bg-cyan-500/10 px-8 py-6 rounded-xl transition-all duration-300"
                asChild
              >
                <a href="/resume.pdf" download>
                  <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                  Download Resume
                </a>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center gap-4 pt-8"
            >
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 rounded-full bg-gray-900/50 border border-gray-800 flex items-center justify-center text-gray-500 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <button
            onClick={() => scrollToSection("about")}
            className="flex flex-col items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors"
          >
            <span className="text-xs font-mono uppercase tracking-wider">Scroll</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
