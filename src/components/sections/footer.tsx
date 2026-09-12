"use client";

import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { site } from "@/data/site";
import { Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [height, setHeight] = useState(150); // Default fallback height
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeight(entry.contentRect.height);
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div style={{ height }} />
      <footer
        ref={ref}
        className="fixed bottom-0 left-0 z-10 w-full bg-background/50 backdrop-blur-md border-t border-white/5 pt-8"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* Gradient divider line */}
          <div
            className="w-full h-px opacity-50"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--primary), var(--aurora-2), transparent)",
            }}
          />

          <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex flex-col items-center sm:items-start gap-1">
              <p>
                © {currentYear} {site.name}. All rights reserved.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-muted-foreground hover:text-primary transition-colors hover:glow-sm p-2"
                  aria-label="GitHub profile"
                >
                  <GitHubIcon className="size-4.5" />
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-muted-foreground hover:text-primary transition-colors hover:glow-sm p-2"
                  aria-label="LinkedIn profile"
                >
                  <LinkedInIcon className="size-4.5" />
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors hover:glow-sm p-2"
                  aria-label="Send an email"
                >
                  <Mail className="size-4.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
