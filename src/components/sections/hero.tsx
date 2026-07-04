import { Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { GitHubIcon, LinkedInIcon } from "@/components/icons"
import { site } from "@/data/site"

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex max-w-5xl flex-col items-start gap-6 px-4 pt-20 pb-24 sm:px-6 sm:pt-28 sm:pb-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-130 bg-[radial-gradient(60%_50%_at_50%_0%,var(--color-primary)_0%,transparent_100%)] opacity-[0.08]"
      />

      <Reveal>
        <p className="font-mono text-sm text-primary">Hi, I&apos;m</p>
      </Reveal>

      <Reveal delay={0.05}>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          {site.name}
        </h1>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="text-xl font-medium text-muted-foreground sm:text-2xl">
          {site.role}
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {site.tagline}
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button size="lg" nativeButton={false} render={<a href="#projects" />}>
            View Projects
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<a href={site.resumeUrl} download />}
          >
            Download Resume
          </Button>
        </div>
      </Reveal>

      <Reveal delay={0.25}>
        <div className="flex items-center gap-1 pt-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="GitHub profile"
            nativeButton={false}
            render={<a href={site.github} target="_blank" rel="noreferrer" />}
          >
            <GitHubIcon className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="LinkedIn profile"
            nativeButton={false}
            render={<a href={site.linkedin} target="_blank" rel="noreferrer" />}
          >
            <LinkedInIcon className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Send an email"
            nativeButton={false}
            render={<a href={`mailto:${site.email}`} />}
          >
            <Mail className="size-5" />
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
