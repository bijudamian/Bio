"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Star, GitFork, Eye } from "lucide-react"
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
}

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const PROJECTS_PER_PAGE = 3

  const projects: Project[] = [
    {
      id: "quantum-dashboard",
      title: "Quantum Analytics Dashboard",
      description: "Real-time analytics platform with quantum-inspired visualizations and AI-powered insights.",
      longDescription:
        "A comprehensive analytics dashboard built with Next.js and TypeScript, featuring real-time data visualization, quantum-inspired UI components, and AI-powered insights. Includes advanced filtering, custom chart components, and responsive design optimized for all devices.",
      image: "/placeholder.svg?height=400&width=600",
      category: "web-app",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Chart.js", "PostgreSQL", "Prisma"],
      liveUrl: "https://quantum-dashboard.demo",
      githubUrl: "https://github.com/user/quantum-dashboard",
      featured: true,
      stats: { stars: 234, forks: 45, views: 1200 },
      status: "completed",
    },
    {
      id: "ai-content-generator",
      title: "AI Content Generator",
      description: "Intelligent content creation platform powered by advanced language models and quantum algorithms.",
      longDescription:
        "An AI-powered content generation platform that leverages GPT models and custom algorithms to create high-quality content. Features include template management, content optimization, SEO analysis, and collaborative editing capabilities.",
      image: "/placeholder.svg?height=400&width=600",
      category: "ai-ml",
      technologies: ["React", "Node.js", "OpenAI API", "MongoDB", "Redis", "Docker"],
      liveUrl: "https://ai-content.demo",
      githubUrl: "https://github.com/user/ai-content-generator",
      featured: true,
      stats: { stars: 189, forks: 32, views: 890 },
      status: "completed",
    },
    {
      id: "mobile-fitness-app",
      title: "Quantum Fitness Tracker",
      description: "Cross-platform mobile app for fitness tracking with quantum-inspired gamification elements.",
      longDescription:
        "A comprehensive fitness tracking application built with React Native, featuring workout planning, progress tracking, social challenges, and quantum-inspired gamification. Includes wearable device integration and AI-powered workout recommendations.",
      image: "/placeholder.svg?height=400&width=600",
      category: "mobile",
      technologies: ["React Native", "Expo", "Firebase", "TypeScript", "Redux Toolkit"],
      liveUrl: "https://apps.apple.com/quantum-fitness",
      githubUrl: "https://github.com/user/quantum-fitness",
      featured: false,
      stats: { stars: 156, forks: 28, views: 670 },
      status: "completed",
    },
    {
      id: "blockchain-portfolio",
      title: "DeFi Portfolio Manager",
      description: "Decentralized finance portfolio management with quantum security protocols.",
      longDescription:
        "A sophisticated DeFi portfolio management platform built on Ethereum, featuring automated yield farming, risk assessment, quantum-secured transactions, and comprehensive analytics. Supports multiple DeFi protocols and provides advanced trading strategies.",
      image: "/placeholder.svg?height=400&width=600",
      category: "blockchain",
      technologies: ["Solidity", "Web3.js", "React", "Hardhat", "IPFS", "MetaMask"],
      liveUrl: "https://defi-quantum.demo",
      githubUrl: "https://github.com/user/defi-portfolio",
      featured: true,
      stats: { stars: 312, forks: 67, views: 1450 },
      status: "in-progress",
    },
    {
      id: "quantum-ecommerce",
      title: "Quantum E-commerce Platform",
      description: "Next-generation e-commerce platform with AI recommendations and quantum-inspired UX.",
      longDescription:
        "A full-stack e-commerce platform featuring AI-powered product recommendations, quantum-inspired user interface, advanced search capabilities, and seamless payment integration. Built with modern technologies for optimal performance and scalability.",
      image: "/placeholder.svg?height=400&width=600",
      category: "web-app",
      technologies: ["Next.js", "Stripe", "Supabase", "Tailwind CSS", "Vercel", "TypeScript"],
      liveUrl: "https://quantum-shop.demo",
      githubUrl: "https://github.com/user/quantum-ecommerce",
      featured: false,
      stats: { stars: 198, forks: 41, views: 920 },
      status: "completed",
    },
    {
      id: "neural-network-viz",
      title: "Neural Network Visualizer",
      description: "Interactive visualization tool for understanding neural network architectures and training.",
      longDescription:
        "An educational tool for visualizing neural network architectures, training processes, and decision boundaries. Features interactive network building, real-time training visualization, and quantum-inspired animation effects for enhanced learning experience.",
      image: "/placeholder.svg?height=400&width=600",
      category: "ai-ml",
      technologies: ["Python", "TensorFlow", "D3.js", "Flask", "WebGL", "NumPy"],
      liveUrl: "https://neural-viz.demo",
      githubUrl: "https://github.com/user/neural-network-viz",
      featured: false,
      stats: { stars: 267, forks: 54, views: 1100 },
      status: "concept",
    },
  ]

  const categories = [
    { id: "all", label: "All Projects", count: projects.length },
    { id: "web-app", label: "Web Apps", count: projects.filter((p) => p.category === "web-app").length },
    { id: "mobile", label: "Mobile", count: projects.filter((p) => p.category === "mobile").length },
    { id: "ai-ml", label: "AI/ML", count: projects.filter((p) => p.category === "ai-ml").length },
    { id: "blockchain", label: "Blockchain", count: projects.filter((p) => p.category === "blockchain").length },
  ]

  const filteredProjects = useMemo(() => {
    return activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory)
  }, [activeCategory])

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

  const loadMoreProjects = useCallback(() => {
    if (isLoading || !hasMore) return

    setIsLoading(true)

    // Simulate API delay
    setTimeout(() => {
      const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE
      const endIndex = startIndex + PROJECTS_PER_PAGE
      const newProjects = filteredProjects.slice(startIndex, endIndex)

      if (newProjects.length === 0) {
        setHasMore(false)
      } else {
        setDisplayedProjects((prev) => [...prev, ...newProjects])
        setCurrentPage((prev) => prev + 1)
      }

      setIsLoading(false)
    }, 500)
  }, [currentPage, filteredProjects, isLoading, hasMore])

  useEffect(() => {
    const initialProjects = filteredProjects.slice(0, PROJECTS_PER_PAGE)
    setDisplayedProjects(initialProjects)
    setCurrentPage(2)
    setHasMore(filteredProjects.length > PROJECTS_PER_PAGE)
  }, [activeCategory]) // Removed filteredProjects from dependencies since it's memoized

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        loadMoreProjects()
      }
    },
    [loadMoreProjects, hasMore, isLoading],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 })

    const loadMoreTrigger = document.getElementById("load-more-trigger")
    if (loadMoreTrigger) {
      observer.observe(loadMoreTrigger)
    }

    return () => observer.disconnect()
  }, [handleIntersection]) // Use memoized callback in dependencies

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="quantum-gradient-text">Featured Projects</span>
          </h2>
          <p className="text-xl text-quantum-muted max-w-3xl mx-auto">
            A showcase of innovative solutions that demonstrate technical excellence and creative problem-solving.
          </p>
        </div>

        {/* Featured Projects Highlight */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-quantum-light mb-8">Spotlight Projects</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Card
                key={project.id}
                className="group bg-quantum-card border-quantum-border hover:border-quantum-primary transition-all duration-300 hover:quantum-glow overflow-hidden cursor-pointer"
              >
                <div className="relative">
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
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
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-quantum-primary/20 text-quantum-primary text-xs">
                      Featured
                    </Badge>
                  </div>
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
                    <div className="flex items-center space-x-4 text-sm text-quantum-muted">
                      <div className="flex items-center space-x-1">
                        <Star size={14} />
                        <span>{project.stats.stars}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitFork size={14} />
                        <span>{project.stats.forks}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye size={14} />
                        <span>{project.stats.views}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {project.liveUrl && (
                        <Button size="sm" variant="ghost" className="p-2 hover:text-quantum-primary">
                          <ExternalLink size={16} />
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button size="sm" variant="ghost" className="p-2 hover:text-quantum-primary">
                          <Github size={16} />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-quantum-primary to-quantum-secondary text-quantum-dark quantum-glow"
                  : "bg-quantum-card border border-quantum-border text-quantum-muted hover:border-quantum-primary hover:text-quantum-light"
              }`}
            >
              {category.label}
              <Badge variant="secondary" className="ml-2 bg-quantum-border text-quantum-muted text-xs">
                {category.count}
              </Badge>
            </button>
          ))}
        </div>

        {/* All Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project) => (
            <Card
              key={project.id}
              className="group bg-quantum-card border-quantum-border hover:border-quantum-primary transition-all duration-300 hover:quantum-glow overflow-hidden cursor-pointer"
            >
              <div className="relative">
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
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
                      <Button size="sm" variant="ghost" className="p-2 hover:text-quantum-primary">
                        <ExternalLink size={14} />
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button size="sm" variant="ghost" className="p-2 hover:text-quantum-primary">
                        <Github size={14} />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {hasMore && (
          <div id="load-more-trigger" className="flex justify-center mt-12">
            {isLoading ? (
              <div className="flex items-center space-x-2 text-quantum-muted">
                <div className="w-6 h-6 border-2 border-quantum-primary border-t-transparent rounded-full animate-spin"></div>
                <span>Loading more projects...</span>
              </div>
            ) : (
              <Button
                onClick={loadMoreProjects}
                variant="outline"
                className="border-quantum-border hover:border-quantum-primary text-quantum-muted hover:text-quantum-primary bg-transparent"
              >
                Load More Projects
              </Button>
            )}
          </div>
        )}

        {/* Project Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-quantum-card border-quantum-border text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold quantum-gradient-text">{projects.length}</div>
              <div className="text-quantum-muted">Total Projects</div>
            </div>
          </Card>
          <Card className="p-6 bg-quantum-card border-quantum-border text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold quantum-gradient-text">
                {projects.reduce((acc, p) => acc + p.stats.stars, 0)}
              </div>
              <div className="text-quantum-muted">GitHub Stars</div>
            </div>
          </Card>
          <Card className="p-6 bg-quantum-card border-quantum-border text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold quantum-gradient-text">
                {projects.filter((p) => p.status === "completed").length}
              </div>
              <div className="text-quantum-muted">Completed</div>
            </div>
          </Card>
          <Card className="p-6 bg-quantum-card border-quantum-border text-center">
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
  )
}
