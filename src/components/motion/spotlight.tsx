"use client"

import * as React from "react"

interface SpotlightProps {
  className?: string
  /** Radius of the spotlight glow in pixels */
  radius?: number
}

export function Spotlight({ className = "", radius = 300 }: SpotlightProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Check for reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      container.style.setProperty("--spotlight-x", `${x}px`)
      container.style.setProperty("--spotlight-y", `${y}px`)
      container.style.setProperty("--spotlight-opacity", "1")
    }

    const handleMouseLeave = () => {
      container.style.setProperty("--spotlight-opacity", "0")
    }

    // Listen on the parent element
    const parent = container.parentElement
    if (!parent) return

    parent.addEventListener("mousemove", handleMouseMove)
    parent.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      parent.removeEventListener("mousemove", handleMouseMove)
      parent.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500 ${className}`}
      style={{
        opacity: "var(--spotlight-opacity, 0)",
        background: `radial-gradient(${radius}px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), var(--glow-primary), transparent 60%)`,
      }}
      aria-hidden
    />
  )
}
