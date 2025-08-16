"use client"

import { Button } from "@/components/ui/button"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"

interface ChatbotPanelProps {
  onClose: () => void
  isOpen: boolean
}

export function ChatbotPanel({ onClose, isOpen }: ChatbotPanelProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-40">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={70} minSize={30}>
          <div className="h-full" onClick={onClose} />
        </Panel>
        <PanelResizeHandle className="w-2 bg-quantum-border hover:bg-quantum-primary transition-colors" />
        <Panel defaultSize={30} minSize={20} className="bg-quantum-card p-4">
          <Button onClick={onClose} variant="ghost" className="absolute top-4 right-4">
            Close
          </Button>
          <h3 className="text-2xl font-bold mb-4 text-quantum-primary">Chatbot</h3>
          <iframe
            src="https://kiriyagami-chatbot.hf.space"
            width="100%"
            height="90%"
            style={{ border: "none", borderRadius: "8px" }}
          ></iframe>
        </Panel>
      </PanelGroup>
    </div>
  )
}