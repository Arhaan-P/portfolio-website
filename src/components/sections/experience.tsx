"use client"

import { useRef, type ReactNode } from "react"
import { m } from "framer-motion"
import { Briefcase, GraduationCap, MapPin } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { Reveal, useScrollReveal } from "@/components/motion/reveal"
import { experience, education } from "@/data/experience"

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section id="experience" ref={sectionRef} className="section-shell">
      <Reveal>
        <SectionHeading href="#experience" title="Experience" sub="Where I've worked & studied" />
      </Reveal>

      <div className="relative">
        {/* One rail down the left at every width */}
        <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-border" />

        <div className="flex flex-col gap-12">
          {/* Work Experience */}
          {experience.map((job) => {
            return (
              <div key={job.org + job.role} className="relative w-full">
                {/* Timeline Dot */}
                <TimelineDot
                  className="absolute left-4 top-5 h-8 w-8 -translate-x-[15px] rounded-full bg-background border-2 border-primary flex items-center justify-center z-10"
                >
                  <Briefcase className="size-4 text-primary" />
                </TimelineDot>

                {/* Card */}
                <div className="w-full max-w-3xl pl-12">
                  <Reveal delay={0.1}>
                    <div className="relative">
                      <div className="glass-card rounded-xl p-5 hover:-translate-y-0.5 transition-transform duration-200 ease-out">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-lg text-foreground">{job.role}</h3>
                          <span className="text-sm font-medium text-accent-foreground bg-accent px-2 py-1 rounded-md shrink-0 w-fit">
                            {job.period}
                          </span>
                        </div>

                        <div className="flex flex-col gap-1 mb-4 text-sm text-muted-foreground">
                          <p className="font-medium text-foreground/80">{job.org}</p>
                          <div className="flex items-center gap-1">
                            <MapPin className="size-3" />
                            <span>{job.location}</span>
                          </div>
                        </div>

                        {job.readouts && job.readouts.length > 0 && (
                          <dl className="readout-grid mb-4 grid-cols-2">
                            {job.readouts.map((r) => (
                              <div key={r.value + r.label} className="readout">
                                <dt className="readout-label">{r.label}</dt>
                                <dd className="readout-value">{r.value}</dd>
                              </div>
                            ))}
                          </dl>
                        )}

                        <ul className="flex flex-col gap-2">
                          {job.bullets.map((bullet, i) => (
                            <li key={i} className="flex gap-2 text-sm text-muted-foreground/90">
                              <span className="text-primary mt-1 shrink-0">▹</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            )
          })}

          {/* Education */}
          <div className="relative w-full">
            {/* Timeline Dot */}
            <TimelineDot
              className="absolute left-4 top-5 h-8 w-8 -translate-x-[15px] rounded-full bg-background border-2 border-primary flex items-center justify-center z-10"
            >
              <GraduationCap className="size-4 text-primary" />
            </TimelineDot>

            {/* Card */}
            <div className="w-full max-w-3xl pl-12">
              <Reveal delay={0.1}>
                <div className="relative">
                  <div className="glass-card rounded-xl p-5 hover:-translate-y-0.5 transition-transform duration-200 ease-out">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-lg text-foreground">{education.degree}</h3>
                      <span className="text-sm font-medium text-accent-foreground bg-accent px-2 py-1 rounded-md shrink-0 w-fit">
                        {education.period}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1 mb-2 text-sm text-muted-foreground">
                      <p className="font-medium text-foreground/80">{education.school}</p>
                      <div className="flex items-center gap-1">
                        <MapPin className="size-3" />
                        <span>{education.location}</span>
                      </div>
                    </div>

                    <p className="text-sm font-medium text-primary mt-3">
                      {education.detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function TimelineDot({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const hidden = useScrollReveal(ref) === "hidden"

  return (
    <m.div
      ref={ref}
      initial={false}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={hidden ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }}
      className={className}
    >
      {children}
    </m.div>
  )
}
