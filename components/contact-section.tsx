"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
  Zap,
} from "lucide-react"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

interface PingMessage {
  id: string
  message: string
  timestamp: Date
  type: "ping" | "quick"
}

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [showQuickPing, setShowQuickPing] = useState(false)
  const [pingMessages, setPingMessages] = useState<PingMessage[]>([])
  const [quickMessage, setQuickMessage] = useState("")

  useEffect(() => {
    const handlePingUser = (event: CustomEvent) => {
      setShowQuickPing(true)
      // Auto-scroll to quick ping section
      setTimeout(() => {
        const quickPingElement = document.getElementById("quick-ping")
        if (quickPingElement) {
          quickPingElement.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      }, 100)
    }

    window.addEventListener("pingUser", handlePingUser as EventListener)
    return () => window.removeEventListener("pingUser", handlePingUser as EventListener)
  }, [])

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "bijucoder@gmail.com",
      href: "mailto:bijucoder@gmail.com",
      description: "Send me an email anytime",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8790882114",
      href: "tel:+918790882114",
      description: "Available Mon-Fri, 9AM-6PM IST",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "India",
      href: "#",
      description: "Open to remote opportunities",
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/bijudamian",
      username: "@bijudamian",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://in.linkedin.com/in/biju-damian-24904a271",
      username: "Biju Damian",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com/bijudamian",
      username: "@bijudamian",
    },
  ]

  const quickPingTemplates = [
    "👋 Hey! Just wanted to say hi and connect",
    "💡 I have an interesting project idea to discuss",
    "🚀 Let's chat about potential collaboration",
    "☕ Coffee chat? I'd love to learn more about your work",
    "🤝 Interested in working together on something cool",
  ]

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate success/error randomly for demo
      if (Math.random() > 0.2) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuickPing = async (message: string) => {
    const newPing: PingMessage = {
      id: Date.now().toString(),
      message,
      timestamp: new Date(),
      type: "ping",
    }

    setPingMessages((prev) => [newPing, ...prev])
    setQuickMessage("")

    // Simulate sending ping
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Show success feedback
    setSubmitStatus("success")
    setTimeout(() => setSubmitStatus("idle"), 3000)
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="quantum-gradient-text">Let's Connect</span>
          </h2>
          <p className="text-xl text-quantum-muted max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's discuss how we can work together to create something extraordinary.
          </p>
        </div>

        {showQuickPing && (
          <Card
            id="quick-ping"
            className="mb-8 p-6 bg-gradient-to-r from-quantum-primary/10 to-quantum-secondary/10 border-quantum-primary/30 shadow-lg shadow-violet-500/30 animate-pulse"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="text-quantum-primary animate-pulse" size={24} />
              <h3 className="text-xl font-semibold text-quantum-light">Quick Ping - I'm Online!</h3>
            </div>
            <p className="text-quantum-muted mb-4">Send me a quick message and I'll get back to you right away!</p>

            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {quickPingTemplates.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickPing(template)}
                    className="text-sm px-3 py-2 rounded-full bg-quantum-card border border-quantum-border hover:border-quantum-primary hover:bg-quantum-primary/10 transition-all duration-200 text-quantum-muted hover:text-quantum-primary"
                  >
                    {template}
                  </button>
                ))}
              </div>

              <div className="flex space-x-2">
                <Input
                  value={quickMessage}
                  onChange={(e) => setQuickMessage(e.target.value)}
                  placeholder="Or type your own quick message..."
                  className="bg-quantum-darker border-quantum-border text-quantum-light"
                  onKeyPress={(e) => e.key === "Enter" && quickMessage.trim() && handleQuickPing(quickMessage)}
                />
                <Button
                  onClick={() => quickMessage.trim() && handleQuickPing(quickMessage)}
                  disabled={!quickMessage.trim()}
                  className="bg-quantum-primary hover:bg-quantum-primary/90 text-quantum-dark"
                >
                  <MessageCircle size={16} />
                </Button>
              </div>
            </div>

            {/* Recent Pings */}
            {pingMessages.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium text-quantum-muted">Recent pings:</h4>
                {pingMessages.slice(0, 3).map((ping) => (
                  <div key={ping.id} className="text-sm p-2 rounded bg-quantum-card/50 border border-quantum-border">
                    <span className="text-quantum-light">{ping.message}</span>
                    <span className="text-quantum-muted ml-2">• {ping.timestamp.toLocaleTimeString()}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-quantum-light mb-6">Get in Touch</h3>
              <p className="text-quantum-muted leading-relaxed mb-8">
                I'm always excited to discuss new opportunities, innovative projects, and creative collaborations.
                Whether you have a specific project in mind or just want to connect, I'd love to hear from you.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map(({ icon: Icon, label, value, href, description }) => (
                <Card
                  key={label}
                  className="p-6 bg-quantum-card border-quantum-border hover:border-quantum-primary transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/30 group"
                >
                  <a href={href} className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-quantum-primary/20 to-quantum-secondary/20 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-indigo-500/30 transition-all duration-200">
                      <Icon size={20} className="text-quantum-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-quantum-light group-hover:quantum-gradient-text transition-all duration-200">
                        {label}
                      </h4>
                      <p className="text-quantum-primary font-medium">{value}</p>
                      <p className="text-sm text-quantum-muted mt-1">{description}</p>
                    </div>
                  </a>
                </Card>
              ))}
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-quantum-light">Follow Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map(({ icon: Icon, label, href, username }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center space-x-3 p-4 rounded-lg bg-quantum-card border border-quantum-border hover:border-quantum-primary transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/30"
                  >
                    <Icon size={20} className="text-quantum-primary" />
                    <div>
                      <div className="font-medium text-quantum-light group-hover:quantum-gradient-text transition-all duration-200">
                        {label}
                      </div>
                      <div className="text-sm text-quantum-muted">{username}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8 bg-quantum-card border-quantum-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-quantum-light mb-6">Send a Message</h3>
              </div>

              {/* Success/Error Messages */}
              {submitStatus === "success" && (
                <div className="flex items-center space-x-2 p-4 rounded-lg bg-quantum-accent/20 border border-quantum-accent">
                  <CheckCircle size={20} className="text-quantum-accent" />
                  <span className="text-quantum-accent font-medium">
                    Message sent successfully! I'll get back to you soon.
                  </span>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="flex items-center space-x-2 p-4 rounded-lg bg-quantum-danger/20 border border-quantum-danger">
                  <AlertCircle size={20} className="text-quantum-danger" />
                  <span className="text-quantum-danger font-medium">Failed to send message. Please try again.</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-quantum-light mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`bg-quantum-darker border-quantum-border text-quantum-light ${
                      errors.name ? "border-quantum-danger" : ""
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="text-quantum-danger text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-quantum-light mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`bg-quantum-darker border-quantum-border text-quantum-light ${
                      errors.email ? "border-quantum-danger" : ""
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-quantum-danger text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-quantum-light mb-2">
                  Subject *
                </label>
                <Input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  className={`bg-quantum-darker border-quantum-border text-quantum-light ${
                    errors.subject ? "border-quantum-danger" : ""
                  }`}
                  placeholder="What's this about?"
                />
                {errors.subject && <p className="text-quantum-danger text-sm mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-quantum-light mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className={`bg-quantum-darker border-quantum-border text-quantum-light min-h-[120px] ${
                    errors.message ? "border-quantum-danger" : ""
                  }`}
                  placeholder="Tell me about your project or idea..."
                />
                {errors.message && <p className="text-quantum-danger text-sm mt-1">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-quantum-primary to-quantum-secondary hover:opacity-90 text-quantum-dark font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg shadow-violet-500/30 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-quantum-dark border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send size={18} />
                    <span>Send Message</span>
                  </div>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}
