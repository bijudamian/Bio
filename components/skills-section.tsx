"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Code2, Database, Wrench, Star, Award, Target, Bitcoin as Button } from "lucide-react"

interface Skill {
  name: string
  level: number
  category: "Frontend" | "Backend" | "Tools"
  icon: string
  color: string
  description: string
  projects: number
}

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "Frontend" | "Backend" | "Tools">("all")
  const [isVisible, setIsVisible] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [showAllSkills, setShowAllSkills] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("skills")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const skills: Skill[] = [
    // Frontend
    {
      name: "JavaScript",
      level: 95,
      category: "Frontend",
      icon: "JS",
      color: "from-yellow-400 to-yellow-600",
      description: "Modern ES6+ features, async/await, DOM manipulation",
      projects: 25,
    },
    {
      name: "React",
      level: 92,
      category: "Frontend",
      icon: "⚛",
      color: "from-blue-400 to-cyan-500",
      description: "Hooks, Context API, Redux, Next.js integration",
      projects: 18,
    },
    {
      name: "Vue.js",
      level: 85,
      category: "Frontend",
      icon: "V",
      color: "from-green-400 to-green-600",
      description: "Composition API, Vuex, Nuxt.js, component architecture",
      projects: 12,
    },
    {
      name: "TypeScript",
      level: 88,
      category: "Frontend",
      icon: "TS",
      color: "from-blue-600 to-blue-400",
      description: "Type safety, interfaces, generics, advanced patterns",
      projects: 20,
    },

    // Backend
    {
      name: "Node.js",
      level: 90,
      category: "Backend",
      icon: "N",
      color: "from-green-500 to-green-700",
      description: "Express.js, REST APIs, microservices, performance optimization",
      projects: 22,
    },
    {
      name: "Python",
      level: 87,
      category: "Backend",
      icon: "🐍",
      color: "from-yellow-500 to-orange-500",
      description: "Django, Flask, FastAPI, data processing, automation",
      projects: 15,
    },
    {
      name: "MongoDB",
      level: 83,
      category: "Backend",
      icon: "M",
      color: "from-green-600 to-green-800",
      description: "Aggregation pipelines, indexing, replica sets, sharding",
      projects: 16,
    },
    {
      name: "PostgreSQL",
      level: 85,
      category: "Backend",
      icon: "P",
      color: "from-blue-700 to-blue-500",
      description: "Complex queries, stored procedures, performance tuning",
      projects: 14,
    },

    // Tools
    {
      name: "Docker",
      level: 80,
      category: "Tools",
      icon: "🐳",
      color: "from-blue-500 to-cyan-600",
      description: "Containerization, Docker Compose, multi-stage builds",
      projects: 18,
    },
    {
      name: "AWS",
      level: 78,
      category: "Tools",
      icon: "☁",
      color: "from-orange-400 to-yellow-500",
      description: "EC2, S3, Lambda, RDS, CloudFormation, serverless",
      projects: 10,
    },
    {
      name: "Git",
      level: 92,
      category: "Tools",
      icon: "G",
      color: "from-orange-600 to-red-600",
      description: "Advanced workflows, branching strategies, CI/CD integration",
      projects: 30,
    },
    {
      name: "Figma",
      level: 75,
      category: "Tools",
      icon: "F",
      color: "from-purple-500 to-pink-500",
      description: "UI/UX design, prototyping, design systems, collaboration",
      projects: 8,
    },
  ]

  const categories = ["all", "Frontend", "Backend", "Tools"] as const
  const filteredSkills = activeCategory === "all" ? skills : skills.filter((skill) => skill.category === activeCategory)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend":
        return <Code2 className="w-4 h-4" />
      case "Backend":
        return <Database className="w-4 h-4" />
      case "Tools":
        return <Wrench className="w-4 h-4" />
      default:
        return <Star className="w-4 h-4" />
    }
  }

  const totalProjects = skills.reduce((sum, skill) => sum + skill.projects, 0)
  const avgSkillLevel = Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length)

  return (
    <TooltipProvider>
      <section id="skills" className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 bg-quantum-emerald/10 rounded-full blur-3xl animate-quantum-float"></div>
          <div
            className="absolute bottom-20 right-10 w-40 h-40 bg-quantum-accent/10 rounded-full blur-3xl animate-quantum-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Badge
                variant="secondary"
                className="bg-quantum-emerald/20 text-quantum-emerald border-quantum-emerald/30"
              >
                <Award className="w-3 h-3 mr-1" />
                Expert Level
              </Badge>
              <Badge variant="secondary" className="bg-quantum-accent/20 text-quantum-accent border-quantum-accent/30">
                <Target className="w-3 h-3 mr-1" />
                {avgSkillLevel}% Avg Proficiency
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="quantum-gradient-text-emerald">Skills & Technologies</span>
            </h2>
            <p className="text-xl text-quantum-muted max-w-3xl mx-auto">
              A comprehensive toolkit built through {totalProjects}+ projects and years of hands-on experience.
            </p>
          </div>

          <div className="flex justify-center mb-12 gap-3 flex-wrap">
            {categories.map((category) => (
              <Tooltip key={category}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setActiveCategory(category)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                      activeCategory === category
                        ? "bg-gradient-to-r from-quantum-emerald to-quantum-accent text-white shadow-lg shadow-quantum-emerald/30 scale-105"
                        : "bg-quantum-card text-quantum-muted hover:bg-quantum-emerald/10 hover:text-quantum-emerald hover:scale-105 border border-quantum-border hover:border-quantum-emerald/30"
                    }`}
                  >
                    {getCategoryIcon(category)}
                    {category === "all" ? "All Skills" : category}
                    {category !== "all" && (
                      <Badge variant="secondary" className="ml-1 bg-quantum-darker text-xs">
                        {skills.filter((s) => s.category === category).length}
                      </Badge>
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {category === "all"
                      ? `View all ${skills.length} skills`
                      : `${skills.filter((s) => s.category === category).length} ${category} technologies`}
                  </p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, index) => (
              <Tooltip key={skill.name}>
                <TooltipTrigger asChild>
                  <Card
                    className={`group cursor-pointer transition-all duration-500 hover:scale-105 bg-quantum-card border-quantum-border hover:border-quantum-accent hover:shadow-lg hover:shadow-emerald-500/30 ${
                      isVisible ? "animate-in slide-in-from-bottom-4" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => setSelectedSkill(selectedSkill === skill.name ? null : skill.name)}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center text-white font-bold text-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg`}
                          >
                            {skill.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-quantum-light group-hover:text-quantum-emerald transition-colors duration-300">
                              {skill.name}
                            </h3>
                            <p className="text-xs text-quantum-muted">{skill.category}</p>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className={`${skill.level >= 90 ? "bg-quantum-emerald/20 text-quantum-emerald border-quantum-emerald/30" : "bg-quantum-accent/20 text-quantum-accent border-quantum-accent/30"}`}
                        >
                          {skill.level}%
                        </Badge>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-quantum-muted">Proficiency</span>
                          <span className="text-quantum-light font-medium">{skill.level}%</span>
                        </div>
                        <div className="relative">
                          <div className="w-full bg-quantum-border rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out shadow-lg ${
                                isVisible ? "animate-pulse" : ""
                              }`}
                              style={{
                                width: isVisible ? `${skill.level}%` : "0%",
                                animationDelay: `${index * 200}ms`,
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <p className="text-sm text-quantum-muted leading-relaxed">{skill.description}</p>
                        <div className="flex items-center justify-between pt-2 border-t border-quantum-border/50">
                          <span className="text-xs text-quantum-subtle">Projects</span>
                          <Badge variant="outline" className="text-xs border-quantum-emerald/30 text-quantum-emerald">
                            {skill.projects}+
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <div className="space-y-1">
                    <p className="font-medium">{skill.name}</p>
                    <p className="text-sm opacity-90">{skill.description}</p>
                    <p className="text-xs opacity-75">Used in {skill.projects}+ projects</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          <div className="mt-20">
            <Card className="p-8 bg-gradient-to-br from-quantum-card to-quantum-darker border-quantum-border hover:border-quantum-emerald/30 transition-all duration-300">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-quantum-emerald to-quantum-accent flex items-center justify-center text-white text-2xl font-bold shadow-2xl">
                    BD
                  </div>
                </div>
                <h3 className="text-3xl font-bold quantum-gradient-text-emerald mb-2">Biju Damian</h3>
                <p className="text-quantum-muted text-lg">Full-Stack Developer & Problem Solver</p>
                <div className="flex justify-center gap-4 mt-4">
                  <Badge
                    variant="secondary"
                    className="bg-quantum-emerald/20 text-quantum-emerald border-quantum-emerald/30"
                  >
                    5+ Years Experience
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-quantum-accent/20 text-quantum-accent border-quantum-accent/30"
                  >
                    {totalProjects}+ Projects
                  </Badge>
                </div>
              </div>

              {/* Personal Info Section */}
              <div className="mt-16">
                <Card className="p-8 bg-quantum-card border-quantum-border hover:border-quantum-primary/30 transition-all duration-300">
                  <div className="text-center mb-8">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <h3 className="text-2xl font-bold quantum-gradient-text mb-2 cursor-help">Biju Damian</h3>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Full-Stack Developer with 5+ years of experience</p>
                      </TooltipContent>
                    </Tooltip>
                    <p className="text-quantum-muted">Full-Stack Developer & Problem Solver</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-center p-4 rounded-lg hover:bg-quantum-darker/30 transition-all duration-300 cursor-pointer">
                          <div className="text-quantum-primary font-semibold">Email</div>
                          <a
                            href="mailto:bijucoder@gmail.com"
                            className="text-quantum-muted hover:text-quantum-primary transition-colors"
                          >
                            bijucoder@gmail.com
                          </a>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Send me an email</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-center p-4 rounded-lg hover:bg-quantum-darker/30 transition-all duration-300 cursor-pointer">
                          <div className="text-quantum-primary font-semibold">Phone</div>
                          <a
                            href="tel:+918790882114"
                            className="text-quantum-muted hover:text-quantum-primary transition-colors"
                          >
                            +91 8790882114
                          </a>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Call me directly</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-center p-4 rounded-lg hover:bg-quantum-darker/30 transition-all duration-300 cursor-pointer">
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
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View my code repositories</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-center p-4 rounded-lg hover:bg-quantum-darker/30 transition-all duration-300 cursor-pointer">
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
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Connect with me professionally</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </Card>
              </div>
            </Card>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="p-6 bg-gradient-to-br from-quantum-card to-quantum-darker border-quantum-border text-center hover:scale-105 hover:shadow-xl hover:shadow-quantum-emerald/20 transition-all duration-300 cursor-pointer group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-quantum-emerald to-quantum-accent flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold quantum-gradient-text-emerald">15+</div>
                    <div className="text-quantum-muted">Certifications</div>
                  </div>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>15+ professional certifications and growing 🚀</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="p-6 bg-gradient-to-br from-quantum-card to-quantum-darker border-quantum-border text-center hover:scale-105 hover:shadow-xl hover:shadow-quantum-accent/20 transition-all duration-300 cursor-pointer group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-quantum-accent to-quantum-secondary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <Code2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold quantum-gradient-text">{skills.length}+</div>
                    <div className="text-quantum-muted">Technologies</div>
                  </div>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Proficient in {skills.length} different technologies and frameworks</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="p-6 bg-gradient-to-br from-quantum-card to-quantum-darker border-quantum-border text-center hover:scale-105 hover:shadow-xl hover:shadow-quantum-primary/20 transition-all duration-300 cursor-pointer group">
                  <div className="space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-quantum-primary to-quantum-secondary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold quantum-gradient-text">{totalProjects}+</div>
                    <div className="text-quantum-muted">Projects Completed</div>
                  </div>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Successfully delivered {totalProjects}+ projects across various domains</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="mt-8">
            <Button
              size="sm"
              className="bg-gradient-to-r from-quantum-primary to-quantum-secondary text-quantum-dark hover:opacity-90 transition-all duration-200 shadow-lg shadow-purple-500/30"
              onClick={() => setShowAllSkills(!showAllSkills)}
            >
              {showAllSkills ? "Show Less" : "Show All Skills"}
            </Button>
          </div>
        </div>
      </section>
    </TooltipProvider>
  )
}
