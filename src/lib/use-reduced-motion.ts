import { useSyncExternalStore } from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY)
  mql.addEventListener("change", onChange)
  return () => mql.removeEventListener("change", onChange)
}

/**
 * `prefers-reduced-motion`, safe to read during render: the server snapshot and
 * hydration pass are always `false`, so markup matches, then it flips on mount.
 * Framer's own `useReducedMotion` reads matchMedia during hydration and can
 * mismatch. Change props on a stable element when this flips, never element types.
 */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  )
}
