"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

type VisualizationType = "neural" | "particles" | "waves"

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [typewriterText, setTypewriterText] = useState("")
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [visualizationType] = useState<VisualizationType>(() => {
    const types: VisualizationType[] = ["neural", "particles", "waves"]
    return types[Math.floor(Math.random() * types.length)]
  })

  const texts = ["Full-Stack Developer", "UI/UX Designer", "Problem Solver", "Innovation Driver"]

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

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth < 768
    const mobileReduction = isMobile ? 0.25 : 1 // 75% reduction for mobile

    // Initialize particles based on visualization type with mobile optimization
    const baseParticleCount = visualizationType === "neural" ? 150 : visualizationType === "particles" ? 100 : 80
    const particleCount = Math.floor(baseParticleCount * mobileReduction)
    const newParticles: Particle[] = []
    const colors = ["#00d4ff", "#7c3aed", "#10b981"]

    if (isMobile && window.innerWidth < 480) {
      return () => {
        window.removeEventListener("resize", resizeCanvas)
      }
    }

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (visualizationType === "waves" ? 0.2 : 0.5) * (isMobile ? 0.5 : 1),
        vy: (Math.random() - 0.5) * (visualizationType === "waves" ? 0.2 : 0.5) * (isMobile ? 0.5 : 1),
        size: Math.random() * (visualizationType === "neural" ? 1.5 : 2) + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    setParticles(newParticles)

    let animationId: number
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += isMobile ? 0.005 : 0.01 // Slower animation on mobile

      if (visualizationType === "neural") {
        // Neural network style with connections
        newParticles.forEach((particle, index) => {
          particle.x += particle.vx
          particle.y += particle.vy

          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

          // Draw particle
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255)
            .toString(16)
            .padStart(2, "0")}`
          ctx.fill()

          const connectionDistance = isMobile ? 80 : 120
          if (!isMobile) {
            newParticles.slice(index + 1).forEach((otherParticle) => {
              const dx = particle.x - otherParticle.x
              const dy = particle.y - otherParticle.y
              const distance = Math.sqrt(dx * dx + dy * dy)

              if (distance < connectionDistance) {
                ctx.beginPath()
                ctx.moveTo(particle.x, particle.y)
                ctx.lineTo(otherParticle.x, otherParticle.y)
                ctx.strokeStyle = `${particle.color}${Math.floor((1 - distance / connectionDistance) * 0.3 * 255)
                  .toString(16)
                  .padStart(2, "0")}`
                ctx.lineWidth = 0.5
                ctx.stroke()
              }
            })
          }
        })
      } else if (visualizationType === "particles") {
        // Floating particles with glow (simplified on mobile)
        newParticles.forEach((particle) => {
          particle.x += particle.vx
          particle.y += particle.vy
          particle.opacity = 0.3 + Math.sin(time + particle.x * 0.01) * 0.2

          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

          if (isMobile) {
            // Simple particles on mobile
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
            ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255)
              .toString(16)
              .padStart(2, "0")}`
            ctx.fill()
          } else {
            // Draw glowing particle on desktop
            const gradient = ctx.createRadialGradient(
              particle.x,
              particle.y,
              0,
              particle.x,
              particle.y,
              particle.size * 3,
            )
            gradient.addColorStop(
              0,
              `${particle.color}${Math.floor(particle.opacity * 255)
                .toString(16)
                .padStart(2, "0")}`,
            )
            gradient.addColorStop(1, `${particle.color}00`)

            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
            ctx.fill()
          }
        })
      } else if (visualizationType === "waves") {
        // Wave pattern visualization (simplified on mobile)
        ctx.strokeStyle = "#00d4ff40"
        ctx.lineWidth = isMobile ? 1 : 2

        const waveCount = isMobile ? 3 : 5
        for (let i = 0; i < waveCount; i++) {
          ctx.beginPath()
          const step = isMobile ? 10 : 5
          for (let x = 0; x < canvas.width; x += step) {
            const y = canvas.height / 2 + Math.sin((x + time * 100 + i * 50) * 0.01) * (50 + i * 20)
            if (x === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.stroke()
        }

        // Floating particles on waves
        newParticles.forEach((particle) => {
          particle.x += particle.vx
          particle.y = canvas.height / 2 + Math.sin((particle.x + time * 100) * 0.01) * 100 + (Math.random() - 0.5) * 50

          if (particle.x > canvas.width) particle.x = -10

          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255)
            .toString(16)
            .padStart(2, "0")}`
          ctx.fill()
        })
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [visualizationType])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Canvas with ChatGPT-inspired effects */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ background: "transparent" }} />

      {/* v0-style Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-quantum-primary/5 via-transparent to-quantum-secondary/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-quantum-accent/10 via-transparent to-transparent"></div>
      </div>

      {/* Quantum Grid Background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="space-y-8">
          {/* Quantum Avatar */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-quantum-primary via-quantum-secondary to-quantum-accent p-1 animate-quantum-rotate">
                <div className="w-full h-full rounded-full bg-quantum-dark flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-quantum-primary/20 to-quantum-secondary/20 flex items-center justify-center">
                    <span className="text-2xl font-bold quantum-gradient-text">BD</span>
                  </div>
                </div>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-quantum-primary via-quantum-secondary to-quantum-accent rounded-full opacity-20 blur-xl animate-quantum-pulse"></div>
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="block text-quantum-light">Hello, I'm</span>
              <span className="block quantum-gradient-text animate-quantum-float">Biju Damian</span>
            </h1>

            {/* Typewriter Effect */}
            <div className="h-16 flex items-center justify-center">
              <h2 className="text-2xl md:text-3xl font-medium text-quantum-muted">
                <span className="quantum-gradient-text">{typewriterText}</span>
                <span className="animate-quantum-pulse text-quantum-primary">|</span>
              </h2>
            </div>
          </div>

          {/* Description with visualization type indicator */}
          <p className="text-lg md:text-xl text-quantum-muted max-w-3xl mx-auto leading-relaxed">
            Crafting exceptional digital experiences with cutting-edge technology. Specializing in full-stack
            development, quantum-inspired design, and innovative solutions that push the boundaries of what's possible.
            <span className="block text-sm mt-2 opacity-60">
              Current visualization:{" "}
              {visualizationType === "neural"
                ? "Neural Network"
                : visualizationType === "particles"
                  ? "Particle Field"
                  : "Wave Patterns"}
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-quantum-primary to-quantum-secondary hover:opacity-90 text-quantum-dark font-semibold px-8 py-4 rounded-lg transition-all duration-200 quantum-glow"
              onClick={() => scrollToSection("projects")}
            >
              View My Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-quantum-primary text-quantum-primary hover:bg-quantum-primary hover:text-quantum-dark px-8 py-4 rounded-lg transition-all duration-200 bg-transparent"
              onClick={() => scrollToSection("contact")}
            >
              Get In Touch
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 pt-8">
            {[
              { icon: Github, href: "https://github.com/bijudamian", label: "GitHub" },
              { icon: Linkedin, href: "https://in.linkedin.com/in/biju-damian-24904a271", label: "LinkedIn" },
              { icon: Mail, href: "mailto:bijucoder@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="w-12 h-12 rounded-full bg-quantum-card border border-quantum-border flex items-center justify-center text-quantum-muted hover:text-quantum-primary hover:border-quantum-primary transition-all duration-200 hover:quantum-glow"
                aria-label={label}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => scrollToSection("about")}
            className="flex flex-col items-center space-y-2 text-quantum-muted hover:text-quantum-primary transition-colors duration-200 animate-quantum-float"
          >
            <span className="text-sm font-medium">Scroll Down</span>
            <ChevronDown size={24} className="animate-bounce" />
          </button>
        </div>
      </div>

      {/* Quantum Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-quantum-primary/10 rounded-full blur-3xl animate-quantum-pulse"></div>
      <div
        className="absolute bottom-20 right-20 w-96 h-96 bg-quantum-secondary/10 rounded-full blur-3xl animate-quantum-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div className="absolute top-1/2 left-10 w-32 h-32 bg-quantum-accent/10 rounded-full blur-2xl animate-quantum-float"></div>
    </section>
  )
}
