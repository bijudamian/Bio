"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

interface InfiniteMovingCardsProps {
  items: {
    name: string
    icon: string
    color: string
    level: number
  }[]
  direction?: "left" | "right"
  speed?: "fast" | "normal" | "slow"
  pauseOnHover?: boolean
  className?: string
}

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: InfiniteMovingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLUListElement>(null)
  const [start, setStart] = useState(false)

  useEffect(() => {
    addAnimation()
  }, [])

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })

      getDirection()
      getSpeed()
      setStart(true)
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards")
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse")
      }
    }
  }

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s")
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s")
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s")
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li
            key={`${item.name}-${idx}`}
            className="group relative w-[200px] max-w-full flex-shrink-0 rounded-2xl border border-gray-800/50 bg-gray-900/50 px-6 py-4 hover:border-cyan-500/30 hover:bg-gray-900/80 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold text-white transition-transform duration-300 group-hover:scale-110",
                  `bg-gradient-to-br ${item.color}`,
                )}
              >
                {item.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  {item.name}
                </p>
                <div className="mt-1 h-1.5 w-full rounded-full bg-gray-800">
                  <div
                    className={cn("h-1.5 rounded-full bg-gradient-to-r", item.color)}
                    style={{ width: `${item.level}%` }}
                  />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
