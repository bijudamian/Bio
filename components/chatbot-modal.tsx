"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ChatbotModalProps {
  onClose: () => void
}

export function ChatbotModal({ onClose }: ChatbotModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <Card className="p-8 bg-quantum-card border-quantum-border text-white w-full max-w-2xl h-4/5">
        <h3 className="text-2xl font-bold mb-4 text-quantum-primary">Chatbot</h3>
        <iframe
          src="https://kiriyagami-chatbot.hf.space"
          width="100%"
          height="90%"
          style={{ border: "none", borderRadius: "8px" }}
        ></iframe>
        <Button onClick={onClose} variant="ghost" className="absolute top-4 right-4">
          Close
        </Button>
      </Card>
    </div>
  )
}