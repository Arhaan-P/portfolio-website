"use client"

import * as React from "react"
import { ExternalLink, Play } from "lucide-react"

// The build lays its UI out for a phone-sized viewport and clips it in narrower
// iframes, so it renders at this logical size and is scaled to fit the 1:2 box.
const LOGICAL_WIDTH = 390
const LOGICAL_HEIGHT = 780

/**
 * Embeds a live web build of a mobile app (it draws its own phone frame).
 * The iframe mounts only on request: the build is a large download, and an
 * iframe captures wheel/touch scrolling that would otherwise scroll the page.
 */
export function ProjectDemo({ src, title }: { src: string; title: string }) {
  const [active, setActive] = React.useState(false)
  const [scale, setScale] = React.useState(1)
  const boxRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const box = boxRef.current
    if (!box) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setScale(Math.max(width / LOGICAL_WIDTH, height / LOGICAL_HEIGHT))
    })
    observer.observe(box)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="mx-auto flex w-full max-w-[300px] flex-col items-center gap-3 sm:max-w-[340px]">
      <div
        ref={boxRef}
        className="relative aspect-[1/2] w-full overflow-hidden rounded-2xl border border-border bg-secondary/40"
      >
        {active ? (
          <iframe
            src={src}
            title={`${title} live demo`}
            className="absolute left-0 top-0 origin-top-left border-0"
            style={{ width: LOGICAL_WIDTH, height: LOGICAL_HEIGHT, transform: `scale(${scale})` }}
            allow="fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            className="group absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-aurora-1/20 to-aurora-2/20 px-6 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform motion-safe:group-hover:scale-105">
              <Play className="size-7 translate-x-0.5" />
            </span>
            <span className="text-base font-semibold text-foreground">Launch live demo</span>
            <span className="text-xs text-muted-foreground">Runs the app in your browser</span>
          </button>
        )}
      </div>
      <a
        href={src}
        target="_blank"
        rel="noreferrer noopener"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-aurora-1 transition-colors group"
      >
        Open in new tab
        <ExternalLink className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </div>
  )
}
