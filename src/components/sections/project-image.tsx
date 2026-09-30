"use client";

import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
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
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const count = images.length;
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

  /* arrow keys in the lightbox (the dialog handles Escape, focus and scroll lock) */
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
        className={`group relative w-full overflow-hidden rounded-lg border border-border bg-secondary/40 ${
          aspect === "wide"
            ? ratio
              ? ""
              : "aspect-video"
            : "aspect-4/3 sm:aspect-16/10"
        }`}
        style={aspect === "wide" && ratio ? { aspectRatio: ratio } : undefined}
      >
        <div className="absolute inset-0 h-full w-full">
          {images.map((src, i) => (
            <div
              key={src}
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-out"
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
        </div>

        {/* Click-to-zoom overlay */}
        <button
          type="button"
          aria-label={`Zoom ${aspect === "wide" ? "diagram" : "image"}`}
          // With a separate labelled button below the strip, this overlay is a mouse convenience only.
          {...(aspect === "wide" && ratio ? { "aria-hidden": true, tabIndex: -1 } : {})}
          onClick={() => setLightboxOpen(true)}
          className="absolute inset-0 z-10 cursor-zoom-in bg-black/0 transition-colors hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        >
          {/* Always visible so touch users (no hover) can find it too. Strip-shaped diagrams
              are too short to hold it without covering labels, so theirs sits below the image. */}
          {!(aspect === "wide" && ratio) && (
            <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-md border border-border bg-background/85 px-2 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
              <ZoomIn aria-hidden className="size-3.5" />
              Zoom
            </span>
          )}
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
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 flex size-11 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm [@media(hover:none)]:opacity-100 transition-opacity hover:bg-black/70 group-hover:opacity-100"
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
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 flex size-11 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm [@media(hover:none)]:opacity-100 transition-opacity hover:bg-black/70 group-hover:opacity-100"
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
                className="group/dot flex size-6 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span
                  className={`size-2 rounded-full transition-colors duration-150 ${
                    i === active
                      ? "bg-white"
                      : "bg-white/40 group-hover/dot:bg-white/70"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {aspect === "wide" && ratio && (
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="relative after:absolute after:inset-x-0 after:-inset-y-2.5 after:content-[''] inline-flex items-center gap-1 rounded-md border border-border bg-background/85 px-2 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ZoomIn aria-hidden className="size-3.5" />
            Zoom diagram
          </button>
        </div>
      )}

      {/* ─── Lightbox overlay: base-ui Dialog traps focus, restores it to the opener, locks scroll ─── */}
      <Dialog.Root open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm" />
          <Dialog.Popup
            initialFocus={closeRef}
            className="fixed inset-0 z-50 flex items-center justify-center outline-none"
            onClick={(e) => {
              if (e.target === e.currentTarget) setLightboxOpen(false);
            }}
          >
            <Dialog.Title className="sr-only">{`${alt}, enlarged`}</Dialog.Title>

            {/* Close button */}
            <button
              ref={closeRef}
              type="button"
              aria-label="Close lightbox"
              onClick={() => setLightboxOpen(false)}
              className="absolute right-3 top-3 z-50 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
              className="relative mx-4 h-[85vh] w-[90vw] max-w-6xl touch-pan-x touch-pan-y touch-pinch-zoom"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((src, i) => (
                <div
                  key={src}
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-out"
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
                  className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
                  className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
                    className="group/dot flex size-6 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <span
                      className={`size-2.5 rounded-full transition-colors duration-150 ${
                        i === active
                          ? "bg-white"
                          : "bg-white/30 group-hover/dot:bg-white/60"
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
