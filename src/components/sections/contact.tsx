"use client"

import * as React from "react"
import { Check, Copy, Download, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { GitHubIcon, LinkedInIcon } from "@/components/icons"
import { site } from "@/data/site"
import { AuroraBackground } from "@/components/motion/aurora-background"

export function Contact() {
  const [copied, setCopied] = React.useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked (insecure context or permissions): the address stays visible to select by hand.
    }
  }

  return (
    <section id="contact" className="relative mx-auto w-full py-32 overflow-hidden flex flex-col items-center justify-center min-h-[60vh]">
      <AuroraBackground className="opacity-60" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 w-full max-w-5xl">
        <Reveal>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gradient pb-2">
            Let&apos;s build something
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-4 text-lg text-muted-foreground font-medium max-w-xl mx-auto">
            Hiring for an SDE or AI-engineer role? Email is the fastest way to
            reach me, and the resume has the full picture.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" className="glow-md text-base px-8 h-12 rounded-full" nativeButton={false} render={<a href={`mailto:${site.email}`} />}>
                <Mail className="size-5" />
                Email me
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 h-12 rounded-full" nativeButton={false} render={<a href={site.resumeUrl} download />}>
                <Download className="size-5" />
                Download resume
              </Button>
            </div>

            <div className="flex items-center gap-1">
              <span className="font-mono text-sm text-muted-foreground select-all">
                {site.email}
              </span>
              <Button variant="ghost" size="sm" onClick={copyEmail} className="text-muted-foreground">
                {copied ? <Check /> : <Copy />}
                {copied ? "Copied" : "Copy"}
              </Button>
              <span className="sr-only" aria-live="polite">
                {copied ? "Email address copied" : ""}
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-12 flex items-center justify-center gap-6">
            <motion.a
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={site.github}
              target="_blank"
              rel="noreferrer noopener"
              className="text-muted-foreground hover:text-primary transition-colors hover:glow-sm p-3 glass-card rounded-full"
              aria-label="GitHub profile"
            >
              <GitHubIcon className="size-6" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={site.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="text-muted-foreground hover:text-primary transition-colors hover:glow-sm p-3 glass-card rounded-full"
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon className="size-6" />
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
