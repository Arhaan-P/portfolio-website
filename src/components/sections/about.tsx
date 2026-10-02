"use client";

import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { site } from "@/data/site";
import { Code, MapPin } from "lucide-react";

export function About() {
  const cardHoverClass =
    "hover:-translate-y-0.5 transition-all duration-300";

  return (
    <section id="about" className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground inline-block pb-2">
          About Me
        </h2>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Bio Card - Large */}
        <TiltCard
          maxTilt={2}
          glare={false}
          className="sm:col-span-2 lg:col-span-2"
        >
          <div className={`glass-card rounded-xl p-6 h-full ${cardHoverClass}`}>
            <Reveal delay={0.1}>
              <div className="flex flex-col h-full justify-center space-y-4">
                <h3 className="text-xl font-semibold">Who I am</h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  I build systems that hold up under real constraints: drone
                  telemetry, a campus platform serving real students, an
                  agent-eval benchmark rigorous enough to catch its own false
                  positives. I care about failure modes as much as the happy path.
                </p>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Outside that, I&apos;m usually deep in a paper or an
                  algorithmic problem for fun.
                </p>
              </div>
            </Reveal>
          </div>
        </TiltCard>

        {/* Focus + location */}
        <TiltCard maxTilt={4} glare={false} className="h-full">
          <div className={`glass-card rounded-xl p-6 h-full ${cardHoverClass}`}>
            <Reveal delay={0.2}>
              <div className="flex flex-col h-full justify-between gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Code className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Currently building
                    </p>
                    <p className="mt-1 font-semibold text-lg">
                      Distributed systems & Applied ML
                    </p>
                  </div>
                </div>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-4 shrink-0" />
                  {site.location}
                </p>
              </div>
            </Reveal>
          </div>
        </TiltCard>

        {/* Stats strip */}
        <TiltCard
          maxTilt={2}
          glare={false}
          className="sm:col-span-2 lg:col-span-3"
        >
          <div className={`glass-card rounded-xl p-6 ${cardHoverClass}`}>
            <Reveal delay={0.3}>
              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <dt className="text-sm text-muted-foreground font-medium">
                    Users served (VHELP)
                  </dt>
                  <dd className="text-3xl font-bold text-foreground">1k+</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground font-medium">
                    Dataset published
                  </dt>
                  <dd className="text-3xl font-bold text-foreground">1</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground font-medium">
                    Research journal paper
                  </dt>
                  <dd className="text-3xl font-bold text-foreground">In progress</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
