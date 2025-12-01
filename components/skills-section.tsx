"use client"

import { motion } from "framer-motion"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"
import { Code2, Sparkles } from "lucide-react"

interface Skill {
  name: string
  icon: string
  color: string
  level: number
}

export function SkillsSection() {
  const frontendSkills: Skill[] = [
    { name: "JavaScript", icon: "JS", color: "from-yellow-400 to-yellow-600", level: 95 },
    { name: "React", icon: "⚛️", color: "from-cyan-400 to-blue-500", level: 92 },
    { name: "Next.js", icon: "N", color: "from-white to-gray-400", level: 90 },
    { name: "TypeScript", icon: "TS", color: "from-blue-500 to-blue-700", level: 88 },
    { name: "Tailwind", icon: "🎨", color: "from-teal-400 to-cyan-500", level: 90 },
    { name: "Vue.js", icon: "V", color: "from-green-400 to-emerald-600", level: 80 },
  ]

  const backendSkills: Skill[] = [
    { name: "Node.js", icon: "🟢", color: "from-green-500 to-green-700", level: 90 },
    { name: "Python", icon: "🐍", color: "from-yellow-400 to-blue-500", level: 87 },
    { name: "MongoDB", icon: "🍃", color: "from-green-500 to-green-700", level: 85 },
    { name: "PostgreSQL", icon: "🐘", color: "from-blue-400 to-blue-600", level: 85 },
    { name: "Redis", icon: "⚡", color: "from-red-500 to-red-700", level: 78 },
    { name: "GraphQL", icon: "◈", color: "from-pink-500 to-purple-600", level: 82 },
  ]

  const toolsSkills: Skill[] = [
    { name: "Docker", icon: "🐳", color: "from-blue-400 to-cyan-500", level: 80 },
    { name: "AWS", icon: "☁️", color: "from-orange-400 to-yellow-500", level: 78 },
    { name: "Git", icon: "📦", color: "from-orange-500 to-red-600", level: 92 },
    { name: "Linux", icon: "🐧", color: "from-yellow-500 to-orange-500", level: 85 },
    { name: "Figma", icon: "🎭", color: "from-purple-400 to-pink-500", level: 75 },
    { name: "Vercel", icon: "▲", color: "from-white to-gray-500", level: 88 },
  ]

  const stats = [
    { label: "Technologies", value: "15+", icon: "🛠️" },
    { label: "Projects", value: "50+", icon: "📁" },
    { label: "Certifications", value: "10+", icon: "🏆" },
    { label: "Years Exp", value: "5+", icon: "⏱️" },
  ]

  return (
    <section id="skills" className="py-24 px-6 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[128px]" />
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
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-mono text-gray-400">Tech Stack</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Skills & </span>
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit built through years of hands-on experience and continuous learning.
          </p>
        </motion.div>

        {/* Infinite Moving Cards - Frontend */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-8">
          <div className="flex items-center gap-2 mb-4 px-4">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-sm font-mono text-gray-500 uppercase tracking-wider">Frontend</span>
          </div>
          <InfiniteMovingCards items={frontendSkills} direction="left" speed="slow" />
        </motion.div>

        {/* Infinite Moving Cards - Backend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4 px-4">
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <span className="text-sm font-mono text-gray-500 uppercase tracking-wider">Backend</span>
          </div>
          <InfiniteMovingCards items={backendSkills} direction="right" speed="slow" />
        </motion.div>

        {/* Infinite Moving Cards - Tools */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-4 px-4">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-sm font-mono text-gray-500 uppercase tracking-wider">Tools & Platforms</span>
          </div>
          <InfiniteMovingCards items={toolsSkills} direction="left" speed="slow" />
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl border border-gray-800/50 bg-gray-900/30 hover:border-cyan-500/30 hover:bg-gray-900/50 transition-all duration-300 text-center"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Personal Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl border border-gray-800/50 bg-gray-900/30"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500 via-purple-500 to-emerald-500 p-[2px]">
                <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center">
                  <span className="text-2xl font-bold font-mono bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    BD
                  </span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-1">Biju Damian</h3>
              <p className="text-gray-400 mb-4">Full-Stack Developer & Problem Solver</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                <a
                  href="mailto:bijucoder@gmail.com"
                  className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <span>📧</span>
                  <span>bijucoder@gmail.com</span>
                </a>
                <a
                  href="https://github.com/bijudamian"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <span>💻</span>
                  <span>@bijudamian</span>
                </a>
                <a
                  href="tel:+918790882114"
                  className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <span>📱</span>
                  <span>+91 8790882114</span>
                </a>
              </div>
            </div>

            {/* Hire Me Button */}
            <div className="flex-shrink-0">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 shadow-lg shadow-cyan-500/20"
              >
                <Sparkles className="w-4 h-4" />
                Hire Me
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
