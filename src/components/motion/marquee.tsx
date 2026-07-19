"use client"

import * as React from "react"

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  /** Animation speed in seconds for one full cycle */
  speed?: number
  /** Reverse direction */
  reverse?: boolean
  /** Pause on hover */
  pauseOnHover?: boolean
}

export function Marquee({
  children,
  className = "",
  speed = 30,
  reverse = false,
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={`group flex overflow-hidden [--gap:1rem] ${className}`}
      style={{ "--speed": `${speed}s` } as React.CSSProperties}
    >
      <div
        className={`flex shrink-0 items-center gap-[var(--gap)] ${
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
        }`}
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} var(--speed) linear infinite`,
        }}
      >
        {children}
      </div>
      {/* Duplicate for seamless loop */}
      <div
        className={`flex shrink-0 items-center gap-[var(--gap)] ${
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
        }`}
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} var(--speed) linear infinite`,
        }}
        aria-hidden
      >
        {children}
      </div>
    </div>
  )
}
