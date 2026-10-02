"use client";

import { ExternalLink, Loader2, Play, RotateCw } from "lucide-react";
import * as React from "react";

// The build lays its UI out for a phone-sized viewport and clips it in narrower
// iframes, so it renders at this logical size and is scaled to fit the 1:2 box.
const LOGICAL_WIDTH = 390;
const LOGICAL_HEIGHT = 780;
// A framed navigation that fails still fires `load` (the browser draws its own
// error page inside the frame), so reachability is checked with a no-cors fetch,
// which rejects on DNS/connection failure and resolves on any HTTP response.
const REACHABILITY_TIMEOUT_MS = 15_000;

/**
 * Embeds a live web build of a mobile app (it draws its own phone frame).
 * The iframe mounts only on request: the build is a large download, and an
 * iframe captures wheel/touch scrolling that would otherwise scroll the page.
 */
export function ProjectDemo({ src, title }: { src: string; title: string }) {
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "ready" | "failed"
  >("idle");
  const [scale, setScale] = React.useState(1);
  const boxRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setScale(Math.max(width / LOGICAL_WIDTH, height / LOGICAL_HEIGHT));
    });
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  const abortRef = React.useRef<AbortController | null>(null);
  React.useEffect(() => () => abortRef.current?.abort(), []);

  const start = () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setStatus("loading");
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, REACHABILITY_TIMEOUT_MS);
    fetch(src, { mode: "no-cors", cache: "no-store", signal: controller.signal })
      .then(() => clearTimeout(timer))
      .catch(() => {
        clearTimeout(timer);
        // Aborted by a retry or unmount: not a failure.
        if (timedOut || !controller.signal.aborted) setStatus("failed");
      });
  };

  return (
    <div className="mx-auto flex w-full max-w-75 flex-col items-center gap-3 sm:max-w-85">
      <div
        ref={boxRef}
        className="relative aspect-1/2 w-full overflow-hidden rounded-2xl border border-border bg-secondary/40"
      >
        {(status === "loading" || status === "ready") && (
          <iframe
            src={src}
            title={`${title} live demo`}
            className="absolute left-0 top-0 origin-top-left border-0"
            style={{
              width: LOGICAL_WIDTH,
              height: LOGICAL_HEIGHT,
              transform: `scale(${scale})`,
            }}
            allow="fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => setStatus("ready")}
          />
        )}
        {status === "failed" && (
          <div
            role="alert"
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center"
          >
            <p className="text-base font-semibold text-foreground">
              The demo didn&apos;t load
            </p>
            <p className="text-xs text-muted-foreground">
              It may be offline or blocked on this network.
            </p>
            <button
              type="button"
              onClick={start}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <RotateCw className="size-3.5" />
              Try again
            </button>
          </div>
        )}
        {(status === "idle" || status === "loading") && (
          <button
            type="button"
            disabled={status === "loading"}
            onClick={start}
            className="group absolute inset-0 flex flex-col items-center justify-center gap-4 bg-linear-to-br from-aurora-1/20 to-aurora-2/20 px-6 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset disabled:cursor-wait"
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform motion-safe:group-hover:scale-105">
              {status === "loading" ? (
                <Loader2 className="size-7 motion-safe:animate-spin" />
              ) : (
                <Play className="size-7 translate-x-0.5" />
              )}
            </span>
            <span className="text-base font-semibold text-foreground">
              {status === "loading" ? "Loading demo…" : "Launch live demo"}
            </span>
            <span className="text-xs text-muted-foreground">
              Runs the app in your browser
            </span>
          </button>
        )}
      </div>
      <a
        href={src}
        target="_blank"
        rel="noreferrer noopener"
        className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary hover:text-aurora-1 transition-colors group"
      >
        Open in new tab
        <ExternalLink className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}
