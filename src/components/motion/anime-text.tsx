"use client"

import { useEffect, useRef, useState } from "react"
import anime from "animejs"
import { useReducedMotion } from "@/lib/use-reduced-motion"

interface AnimeTextProps {
  strings: readonly string[]
  className?: string
  pause?: number
}

/**
 * Rotating line of text. The first string is in the server HTML, and the letters
 * are React-rendered so hydration matches. Screen readers get the current string
 * as plain text; the animated letters are hidden from them.
 */
export function AnimeText({ strings, className = "", pause = 2500 }: AnimeTextProps) {
  const [index, setIndex] = useState(0)
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([])
  const shouldReduceMotion = useReducedMotion()

  const current = strings.length ? strings[index % strings.length] : ""
  const letters = Array.from(current)
  // The first string is shown as rendered; later ones fly in from hidden.
  const startsHidden = index > 0 && !shouldReduceMotion

  // Reduced motion: still cycle through the roles (they're content, not
  // decoration) but swap the text instantly.
  useEffect(() => {
    if (!shouldReduceMotion || strings.length <= 1) return
    const id = setInterval(() => setIndex((prev) => prev + 1), pause)
    return () => clearInterval(id)
  }, [shouldReduceMotion, strings.length, pause])

  useEffect(() => {
    if (shouldReduceMotion || strings.length <= 1) return
    const chars = lettersRef.current.slice(0, letters.length).filter(Boolean) as HTMLSpanElement[]
    if (chars.length === 0) return

    const tl = anime.timeline({ easing: "spring(1, 80, 10, 0)" })

    if (index > 0) {
      tl.add({
        targets: chars,
        translateY: [50, 0],
        rotateX: [-60, 0],
        opacity: [0, 1],
        delay: anime.stagger(40),
      })
    }

    tl.add({
      targets: chars,
      translateY: [0, -50],
      rotateX: [0, 60],
      opacity: [1, 0],
      easing: "easeInQuad",
      duration: 300,
      delay: anime.stagger(20, { start: pause }),
      complete: () => setIndex((prev) => prev + 1),
    })

    return () => {
      anime.remove(chars)
    }
  }, [index, letters.length, strings.length, pause, shouldReduceMotion])

  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      <span className="sr-only">{current}</span>
      <span
        aria-hidden="true"
        className="inline-flex flex-wrap items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        {letters.map((char, i) => (
          <span
            key={`${index}-${i}`}
            ref={(el) => {
              lettersRef.current[i] = el
            }}
            style={{
              display: "inline-block",
              opacity: startsHidden ? 0 : 1,
              whiteSpace: char === " " ? "pre" : undefined,
            }}
          >
            {char === " " ? " " : char}
          </span>
        ))}
      </span>
    </span>
  )
}
