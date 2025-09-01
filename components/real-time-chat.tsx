"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { MessageCircle, Send, X, User, Clock, CheckCircle2, Circle, Minimize2, Maximize2 } from "lucide-react"

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

interface OnlineStatus {
  online: boolean
  lastSeen: string
}

export function RealTimeChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [onlineStatus, setOnlineStatus] = useState<OnlineStatus>({ online: false, lastSeen: "" })
  const [visitorId] = useState(() => `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
  const [visitorName, setVisitorName] = useState("")
  const [visitorEmail, setVisitorEmail] = useState("")
  const [showContactForm, setShowContactForm] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const pollIntervalRef = useRef<NodeJS.Timeout>()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Check online status
  const checkOnlineStatus = async () => {
    try {
      const response = await fetch("/api/chat?action=status")
      const data = await response.json()
      setOnlineStatus(data)
    } catch (error) {
      console.error("Failed to check online status:", error)
    }
  }

  // Fetch messages
  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/chat?action=messages&visitorId=${visitorId}`)
      const data = await response.json()
      if (data.messages) {
        setMessages(data.messages)

        // Count unread admin messages
        const unread = data.messages.filter((msg: ChatMessage) => msg.sender === "admin" && !msg.read).length
        setUnreadCount(unread)
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error)
    }
  }

  // Send message
  const sendMessage = async () => {
    if (!newMessage.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "send-message",
          message: newMessage,
          visitorId,
          visitorName: visitorName || "Anonymous",
          visitorEmail: visitorEmail || undefined,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setNewMessage("")
        fetchMessages()
      }
    } catch (error) {
      console.error("Failed to send message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Start chat with contact info
  const startChat = () => {
    if (!visitorName.trim()) return
    setShowContactForm(false)
    fetchMessages()
  }

  // Polling for new messages and status
  useEffect(() => {
    if (isOpen && !showContactForm) {
      checkOnlineStatus()
      fetchMessages()

      pollIntervalRef.current = setInterval(() => {
        checkOnlineStatus()
        fetchMessages()
      }, 3000) // Poll every 3 seconds
    }

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current)
      }
    }
  }, [isOpen, showContactForm, visitorId])

  // Initial status check
  useEffect(() => {
    checkOnlineStatus()
    const interval = setInterval(checkOnlineStatus, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatLastSeen = (lastSeen: string) => {
    const date = new Date(lastSeen)
    const now = new Date()
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffMinutes < 1) return "Just now"
    if (diffMinutes < 60) return `${diffMinutes}m ago`
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`
    return date.toLocaleDateString()
  }

  return (
    <TooltipProvider>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setIsOpen(true)}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-quantum-primary to-quantum-secondary hover:opacity-90 shadow-2xl quantum-glow relative"
              >
                <MessageCircle className="w-6 h-6 text-quantum-dark" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-quantum-danger text-white text-xs flex items-center justify-center">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <div className="flex items-center gap-2">
                <Circle
                  size={8}
                  className={`${onlineStatus.online ? "text-green-400 fill-green-400" : "text-gray-400 fill-gray-400"}`}
                />
                <span>
                  {onlineStatus.online
                    ? "I'm online! Chat with me"
                    : `Last seen ${formatLastSeen(onlineStatus.lastSeen)}`}
                </span>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] flex flex-col">
          <Card className="flex-1 bg-quantum-card border-quantum-border shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-quantum-border bg-quantum-darker">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-quantum-primary to-quantum-secondary flex items-center justify-center">
                  <User className="w-5 h-5 text-quantum-dark" />
                </div>
                <div>
                  <h3 className="font-semibold text-quantum-light">Biju Damian</h3>
                  <div className="flex items-center gap-1 text-xs">
                    <Circle
                      size={6}
                      className={`${onlineStatus.online ? "text-green-400 fill-green-400 animate-pulse" : "text-gray-400 fill-gray-400"}`}
                    />
                    <span className="text-quantum-muted">
                      {onlineStatus.online ? "Online" : `Last seen ${formatLastSeen(onlineStatus.lastSeen)}`}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-quantum-muted hover:text-quantum-light p-1"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-quantum-muted hover:text-quantum-light p-1"
                >
                  <X size={16} />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Contact Form */}
                {showContactForm && (
                  <div className="p-4 space-y-4">
                    <div className="text-center">
                      <h4 className="font-semibold text-quantum-light mb-2">Start a conversation</h4>
                      <p className="text-sm text-quantum-muted">Let me know who you are!</p>
                    </div>
                    <div className="space-y-3">
                      <Input
                        placeholder="Your name *"
                        value={visitorName}
                        onChange={(e) => setVisitorName(e.target.value)}
                        className="bg-quantum-darker border-quantum-border text-quantum-light"
                      />
                      <Input
                        placeholder="Your email (optional)"
                        type="email"
                        value={visitorEmail}
                        onChange={(e) => setVisitorEmail(e.target.value)}
                        className="bg-quantum-darker border-quantum-border text-quantum-light"
                      />
                      <Button
                        onClick={startChat}
                        disabled={!visitorName.trim()}
                        className="w-full bg-gradient-to-r from-quantum-primary to-quantum-secondary text-quantum-dark"
                      >
                        Start Chat
                      </Button>
                    </div>
                  </div>
                )}

                {/* Messages */}
                {!showContactForm && (
                  <>
                    <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-80">
                      {messages.length === 0 && (
                        <div className="text-center text-quantum-muted text-sm py-8">
                          <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>Start the conversation!</p>
                        </div>
                      )}

                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "visitor" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.sender === "visitor"
                                ? "bg-gradient-to-r from-quantum-primary to-quantum-secondary text-quantum-dark"
                                : "bg-quantum-darker text-quantum-light border border-quantum-border"
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                              {message.sender === "visitor" && (
                                <CheckCircle2
                                  size={12}
                                  className={`${message.read ? "text-quantum-accent" : "opacity-50"}`}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t border-quantum-border">
                      <div className="flex gap-2">
                        <Input
                          placeholder={onlineStatus.online ? "Type a message..." : "I'm offline, but I'll reply soon!"}
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                          className="bg-quantum-darker border-quantum-border text-quantum-light"
                          disabled={isLoading}
                        />
                        <Button
                          onClick={sendMessage}
                          disabled={!newMessage.trim() || isLoading}
                          className="bg-quantum-primary hover:bg-quantum-primary/90 text-quantum-dark"
                        >
                          <Send size={16} />
                        </Button>
                      </div>
                      {!onlineStatus.online && (
                        <p className="text-xs text-quantum-muted mt-2 flex items-center gap-1">
                          <Clock size={12} />
                          I'm currently offline, but I'll respond as soon as I'm back!
                        </p>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
          </Card>
        </div>
      )}
    </TooltipProvider>
  )
}
