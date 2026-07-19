"use client"

import { motion, useReducedMotion } from "framer-motion"

interface TextGenerateProps {
  text: string
  className?: string
  /** Delay before animation starts (seconds) */
  delay?: number
  /** Duration per character (seconds) */
  charDuration?: number
  /** Show blinking cursor at end */
  cursor?: boolean
}

export function TextGenerate({
  text,
  className = "",
  delay = 0,
  charDuration = 0.03,
  cursor = false,
}: TextGenerateProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>
  }

  const characters = text.split("")

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: charDuration, delayChildren: delay }}
    >
      {characters.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          variants={{
            hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
      {cursor && (
        <motion.span
          className="inline-block w-[2px] h-[1em] bg-primary ml-0.5 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        />
      )}
    </motion.span>
  )
}
