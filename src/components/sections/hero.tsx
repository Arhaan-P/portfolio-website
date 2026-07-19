"use client"

import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { GitHubIcon, LinkedInIcon } from "@/components/icons"
import { motion, useScroll, useTransform } from "framer-motion"
import { site } from "@/data/site"
import { AuroraBackground } from "@/components/motion/aurora-background"
import { Spotlight } from "@/components/motion/spotlight"
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
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, 200])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])
  const scale = useTransform(scrollY, [0, 500], [1, 0.9])

  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[90vh] w-full flex-col items-center justify-center px-4 py-24 sm:px-6 text-center overflow-hidden"
    >
      <AuroraBackground className="opacity-80" />
      <Spotlight radius={400} className="opacity-50" />

      <motion.div 
        style={{ y, opacity, scale }}
        className="w-full flex flex-col items-center justify-center gap-6 z-10"
      >
        <Reveal delay={0.1}>
          <p className="font-mono text-sm sm:text-base text-primary uppercase tracking-wider font-semibold">
            Hi, I&apos;m
          </p>
        </Reveal>

        <div className="relative z-10 flex flex-col items-center gap-2">
          <motion.h1 
            className="text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl text-gradient pb-2 flex flex-wrap justify-center gap-[0.2em]"
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

      <Reveal delay={0.8}>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg mt-4">
          {site.tagline}
        </p>
      </Reveal>

      <motion.div 
        className="flex flex-wrap items-center justify-center gap-4 pt-6 z-10"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={staggerItem} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button size="lg" className="glow-md text-base px-8 h-12 rounded-full" nativeButton={false} render={<a href="#projects" />}>
            View Projects
          </Button>
        </motion.div>
        <motion.div variants={staggerItem} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="lg"
            variant="outline"
            className="text-base px-8 h-12 rounded-full bg-background/50 backdrop-blur-md border-white/10 hover:bg-white/10"
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