"use client"

import { motion, useReducedMotion } from "framer-motion"

interface SectionDividerProps {
  className?: string
}

export function SectionDivider({ className = "" }: SectionDividerProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return (
      <div className={`mx-auto max-w-5xl px-4 sm:px-6 ${className}`}>
        <div className="h-px bg-border" />
      </div>
    )
  }

  return (
    <div className={`mx-auto max-w-5xl px-4 sm:px-6 ${className}`}>
      <motion.div
        className="h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--primary), var(--aurora-2), transparent)",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.5 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </div>
  )
}
