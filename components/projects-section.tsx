"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Star, GitFork, Eye, RefreshCw, Calendar, Code2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import Image from "next/image"

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  category: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  stats: {
    stars: number
    forks: number
    views: number
  }
  status: "completed" | "in-progress" | "concept"
  createdAt?: string
  updatedAt?: string
  pushedAt?: string
}

interface GitHubResponse {
  success: boolean
  projects: Project[]
  totalRepos: number
  lastUpdated: string
  error?: string
  message?: string
}

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  const fetchGitHubProjects = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/github?username=bijudamian")
      const data: GitHubResponse = await response.json()

      if (data.success) {
        setProjects(data.projects)
        setLastUpdated(data.lastUpdated)
      } else {
        setError(data.message || "Failed to fetch projects")
        // Fallback to placeholder data
        setProjects(getFallbackProjects())
      }
    } catch (err) {
      console.error("Error fetching GitHub projects:", err)
      setError("Network error occurred")
      // Fallback to placeholder data
      setProjects(getFallbackProjects())
    } finally {
      setLoading(false)
    }
  }

  const getFallbackProjects = (): Project[] => [
    {
      id: "portfolio-website",
      title: "Portfolio Website",
      description: "Modern portfolio website built with Next.js and quantum-inspired design system.",
      longDescription:
        "A comprehensive portfolio website showcasing projects, skills, and experience with a quantum-inspired design system, interactive animations, and modern web technologies.",
      image: "/placeholder.svg?height=400&width=600",
      category: "web-app",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
      liveUrl: "https://bijudamian.vercel.app",
      githubUrl: "https://github.com/bijudamian/portfolio",
      featured: true,
      stats: { stars: 15, forks: 3, views: 250 },
      status: "completed",
    },
    {
      id: "task-management-app",
      title: "Task Management App",
      description: "Full-stack task management application with real-time collaboration features.",
      longDescription:
        "A comprehensive task management platform with real-time updates, team collaboration, project tracking, and advanced filtering capabilities.",
      image: "/placeholder.svg?height=400&width=600",
      category: "web-app",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Express"],
      githubUrl: "https://github.com/bijudamian/task-manager",
      featured: true,
      stats: { stars: 8, forks: 2, views: 180 },
      status: "completed",
    },
    {
      id: "weather-app",
      title: "Weather Forecast App",
      description: "Beautiful weather application with location-based forecasts and interactive maps.",
      longDescription:
        "A modern weather application featuring location-based forecasts, interactive weather maps, detailed weather information, and beautiful UI animations.",
      image: "/placeholder.svg?height=400&width=600",
      category: "web-app",
      technologies: ["React", "OpenWeather API", "Mapbox", "CSS3", "JavaScript"],
      githubUrl: "https://github.com/bijudamian/weather-app",
      featured: false,
      stats: { stars: 5, forks: 1, views: 120 },
      status: "completed",
    },
  ]

  useEffect(() => {
    fetchGitHubProjects()
  }, [])

  const categories = [
    { id: "all", label: "All Projects", count: projects.length },
    { id: "web-app", label: "Web Apps", count: projects.filter((p) => p.category === "web-app").length },
    { id: "mobile", label: "Mobile", count: projects.filter((p) => p.category === "mobile").length },
    { id: "ai-ml", label: "AI/ML", count: projects.filter((p) => p.category === "ai-ml").length },
    { id: "blockchain", label: "Blockchain", count: projects.filter((p) => p.category === "blockchain").length },
  ]

  const filteredProjects = activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory)
  const featuredProjects = projects.filter((p) => p.featured)

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return "bg-quantum-accent text-quantum-dark"
      case "in-progress":
        return "bg-quantum-warning text-quantum-dark"
      case "concept":
        return "bg-quantum-secondary text-quantum-light"
      default:
        return "bg-quantum-muted text-quantum-dark"
    }
  }

  const getStatusLabel = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "in-progress":
        return "In Progress"
      case "concept":
        return "Concept"
      default:
        return "Unknown"
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <section id="projects" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="quantum-gradient-text">Featured Projects</span>
            </h2>
            <div className="flex items-center justify-center gap-2 text-quantum-muted">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Loading projects from GitHub...</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-quantum-card border-quantum-border animate-pulse">
                <div className="w-full h-48 bg-quantum-darker"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-quantum-darker rounded w-3/4"></div>
                  <div className="h-3 bg-quantum-darker rounded w-full"></div>
                  <div className="h-3 bg-quantum-darker rounded w-2/3"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <TooltipProvider>
      <section id="projects" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Badge
                variant="secondary"
                className="bg-quantum-primary/20 text-quantum-primary border-quantum-primary/30"
              >
                <Github className="w-3 h-3 mr-1" />
                Live from GitHub
              </Badge>
              {lastUpdated && (
                <Badge
                  variant="secondary"
                  className="bg-quantum-accent/20 text-quantum-accent border-quantum-accent/30"
                >
                  <Calendar className="w-3 h-3 mr-1" />
                  Updated {formatDate(lastUpdated)}
                </Badge>
              )}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="quantum-gradient-text">Featured Projects</span>
            </h2>
            <p className="text-xl text-quantum-muted max-w-3xl mx-auto">
              Real projects from my GitHub repository, showcasing innovative solutions and technical excellence.
            </p>
            {error && (
              <div className="mt-4 p-3 bg-quantum-warning/20 border border-quantum-warning/30 rounded-lg text-quantum-warning text-sm max-w-md mx-auto">
                {error} - Showing cached projects
              </div>
            )}
            <div className="mt-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={fetchGitHubProjects}
                    variant="ghost"
                    size="sm"
                    className="text-quantum-muted hover:text-quantum-primary"
                    disabled={loading}
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                    Refresh Projects
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Fetch latest projects from GitHub</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Featured Projects Highlight */}
          {featuredProjects.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-quantum-light mb-8 flex items-center gap-2">
                <Star className="w-6 h-6 text-quantum-primary" />
                Spotlight Projects
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {featuredProjects.map((project) => (
                  <Card
                    key={project.id}
                    className="group bg-quantum-card border-quantum-border hover:border-quantum-primary transition-all duration-300 hover:quantum-glow overflow-hidden cursor-pointer"
                  >
                    <div className="relative">
                      <div className="w-full h-48 relative overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={`${project.title} screenshot`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge className={`${getStatusColor(project.status)} text-xs font-medium`}>
                          {getStatusLabel(project.status)}
                        </Badge>
                      </div>
                      {project.featured && (
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="bg-quantum-primary/20 text-quantum-primary text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <h4 className="text-xl font-semibold text-quantum-light group-hover:quantum-gradient-text transition-all duration-200">
                          {project.title}
                        </h4>
                        <p className="text-quantum-muted mt-2">{project.description}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="bg-quantum-border text-quantum-muted text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="secondary" className="bg-quantum-border text-quantum-muted text-xs">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center space-x-4 text-sm text-quantum-muted">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center space-x-1">
                                <Star size={14} />
                                <span>{project.stats.stars}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>GitHub Stars</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center space-x-1">
                                <GitFork size={14} />
                                <span>{project.stats.forks}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>GitHub Forks</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center space-x-1">
                                <Eye size={14} />
                                <span>{project.stats.views}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Estimated Views</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>

                        <div className="flex space-x-2">
                          {project.liveUrl && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="p-2 hover:text-quantum-primary"
                                  onClick={() => window.open(project.liveUrl, "_blank")}
                                >
                                  <ExternalLink size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>View Live Demo</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                          {project.githubUrl && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="p-2 hover:text-quantum-primary"
                                  onClick={() => window.open(project.githubUrl, "_blank")}
                                >
                                  <Github size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>View Source Code</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Tooltip key={category.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      activeCategory === category.id
                        ? "bg-gradient-to-r from-quantum-primary to-quantum-secondary text-quantum-dark quantum-glow"
                        : "bg-quantum-card border border-quantum-border text-quantum-muted hover:border-quantum-primary hover:text-quantum-light"
                    }`}
                  >
                    <Code2 className="w-4 h-4" />
                    {category.label}
                    <Badge variant="secondary" className="ml-2 bg-quantum-border text-quantum-muted text-xs">
                      {category.count}
                    </Badge>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Filter by {category.label.toLowerCase()}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* All Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="group bg-quantum-card border-quantum-border hover:border-quantum-primary transition-all duration-300 hover:quantum-glow overflow-hidden cursor-pointer"
              >
                <div className="relative">
                  <div className="w-full h-48 relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={`${project.title} screenshot`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getStatusColor(project.status)} text-xs font-medium`}>
                      {getStatusLabel(project.status)}
                    </Badge>
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-quantum-primary/20 text-quantum-primary text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-quantum-light group-hover:quantum-gradient-text transition-all duration-200">
                      {project.title}
                    </h4>
                    <p className="text-quantum-muted mt-2 text-sm">{project.description}</p>
                    {project.pushedAt && (
                      <p className="text-xs text-quantum-subtle mt-1">Last updated: {formatDate(project.pushedAt)}</p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-quantum-border text-quantum-muted text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="bg-quantum-border text-quantum-muted text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center space-x-3 text-sm text-quantum-muted">
                      <div className="flex items-center space-x-1">
                        <Star size={12} />
                        <span>{project.stats.stars}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitFork size={12} />
                        <span>{project.stats.forks}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {project.liveUrl && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-2 hover:text-quantum-primary"
                          onClick={() => window.open(project.liveUrl, "_blank")}
                        >
                          <ExternalLink size={14} />
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-2 hover:text-quantum-primary"
                          onClick={() => window.open(project.githubUrl, "_blank")}
                        >
                          <Github size={14} />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Project Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 bg-quantum-card border-quantum-border text-center hover:scale-105 transition-transform duration-300">
              <div className="space-y-2">
                <div className="text-3xl font-bold quantum-gradient-text">{projects.length}</div>
                <div className="text-quantum-muted">Total Projects</div>
              </div>
            </Card>
            <Card className="p-6 bg-quantum-card border-quantum-border text-center hover:scale-105 transition-transform duration-300">
              <div className="space-y-2">
                <div className="text-3xl font-bold quantum-gradient-text">
                  {projects.reduce((acc, p) => acc + p.stats.stars, 0)}
                </div>
                <div className="text-quantum-muted">GitHub Stars</div>
              </div>
            </Card>
            <Card className="p-6 bg-quantum-card border-quantum-border text-center hover:scale-105 transition-transform duration-300">
              <div className="space-y-2">
                <div className="text-3xl font-bold quantum-gradient-text">
                  {projects.filter((p) => p.status === "completed").length}
                </div>
                <div className="text-quantum-muted">Completed</div>
              </div>
            </Card>
            <Card className="p-6 bg-quantum-card border-quantum-border text-center hover:scale-105 transition-transform duration-300">
              <div className="space-y-2">
                <div className="text-3xl font-bold quantum-gradient-text">
                  {projects.reduce((acc, p) => acc + p.stats.views, 0)}
                </div>
                <div className="text-quantum-muted">Total Views</div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </TooltipProvider>
  )
}
