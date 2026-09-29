import { useSyncExternalStore } from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY)
  mq.addEventListener("change", onChange)
  return () => mq.removeEventListener("change", onChange)
}

/**
 * True when the visitor prefers reduced motion. The server snapshot is always
 * `false`, and React uses it while hydrating, so server and client markup match.
 * The real value applies right after hydration: components must not swap element
 * types on it (that remounts the subtree); change props such as duration instead.
 */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  )
}
