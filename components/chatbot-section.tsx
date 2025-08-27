"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "./ui/tooltip"
import { X, MessageCircle, Bot, Send, User, Loader2 } from "lucide-react"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function ChatbotSection() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm Biju's AI assistant. I can help you learn about his projects, skills, and experience. What would you like to know?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isChatbotOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isChatbotOpen])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages.slice(-5), // Send last 5 messages for context
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error("No response body")
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "",
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      const decoder = new TextDecoder()
      let done = false

      while (!done) {
        const { value, done: readerDone } = await reader.read()
        done = readerDone

        if (value) {
          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split("\n")

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6)
              if (data === "[DONE]") {
                done = true
                break
              }

              try {
                const parsed = JSON.parse(data)
                if (parsed.token) {
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantMessage.id ? { ...msg, content: msg.content + parsed.token } : msg,
                    ),
                  )
                }
              } catch (e) {
                // Ignore parsing errors for partial chunks
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble connecting right now. Please try again later or contact Biju directly.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickQuestions = [
    "What are Biju's main technical skills?",
    "Tell me about his recent projects",
    "What programming languages does he use?",
    "How can I contact Biju for work?",
    "What's his experience with AI/ML?",
  ]

  return (
    <>
      <section id="chatbot" className="py-20 bg-quantum-dark/50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-quantum-light mb-4">AI Assistant</h2>
            <p className="text-quantum-light/70 text-lg max-w-2xl mx-auto">
              Interact with my AI-powered chatbot to learn more about my projects, skills, and experience.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-quantum-dark/30 backdrop-blur-sm rounded-2xl border border-quantum-primary/20 p-8 hover:border-quantum-primary/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-quantum-primary/20 to-quantum-secondary/20 rounded-full flex items-center justify-center border border-quantum-primary/30">
                    <Bot className="w-8 h-8 text-quantum-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-quantum-light mb-1">Portfolio Assistant</h3>
                    <p className="text-quantum-light/60 text-lg">Ask me anything about Biju's work and experience</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-quantum-light/50">Powered by Hugging Face</span>
                    </div>
                  </div>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => setIsChatbotOpen(true)}
                        size="lg"
                        className="bg-gradient-to-r from-quantum-primary to-quantum-secondary hover:from-quantum-primary/80 hover:to-quantum-secondary/80 text-quantum-dark font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                      >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Start Conversation
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Open the AI assistant in a focused modal</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-quantum-primary/20">
                <div className="text-center p-4 bg-quantum-primary/5 rounded-lg">
                  <h4 className="text-quantum-light font-semibold mb-2">Ask About Projects</h4>
                  <p className="text-quantum-light/60 text-sm">
                    Get details about my latest work and technologies used
                  </p>
                </div>
                <div className="text-center p-4 bg-quantum-secondary/5 rounded-lg">
                  <h4 className="text-quantum-light font-semibold mb-2">Discuss Skills</h4>
                  <p className="text-quantum-light/60 text-sm">Learn about my technical expertise and experience</p>
                </div>
                <div className="text-center p-4 bg-quantum-accent/5 rounded-lg">
                  <h4 className="text-quantum-light font-semibold mb-2">Career Insights</h4>
                  <p className="text-quantum-light/60 text-sm">Discover my professional journey and achievements</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-quantum-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-quantum-primary/5 rounded-full blur-3xl"></div>
      </section>

      {isChatbotOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-4xl h-[80vh] bg-quantum-dark/95 backdrop-blur-md rounded-2xl border border-quantum-primary/30 shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-quantum-primary/20 bg-quantum-dark/50 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-quantum-primary/20 to-quantum-secondary/20 rounded-full flex items-center justify-center border border-quantum-primary/30">
                  <Bot className="w-5 h-5 text-quantum-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-quantum-light">AI Portfolio Assistant</h3>
                  <p className="text-quantum-light/60 text-sm">Powered by Hugging Face • Ask me anything!</p>
                </div>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => setIsChatbotOpen(false)}
                      variant="ghost"
                      size="sm"
                      className="text-quantum-light/60 hover:text-quantum-light hover:bg-quantum-primary/10 rounded-full p-2"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Close chatbot</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Quick Questions */}
            {messages.length <= 1 && (
              <div className="p-4 border-b border-quantum-primary/10 bg-quantum-dark/30 flex-shrink-0">
                <p className="text-quantum-light/60 text-sm mb-3">Quick questions to get started:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInputMessage(question)
                        inputRef.current?.focus()
                      }}
                      className="text-xs px-3 py-2 rounded-full bg-quantum-card border border-quantum-border hover:border-quantum-primary hover:bg-quantum-primary/10 transition-all duration-200 text-quantum-muted hover:text-quantum-primary"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 bg-gradient-to-br from-quantum-primary/20 to-quantum-secondary/20 rounded-full flex items-center justify-center border border-quantum-primary/30 flex-shrink-0">
                      <Bot className="w-4 h-4 text-quantum-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-quantum-primary to-quantum-secondary text-quantum-dark"
                        : "bg-quantum-card border border-quantum-border text-quantum-light"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p
                      className={`text-xs mt-2 ${
                        message.role === "user" ? "text-quantum-dark/70" : "text-quantum-muted"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 bg-gradient-to-br from-quantum-accent/20 to-quantum-primary/20 rounded-full flex items-center justify-center border border-quantum-accent/30 flex-shrink-0">
                      <User className="w-4 h-4 text-quantum-accent" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-quantum-primary/20 to-quantum-secondary/20 rounded-full flex items-center justify-center border border-quantum-primary/30 flex-shrink-0">
                    <Bot className="w-4 h-4 text-quantum-primary" />
                  </div>
                  <div className="bg-quantum-card border border-quantum-border text-quantum-light p-4 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-quantum-primary" />
                      <span className="text-quantum-muted">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-quantum-primary/20 bg-quantum-dark/50 flex-shrink-0">
              <div className="flex gap-3">
                <Input
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about Biju's work..."
                  className="flex-1 bg-quantum-darker border-quantum-border text-quantum-light placeholder:text-quantum-muted"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-gradient-to-r from-quantum-primary to-quantum-secondary hover:from-quantum-primary/80 hover:to-quantum-secondary/80 text-quantum-dark px-6"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
