"use client"

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion"

/**
 * Framer setup for the whole page.
 * - LazyMotion with the small `domAnimation` set (no layout animations, no drag).
 *   Components use `m.*`, and `strict` throws if a full `motion.*` sneaks back in.
 * - Reduced motion: transform and layout animations are skipped, opacity fades
 *   stay. It reads the media query at animation time, not while rendering, so it
 *   never changes the markup that hydrates.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
