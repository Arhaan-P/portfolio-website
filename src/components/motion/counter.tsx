"use client"

import { useEffect, useRef } from "react"
import { useInView, useMotionValue, useSpring } from "framer-motion"

export function Counter({
  value,
  direction = "up",
  delay = 0,
}: {
  value: number
  direction?: "up" | "down"
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === "down" ? value : 0)
  const springValue = useSpring(motionValue, {
    damping: 40,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value)
      }, delay * 1000)
      return () => clearTimeout(timeout)
    }
  }, [motionValue, isInView, delay, value, direction])

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(
          Math.floor(latest)
        )
      }
    })
  }, [springValue])

  return <span ref={ref} />
}
