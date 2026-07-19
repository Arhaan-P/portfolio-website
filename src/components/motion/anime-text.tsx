"use client"

import React, { useEffect, useRef, useState } from "react"
import anime from "animejs"

interface AnimeTextProps {
  strings: string[]
  className?: string
  pause?: number
}

export function AnimeText({ strings, className = "", pause = 2500 }: AnimeTextProps) {
  const [index, setIndex] = useState(0)
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
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
  }, [index, strings, pause])

  return (
    <span 
      ref={containerRef} 
      className={`inline-flex flex-wrap items-center justify-center ${className}`}
      style={{ perspective: "1000px" }}
    />
  )
}
