"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { MessageCircle, Send, Circle, CheckCircle2, Settings, Users } from "lucide-react"

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

interface Conversation {
  visitorId: string
  messages: ChatMessage[]
  lastMessage: ChatMessage
  unreadCount: number
  visitorName?: string
  visitorEmail?: string
}

export function AdminChatPanel() {
  const { user, isSignedIn } = useUser()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [isOnline, setIsOnline] = useState(true)
  const [totalUnread, setTotalUnread] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Fetch conversations
  const fetchConversations = async () => {
    if (!isSignedIn) return

    try {
      const response = await fetch("/api/chat?action=admin-messages")
      const data = await response.json()

      if (data.conversations) {
        const convs: Conversation[] = Object.entries(data.conversations)
          .map(([visitorId, messages]: [string, any]) => {
            const msgs = messages as ChatMessage[]
            const lastMessage = msgs[msgs.length - 1]
            const unreadCount = msgs.filter((msg) => msg.sender === "visitor" && !msg.read).length

            return {
              visitorId,
              messages: msgs,
              lastMessage,
              unreadCount,
              visitorName: msgs.find((m) => m.visitorName)?.visitorName,
              visitorEmail: msgs.find((m) => m.visitorEmail)?.visitorEmail,
            }
          })
          .sort((a, b) => new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime())

        setConversations(convs)
        setTotalUnread(data.totalUnread || 0)
      }
    } catch (error) {
      console.error("Failed to fetch conversations:", error)
    }
  }

  // Send reply
  const sendReply = async () => {
    if (!newMessage.trim() || !activeConversation) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "admin-reply",
          message: newMessage,
          visitorId: activeConversation,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setNewMessage("")
        fetchConversations()
      }
    } catch (error) {
      console.error("Failed to send reply:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Mark messages as read
  const markAsRead = async (visitorId: string) => {
    const conversation = conversations.find((c) => c.visitorId === visitorId)
    if (!conversation) return

    const unreadMessageIds = conversation.messages
      .filter((msg) => msg.sender === "visitor" && !msg.read)
      .map((msg) => msg.id)

    if (unreadMessageIds.length === 0) return

    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "mark-read",
          messageIds: unreadMessageIds,
        }),
      })
      fetchConversations()
    } catch (error) {
      console.error("Failed to mark messages as read:", error)
    }
  }

  // Toggle online status
  const toggleOnlineStatus = async () => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "set-status",
          online: !isOnline,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setIsOnline(data.online)
      }
    } catch (error) {
      console.error("Failed to update status:", error)
    }
  }

  useEffect(() => {
    if (isSignedIn) {
      fetchConversations()
      const interval = setInterval(fetchConversations, 3000)
      return () => clearInterval(interval)
    }
  }, [isSignedIn])

  useEffect(() => {
    if (activeConversation) {
      markAsRead(activeConversation)
    }
  }, [activeConversation])

  if (!isSignedIn) {
    return null
  }

  const activeConv = conversations.find((c) => c.visitorId === activeConversation)

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <TooltipProvider>
      <div className="fixed bottom-4 left-4 z-50 w-96 h-[600px] flex flex-col">
        <Card className="flex-1 bg-quantum-card border-quantum-border shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-quantum-border bg-quantum-darker">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-quantum-primary to-quantum-secondary flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-quantum-dark" />
              </div>
              <div>
                <h3 className="font-semibold text-quantum-light">Admin Chat</h3>
                <div className="flex items-center gap-2 text-xs">
                  <Button variant="ghost" size="sm" onClick={toggleOnlineStatus} className="p-0 h-auto text-xs">
                    <Circle
                      size={6}
                      className={`mr-1 ${isOnline ? "text-green-400 fill-green-400" : "text-gray-400 fill-gray-400"}`}
                    />
                    <span className="text-quantum-muted">{isOnline ? "Online" : "Offline"}</span>
                  </Button>
                  {totalUnread > 0 && <Badge className="bg-quantum-danger text-white text-xs">{totalUnread}</Badge>}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-quantum-muted hover:text-quantum-light p-1">
                    <Settings size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Chat Settings</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Conversations List */}
          {!activeConversation && (
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Users size={16} className="text-quantum-primary" />
                  <span className="text-sm font-medium text-quantum-light">Conversations ({conversations.length})</span>
                </div>

                {conversations.length === 0 ? (
                  <div className="text-center text-quantum-muted text-sm py-8">
                    <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No conversations yet</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {conversations.map((conv) => (
                      <Card
                        key={conv.visitorId}
                        className="p-3 bg-quantum-darker border-quantum-border hover:border-quantum-primary cursor-pointer transition-all duration-200"
                        onClick={() => setActiveConversation(conv.visitorId)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-quantum-light text-sm">
                                {conv.visitorName || "Anonymous"}
                              </span>
                              {conv.unreadCount > 0 && (
                                <Badge className="bg-quantum-primary text-quantum-dark text-xs">
                                  {conv.unreadCount}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-quantum-muted truncate">{conv.lastMessage.message}</p>
                            <p className="text-xs text-quantum-subtle mt-1">{formatTime(conv.lastMessage.timestamp)}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Active Conversation */}
          {activeConversation && activeConv && (
            <>
              <div className="flex items-center justify-between p-3 border-b border-quantum-border bg-quantum-darker/50">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveConversation(null)}
                    className="text-quantum-muted hover:text-quantum-light p-1"
                  >
                    ←
                  </Button>
                  <div>
                    <span className="font-medium text-quantum-light text-sm">
                      {activeConv.visitorName || "Anonymous"}
                    </span>
                    {activeConv.visitorEmail && <p className="text-xs text-quantum-muted">{activeConv.visitorEmail}</p>}
                  </div>
                </div>
              </div>

              <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-80">
                {activeConv.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "admin" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === "admin"
                          ? "bg-gradient-to-r from-quantum-primary to-quantum-secondary text-quantum-dark"
                          : "bg-quantum-darker text-quantum-light border border-quantum-border"
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                        {message.sender === "admin" && <CheckCircle2 size={12} className="opacity-70" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-quantum-border">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your reply..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && sendReply()}
                    className="bg-quantum-darker border-quantum-border text-quantum-light"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={sendReply}
                    disabled={!newMessage.trim() || isLoading}
                    className="bg-quantum-primary hover:bg-quantum-primary/90 text-quantum-dark"
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </TooltipProvider>
  )
}
