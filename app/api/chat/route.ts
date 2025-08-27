import type { NextRequest } from "next/server"

export const runtime = "edge"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface ChatRequest {
  message: string
  history: Message[]
}

const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium"

// Portfolio context to help the AI understand Biju's background
const PORTFOLIO_CONTEXT = `
You are Biju Damian's AI portfolio assistant. Here's information about Biju:

PERSONAL INFO:
- Name: Biju Damian
- Email: bijucoder@gmail.com
- Phone: +91 8790882114
- Location: India
- GitHub: https://github.com/bijudamian
- LinkedIn: https://in.linkedin.com/in/biju-damian-24904a271

SKILLS & EXPERTISE:
- Frontend: JavaScript, React, Vue.js, TypeScript, HTML5, CSS3, Tailwind CSS
- Backend: Node.js, Python, MongoDB, PostgreSQL, Express.js
- Tools: Docker, AWS, Git, Figma, VS Code
- Specialties: Full-stack development, UI/UX design, quantum-inspired design, AI/ML integration

PROJECTS:
- Quantum Analytics Dashboard: Real-time analytics with quantum-inspired visualizations
- AI Content Generator: Intelligent content creation platform with GPT integration
- Quantum Fitness Tracker: Cross-platform mobile app with gamification
- DeFi Portfolio Manager: Blockchain-based portfolio management with quantum security
- Quantum E-commerce Platform: Next-gen e-commerce with AI recommendations
- Neural Network Visualizer: Educational tool for understanding neural networks

EXPERIENCE:
- Specializes in creating exceptional digital experiences with cutting-edge technology
- Expert in quantum-inspired design and innovative solutions
- Available for remote opportunities and collaborations
- Passionate about pushing the boundaries of what's possible in web development

Please answer questions about Biju's work, skills, projects, and experience in a helpful and professional manner. Keep responses concise but informative.
`

export async function POST(request: NextRequest) {
  try {
    const { message, history }: ChatRequest = await request.json()

    if (!message?.trim()) {
      return new Response("Message is required", { status: 400 })
    }

    // Build conversation context
    const conversationHistory = history
      .slice(-5) // Last 5 messages for context
      .map((msg) => `${msg.role === "user" ? "Human" : "Assistant"}: ${msg.content}`)
      .join("\n")

    const prompt = `${PORTFOLIO_CONTEXT}

Previous conversation:
${conversationHistory}
`

    // Prepare the request body for Hugging Face API
    const requestBody = {
      inputs: prompt,
    }

    // Fetch response from Hugging Face API
    const response = await fetch(HUGGING_FACE_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch response from Hugging Face API: ${response.statusText}`)
    }

    const data = await response.json()
    const assistantMessage = data[0][0].generated_text.trim()

    // Return the assistant's message as a response
    return new Response(JSON.stringify({ message: assistantMessage }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error in chat route:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
