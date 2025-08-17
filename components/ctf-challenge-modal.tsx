"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CtfChallengeModalProps {
  onClose: () => void
}

export function CtfChallengeModal({ onClose }: CtfChallengeModalProps) {
  const [answer, setAnswer] = useState("")
  const [feedback, setFeedback] = useState("")

  const challenge = {
    text: "Jryy, V'z irel vzcerffrq. Gur cnffjbeq vf 'dhnaghz'.",
    solution: "Well, I'm very impressed. The password is 'quantum'.",
  }

  const handleSubmit = () => {
    if (answer.toLowerCase() === challenge.solution.toLowerCase()) {
      setFeedback("Access Granted!")
      // You could add a toast notification here
      setTimeout(() => {
        onClose()
      }, 1500)
    } else {
      setFeedback("Access Denied. Try again.")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <Card className="p-8 bg-quantum-card border-quantum-border text-white w-full max-w-md">
        <h3 className="text-2xl font-bold mb-4 text-quantum-primary">CTF Challenge: ROT13</h3>
        <p className="text-quantum-muted mb-4">Decrypt the following message:</p>
        <code className="block p-4 rounded bg-quantum-darker mb-4">{challenge.text}</code>
        <div className="flex gap-4">
          <Input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Your answer..."
            className="bg-quantum-darker border-quantum-border"
          />
          <Button onClick={handleSubmit} className="bg-quantum-primary text-quantum-dark">
            Submit
          </Button>
        </div>
        {feedback && (
          <p className={`mt-4 ${feedback.includes("Granted") ? "text-green-400" : "text-red-400"}`}>{feedback}</p>
        )}
        <Button onClick={onClose} variant="ghost" className="absolute top-4 right-4">
          Close
        </Button>
      </Card>
    </div>
  )
}
