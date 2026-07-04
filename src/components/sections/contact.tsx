import { Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { GitHubIcon, LinkedInIcon } from "@/components/icons"
import { site } from "@/data/site"

export function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-28"
    >
      <Reveal>
        <p className="font-mono text-sm text-primary">Contact</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Let&apos;s build something
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          I&apos;m always happy to talk about distributed systems, mobile
          apps, or applied ML. Reach out if you want to work together or just
          say hi.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            nativeButton={false}
            render={<a href={`mailto:${site.email}`} />}
          >
            <Mail className="size-4" />
            {site.email}
          </Button>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-6 flex items-center justify-center gap-1">
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
        </div>
      </Reveal>
    </section>
  )
}
