"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CtfChallengeModal } from "./ctf-challenge-modal"
interface InteractiveSectionProps {
  onOpenChatbot: () => void
}

export function InteractiveSection({ onOpenChatbot }: InteractiveSectionProps) {
  const [isCtfModalOpen, setIsCtfModalOpen] = useState(false)

  return (
    <section id="interactive" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="quantum-gradient-text">Interactive Showcase</span>
          </h2>
          <p className="text-xl text-quantum-muted max-w-3xl mx-auto">
            Engage with these interactive demos to see my skills in action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 bg-quantum-card border-quantum-border text-center">
            <h3 className="text-2xl font-bold quantum-gradient-text mb-4">CTF Challenge</h3>
            <p className="text-quantum-muted mb-6">Test your decryption skills with this fun challenge.</p>
            <Button onClick={() => setIsCtfModalOpen(true)} className="bg-quantum-primary text-quantum-dark">
              Launch CTF
            </Button>
          </Card>
          <Card className="p-8 bg-quantum-card border-quantum-border text-center">
            <h3 className="text-2xl font-bold quantum-gradient-text mb-4">AI Chatbot</h3>
            <p className="text-quantum-muted mb-6">Chat with an AI assistant powered by a Hugging Face model.</p>
            <Button onClick={onOpenChatbot} className="bg-quantum-secondary text-quantum-dark">
              Open Chatbot
            </Button>
          </Card>
        </div>
      </div>

      {isCtfModalOpen && <CtfChallengeModal onClose={() => setIsCtfModalOpen(false)} />}
    </section>
  )
}