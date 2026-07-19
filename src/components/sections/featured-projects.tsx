"use client"

import { ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Reveal } from "@/components/motion/reveal"
import { TiltCard } from "@/components/motion/tilt-card"
import { featuredProjects } from "@/data/projects"
import { ProjectImage } from "./project-image"

export function FeaturedProjects() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {featuredProjects.map((project, index) => {
        const isEven = index % 2 === 0

        return (
          <Reveal key={project.slug} delay={0.1}>
            <div className="gradient-border rounded-2xl">
              <TiltCard maxTilt={3} glare glareOpacity={0.1}>
                <div className="glass-card flex flex-col overflow-hidden rounded-2xl lg:flex-row bg-background/50">
                  {/* Image/Placeholder Side */}
                  <div
                    className={`relative w-full lg:w-1/2 p-6 lg:p-8 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    } flex items-center justify-center`}
                  >
                    {project.images && project.images.length > 0 ? (
                      <div className="w-full relative group">
                        <ProjectImage
                          images={project.images}
                          alt={project.name}
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-[4/3] sm:aspect-[16/10] m-4 lg:m-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-aurora-1/20 to-aurora-2/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:24px_24px] opacity-50" />
                        <span className="text-6xl font-bold text-white/20 tracking-tighter mix-blend-overlay">
                          {project.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content Side */}
                  <div
                    className={`flex w-full flex-col justify-center p-6 sm:p-8 lg:w-1/2 lg:p-10 ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {project.period}
                      </span>
                      {project.role && (
                        <span className="text-sm text-muted-foreground font-medium">
                          {project.role}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      {project.name}
                    </h3>

                    <p className="mt-3 text-lg font-medium text-foreground/90">
                      {project.oneLiner}
                    </p>

                    <div className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                      {project.problem && <p><strong className="text-foreground/80">Problem:</strong> {project.problem}</p>}
                      {project.approach && project.approach.length > 0 && (
                        <div className="space-y-1">
                          <strong className="text-foreground/80">Approach:</strong>
                          <ul className="list-inside space-y-1 pl-2">
                            {project.approach.slice(0, 4).map((item, i) => (
                              <li key={i} className="flex gap-2">
                                <span className="text-primary mt-1 shrink-0">▹</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {project.metrics && project.metrics.length > 0 && (
                      <div className="mt-6 border-l-2 border-primary pl-4 py-1">
                        <ul className="space-y-1.5">
                          {project.metrics.map((metric, i) => (
                            <li key={i} className="text-sm font-medium text-foreground/90">
                              {metric}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <Badge key={tech} variant="outline" className="bg-background/50 hover:glow-sm transition-all hover:bg-white/5 border-white/10">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {project.links && project.links.length > 0 && (
                      <div className="mt-8 flex flex-wrap gap-4">
                        {project.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-aurora-1 transition-colors group"
                          >
                            {link.label}
                            <ExternalLink className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </TiltCard>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}
