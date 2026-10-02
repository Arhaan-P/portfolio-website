"use client";

import { useScrollReveal } from "@/components/motion/reveal";
import { Dialog } from "@base-ui/react/dialog";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import * as React from "react";

/**
 * Displays one or more project screenshots.
 * Single image → static cover with click-to-zoom.
 * Multiple images → carousel with arrow nav, dots, and click-to-zoom lightbox.
 */
export function ProjectImage({
  images,
  alt,
  aspect = "standard",
  ratio,
}: {
  images: string[];
  alt: string;
  /** "standard" for phone/app screenshots, "wide" for banner-shaped diagrams. */
  aspect?: "standard" | "wide";
  /** Exact width / height of the artwork; overrides the preset frame shape. */
  ratio?: number;
}) {
  const [active, setActive] = React.useState(0);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const count = images.length;
  const ref = React.useRef<HTMLDivElement>(null);
  const zoomRef = React.useRef<HTMLButtonElement>(null);
  const wide = aspect === "wide";
  const covered = useScrollReveal(ref) === "hidden";

  const prev = React.useCallback(
    () => setActive((i) => (i - 1 + count) % count),
    [count],
  );
  const next = React.useCallback(
    () => setActive((i) => (i + 1) % count),
    [count],
  );

  /* auto-rotate every 4 s when there are multiple images (pause when lightbox is open) */
  React.useEffect(() => {
    if (count <= 1 || lightboxOpen) return;
    const id = setInterval(() => setActive((i) => (i + 1) % count), 4000);
    return () => clearInterval(id);
  }, [count, lightboxOpen]);

  /* arrow keys for lightbox (Esc, focus trap and scroll lock come from Dialog) */
  React.useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxOpen, prev, next]);

  return (
    <>
      {/* ─── Inline carousel ─── */}
      <div
        ref={ref}
        style={ratio ? { aspectRatio: ratio } : undefined}
        className={`group relative w-full overflow-hidden rounded-lg border border-border bg-secondary/40 ${
          ratio ? "" : aspect === "wide" ? "aspect-video" : "aspect-4/3 sm:aspect-16/10"
        }`}
      >
        {/* Reveal Overlay */}
        <motion.div
          className="absolute inset-0 z-40 bg-background"
          initial={false}
          animate={{ scaleY: covered ? 1 : 0 }}
          transition={
            covered
              ? { duration: 0 }
              : { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }
          }
          style={{ transformOrigin: "bottom" }}
        />

        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={false}
          animate={{ scale: covered ? 1.2 : 1 }}
          transition={
            covered
              ? { duration: 0 }
              : { duration: 1.2, ease: [0.33, 1, 0.68, 1], delay: 0.1 }
          }
        >
          {images.map((src, i) => (
            <div
              key={src}
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out"
              style={{ opacity: i === active ? 1 : 0 }}
            >
              <Image
                src={src}
                alt={`${alt}, screenshot ${i + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
                priority={i === 0}
              />
            </div>
          ))}
        </motion.div>

        {/* Click-to-zoom overlay */}
        <button
          ref={zoomRef}
          type="button"
          aria-label="Zoom image"
          onClick={() => setLightboxOpen(true)}
          className="absolute inset-0 z-10 flex cursor-zoom-in items-center justify-center bg-black/0 transition-colors hover:bg-black/20"
        >
          <ZoomIn className="size-8 text-white opacity-0 drop-shadow-lg transition-opacity group-hover:opacity-80" />
        </button>

        {/* Gradient overlay (photo captions only; flat diagrams don't need it) */}
        {count > 1 && aspect !== "wide" && !ratio && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/40 to-transparent" />
        )}

        {/* Arrow navigation */}
        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous screenshot"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/70 group-hover:opacity-100"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next screenshot"
              onClick={(e) => {
                e.stopPropagation();
                next();
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
                  e.stopPropagation();
                  setActive(i);
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

      {/* ─── Lightbox: portaled to <body> so a card's backdrop-filter can't clip it ─── */}
      <Dialog.Root open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop
            data-lenis-prevent
            className="fixed inset-0 z-50 bg-black/90 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0"
          />
          <Dialog.Popup
            data-lenis-prevent
            finalFocus={zoomRef}
            onClick={(e) => {
              if (e.target === e.currentTarget) setLightboxOpen(false);
            }}
            className="fixed inset-0 z-50 flex touch-pan-x touch-pan-y touch-pinch-zoom items-center justify-center outline-none transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0"
          >
            <Dialog.Title className="sr-only">{alt}, enlarged view</Dialog.Title>

            <Dialog.Close
              aria-label="Close"
              className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X className="size-6" />
            </Dialog.Close>

            {count > 1 && (
              <span
                aria-live="polite"
                className="absolute top-5 left-1/2 -translate-x-1/2 font-mono text-sm text-white/70"
              >
                {active + 1} / {count}
              </span>
            )}

            {/* Wide diagrams keep a readable 1000px width below sm and pan sideways. */}
            <div
              className={`max-h-[85vh] w-[90vw] max-w-6xl ${
                wide ? "overflow-x-auto sm:overflow-visible" : ""
              }`}
            >
              <div
                className={`relative h-[85vh] ${wide ? "w-250 sm:w-full" : "w-full"}`}
              >
                {images.map((src, i) => (
                  <div
                    key={src}
                    className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out"
                    style={{ opacity: i === active ? 1 : 0 }}
                  >
                    <Image
                      src={src}
                      alt={`${alt}, screenshot ${i + 1}`}
                      fill
                      sizes={wide ? "(max-width: 640px) 1000px, 90vw" : "90vw"}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {count > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous screenshot"
                  onClick={prev}
                  className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  aria-label="Next screenshot"
                  onClick={next}
                  className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <ChevronRight className="size-6" />
                </button>

                <div className="absolute bottom-6 inset-x-0 z-10 flex justify-center gap-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Show screenshot ${i + 1}`}
                      onClick={() => setActive(i)}
                      className={`size-2.5 rounded-full transition-all ${
                        i === active
                          ? "scale-110 bg-white"
                          : "bg-white/30 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
