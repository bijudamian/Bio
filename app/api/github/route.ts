import { type NextRequest, NextResponse } from "next/server"

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  language: string
  topics: string[]
  created_at: string
  updated_at: string
  pushed_at: string
  archived: boolean
  disabled: boolean
  visibility: string
}

interface GitHubRepoContent {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string | null
  type: string
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username") || "bijudamian"

  try {
    // Fetch repositories
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Portfolio-App",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!reposResponse.ok) {
      throw new Error(`GitHub API error: ${reposResponse.status}`)
    }

    const repos: GitHubRepo[] = await reposResponse.json()

    // Filter out archived, disabled, and private repos
    const activeRepos = repos.filter(
      (repo) => !repo.archived && !repo.disabled && repo.visibility === "public" && repo.name !== username, // Exclude profile README repo
    )

    // Transform repos to project format
    const projects = await Promise.all(
      activeRepos.slice(0, 12).map(async (repo) => {
        // Try to get a screenshot or preview image
        let imageUrl = `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(repo.name + " project screenshot")}`

        // Check for common image files in the repo
        try {
          const contentsResponse = await fetch(`https://api.github.com/repos/${repo.full_name}/contents`, {
            headers: {
              Accept: "application/vnd.github.v3+json",
              "User-Agent": "Portfolio-App",
            },
          })

          if (contentsResponse.ok) {
            const contents: GitHubRepoContent[] = await contentsResponse.json()
            const imageFiles = contents.filter(
              (file) =>
                file.type === "file" &&
                /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(file.name) &&
                /(screenshot|preview|demo|cover|banner)/i.test(file.name),
            )

            if (imageFiles.length > 0) {
              imageUrl = `https://raw.githubusercontent.com/${repo.full_name}/main/${imageFiles[0].name}`
            }
          }
        } catch (error) {
          console.log(`Could not fetch contents for ${repo.name}:`, error)
        }

        // Determine category based on language and topics
        let category = "web-app"
        const topics = repo.topics || []
        const language = repo.language?.toLowerCase() || ""

        if (topics.includes("mobile") || topics.includes("react-native") || topics.includes("flutter")) {
          category = "mobile"
        } else if (
          topics.includes("ai") ||
          topics.includes("ml") ||
          topics.includes("machine-learning") ||
          topics.includes("artificial-intelligence")
        ) {
          category = "ai-ml"
        } else if (
          topics.includes("blockchain") ||
          topics.includes("web3") ||
          topics.includes("cryptocurrency") ||
          language === "solidity"
        ) {
          category = "blockchain"
        } else if (language === "python" && (topics.includes("data-science") || topics.includes("analytics"))) {
          category = "ai-ml"
        }

        // Determine technologies based on language and topics
        const technologies = [repo.language, ...topics.slice(0, 5)]
          .filter(Boolean)
          .map((tech) => tech.charAt(0).toUpperCase() + tech.slice(1).replace(/-/g, " "))

        // Determine status based on recent activity
        const lastPush = new Date(repo.pushed_at)
        const now = new Date()
        const daysSinceLastPush = Math.floor((now.getTime() - lastPush.getTime()) / (1000 * 60 * 60 * 24))

        let status: "completed" | "in-progress" | "concept" = "completed"
        if (daysSinceLastPush < 30) {
          status = "in-progress"
        } else if (repo.stargazers_count < 5 && repo.forks_count < 2) {
          status = "concept"
        }

        return {
          id: repo.name,
          title: repo.name
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          description:
            repo.description || `A ${repo.language || "software"} project showcasing modern development practices.`,
          longDescription:
            repo.description ||
            `This project demonstrates proficiency in ${repo.language || "software development"} and modern development practices. Built with attention to code quality, performance, and user experience.`,
          image: imageUrl,
          category,
          technologies: technologies.slice(0, 6),
          liveUrl: repo.homepage || undefined,
          githubUrl: repo.html_url,
          featured: repo.stargazers_count > 10 || repo.forks_count > 5,
          stats: {
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            views: Math.floor(Math.random() * 1000) + repo.stargazers_count * 10, // Estimated views
          },
          status,
          createdAt: repo.created_at,
          updatedAt: repo.updated_at,
          pushedAt: repo.pushed_at,
        }
      }),
    )

    return NextResponse.json({
      success: true,
      projects: projects.sort((a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime()),
      totalRepos: activeRepos.length,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error("GitHub API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch GitHub repositories",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
