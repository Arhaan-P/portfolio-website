"use client";

import {
    motion,
    useInView,
    useReducedMotion,
    type Variants,
} from "framer-motion";
import * as React from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 12, transition: { duration: 0 } },
  visible: { opacity: 1, y: 0 },
};

/*
 * Content is visible by default: server HTML, first paint, and full-page renders
 * (crawlers, screenshot tools) never see blank sections. Only after the user's
 * first scroll is content still well below the fold hidden, so it can animate in
 * as it approaches, starting a quarter-viewport before it reaches the screen.
 */
const REVEAL_MARGIN = "0px 0px 25% 0px";
const ARM_BELOW_VIEWPORTS = 1.25;

let hasScrolled = false;
const pending = new Set<() => void>();

function armPending() {
  hasScrolled = true;
  pending.forEach((arm) => arm());
  pending.clear();
}

function onFirstScroll(arm: () => void) {
  if (hasScrolled) {
    arm();
    return;
  }
  pending.add(arm);
  window.addEventListener("scroll", armPending, { passive: true, once: true });
  return () => {
    pending.delete(arm);
  };
}

export type RevealState = "static" | "hidden" | "revealed";

export function useScrollReveal(
  ref: React.RefObject<Element | null>,
): RevealState {
  const shouldReduceMotion = useReducedMotion();
  const [armed, setArmed] = React.useState(false);
  const inView = useInView(ref, { once: true, margin: REVEAL_MARGIN });

  React.useEffect(() => {
    if (shouldReduceMotion) return;
    return onFirstScroll(() => {
      const el = ref.current;
      if (
        el &&
        el.getBoundingClientRect().top >
          window.innerHeight * ARM_BELOW_VIEWPORTS
      ) {
        setArmed(true);
      }
    });
  }, [ref, shouldReduceMotion]);

  if (!armed) return "static";
  return inView ? "revealed" : "hidden";
}

export function Reveal({
  children,
  delay = 0,
  className,
  appear = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Animate in on mount instead of on scroll for above-the-fold intro content. */
  appear?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const state = useScrollReveal(ref);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={appear ? undefined : ref}
      className={className}
      initial={appear ? "hidden" : false}
      animate={state === "hidden" ? "hidden" : "visible"}
      variants={variants}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const state = useScrollReveal(ref);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={state === "hidden" ? "hidden" : "visible"}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
