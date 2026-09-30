"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import * as React from "react";

// The viewer's code is fetched the first time an image is tapped.
const ProjectLightbox = dynamic(() => import("./project-lightbox"), { ssr: false });

/**
 * Displays one or more project screenshots.
 * Single image → static cover with click-to-zoom.
 * Multiple images → carousel with arrow nav, dots, and click-to-zoom lightbox.
 */
export function ProjectImage({
  images,
  alt,
  alts,
  aspect = "standard",
  ratio,
}: {
  images: string[];
  alt: string;
  /** Per-image descriptions; falls back to the project name if one is missing. */
  alts?: string[];
  /** "standard" for phone/app screenshots, "wide" for banner-shaped diagrams. */
  aspect?: "standard" | "wide";
  /** Overrides the 16:9 box for a wide diagram cropped tighter, e.g. "1400 / 270". */
  ratio?: string | string[];
}) {
  const [active, setActive] = React.useState(0);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxMounted, setLightboxMounted] = React.useState(false);
  const openLightbox = () => {
    setLightboxMounted(true);
    setLightboxOpen(true);
  };
  const count = images.length;
  // With several images the frame follows the one on show (a diagram strip, then a screenshot).
  const currentRatio = Array.isArray(ratio) ? ratio[active] : ratio;
  const label = (i: number) => alts?.[i] ?? `${alt}, image ${i + 1}`;

  const prev = React.useCallback(
    () => setActive((i) => (i - 1 + count) % count),
    [count],
  );
  const next = React.useCallback(
    () => setActive((i) => (i + 1) % count),
    [count],
  );

  return (
    <>
      {/* ─── Inline carousel ─── */}
      <div
        className={`group relative w-full overflow-hidden rounded-lg border border-border bg-secondary/40 ${
          aspect === "wide"
            ? currentRatio
              ? ""
              : "aspect-video"
            : "aspect-4/3 sm:aspect-16/10"
        }`}
        style={aspect === "wide" && currentRatio ? { aspectRatio: currentRatio } : undefined}
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
              />
            </div>
          ))}
        </div>

        {/* Click-to-zoom overlay */}
        <button
          type="button"
          aria-label={`Zoom ${aspect === "wide" ? "diagram" : "image"}`}
          onClick={openLightbox}
          className="absolute inset-0 z-10 cursor-zoom-in bg-black/0 transition-colors hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        />

        {/* Gradient overlay (photo captions only; flat diagrams don't need it) */}
        {aspect !== "wide" && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/40 to-transparent" />
        )}

        {/* Arrow navigation (in the frame from sm up; below it on phones, where it would cover the diagram) */}
        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 hidden sm:flex size-11 items-center justify-center rounded-full bg-black/50 text-white opacity-0 [@media(hover:none)]:opacity-100 transition-opacity hover:bg-black/70 group-hover:opacity-100"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 hidden sm:flex size-11 items-center justify-center rounded-full bg-black/50 text-white opacity-0 [@media(hover:none)]:opacity-100 transition-opacity hover:bg-black/70 group-hover:opacity-100"
            >
              <ChevronRight className="size-4" />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {count > 1 && (
          <div className="absolute inset-x-0 bottom-3 z-20 hidden sm:flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show image ${i + 1}`}
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

      {count > 1 && (
        <div className="mt-2 flex items-center justify-center gap-1 sm:hidden">
          <button
            type="button"
            aria-label="Previous image"
            onClick={prev}
            className="flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronLeft className="size-5" />
          </button>
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show image ${i + 1}`}
              aria-current={i === active || undefined}
              onClick={() => setActive(i)}
              className="flex size-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                className={`size-2 rounded-full transition-colors duration-150 ${
                  i === active ? "bg-foreground" : "bg-muted-foreground/40"
                }`}
              />
            </button>
          ))}
          <button
            type="button"
            aria-label="Next image"
            onClick={next}
            className="flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}

      {lightboxMounted && (
        <ProjectLightbox
          open={lightboxOpen}
          onOpenChange={setLightboxOpen}
          images={images}
          alt={alt}
          label={label}
          active={active}
          setActive={setActive}
        />
      )}
    </>
  );
}
