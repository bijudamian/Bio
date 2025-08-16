"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: "https://github.com/bijudamian", label: "GitHub" },
    { icon: Linkedin, href: "https://in.linkedin.com/in/biju-damian-24904a271", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:bijucoder@gmail.com", label: "Email" },
  ]

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ]

  const technologies = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vercel"]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="relative bg-quantum-darker border-t border-quantum-border">
      {/* Quantum Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)
          `,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-quantum-primary to-quantum-secondary rounded-lg quantum-glow"></div>
              <div>
                <h3 className="text-xl font-bold quantum-gradient-text">Biju Damian</h3>
                <p className="text-quantum-muted text-sm">Building the future, one line at a time</p>
              </div>
            </div>

            <p className="text-quantum-muted leading-relaxed max-w-md">
              Passionate full-stack developer specializing in modern digital experiences. Creating innovative
              solutions that push the boundaries of what's possible in web development.
            </p>

            <div className="space-y-3">
              <p className="text-sm text-quantum-muted">Built with:</p>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="bg-quantum-card border border-quantum-border text-quantum-muted hover:border-quantum-primary transition-colors duration-200"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-quantum-light">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-quantum-muted hover:text-quantum-primary transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-quantum-light">Connect</h4>
            <div className="space-y-4">
              <p className="text-quantum-muted text-sm">Let's build something amazing together</p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-quantum-card border border-quantum-border flex items-center justify-center text-quantum-muted hover:text-quantum-primary hover:border-quantum-primary transition-all duration-200 hover:quantum-glow"
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
              <div className="pt-4">
                <Button
                  onClick={() => scrollToSection("#contact")}
                  size="sm"
                  className="bg-gradient-to-r from-quantum-primary to-quantum-secondary hover:opacity-90 text-quantum-dark font-medium px-4 py-2 rounded-lg transition-all duration-200"
                >
                  Get In Touch
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-quantum-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-quantum-muted">
              <span>© {currentYear} Biju Damian. Made with</span>
              <Heart size={14} className="text-quantum-primary animate-quantum-pulse" />
              <span>and lots of coffee.</span>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4 text-sm text-quantum-muted">
                <a href="/privacy" className="hover:text-quantum-primary transition-colors duration-200">
                  Privacy
                </a>
                <a href="/terms" className="hover:text-quantum-primary transition-colors duration-200">
                  Terms
                </a>
              </div>

              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-lg bg-quantum-card border border-quantum-border flex items-center justify-center text-quantum-muted hover:text-quantum-primary hover:border-quantum-primary transition-all duration-200 hover:quantum-glow"
                aria-label="Scroll to top"
              >
                <ArrowUp size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quantum Orbs */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-quantum-primary/5 rounded-full blur-3xl animate-quantum-pulse"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-quantum-secondary/5 rounded-full blur-3xl animate-quantum-pulse"></div>
    </footer>
  )
}
