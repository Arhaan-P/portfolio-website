"use client"

import * as React from "react"

interface GridPatternProps {
  className?: string
  /** Size of each grid cell in pixels */
  cellSize?: number
  /** Dot radius in pixels */
  dotRadius?: number
}

export function GridPattern({
  className = "",
  cellSize = 32,
  dotRadius = 1,
}: GridPatternProps) {
  const id = React.useId()

  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`} aria-hidden>
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={`grid-${id}`}
            x="0"
            y="0"
            width={cellSize}
            height={cellSize}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={cellSize / 2}
              cy={cellSize / 2}
              r={dotRadius}
              fill="var(--grid-dot)"
            />
          </pattern>
          <radialGradient id={`fade-${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id={`mask-${id}`}>
            <rect width="100%" height="100%" fill={`url(#fade-${id})`} />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#grid-${id})`}
          mask={`url(#mask-${id})`}
        />
      </svg>
    </div>
  )
}
