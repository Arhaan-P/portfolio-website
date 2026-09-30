"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import * as React from "react";

const ProjectLightbox = dynamic(() => import("./project-lightbox"), { ssr: false });

// Left, centre, right: centre sits in front and larger, sides tilt away behind it.
const slots = [
  { height: "68%", top: "55%", z: "z-0", transform: "translate(-50%,-50%) translateX(-64%) rotate(-8deg)" },
  { height: "84%", top: "50%", z: "z-10", transform: "translate(-50%,-50%)" },
  { height: "68%", top: "55%", z: "z-0", transform: "translate(-50%,-50%) translateX(64%) rotate(8deg)" },
];

/** Three phone screenshots fanned out; fills its parent's height from `lg` up. */
export function ProjectPhoneFan({
  images,
  alt,
  alts,
}: {
  images: string[];
  alt: string;
  alts?: string[];
}) {
  const [active, setActive] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const label = (i: number) => alts?.[i] ?? `${alt}, image ${i + 1}`;

  return (
    <>
      <div className="relative h-104 w-full overflow-hidden rounded-lg border border-border bg-secondary/40 lg:h-full lg:min-h-112">
        {images.slice(0, slots.length).map((src, i) => (
          <button
            key={src}
            type="button"
            aria-label={`Zoom: ${label(i)}`}
            onClick={() => {
              setActive(i);
              setMounted(true);
              setOpen(true);
            }}
            className={`absolute left-1/2 aspect-400/832 cursor-zoom-in overflow-hidden rounded-[1.75rem] border-2 border-border bg-black shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${slots[i].z}`}
            style={{ height: slots[i].height, top: slots[i].top, transform: slots[i].transform }}
          >
            <Image
              src={src}
              alt={label(i)}
              fill
              sizes="(max-width: 1024px) 40vw, 18vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {mounted && (
        <ProjectLightbox
          open={open}
          onOpenChange={setOpen}
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
