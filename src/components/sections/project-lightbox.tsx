"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import * as React from "react";

/**
 * Full-screen viewer. Loaded on the first tap of a Zoom button, so its code
 * stays out of the first load. base-ui's Dialog traps focus, restores it to
 * the opener and locks scroll.
 */
export default function ProjectLightbox({
  open,
  onOpenChange,
  images,
  alt,
  label,
  active,
  setActive,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: string[];
  alt: string;
  label: (i: number) => string;
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}) {
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const count = images.length;

  const prev = React.useCallback(
    () => setActive((i) => (i - 1 + count) % count),
    [count, setActive],
  );
  const next = React.useCallback(
    () => setActive((i) => (i + 1) % count),
    [count, setActive],
  );

  /* arrow keys (the dialog handles Escape, focus and scroll lock) */
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, prev, next]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/85" />
        <Dialog.Popup
          initialFocus={closeRef}
          className="fixed inset-0 z-50 flex items-center justify-center outline-none"
          onClick={(e) => {
            if (e.target === e.currentTarget) onOpenChange(false);
          }}
        >
          <Dialog.Title className="sr-only">{`${alt}, enlarged`}</Dialog.Title>

          {/* Close button */}
          <button
            ref={closeRef}
            type="button"
            aria-label="Close lightbox"
            onClick={() => onOpenChange(false)}
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
  );
}
