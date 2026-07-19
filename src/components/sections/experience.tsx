"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { Briefcase, GraduationCap, MapPin } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"
import { experience, education } from "@/data/experience"

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  })

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="experience" ref={sectionRef} className="mx-auto max-w-5xl px-4 py-20 sm:px-6 relative">
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gradient inline-block pb-2">
          Experience
        </h2>
        <p className="mt-2 text-muted-foreground">Where I&apos;ve worked & studied</p>
      </Reveal>

      <div className="mt-12 relative">
        {/* Static Background Line */}
        <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-white/5 sm:left-1/2 sm:-translate-x-1/2" />
        
        {/* Animated Glowing Line */}
        {!shouldReduceMotion && (
          <motion.div 
            className="absolute left-4 top-0 bottom-0 w-[2px] origin-top bg-gradient-to-b from-primary via-aurora-2 to-transparent sm:left-1/2 sm:-translate-x-1/2 shadow-[0_0_8px_var(--glow-primary)]"
            style={{ scaleY }}
          />
        )}
        {shouldReduceMotion && (
           <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-aurora-2 to-transparent sm:left-1/2 sm:-translate-x-1/2" />
        )}

        <div className="flex flex-col gap-12">
          {/* Work Experience */}
          {experience.map((job, index) => {
            const isEven = index % 2 === 0
            return (
              <div key={job.org + job.role} className="relative flex flex-col sm:flex-row sm:justify-between items-start sm:items-center w-full">
                {/* Timeline Dot */}
                <motion.div 
                  initial={shouldReduceMotion ? { opacity: 1 } : { scale: 0 }}
                  whileInView={shouldReduceMotion ? { opacity: 1 } : { scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="absolute left-4 sm:left-1/2 h-8 w-8 -translate-x-[15px] sm:-translate-x-1/2 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 pulse-ring shadow-[0_0_10px_var(--glow-primary)]"
                >
                  <Briefcase className="size-4 text-primary" />
                </motion.div>

                {/* Card */}
                <div className={`w-full pl-12 sm:pl-0 sm:w-[calc(50%-2rem)] ${isEven ? 'sm:text-right sm:pr-8' : 'sm:ml-auto sm:pl-8'}`}>
                  <Reveal delay={0.1}>
                    <div className="glass-card rounded-xl p-5 hover:-translate-y-0.5 hover:glow-sm transition-all duration-300 text-left">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-lg text-foreground">{job.role}</h3>
                        <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-md shrink-0 w-fit">
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

                      <ul className="flex flex-col gap-2">
                        {job.bullets.map((bullet, i) => (
                          <li key={i} className="flex gap-2 text-sm text-muted-foreground/90">
                            <span className="text-primary mt-1 shrink-0">▹</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </div>
              </div>
            )
          })}

          {/* Education */}
          <div className="relative flex flex-col sm:flex-row sm:justify-between items-start sm:items-center w-full">
            {/* Timeline Dot */}
            <motion.div 
              initial={shouldReduceMotion ? { opacity: 1 } : { scale: 0 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="absolute left-4 sm:left-1/2 h-8 w-8 -translate-x-[15px] sm:-translate-x-1/2 rounded-full bg-background border-2 border-aurora-2 flex items-center justify-center z-10 shadow-[0_0_10px_var(--aurora-2)]"
            >
              <GraduationCap className="size-4 text-aurora-2" />
            </motion.div>

            {/* Card */}
            <div className={`w-full pl-12 sm:pl-0 sm:w-[calc(50%-2rem)] ${experience.length % 2 === 0 ? 'sm:text-right sm:pr-8' : 'sm:ml-auto sm:pl-8'}`}>
              <Reveal delay={0.1}>
                <div className="glass-card rounded-xl p-5 hover:-translate-y-0.5 hover:glow-sm transition-all duration-300 text-left border-aurora-2/20">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-lg text-foreground">{education.degree}</h3>
                    <span className="text-sm font-medium text-aurora-2 bg-aurora-2/10 px-2 py-1 rounded-md shrink-0 w-fit">
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
              </Reveal>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
