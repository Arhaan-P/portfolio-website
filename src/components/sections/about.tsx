import { Reveal } from "@/components/motion/reveal"
import { education } from "@/data/experience"

export function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
      <Reveal>
        <p className="font-mono text-sm text-primary">About</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          A bit about me
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          <p>
            I&apos;m a Computer Science undergrad at{" "}
            <span className="text-foreground">{education.school}</span>{" "}
            specializing in AI and Robotics ({education.degree}, {education.detail}).
            I like building things end-to-end — from the database schema up
            through the UI a user actually taps.
          </p>
          <p>
            That range shows up in what I&apos;ve built: a distributed
            ground-control system for coordinating fleets of drones, a campus
            super-app used by thousands of students, a real-time multiplayer
            quiz platform, and a research pipeline that detects deepfakes by
            analyzing how someone walks. I&apos;ve interned as a full-stack
            engineer shipping production features and as an AI research
            intern evaluating vendor solutions for a Fortune 500 hospitality
            group.
          </p>
          <p>
            I gravitate toward systems with real constraints — bandwidth
            budgets, race conditions, offline-first sync — and enjoy the part
            of engineering where you have to actually reason about what
            happens when things fail.
          </p>
        </div>
      </Reveal>
    </section>
  )
}
