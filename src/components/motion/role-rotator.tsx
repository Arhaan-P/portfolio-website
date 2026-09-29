"use client"

import { useEffect, useState } from "react"

interface RoleRotatorProps {
  strings: readonly string[]
  className?: string
  pause?: number
}

/**
 * Cycles through the roles with an instant swap: no letter animation, so
 * nothing moves at rest. The first role is in the server HTML.
 */
export function RoleRotator({ strings, className = "", pause = 2500 }: RoleRotatorProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (strings.length <= 1) return
    const id = setInterval(() => setIndex((prev) => prev + 1), pause)
    return () => clearInterval(id)
  }, [strings.length, pause])

  const current = strings.length ? strings[index % strings.length] : ""

  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      {current}
    </span>
  )
}
