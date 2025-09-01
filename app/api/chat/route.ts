import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

interface ChatMessage {
  id: string
  message: string
  sender: "visitor" | "admin"
  timestamp: string
  visitorId: string
  visitorName?: string
  visitorEmail?: string
  read: boolean
}

// In-memory storage for demo (in production, use a database)
let chatMessages: ChatMessage[] = []
let onlineStatus = true
let lastActivity = new Date()

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get("action")
  const visitorId = searchParams.get("visitorId")

  try {
    switch (action) {
      case "status":
        // Check if admin is online (last activity within 5 minutes)
        const isOnline = Date.now() - lastActivity.getTime() < 5 * 60 * 1000
        return NextResponse.json({
          online: isOnline && onlineStatus,
          lastSeen: lastActivity.toISOString(),
        })

      case "messages":
        if (!visitorId) {
          return NextResponse.json({ error: "Visitor ID required" }, { status: 400 })
        }

        const visitorMessages = chatMessages.filter((msg) => msg.visitorId === visitorId)
        return NextResponse.json({ messages: visitorMessages })

      case "admin-messages":
        const { userId } = await auth()
        if (!userId) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // Update admin activity
        lastActivity = new Date()

        // Group messages by visitor
        const messagesByVisitor = chatMessages.reduce(
          (acc, msg) => {
            if (!acc[msg.visitorId]) {
              acc[msg.visitorId] = []
            }
            acc[msg.visitorId].push(msg)
            return acc
          },
          {} as Record<string, ChatMessage[]>,
        )

        return NextResponse.json({
          conversations: messagesByVisitor,
          totalUnread: chatMessages.filter((msg) => !msg.read && msg.sender === "visitor").length,
        })

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, message, visitorId, visitorName, visitorEmail } = body

    switch (action) {
      case "send-message":
        if (!message || !visitorId) {
          return NextResponse.json({ error: "Message and visitor ID required" }, { status: 400 })
        }

        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          message,
          sender: "visitor",
          timestamp: new Date().toISOString(),
          visitorId,
          visitorName,
          visitorEmail,
          read: false,
        }

        chatMessages.push(newMessage)

        return NextResponse.json({
          success: true,
          message: newMessage,
          online: Date.now() - lastActivity.getTime() < 5 * 60 * 1000,
        })

      case "admin-reply":
        const { userId } = await auth()
        if (!userId) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        if (!message || !visitorId) {
          return NextResponse.json({ error: "Message and visitor ID required" }, { status: 400 })
        }

        const adminReply: ChatMessage = {
          id: Date.now().toString(),
          message,
          sender: "admin",
          timestamp: new Date().toISOString(),
          visitorId,
          read: false,
        }

        chatMessages.push(adminReply)
        lastActivity = new Date()

        return NextResponse.json({ success: true, message: adminReply })

      case "mark-read":
        const { messageIds } = body
        if (messageIds && Array.isArray(messageIds)) {
          chatMessages = chatMessages.map((msg) => (messageIds.includes(msg.id) ? { ...msg, read: true } : msg))
        }

        return NextResponse.json({ success: true })

      case "set-status":
        const { userId: adminId } = await auth()
        if (!adminId) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        onlineStatus = body.online ?? true
        lastActivity = new Date()

        return NextResponse.json({ success: true, online: onlineStatus })

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
