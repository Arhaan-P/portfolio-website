"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/lib/use-reduced-motion"

interface SectionDividerProps {
  className?: string
}

export function SectionDivider({ className = "" }: SectionDividerProps) {
  const shouldReduceMotion = useReducedMotion()

  // One element in every case: reduced motion starts (and stays) at the final state.
  return (
    <div className={`mx-auto max-w-5xl px-4 sm:px-6 ${className}`}>
      <motion.div
        className="h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--primary), var(--aurora-2), transparent)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }}
      />
    </div>
  )
}
