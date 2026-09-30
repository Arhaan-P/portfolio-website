"use client";

import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import * as React from "react";

// The viewer's code is fetched the first time a Zoom button is used.
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
  ratio?: string;
}) {
  const [active, setActive] = React.useState(0);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxMounted, setLightboxMounted] = React.useState(false);
  const openLightbox = () => {
    setLightboxMounted(true);
    setLightboxOpen(true);
  };
  const count = images.length;
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
          onClick={openLightbox}
          className="absolute inset-0 z-10 cursor-zoom-in bg-black/0 transition-colors hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        >
          {/* Always visible so touch users (no hover) can find it too. Strip-shaped diagrams
              are too short to hold it without covering labels, so theirs sits below the image. */}
          {!(aspect === "wide" && ratio) && (
            <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-md border border-border bg-background/85 px-2 py-1 text-xs font-medium text-foreground">
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
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 flex size-11 items-center justify-center rounded-full bg-black/50 text-white opacity-0 [@media(hover:none)]:opacity-100 transition-opacity hover:bg-black/70 group-hover:opacity-100"
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
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 flex size-11 items-center justify-center rounded-full bg-black/50 text-white opacity-0 [@media(hover:none)]:opacity-100 transition-opacity hover:bg-black/70 group-hover:opacity-100"
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

      {aspect === "wide" && ratio && (
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={openLightbox}
            className="relative after:absolute after:inset-x-0 after:-inset-y-2.5 after:content-[''] inline-flex items-center gap-1 rounded-md border border-border bg-background/85 px-2 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ZoomIn aria-hidden className="size-3.5" />
            Zoom diagram
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
