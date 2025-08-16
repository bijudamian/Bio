"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

interface Skill {
  name: string
  level: number
  category: "Frontend" | "Backend" | "Tools"
  icon: string
  color: string
}

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "Frontend" | "Backend" | "Tools">("all")

  const skills: Skill[] = [
    // Frontend
    { name: "JavaScript", level: 95, category: "Frontend", icon: "JS", color: "from-yellow-400 to-yellow-600" },
    { name: "React", level: 92, category: "Frontend", icon: "⚛", color: "from-blue-400 to-cyan-500" },
    { name: "Vue.js", level: 85, category: "Frontend", icon: "V", color: "from-green-400 to-green-600" },
    { name: "TypeScript", level: 88, category: "Frontend", icon: "TS", color: "from-blue-600 to-blue-400" },

    // Backend
    { name: "Node.js", level: 90, category: "Backend", icon: "N", color: "from-green-500 to-green-700" },
    { name: "Python", level: 87, category: "Backend", icon: "🐍", color: "from-yellow-500 to-orange-500" },
    { name: "MongoDB", level: 83, category: "Backend", icon: "M", color: "from-green-600 to-green-800" },
    { name: "PostgreSQL", level: 85, category: "Backend", icon: "P", color: "from-blue-700 to-blue-500" },

    // Tools
    { name: "Docker", level: 80, category: "Tools", icon: "🐳", color: "from-blue-500 to-cyan-600" },
    { name: "AWS", level: 78, category: "Tools", icon: "☁", color: "from-orange-400 to-yellow-500" },
    { name: "Git", level: 92, category: "Tools", icon: "G", color: "from-orange-600 to-red-600" },
    { name: "Figma", level: 75, category: "Tools", icon: "F", color: "from-purple-500 to-pink-500" },
  ]

  const categories = ["all", "Frontend", "Backend", "Tools"] as const
  const filteredSkills = activeCategory === "all" ? skills : skills.filter((skill) => skill.category === activeCategory)

  const skillsByCategory = {
    Frontend: skills.filter((s) => s.category === "Frontend"),
    Backend: skills.filter((s) => s.category === "Backend"),
    Tools: skills.filter((s) => s.category === "Tools"),
  }

  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="quantum-gradient-text">Skills & Technologies</span>
          </h2>
          <p className="text-xl text-quantum-muted max-w-3xl mx-auto">
            A comprehensive toolkit built through years of hands-on experience and continuous learning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {Object.entries(skillsByCategory).map(([categoryName, categorySkills]) => (
            <Card key={categoryName} className="p-6 bg-quantum-card border-quantum-border">
              <h3 className="text-xl font-semibold text-quantum-primary mb-6 text-center">{categoryName}</h3>
              <div className="space-y-4">
                {categorySkills.map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex items-center space-x-4 p-3 rounded-lg bg-quantum-darker/50 hover:bg-quantum-darker transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-quantum-primary/50">
                      {/* Skill Icon */}
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${skill.color} flex items-center justify-center text-white font-bold text-sm`}
                      >
                        {skill.icon}
                      </div>

                      {/* Skill Info */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-quantum-light">{skill.name}</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="relative">
                          <div className="w-full bg-quantum-border rounded-full h-2">
                            <div
                              className={`h-2 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-500 ease-out`}
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Personal Info Section */}
        <div className="mt-16">
          <Card className="p-8 bg-quantum-card border-quantum-border">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold quantum-gradient-text mb-2">Biju Damian</h3>
              <p className="text-quantum-muted">Full-Stack Developer & Problem Solver</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-quantum-primary font-semibold">Email</div>
                <a
                  href="mailto:bijucoder@gmail.com"
                  className="text-quantum-muted hover:text-quantum-primary transition-colors"
                >
                  bijucoder@gmail.com
                </a>
              </div>

              <div className="text-center">
                <div className="text-quantum-primary font-semibold">Phone</div>
                <a href="tel:+918790882114" className="text-quantum-muted hover:text-quantum-primary transition-colors">
                  +91 8790882114
                </a>
              </div>

              <div className="text-center">
                <div className="text-quantum-primary font-semibold">GitHub</div>
                <a
                  href="https://github.com/bijudamian"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-quantum-muted hover:text-quantum-primary transition-colors"
                >
                  @bijudamian
                </a>
              </div>

              <div className="text-center">
                <div className="text-quantum-primary font-semibold">LinkedIn</div>
                <a
                  href="https://in.linkedin.com/in/biju-damian-24904a271"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-quantum-muted hover:text-quantum-primary transition-colors"
                >
                  Biju Damian
                </a>
              </div>
            </div>
          </Card>
        </div>

        {/* Skills Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 bg-quantum-card border-quantum-border text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold quantum-gradient-text">5+</div>
              <div className="text-quantum-muted">Years Experience</div>
            </div>
          </Card>
          <Card className="p-6 bg-quantum-card border-quantum-border text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold quantum-gradient-text">{skills.length}+</div>
              <div className="text-quantum-muted">Technologies</div>
            </div>
          </Card>
          <Card className="p-6 bg-quantum-card border-quantum-border text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold quantum-gradient-text">50+</div>
              <div className="text-quantum-muted">Projects Completed</div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
