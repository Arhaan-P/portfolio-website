"use client"

import { MapPin, GraduationCap, Briefcase, Code } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"
import { site } from "@/data/site"
import { education } from "@/data/experience"
import { Counter } from "@/components/motion/counter"
import { TiltCard } from "@/components/motion/tilt-card"

export function About() {
  const cardHoverClass = "hover:-translate-y-0.5 transition-all duration-300 hover:glow-sm"

  return (
    <section id="about" className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gradient inline-block pb-2">
          About Me
        </h2>
      </Reveal>
      
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Bio Card - Large */}
        <TiltCard maxTilt={2} glare={false} className="sm:col-span-2 lg:col-span-2">
          <div className={`glass-card rounded-xl p-6 h-full ${cardHoverClass}`}>
          <Reveal delay={0.1}>
            <div className="flex flex-col h-full justify-center space-y-4">
              <h3 className="text-xl font-semibold">Who I am</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                I am a passionate software engineer with a deep interest in distributed systems, scalable architectures, and applied machine learning. My journey started with a fascination for how complex systems interact, and it has evolved into a career focused on crafting elegant solutions to intricate problems.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                When I&apos;m not writing code or debugging infrastructure, you can usually find me exploring new technologies, contributing to open source, or diving deep into algorithmic challenges. I believe in continuous learning and the power of technology to make a meaningful impact.
              </p>
            </div>
          </Reveal>
          </div>
        </TiltCard>

        {/* Current Focus Card */}
        <TiltCard maxTilt={4} glare={false} className="h-full">
          <div className={`glass-card rounded-xl p-6 h-full ${cardHoverClass}`}>
          <Reveal delay={0.2}>
            <div className="flex flex-col h-full gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Code className="size-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Currently building</p>
                <p className="mt-1 font-semibold text-lg">Distributed systems & Applied ML</p>
              </div>
            </div>
          </Reveal>
          </div>
        </TiltCard>

        {/* Education Card */}
        <TiltCard maxTilt={4} glare={false} className="h-full">
          <div className={`glass-card rounded-xl p-6 h-full ${cardHoverClass}`}>
          <Reveal delay={0.3}>
            <div className="flex flex-col h-full gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <GraduationCap className="size-5" />
              </div>
              <div>
                <p className="font-semibold text-lg">{education.degree}</p>
                <p className="text-sm font-medium text-muted-foreground mt-1">{education.school}</p>
                <p className="text-xs text-muted-foreground mt-1">{education.detail}</p>
              </div>
            </div>
          </Reveal>
          </div>
        </TiltCard>

        {/* Stats Card */}
        <TiltCard maxTilt={4} glare={false} className="h-full">
          <div className={`glass-card rounded-xl p-6 h-full ${cardHoverClass}`}>
          <Reveal delay={0.4}>
            <div className="flex flex-col h-full justify-center gap-6">
              <div>
                <p className="text-3xl font-bold text-gradient"><Counter value={13} delay={0.4} />k+</p>
                <p className="text-sm text-muted-foreground font-medium mt-1">Users Served (VHELP)</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-white"><Counter value={6} delay={0.4} /></p>
                  <p className="text-xs text-muted-foreground mt-1">Projects Shipped</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white"><Counter value={1} delay={0.4} /></p>
                  <p className="text-xs text-muted-foreground mt-1">Dataset Published</p>
                </div>
              </div>
              <div className="border-t border-white/5 pt-3">
                <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Research</p>
                <p className="text-xs text-muted-foreground mt-0.5">Journal Paper in Progress</p>
              </div>
            </div>
          </Reveal>
          </div>
        </TiltCard>

        {/* Location Card */}
        <TiltCard maxTilt={4} glare={false} className="h-full">
          <div className={`glass-card rounded-xl p-6 h-full ${cardHoverClass}`}>
          <Reveal delay={0.5}>
            <div className="flex flex-col h-full gap-4 justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MapPin className="size-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Based in</p>
                <p className="mt-1 font-semibold text-lg">{site.location}</p>
              </div>
            </div>
          </Reveal>
          </div>
        </TiltCard>

      </div>
    </section>
  )
}