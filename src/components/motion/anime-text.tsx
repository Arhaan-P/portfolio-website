"use client"

import React, { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "@/lib/use-reduced-motion"
import anime from "animejs"

interface AnimeTextProps {
  strings: readonly string[]
  className?: string
  pause?: number
}

export function AnimeText({ strings, className = "", pause = 2500 }: AnimeTextProps) {
  const [index, setIndex] = useState(0)
  const containerRef = useRef<HTMLSpanElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Reduced motion: still cycle through the roles (they're content, not
  // decoration) but swap the text instantly instead of flying characters in.
  useEffect(() => {
    if (!shouldReduceMotion || strings.length <= 1) return
    const id = setInterval(() => setIndex((prev) => prev + 1), pause)
    return () => clearInterval(id)
  }, [shouldReduceMotion, strings.length, pause])

  // The container is written imperatively in both modes (React renders no
  // children), so flipping modes after mount can't leave stale nodes behind.
  useEffect(() => {
    if (!shouldReduceMotion || !containerRef.current || strings.length === 0) return
    containerRef.current.textContent = strings[index % strings.length]
  }, [shouldReduceMotion, strings, index])

  useEffect(() => {
    if (shouldReduceMotion) return
    if (!containerRef.current) return
    if (strings.length === 0) return

    const currentString = strings[index % strings.length]
    // Clear previous children
    containerRef.current.innerHTML = ""

    // Split text into characters and create spans
    const chars = currentString.split("").map((char) => {
      const span = document.createElement("span")
      span.innerHTML = char === " " ? "&nbsp;" : char
      span.style.display = "inline-block"
      span.style.opacity = "0"
      span.style.transform = "translateY(50px) rotateX(-60deg)"
      containerRef.current?.appendChild(span)
      return span
    })

    const tl = anime.timeline({
      easing: "spring(1, 80, 10, 0)",
    })

    // Reveal animation
    tl.add({
      targets: chars,
      translateY: [50, 0],
      rotateX: [-60, 0],
      opacity: [0, 1],
      delay: anime.stagger(40),
    })

    // Hide animation
    tl.add({
      targets: chars,
      translateY: [0, -50],
      rotateX: [0, 60],
      opacity: [1, 0],
      easing: "easeInQuad",
      duration: 300,
      delay: anime.stagger(20, { start: pause }),
      complete: () => {
        setIndex((prev) => prev + 1)
      },
    })

    return () => {
      anime.remove(chars)
    }
  }, [index, strings, pause, shouldReduceMotion])

  // The visual text is rebuilt every few seconds, so screen readers get the
  // full role list once instead of a stream of changing fragments.
  return (
    <>
      <span
        ref={containerRef}
        aria-hidden="true"
        className={`inline-flex flex-wrap items-center justify-center ${className}`}
        style={shouldReduceMotion ? undefined : { perspective: "1000px" }}
      />
      <span className="sr-only">{strings.join(", ")}</span>
    </>
  )
}
