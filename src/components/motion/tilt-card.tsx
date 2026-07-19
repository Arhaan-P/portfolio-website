"use client"

import * as React from "react"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  /** Maximum tilt angle in degrees */
  maxTilt?: number
  /** Show glare overlay */
  glare?: boolean
  /** Glare max opacity */
  glareOpacity?: number
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 8,
  glare = true,
  glareOpacity = 0.15,
}: TiltCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = React.useState(false)
  const reducedMotion = React.useRef(false)

  React.useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }, [])

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion.current || !cardRef.current) return

      const rect = cardRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width  // 0 to 1
      const y = (e.clientY - rect.top) / rect.height   // 0 to 1

      const rotateX = (0.5 - y) * maxTilt * 2   // tilt up/down
      const rotateY = (x - 0.5) * maxTilt * 2   // tilt left/right

      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`

      // Update glare position
      if (glare) {
        cardRef.current.style.setProperty("--glare-x", `${x * 100}%`)
        cardRef.current.style.setProperty("--glare-y", `${y * 100}%`)
      }
    },
    [maxTilt, glare]
  )

  const handleMouseLeave = React.useCallback(() => {
    if (!cardRef.current) return
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    setIsHovered(false)
  }, [])

  const handleMouseEnter = React.useCallback(() => {
    setIsHovered(true)
  }, [])

  return (
    <div
      ref={cardRef}
      className={`relative transition-transform duration-200 ease-out ${className}`}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {children}
      {/* Glare overlay */}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,255,255,${glareOpacity}), transparent 60%)`,
          }}
          aria-hidden
        />
      )}
    </div>
  )
}
