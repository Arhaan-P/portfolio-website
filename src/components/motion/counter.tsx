"use client"

import { useEffect, useRef } from "react"
import { useMotionValue, useSpring } from "framer-motion"
import { useScrollReveal } from "@/components/motion/reveal"

const format = (n: number) => Intl.NumberFormat("en-US").format(Math.floor(n))

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
  const from = direction === "down" ? value : 0
  const to = direction === "down" ? 0 : value
  const motionValue = useMotionValue(from)
  const springValue = useSpring(motionValue, {
    damping: 40,
    stiffness: 100,
  })
  const state = useScrollReveal(ref)

  // The final value is always rendered; it only counts up when the reveal was armed.
  useEffect(() => {
    if (state === "static") return
    const write = (n: number) => {
      const text = ref.current?.firstChild
      if (text) text.nodeValue = format(n)
    }
    if (state === "hidden") {
      const frame = requestAnimationFrame(() => write(from))
      return () => cancelAnimationFrame(frame)
    }
    const unsubscribe = springValue.on("change", write)
    const timeout = setTimeout(() => motionValue.set(to), delay * 1000)
    return () => {
      clearTimeout(timeout)
      unsubscribe()
    }
  }, [state, from, to, delay, motionValue, springValue])

  return <span ref={ref}>{format(to)}</span>
}
