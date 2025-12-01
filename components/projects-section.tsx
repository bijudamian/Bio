"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowUpRight, Sparkles } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  size: "large" | "medium" | "small"
  gradient: string
}

export function ProjectsSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const projects: Project[] = [
    {
      id: "quantum-dashboard",
      title: "Quantum Analytics Dashboard",
      description:
        "Real-time analytics with AI-powered insights. Built with Next.js, TypeScript, and Tailwind CSS for optimal performance and beautiful visualizations.",
      image: "/analytics-dashboard-dark-theme.png",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Chart.js"],
      liveUrl: "#",
      githubUrl: "https://github.com/bijudamian",
      featured: true,
      size: "large",
      gradient: "from-cyan-500/20 via-blue-500/20 to-purple-500/20",
    },
    {
      id: "ai-content-generator",
      title: "AI Content Generator",
      description: "Platform powered by advanced LLMs and quantum algorithms for intelligent content creation.",
      image: "/ai-content-generation-interface-dark.jpg",
      technologies: ["React", "Node.js", "OpenAI", "MongoDB"],
      liveUrl: "#",
      githubUrl: "https://github.com/bijudamian",
      featured: true,
      size: "medium",
      gradient: "from-purple-500/20 via-pink-500/20 to-red-500/20",
    },
    {
      id: "defi-portfolio",
      title: "DeFi Portfolio Manager",
      description: "Decentralized finance management with real-time tracking and yield optimization.",
      image: "/cryptocurrency-portfolio-dark-theme.jpg",
      technologies: ["Solidity", "Web3.js", "React", "Ethereum"],
      liveUrl: "#",
      githubUrl: "https://github.com/bijudamian",
      featured: true,
      size: "medium",
      gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
    },
    {
      id: "security-ctf",
      title: "Security Challenge (CTF)",
      description: "A cybersecurity platform with crypto puzzles and hacking challenges for learning.",
      image: "/cybersecurity-hacking-terminal-dark.jpg",
      technologies: ["Python", "Docker", "Linux", "Cryptography"],
      liveUrl: "#",
      githubUrl: "https://github.com/bijudamian",
      featured: false,
      size: "small",
      gradient: "from-orange-500/20 via-amber-500/20 to-yellow-500/20",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="projects" className="py-24 px-6 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/50 border border-gray-800 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-mono text-gray-400">Featured Work</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">My </span>
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A showcase of innovative solutions built with modern technologies and creative problem-solving.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[280px]"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
                project.size === "large"
                  ? "md:col-span-2 md:row-span-2"
                  : project.size === "medium"
                    ? "md:row-span-1"
                    : "md:row-span-1"
              }`}
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Border */}
              <div className="absolute inset-0 rounded-2xl border border-gray-800/50 group-hover:border-cyan-500/30 transition-colors duration-300" />

              {/* Content Container */}
              <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm">
                {/* Project Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
                  style={{ backgroundImage: `url(${project.image})` }}
                />

                {/* Content Overlay */}
                <div className="relative z-10 h-full p-6 flex flex-col justify-between">
                  {/* Top Section */}
                  <div className="flex items-start justify-between">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-gray-800/80 text-gray-300 text-xs border-0">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="bg-gray-800/80 text-gray-400 text-xs border-0">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    {project.featured && (
                      <Badge className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs">Featured</Badge>
                    )}
                  </div>

                  {/* Bottom Section */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                      <p
                        className={`text-gray-400 text-sm leading-relaxed ${
                          project.size === "large" ? "line-clamp-3" : "line-clamp-2"
                        }`}
                      >
                        {project.description}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      {project.liveUrl && (
                        <Button
                          size="sm"
                          className="bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg"
                          asChild
                        >
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <span>View Project</span>
                            <ArrowUpRight className="w-4 h-4 ml-1" />
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white bg-transparent rounded-lg"
                          asChild
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-1" />
                            <span>Code</span>
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Border Beam Effect */}
              {hoveredId === project.id && (
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                  <div
                    className="absolute inset-0 rounded-2xl border-2 border-transparent"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, transparent) padding-box, linear-gradient(90deg, #06b6d4, #8b5cf6, #06b6d4) border-box",
                      animation: "borderRotate 3s linear infinite",
                    }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-gray-700 text-gray-300 hover:border-cyan-500 hover:text-cyan-400 bg-transparent px-8 py-6 rounded-xl"
            asChild
          >
            <a href="https://github.com/bijudamian" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 mr-2" />
              View All Projects on GitHub
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
