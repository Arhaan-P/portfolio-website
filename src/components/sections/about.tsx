"use client";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/data/site";
import { MapPin } from "lucide-react";

export function About() {
  return (
    <section id="about" className="section-shell">
      <Reveal>
        <SectionHeading href="#about" title="About" />
      </Reveal>

      <div className="glass-card max-w-3xl rounded-xl p-6">
        <Reveal delay={0.1}>
          <div className="space-y-4">
            <p className="text-base leading-relaxed text-muted-foreground">
              {site.bio}
            </p>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4 text-primary" aria-hidden="true" />
              {site.location}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
