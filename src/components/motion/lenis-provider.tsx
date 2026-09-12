"use client"

import { ReactLenis } from 'lenis/react'
import { ReactNode, useEffect, useState } from 'react'

export function LenisProvider({ children }: { children: ReactNode }) {
  // Smooth-scroll inertia is a common vestibular-disorder trigger, so
  // reduced-motion users get plain native scrolling instead. Checked after
  // mount (matchMedia isn't available during SSR) to avoid a hydration
  // mismatch; native scroll is also the correct default before this runs.
  const [smoothScroll, setSmoothScroll] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSmoothScroll(!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  if (!smoothScroll) {
    return children
  }

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  )
}
