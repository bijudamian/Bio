"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Palette, Type, Layout, Sparkles, Zap, Layers, MousePointer, Eye, Settings } from "lucide-react"

export function ModernDesignShowcase() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)

  const designElements = [
    {
      id: "colors",
      title: "Modern Color System",
      description: "Sophisticated dark palette with vibrant accents",
      icon: Palette,
      demo: "color-palette",
      colors: [
        { name: "Primary", value: "#8b5cf6", class: "bg-quantum-primary" },
        { name: "Secondary", value: "#6366f1", class: "bg-quantum-secondary" },
        { name: "Accent", value: "#10b981", class: "bg-quantum-accent" },
        { name: "Surface", value: "#111118", class: "bg-quantum-card" },
      ],
    },
    {
      id: "typography",
      title: "Typography Scale",
      description: "Space Grotesk for headings, optimized for readability",
      icon: Type,
      demo: "typography",
      sizes: [
        { name: "Display", class: "text-5xl font-bold", text: "Display Text" },
        { name: "Heading", class: "text-3xl font-semibold", text: "Heading Text" },
        { name: "Body", class: "text-base", text: "Body text for content" },
        { name: "Caption", class: "text-sm text-quantum-muted", text: "Caption text" },
      ],
    },
    {
      id: "components",
      title: "Interactive Components",
      description: "Modern UI components with smooth animations",
      icon: Layout,
      demo: "components",
    },
    {
      id: "effects",
      title: "Visual Effects",
      description: "Glow effects, gradients, and modern animations",
      icon: Sparkles,
      demo: "effects",
    },
  ]

  const componentExamples = [
    {
      name: "Primary Button",
      component: (
        <Button className="quantum-button-primary">
          <Zap className="w-4 h-4 mr-2" />
          Get Started
        </Button>
      ),
    },
    {
      name: "Ghost Button",
      component: (
        <Button className="quantum-button-ghost">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      ),
    },
    {
      name: "Interactive Card",
      component: (
        <Card className="quantum-card-interactive p-4 w-48">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-5 h-5 text-quantum-primary" />
            <span className="font-medium">Feature Card</span>
          </div>
          <p className="text-sm text-quantum-muted">Hover to see interaction</p>
        </Card>
      ),
    },
    {
      name: "Badge Collection",
      component: (
        <div className="flex gap-2 flex-wrap">
          <Badge className="bg-quantum-primary/20 text-quantum-primary border-quantum-primary/30">Modern</Badge>
          <Badge className="bg-quantum-accent/20 text-quantum-accent border-quantum-accent/30">Responsive</Badge>
          <Badge className="bg-quantum-secondary/20 text-quantum-secondary border-quantum-secondary/30">
            Accessible
          </Badge>
        </div>
      ),
    },
  ]

  return (
    <TooltipProvider>
      <section className="quantum-section-padding">
        <div className="quantum-container">
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Badge className="bg-quantum-primary/20 text-quantum-primary border-quantum-primary/30">
                <Eye className="w-3 h-3 mr-1" />
                Design System
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 quantum-text-balance">
              <span className="quantum-gradient-text-modern">Modern Design Language</span>
            </h2>
            <p className="text-xl text-quantum-muted max-w-3xl mx-auto quantum-text-pretty">
              A comprehensive design system built for the modern web, featuring sophisticated aesthetics and seamless
              user experiences.
            </p>
          </div>

          <div className="quantum-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-16">
            {designElements.map((element) => {
              const Icon = element.icon
              return (
                <Tooltip key={element.id}>
                  <TooltipTrigger asChild>
                    <Card
                      className={`quantum-card-interactive p-6 cursor-pointer ${
                        activeDemo === element.id ? "quantum-glow border-quantum-primary" : ""
                      }`}
                      onClick={() => setActiveDemo(activeDemo === element.id ? null : element.id)}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-quantum-primary/20 to-quantum-secondary/20 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-quantum-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-quantum-light">{element.title}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-quantum-muted">{element.description}</p>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click to explore {element.title.toLowerCase()}</p>
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </div>

          {/* Demo Sections */}
          {activeDemo === "colors" && (
            <Card className="quantum-elevated p-8 mb-8 animate-quantum-scale-in">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Palette className="w-6 h-6 text-quantum-primary" />
                Color Palette
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {designElements[0].colors?.map((color) => (
                  <div key={color.name} className="text-center">
                    <div className={`w-20 h-20 rounded-xl ${color.class} mx-auto mb-3 quantum-interactive`}></div>
                    <p className="font-medium text-quantum-light">{color.name}</p>
                    <p className="text-sm text-quantum-muted font-mono">{color.value}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeDemo === "typography" && (
            <Card className="quantum-elevated p-8 mb-8 animate-quantum-scale-in">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Type className="w-6 h-6 text-quantum-primary" />
                Typography Scale
              </h3>
              <div className="space-y-6">
                {designElements[1].sizes?.map((size) => (
                  <div key={size.name} className="flex items-center gap-6">
                    <div className="w-20 text-sm text-quantum-muted">{size.name}</div>
                    <div className={size.class}>{size.text}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeDemo === "components" && (
            <Card className="quantum-elevated p-8 mb-8 animate-quantum-scale-in">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Layout className="w-6 h-6 text-quantum-primary" />
                Interactive Components
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {componentExamples.map((example) => (
                  <div key={example.name} className="space-y-3">
                    <h4 className="font-medium text-quantum-light">{example.name}</h4>
                    <div className="flex items-center justify-center p-6 bg-quantum-surface rounded-lg border border-quantum-border">
                      {example.component}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeDemo === "effects" && (
            <Card className="quantum-elevated p-8 mb-8 animate-quantum-scale-in">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-quantum-primary" />
                Visual Effects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-quantum-card rounded-xl quantum-glow animate-quantum-glow-pulse"></div>
                  <p className="font-medium text-quantum-light">Glow Effect</p>
                  <p className="text-sm text-quantum-muted">Subtle lighting</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-quantum-primary to-quantum-secondary rounded-xl animate-quantum-float-modern"></div>
                  <p className="font-medium text-quantum-light">Float Animation</p>
                  <p className="text-sm text-quantum-muted">Smooth movement</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 quantum-glass rounded-xl flex items-center justify-center">
                    <MousePointer className="w-8 h-8 text-quantum-primary" />
                  </div>
                  <p className="font-medium text-quantum-light">Glass Effect</p>
                  <p className="text-sm text-quantum-muted">Frosted glass</p>
                </div>
              </div>
            </Card>
          )}

          <div className="text-center mt-12">
            <p className="text-quantum-muted">
              This design system powers the entire portfolio, ensuring consistency and modern aesthetics across all
              components.
            </p>
          </div>
        </div>
      </section>
    </TooltipProvider>
  )
}
