"use client"

import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { GitHubIcon, LinkedInIcon } from "@/components/icons"
import { m } from "framer-motion"
import { proof, site } from "@/data/site"
import { RoleRotator } from "@/components/motion/role-rotator"

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.2
    }
  }
}

const staggerItem = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" as const } }
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex w-full flex-col items-center justify-center px-4 py-10 sm:min-h-[90vh] sm:px-6 sm:py-24 text-center overflow-hidden"
    >
      <div aria-hidden className="hero-wash pointer-events-none absolute inset-0 -z-10" />

      <div className="w-full flex flex-col items-center justify-center gap-4 sm:gap-6 z-10">
        <div className="relative z-10 flex flex-col items-center gap-2">
          <m.h1
            className="text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl text-foreground pb-2 flex flex-wrap justify-center gap-[0.2em]"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 0.2 }
              }
            }}
            initial="hidden"
            animate="visible"
          >
            {site.name.split(" ").map((word, i) => (
              <m.span
                key={i}
                variants={{
                  hidden: { y: 50, rotateX: -60 },
                  visible: { y: 0, rotateX: 0, transition: { type: "spring", stiffness: 200, damping: 15 } }
                }}
                style={{ display: "inline-block", transformOrigin: "bottom" }}
              >
                {word}
                {i < site.name.split(" ").length - 1 && " "}
              </m.span>
            ))}
          </m.h1>
          <div className="text-2xl font-medium sm:text-3xl md:text-4xl text-muted-foreground min-h-[1.5em] flex items-center justify-center">
            <RoleRotator strings={site.roles} pause={3000} />
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

      <Reveal delay={0.9} appear className="w-full max-w-3xl lg:max-w-4xl">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 sm:grid-cols-4">
          {proof.map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <dt className="order-2 text-sm leading-snug text-muted-foreground">
                {item.label}
              </dt>
              <dd className="order-1 font-mono text-xl font-bold tabular-nums text-foreground lg:text-2xl">
                {item.value}
                {item.spread && " "}
                {item.spread && (
                  <span className="inline-block text-sm font-medium text-muted-foreground">
                    {item.spread}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <m.div 
        className="flex flex-wrap items-center justify-center gap-4 pt-6 z-10"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <m.div variants={staggerItem}>
          <Button size="lg" className="text-base px-8 h-12 rounded-full" nativeButton={false} render={<a href="#projects" />}>
            View Projects
          </Button>
        </m.div>
        <m.div variants={staggerItem}>
          <Button
            size="lg"
            variant="outline"
            className="text-base px-8 h-12 rounded-full bg-background/50 border-input hover:bg-muted"
            nativeButton={false}
            render={<a href={site.resumeUrl} download />}
          >
            Download Resume
          </Button>
        </m.div>
      </m.div>

      <m.div 
        className="flex items-center gap-4 pt-8 z-10"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <m.a
          variants={staggerItem}
          href={site.github}
          target="_blank"
          rel="noreferrer noopener"
          className="text-muted-foreground hover:text-primary transition-colors p-2.5"
          aria-label="GitHub profile"
        >
          <GitHubIcon className="size-6" />
        </m.a>
        <m.a
          variants={staggerItem}
          href={site.linkedin}
          target="_blank"
          rel="noreferrer noopener"
          className="text-muted-foreground hover:text-primary transition-colors p-2.5"
          aria-label="LinkedIn profile"
        >
          <LinkedInIcon className="size-6" />
        </m.a>
        <m.a
          variants={staggerItem}
          href={`mailto:${site.email}`}
          className="text-muted-foreground hover:text-primary transition-colors p-2.5"
          aria-label="Send an email"
        >
          <Mail className="size-6" />
        </m.a>
      </m.div>
      </div>
    </section>
  )
}