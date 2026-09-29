"use client"

import { ReactLenis } from 'lenis/react'
import { ReactNode } from 'react'
import { useReducedMotion } from '@/lib/use-reduced-motion'

export function LenisProvider({ children }: { children: ReactNode }) {
  // Smooth-scroll inertia is a common vestibular-disorder trigger, so
  // reduced-motion users get plain native wheel scrolling instead. The tree is
  // the same either way (swapping the wrapper would remount the whole page after
  // load); only the options change, once the media query has been read.
  const reduced = useReducedMotion()

  return (
    <ReactLenis
      root
      options={{ lerp: 0.08, duration: 1.5, smoothWheel: !reduced }}
    >
      {children}
    </ReactLenis>
  )
}
