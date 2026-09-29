"use client";

import { useScrollReveal } from "@/components/motion/reveal";
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
  /** Overrides the 16:9 box for a wide diagram cropped tighter, e.g. "1400 / 270". */
  ratio?: string;
}) {
  const [active, setActive] = React.useState(0);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const count = images.length;
  const ref = React.useRef<HTMLDivElement>(null);
  const covered = useScrollReveal(ref) === "hidden";
  const label = (i: number) =>
    aspect === "wide" ? `${alt} architecture diagram` : `${alt}, screenshot ${i + 1}`;

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

  /* keyboard nav for lightbox */
  React.useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxOpen, prev, next]);

  /* lock body scroll when lightbox is open */
  React.useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  return (
    <>
      {/* ─── Inline carousel ─── */}
      <div
        ref={ref}
        className={`group relative w-full overflow-hidden rounded-lg border border-border bg-secondary/40 ${
          aspect === "wide"
            ? ratio
              ? ""
              : "aspect-video"
            : "aspect-4/3 sm:aspect-16/10"
        }`}
        style={aspect === "wide" && ratio ? { aspectRatio: ratio } : undefined}
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
                alt={label(i)}
                fill
                sizes={aspect === "wide" ? "(max-width: 1024px) 100vw, 960px" : "(max-width: 1024px) 100vw, 40vw"}
                className="object-contain"
                priority={i === 0}
              />
            </div>
          ))}
        </motion.div>

        {/* Click-to-zoom overlay */}
        <button
          type="button"
          aria-label={`Zoom ${aspect === "wide" ? "diagram" : "image"}`}
          onClick={() => setLightboxOpen(true)}
          className="absolute inset-0 z-10 cursor-zoom-in bg-black/0 transition-colors hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        >
          {/* Always visible so touch users (no hover) can find it too */}
          <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-md border border-border bg-background/85 px-2 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
            <ZoomIn aria-hidden className="size-3.5" />
            Zoom
          </span>
        </button>

        {/* Gradient overlay (photo captions only; flat diagrams don't need it) */}
        {aspect !== "wide" && (
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

      {/* ─── Lightbox overlay ─── */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${alt}, enlarged`}
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
                  alt={label(i)}
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
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                aria-label="Next screenshot"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
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
                    e.stopPropagation();
                    setActive(i);
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
  );
}
