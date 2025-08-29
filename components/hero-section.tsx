"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react"

// A more flexible particle type for different visualizations
interface Particle {
  [key: string]: any // Allows for properties like x, y, z, vx, vy, speed, ttl, etc.
}

// Export the type so the parent component (page.tsx) can use it
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
  visualizationType: VisualizationType
}

export function HeroSection({ visualizationType }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [typewriterText, setTypewriterText] = useState("")
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const mouse = useRef({ x: 0, y: 0 })

  const texts = ["Full-Stack Developer", "UI/UX Enthusiast", "Problem Solver", "Tech Explorer", "Always Learning"]

  // This is the main animation effect. It re-initializes whenever `visualizationType` prop changes.
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

    const handleMouseMove = (event: MouseEvent) => {
      mouse.current = { x: event.clientX, y: event.clientY }
    }
    // Only add mouse listener for interactive visualizations
    if (visualizationType === "constellation") {
      window.addEventListener("mousemove", handleMouseMove)
    }

    const colors = ["#00d4ff", "#7c3aed", "#10b981"]
    let animationId: number
    let time = 0
    let particles: Particle[] = []
    let drops: number[] = []

    // --- Visualization Specific Setup ---
    if (visualizationType === "matrix") {
      const fontSize = 16
      const columns = Math.floor(canvas.width / fontSize)
      drops = Array(columns).fill(1)
      ctx.font = `${fontSize}px JetBrains Mono, monospace`
    } else if (visualizationType === "hyperspace") {
      for (let i = 0; i < 400; i++) {
        particles.push({
          x: (Math.random() - 0.5) * canvas.width,
          y: (Math.random() - 0.5) * canvas.height,
          z: canvas.width,
          speed: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    } else if (visualizationType === "circuit") {
      for (let i = 0; i < 70; i++) {
        particles.push({
          x: Math.random() * canvas.width, y: Math.random() * canvas.height,
          vx: Math.random() < 0.5 ? 1 : -1, vy: Math.random() < 0.5 ? 1 : -1,
          size: Math.random() * 1.5 + 0.5, speed: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          direction: Math.random() < 0.5 ? "x" : "y",
          ttl: Math.random() * 100 + 50, // time-to-live before turning
        })
      }
    } else {
      const particleCount =
        visualizationType === "neural" ? 120
        : visualizationType === "constellation" ? 150
        : visualizationType === "glitch" ? 80
        : 80 // Default for particles/waves
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width, y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * (visualizationType === "waves" ? 0.2 : 0.5),
          vy: (Math.random() - 0.5) * (visualizationType === "waves" ? 0.2 : 0.5),
          size: Math.random() * (visualizationType === "neural" || visualizationType === "glitch" ? 1.5 : 2.5) + 1,
          opacity: Math.random() * 0.5 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Use a persistent trail effect for some visuals
      if (["matrix", "hyperspace", "circuit"].includes(visualizationType)) {
        ctx.fillStyle = "rgba(10, 10, 15, 0.1)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }

      time += 0.01

      // --- RENDER VISUALIZATIONS ---

      if (visualizationType === "neural") {
        particles.forEach((p, i) => {
          p.x += p.vx; p.y += p.vy
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = `${p.color}${Math.floor(p.opacity * 255).toString(16).padStart(2, "0")}`
          ctx.fill()
          particles.slice(i + 1).forEach((other) => {
            const d = Math.sqrt((p.x - other.x) ** 2 + (p.y - other.y) ** 2)
            if (d < 120) {
              ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(other.x, other.y)
              ctx.strokeStyle = `${p.color}${Math.floor((1 - d / 120) * 0.3 * 255).toString(16).padStart(2, "0")}`
              ctx.lineWidth = 0.5; ctx.stroke()
            }
          })
        })
      } else if (visualizationType === "particles") {
        particles.forEach((p) => {
          p.x += p.vx; p.y += p.vy; p.opacity = 0.3 + Math.sin(time + p.x * 0.01) * 0.2
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
          g.addColorStop(0, `${p.color}${Math.floor(p.opacity * 255).toString(16).padStart(2, "0")}`)
          g.addColorStop(1, `${p.color}00`)
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2); ctx.fill()
        })
      } else if (visualizationType === "waves") {
        ctx.strokeStyle = "#00d4ff40"; ctx.lineWidth = 2
        for (let i = 0; i < 5; i++) {
          ctx.beginPath()
          for (let x = 0; x < canvas.width; x += 5) {
            const y = canvas.height / 2 + Math.sin((x + time * 100 + i * 50) * 0.01) * (50 + i * 20)
            if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
          }
          ctx.stroke()
        }
        particles.forEach((p) => {
          p.x += p.vx
          p.y = canvas.height / 2 + Math.sin((p.x + time * 100) * 0.01) * 100 + (Math.random() - 0.5) * 50
          if (p.x > canvas.width) p.x = -10
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = `${p.color}${Math.floor(p.opacity * 255).toString(16).padStart(2, "0")}`
          ctx.fill()
        })
      } else if (visualizationType === "matrix") {
        ctx.fillStyle = "#10b981" // Accent green
        const fontSize = 16
        const characters = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン01"
        for (let i = 0; i < drops.length; i++) {
          const text = characters.charAt(Math.floor(Math.random() * characters.length))
          ctx.fillText(text, i * fontSize, drops[i] * fontSize)
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
          }
          drops[i]++
        }
      } else if (visualizationType === "constellation") {
        particles.forEach((p, i) => {
          const dxMouse = p.x - mouse.current.x; const dyMouse = p.y - mouse.current.y
          const distMouse = Math.sqrt(dxMouse ** 2 + dyMouse ** 2)
          if (distMouse < 100) { p.vx += dxMouse / distMouse * 0.1; p.vy += dyMouse / distMouse * 0.1 }
          p.vx *= 0.98; p.vy *= 0.98
          p.x += p.vx; p.y += p.vy
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fillStyle = p.color; ctx.fill()
          particles.slice(i + 1).forEach((other) => {
            const d = Math.sqrt((p.x - other.x) ** 2 + (p.y - other.y) ** 2)
            if (d < 150) {
              ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(other.x, other.y)
              ctx.strokeStyle = `rgba(0, 212, 255, ${1 - d / 150})`; ctx.lineWidth = 0.3; ctx.stroke()
            }
          })
          if (distMouse < 250) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.current.x, mouse.current.y)
            ctx.strokeStyle = `rgba(124, 58, 237, ${1 - distMouse / 250})`; ctx.lineWidth = 0.4; ctx.stroke()
          }
        })
      } else if (visualizationType === "hyperspace") {
        const centerX = canvas.width / 2; const centerY = canvas.height / 2
        particles.forEach(p => {
          p.z -= p.speed
          if (p.z <= 0) {
            p.x = (Math.random() - 0.5) * canvas.width
            p.y = (Math.random() - 0.5) * canvas.height
            p.z = canvas.width
          }
          const k = 128.0 / p.z; const px = p.x * k + centerX; const py = p.y * k + centerY
          if (px > 0 && px < canvas.width && py > 0 && py < canvas.height) {
            const size = (1 - p.z / canvas.width) * 4
            ctx.beginPath(); ctx.arc(px, py, size, 0, Math.PI * 2); ctx.fillStyle = p.color; ctx.fill()
          }
        })
      } else if (visualizationType === "circuit") {
        particles.forEach(p => {
          if (p.direction === 'x') p.x += p.speed * p.vx; else p.y += p.speed * p.vy
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = p.color; ctx.shadowColor = p.color; ctx.shadowBlur = 10; ctx.fill(); ctx.shadowBlur = 0
          p.ttl--;
          if (p.ttl <= 0 || p.x > canvas.width || p.x < 0 || p.y > canvas.height || p.y < 0) {
            p.direction = p.direction === 'x' ? 'y' : 'x'
            if (p.x > canvas.width || p.x < 0 || p.y > canvas.height || p.y < 0) {
              p.x = Math.random() * canvas.width; p.y = Math.random() * canvas.height
            }
            p.vx = Math.random() < 0.5 ? 1 : -1; p.vy = Math.random() < 0.5 ? 1 : -1
            p.ttl = Math.random() * 100 + 50
          }
        })
      } else if (visualizationType === "glitch") {
        particles.forEach((p) => {
          p.x += p.vx; p.y += p.vy
          p.vx *= 0.98; p.vy *= 0.98
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1.1
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1.1
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fillStyle = p.color; ctx.fill()
        })
        if (Math.random() > 0.95) {
          for (let i = 0; i < 3; i++) {
            const x = Math.random() * canvas.width; const y = Math.random() * canvas.height
            const spliceWidth = canvas.width - x; const spliceHeight = Math.random() * 20 + 5
            ctx.drawImage(canvas, 0, y, spliceWidth, spliceHeight, x, y, spliceWidth, spliceHeight)
            ctx.drawImage(canvas, spliceWidth, y, x, spliceHeight, 0, y, x, spliceHeight)
          }
        }
      }
    }
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [visualizationType])

  // Typewriter effect - unchanged
  useEffect(() => {
    const currentText = texts[currentTextIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typewriterText.length < currentText.length) {
          setTypewriterText(currentText.slice(0, typewriterText.length + 1))
        } else { setTimeout(() => setIsDeleting(true), 2000) }
      } else {
        if (typewriterText.length > 0) {
          setTypewriterText(typewriterText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? 50 : 100)
    return () => clearTimeout(timeout)
  }, [typewriterText, currentTextIndex, isDeleting, texts])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  // Updated with new names
  const getVisualizationName = () => {
    switch (visualizationType) {
      case "neural": return "Neural Network";
      case "particles": return "Particle Field";
      case "waves": return "Wave Patterns";
      case "matrix": return "Digital Rain";
      case "constellation": return "Interactive Constellation";
      case "hyperspace": return "Hyperspace Jump";
      case "circuit": return "Circuit Traces";
      case "glitch": return "Glitch Field";
      default: return "Unknown";
    }
  }

  // The JSX for the hero content remains exactly the same
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ background: "transparent" }} />
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-quantum-primary/5 via-transparent to-quantum-secondary/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-quantum-accent/10 via-transparent to-transparent"></div>
      </div>
      <div className="absolute inset-0 z-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="space-y-8">
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
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="block text-quantum-light">Hello, I'm</span>
              <span className="block quantum-gradient-text animate-quantum-float">Biju Damian</span>
            </h1>
            <div className="h-16 flex items-center justify-center">
              <h2 className="text-2xl md:text-3xl font-medium text-quantum-muted">
                <span className="quantum-gradient-text">{typewriterText}</span>
                <span className="animate-quantum-pulse text-quantum-primary">|</span>
              </h2>
            </div>
          </div>
          <p className="text-lg md:text-xl text-quantum-muted max-w-3xl mx-auto leading-relaxed text-center">
            Full-stack dev with a hacker’s curiosity and a creator’s drive. I love turning complex problems into
            simple, clean, and scalable systems. Exploring the edges of code, design, and innovation.
            <span className="block text-sm mt-2 opacity-60">Current visualization: {getVisualizationName()}</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-quantum-primary to-quantum-secondary hover:opacity-90 text-quantum-dark font-semibold px-8 py-4 rounded-lg transition-all duration-200 quantum-glow"
              onClick={() => scrollToSection("projects")}
            >View My Work</Button>
            <Button
              size="lg"
              variant="outline"
              className="border-quantum-primary text-quantum-primary hover:bg-quantum-primary hover:text-quantum-dark px-8 py-4 rounded-lg transition-all duration-200 bg-transparent"
              onClick={() => scrollToSection("contact")}
            >Get In Touch</Button>
          </div>
          <div className="flex justify-center space-x-6 pt-8">
            {[
              { icon: Github, href: "https://github.com/bijudamian", label: "GitHub" },
              { icon: Linkedin, href: "https://in.linkedin.com/in/biju-damian-24904a271", label: "LinkedIn" },
              { icon: Mail, href: "mailto:bijucoder@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-quantum-card border border-quantum-border flex items-center justify-center text-quantum-muted hover:text-quantum-primary hover:border-quantum-primary transition-all duration-200 hover:quantum-glow"
                aria-label={label}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
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
      <div className="absolute top-20 left-20 w-64 h-64 bg-quantum-primary/10 rounded-full blur-3xl animate-quantum-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-quantum-secondary/10 rounded-full blur-3xl animate-quantum-pulse" style={{ animationDelay: "1s" }}></div>
      <div className="absolute top-1/2 left-10 w-32 h-32 bg-quantum-accent/10 rounded-full blur-2xl animate-quantum-float"></div>
    </section>
  )
}
