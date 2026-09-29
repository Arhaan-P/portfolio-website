"use client"

import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { GitHubIcon, LinkedInIcon } from "@/components/icons"
import { motion, useScroll, useTransform } from "framer-motion"
import { useReducedMotion } from "@/lib/use-reduced-motion"
import { proof, site } from "@/data/site"
import { AnimeText } from "@/components/motion/anime-text"

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

const staggerItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
}

export function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, 200])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])
  const scale = useTransform(scrollY, [0, 500], [1, 0.9])

  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[90vh] w-full flex-col items-center justify-center px-4 py-24 sm:px-6 text-center overflow-hidden"
    >
      <div aria-hidden className="hero-wash pointer-events-none absolute inset-0 -z-10" />

      <motion.div
        style={shouldReduceMotion ? undefined : { y, opacity, scale }}
        className="w-full flex flex-col items-center justify-center gap-6 z-10"
      >
        <Reveal delay={0.1} appear>
          <p className="font-mono text-sm sm:text-base text-primary uppercase tracking-wider font-semibold">
            Hi, I&apos;m
          </p>
        </Reveal>

        <div className="relative z-10 flex flex-col items-center gap-2">
          <motion.h1
            className="text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl text-foreground pb-2 flex flex-wrap justify-center gap-[0.2em]"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 }
              }
            }}
            initial="hidden"
            animate="visible"
          >
            {site.name.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 50, rotateX: -60 },
                  visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", stiffness: 200, damping: 15 } }
                }}
                style={{ display: "inline-block", transformOrigin: "bottom" }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <div className="text-2xl font-medium sm:text-3xl md:text-4xl text-muted-foreground min-h-[1.5em] flex items-center justify-center">
            <AnimeText strings={site.roles} pause={3000} />
          </div>
        </div>

      <Reveal delay={0.8} appear>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg mt-4">
          {site.tagline}
        </p>
      </Reveal>

      <Reveal delay={0.85} appear>
        <p className="max-w-2xl text-balance text-sm font-medium text-foreground">
          {site.seeking}
        </p>
      </Reveal>

      <Reveal delay={0.9} appear className="w-full max-w-3xl">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 sm:grid-cols-4">
          {proof.map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <dt className="order-2 text-sm leading-snug text-muted-foreground">
                {item.label}
              </dt>
              <dd className="order-1 font-mono text-base font-semibold tabular-nums text-foreground">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <motion.div 
        className="flex flex-wrap items-center justify-center gap-4 pt-6 z-10"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* tabIndex -1: framer would otherwise add tabindex=0, a second tab stop before the link */}
        <motion.div tabIndex={-1} variants={staggerItem} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button size="lg" className="text-base px-8 h-12 rounded-full" nativeButton={false} render={<a href="#projects" />}>
            View Projects
          </Button>
        </motion.div>
        <motion.div tabIndex={-1} variants={staggerItem} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="lg"
            variant="outline"
            className="text-base px-8 h-12 rounded-full bg-background/50 backdrop-blur-md border-input hover:bg-muted"
            nativeButton={false}
            render={<a href={site.resumeUrl} download />}
          >
            Download Resume
          </Button>
        </motion.div>
      </motion.div>

      <motion.div 
        className="flex items-center gap-4 pt-8 z-10"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.a
          variants={staggerItem}
          whileHover={{ scale: 1.15, y: -2 }}
          whileTap={{ scale: 0.95 }}
          href={site.github}
          target="_blank"
          rel="noreferrer noopener"
          className="text-muted-foreground hover:text-primary transition-colors hover:glow-sm p-2"
          aria-label="GitHub profile"
        >
          <GitHubIcon className="size-6" />
        </motion.a>
        <motion.a
          variants={staggerItem}
          whileHover={{ scale: 1.15, y: -2 }}
          whileTap={{ scale: 0.95 }}
          href={site.linkedin}
          target="_blank"
          rel="noreferrer noopener"
          className="text-muted-foreground hover:text-primary transition-colors hover:glow-sm p-2"
          aria-label="LinkedIn profile"
        >
          <LinkedInIcon className="size-6" />
        </motion.a>
        <motion.a
          variants={staggerItem}
          whileHover={{ scale: 1.15, y: -2 }}
          whileTap={{ scale: 0.95 }}
          href={`mailto:${site.email}`}
          className="text-muted-foreground hover:text-primary transition-colors hover:glow-sm p-2"
          aria-label="Send an email"
        >
          <Mail className="size-6" />
        </motion.a>
      </motion.div>
      </motion.div>
    </section>
  )
}