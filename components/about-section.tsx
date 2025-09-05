"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Palette, Zap, Users } from "lucide-react"

export function AboutSection() {
  const highlights = [
    {
      icon: Code,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and efficient code",
    },
    {
      icon: Palette,
      title: "Design Focus",
      description: "Creating beautiful and intuitive user experiences",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimizing for speed and exceptional user experience",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working effectively with teams and stakeholders",
    },
  ]

  const technologies = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Docker",
    "Kubernetes",
    "GraphQL",
    "REST APIs",
  ]

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="quantum-gradient-text">About Me</span>
          </h2>
          <p className="text-xl text-quantum-muted max-w-3xl mx-auto">
            Curious developer with a passion for building impactful digital solutions. I focus on writing clean,
            scalable code and crafting experiences that balance performance, design, and usability.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-quantum-light">Building the Future, One Line at a Time</h3>
              <p className="text-quantum-muted leading-relaxed">
                Building the future one line at a time, I’m a developer who thrives at the intersection of creativity
                and logic. From crafting sleek frontends to engineering robust backends, I enjoy turning ideas into
                tangible, impactful products. For me, code isn’t just problem-solving—it’s a way of shaping experiences,
                simplifying complexity, and leaving a mark on the digital world.
              </p>
              <p className="text-quantum-muted leading-relaxed">
                I believe in the power of clean code, beautiful design, and seamless user experiences. Every project is
                an opportunity to learn, grow, and create something extraordinary.
              </p>
            </div>

            {/* Technologies */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-quantum-light">Technologies I Love</h4>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="bg-quantum-card border border-quantum-border text-quantum-light hover:border-quantum-primary transition-colors duration-200"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map(({ icon: Icon, title, description }) => (
              <Card
                key={title}
                className="p-6 bg-quantum-card border-quantum-border hover:border-quantum-primary transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/30 group"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-quantum-primary/20 to-quantum-secondary/20 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-indigo-500/30 transition-all duration-200">
                    <Icon size={24} className="text-quantum-primary" />
                  </div>
                  <h4 className="font-semibold text-quantum-light">{title}</h4>
                  <p className="text-sm text-quantum-muted">{description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
