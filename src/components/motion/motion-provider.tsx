"use client"

import { MotionConfig } from "framer-motion"

/**
 * Reduced motion for every framer animation: transform and layout animations are
 * skipped, opacity fades stay. It reads the media query at animation time, not
 * while rendering, so it never changes the markup that hydrates.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
