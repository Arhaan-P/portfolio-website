"use client"

import * as React from "react"

interface AuroraBackgroundProps {
  className?: string
  /** Constrain the aurora to a height instead of full viewport */
  height?: string
}

export function AuroraBackground({ className = "", height }: AuroraBackgroundProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
      style={height ? { height, position: "absolute", top: 0 } : undefined}
      aria-hidden
    >
      {/* Primary orb — cyan/blue */}
      <div
        className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full opacity-[0.15]"
        style={{
          background: "radial-gradient(circle, var(--aurora-1) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "aurora-shift 12s ease-in-out infinite",
        }}
      />

      {/* Secondary orb — violet/purple */}
      <div
        className="absolute -top-1/6 -right-1/4 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full opacity-[0.12]"
        style={{
          background: "radial-gradient(circle, var(--aurora-2) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "aurora-shift 15s ease-in-out infinite reverse",
          animationDelay: "-5s",
        }}
      />

      {/* Tertiary orb — teal accent */}
      <div
        className="absolute top-1/3 left-1/3 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full opacity-[0.10]"
        style={{
          background: "radial-gradient(circle, var(--aurora-3) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "aurora-shift 18s ease-in-out infinite",
          animationDelay: "-10s",
        }}
      />

      {/* Radial fade mask at bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, transparent 50%, var(--background) 100%)",
        }}
      />
    </div>
  )
}
