"use client"

import { useState } from "react"
import { CtfChallengeModal } from "./ctf-challenge-modal"
import { Button } from "./ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "./ui/tooltip"

export function CtfSection() {
  const [isCtfOpen, setIsCtfOpen] = useState(false)

  return (
    <section id="ctf" className="py-20 bg-quantum-dark/30 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-quantum-light mb-4">Security Challenge</h2>
          <p className="text-quantum-light/70 text-lg max-w-2xl mx-auto">
            Test your cybersecurity skills with interactive challenges and puzzles.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-quantum-dark/40 backdrop-blur-sm rounded-2xl border border-quantum-accent/20 p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-quantum-light mb-4">Capture The Flag</h3>
                <p className="text-quantum-light/70 mb-6">
                  Dive into cybersecurity challenges including cryptography, reverse engineering, and web security.
                  Perfect for testing your hacking skills in a safe environment.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-quantum-accent/20 text-quantum-accent rounded-full text-sm">
                    Cryptography
                  </span>
                  <span className="px-3 py-1 bg-quantum-accent/20 text-quantum-accent rounded-full text-sm">ROT13</span>
                  <span className="px-3 py-1 bg-quantum-accent/20 text-quantum-accent rounded-full text-sm">
                    Puzzles
                  </span>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => setIsCtfOpen(true)}
                        className="bg-quantum-accent hover:bg-quantum-accent/80 text-white"
                      >
                        🔐 Start Challenge
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Launch the CTF challenge interface</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="relative">
                <div className="bg-quantum-dark/60 rounded-xl p-6 border border-quantum-accent/30">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-quantum-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">🛡️</span>
                    </div>
                    <h4 className="text-lg font-semibold text-quantum-light mb-2">Security First</h4>
                    <p className="text-quantum-light/60 text-sm">Learn cybersecurity through hands-on challenges</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isCtfOpen && <CtfChallengeModal onClose={() => setIsCtfOpen(false)} />}

      {/* Background Effects */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-quantum-accent/5 rounded-full blur-3xl"></div>
    </section>
  )
}
