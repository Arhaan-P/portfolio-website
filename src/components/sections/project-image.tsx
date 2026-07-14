"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"

/**
 * Displays one or more project screenshots.
 * Single image → static cover with click-to-zoom.
 * Multiple images → carousel with arrow nav, dots, and click-to-zoom lightbox.
 */
export function ProjectImage({
  images,
  alt,
}: {
  images: string[]
  alt: string
}) {
  const [active, setActive] = React.useState(0)
  const [lightboxOpen, setLightboxOpen] = React.useState(false)
  const count = images.length

  const prev = React.useCallback(
    () => setActive((i) => (i - 1 + count) % count),
    [count],
  )
  const next = React.useCallback(
    () => setActive((i) => (i + 1) % count),
    [count],
  )

  /* auto-rotate every 4 s when there are multiple images (pause when lightbox is open) */
  React.useEffect(() => {
    if (count <= 1 || lightboxOpen) return
    const id = setInterval(() => setActive((i) => (i + 1) % count), 4000)
    return () => clearInterval(id)
  }, [count, lightboxOpen])

  /* keyboard nav for lightbox */
  React.useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false)
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [lightboxOpen, prev, next])

  /* lock body scroll when lightbox is open */
  React.useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [lightboxOpen])

  return (
    <>
      {/* ─── Inline carousel ─── */}
      <div className="group relative h-full w-full overflow-hidden rounded-lg border border-border bg-secondary/40">
        {images.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            <Image
              src={src}
              alt={`${alt} — screenshot ${i + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Click-to-zoom overlay */}
        <button
          type="button"
          aria-label="Zoom image"
          onClick={() => setLightboxOpen(true)}
          className="absolute inset-0 z-10 flex cursor-zoom-in items-center justify-center bg-black/0 transition-colors hover:bg-black/20"
        >
          <ZoomIn className="size-8 text-white opacity-0 drop-shadow-lg transition-opacity group-hover:opacity-80" />
        </button>

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Arrow navigation */}
        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous screenshot"
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/70 group-hover:opacity-100"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next screenshot"
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/70 group-hover:opacity-100"
            >
              <ChevronRight className="size-4" />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {count > 1 && (
          <div className="absolute inset-x-0 bottom-3 z-20 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show screenshot ${i + 1}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setActive(i)
                }}
                className={`size-2 rounded-full transition-all ${
                  i === active
                    ? "scale-110 bg-white"
                    : "bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ─── Lightbox overlay ─── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            type="button"
            aria-label="Close lightbox"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 z-50 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <X className="size-6" />
          </button>

          {/* Image counter */}
          {count > 1 && (
            <span className="absolute top-5 left-1/2 -translate-x-1/2 font-mono text-sm text-white/70">
              {active + 1} / {count}
            </span>
          )}

          {/* Lightbox image */}
          <div
            className="relative mx-4 h-[85vh] w-[90vw] max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((src, i) => (
              <div
                key={src}
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out"
                style={{ opacity: i === active ? 1 : 0 }}
              >
                <Image
                  src={src}
                  alt={`${alt} — screenshot ${i + 1}`}
                  fill
                  sizes="90vw"
                  className="object-contain"
                  priority
                />
              </div>
            ))}
          </div>

          {/* Lightbox arrows */}
          {count > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous screenshot"
                onClick={(e) => {
                  e.stopPropagation()
                  prev()
                }}
                className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                aria-label="Next screenshot"
                onClick={(e) => {
                  e.stopPropagation()
                  next()
                }}
                className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          )}

          {/* Lightbox dots */}
          {count > 1 && (
            <div className="absolute bottom-6 inset-x-0 flex justify-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show screenshot ${i + 1}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setActive(i)
                  }}
                  className={`size-2.5 rounded-full transition-all ${
                    i === active
                      ? "scale-110 bg-white"
                      : "bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
