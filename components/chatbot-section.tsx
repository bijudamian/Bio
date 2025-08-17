"use client"

import { useState } from "react"
import { ChatbotPanel } from "./chatbot-panel"
import { Button } from "./ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "./ui/tooltip"

export function ChatbotSection() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  return (
    <section id="chatbot" className="py-20 bg-quantum-dark/50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-quantum-light mb-4">AI Assistant</h2>
          <p className="text-quantum-light/70 text-lg max-w-2xl mx-auto">
            Interact with my AI-powered chatbot to learn more about my projects, skills, and experience.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-quantum-dark/30 backdrop-blur-sm rounded-2xl border border-quantum-primary/20 p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-quantum-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-quantum-light">Portfolio Assistant</h3>
                  <p className="text-quantum-light/60">Ask me anything about Biju's work</p>
                </div>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => setIsChatbotOpen(!isChatbotOpen)}
                      className="bg-quantum-primary hover:bg-quantum-primary/80 text-quantum-dark"
                    >
                      {isChatbotOpen ? "Close Chat" : "Start Chat"}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isChatbotOpen ? "Close the chatbot" : "Open the AI assistant"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {isChatbotOpen && (
              <div className="border-t border-quantum-primary/20 pt-6">
                <ChatbotPanel isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-quantum-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-quantum-primary/5 rounded-full blur-3xl"></div>
    </section>
  )
}
