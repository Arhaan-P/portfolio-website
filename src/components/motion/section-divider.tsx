"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/lib/use-reduced-motion"

interface SectionDividerProps {
  className?: string
}

export function SectionDivider({ className = "" }: SectionDividerProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className={`mx-auto max-w-5xl px-4 sm:px-6 ${className}`}>
      <motion.div
        className="h-px"
        style={{
          background: shouldReduceMotion
            ? "var(--border)"
            : "linear-gradient(90deg, transparent, var(--primary), var(--aurora-2), transparent)",
        }}
        initial={shouldReduceMotion ? false : { scaleX: 0, opacity: 0 }}
        animate={shouldReduceMotion ? { scaleX: 1, opacity: 1 } : undefined}
        whileInView={shouldReduceMotion ? undefined : { scaleX: 1, opacity: 0.5 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 1, ease: "easeInOut" }}
      />
    </div>
  )
}
