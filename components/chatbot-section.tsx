"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "./ui/tooltip"
import { X, MessageCircle, Bot } from "lucide-react"

export function ChatbotSection() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  return (
    <>
      <section id="chatbot" className="py-20 bg-quantum-dark/50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-quantum-light mb-4">AI Assistant</h2>
            <p className="text-quantum-light/70 text-lg max-w-2xl mx-auto">
              Explore my collection of AI-powered bots — from fitness and lifestyle coaching to professional coding assistants. Each bot is designed to solve problems, answer questions, and make life a little easier.
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
                    <h3 className="text-2xl font-semibold text-quantum-light mb-1">Multi-Agent AI</h3>
                    <p className="text-quantum-light/60 text-lg my-2">Switch between specialized assistants like Fitness Coach, Career Mentor, or Code Expert </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-quantum-light/50 my-0.5">Powered by Hugging Face</span>
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
                  <h4 className="text-quantum-light font-semibold mb-2">Explore Bots </h4>
                  <p className="text-quantum-light/60 text-sm">
                    Discover lifestyle, career, and productivity bots
                  </p>
                </div>
                <div className="text-center p-4 bg-quantum-secondary/5 rounded-lg">
                  <h4 className="text-quantum-light font-semibold mb-2">Code &amp; Tech Help</h4>
                  <p className="text-quantum-light/60 text-sm">Get instant coding or debugging support</p>
                </div>
                <div className="text-center p-4 bg-quantum-accent/5 rounded-lg">
                  <h4 className="text-quantum-light font-semibold mb-2">Life &amp; Wellness</h4>
                  <p className="text-quantum-light/60 text-sm">Chat with fitness, food, and wellness bots</p>
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
          <div className="w-full max-w-4xl h-[80vh] bg-quantum-dark/95 backdrop-blur-md rounded-2xl border border-quantum-primary/30 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-quantum-primary/20 bg-quantum-dark/50">
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

            {/* Chatbot Content */}
            <div className="h-full pb-20">
              <iframe
                src="https://kiritodoroki-thinker-bot.hf.space"
                width="100%"
                height="100%"
                style={{ border: "none" }}
                className="bg-white rounded-b-2xl"
                title="AI Portfolio Assistant"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
