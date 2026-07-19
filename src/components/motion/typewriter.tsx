"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypewriterProps {
  strings: string[]
  delay?: number
  typeSpeed?: number
  deleteSpeed?: number
  pause?: number
  className?: string
  cursor?: boolean
}

export function Typewriter({
  strings,
  delay = 0,
  typeSpeed = 80,
  deleteSpeed = 40,
  pause = 2000,
  className = "",
  cursor = true,
}: TypewriterProps) {
  const [text, setText] = useState("")
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  // Start delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true)
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!hasStarted) return

    let timer: NodeJS.Timeout

    const handleType = () => {
      const currentString = strings[index % strings.length]
      
      if (isDeleting) {
        setText(currentString.substring(0, text.length - 1))
      } else {
        setText(currentString.substring(0, text.length + 1))
      }

      let nextSpeed = isDeleting ? deleteSpeed : typeSpeed

      if (!isDeleting && text === currentString) {
        // Pause at end of word
        nextSpeed = pause
        setIsDeleting(true)
      } else if (isDeleting && text === "") {
        setIsDeleting(false)
        setIndex((prev) => prev + 1)
        nextSpeed = 500 // Pause before starting next word
      } else {
        // Randomize speed slightly for more natural feel (bounded)
        nextSpeed = Math.max(20, nextSpeed + (Math.random() - 0.5) * 40)
      }

      timer = setTimeout(handleType, nextSpeed)
    }

    // Initial timeout before typing the first letter or after state change
    timer = setTimeout(handleType, isDeleting ? deleteSpeed : typeSpeed)

    return () => clearTimeout(timer)
  }, [text, isDeleting, index, strings, typeSpeed, deleteSpeed, pause, hasStarted])

  return (
    <span className={className}>
      <span>{text}</span>
      {cursor && (
        <motion.span
          className="inline-block w-[2px] h-[1em] bg-primary ml-1 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        />
      )}
    </span>
  )
}
