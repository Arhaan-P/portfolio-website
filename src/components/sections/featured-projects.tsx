import { ExternalLink } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { featuredProjects } from "@/data/projects"
import { ProjectPlaceholder } from "@/components/sections/project-placeholder"

export function FeaturedProjects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
      <Reveal>
        <p className="font-mono text-sm text-primary">Featured Projects</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Selected case studies
        </h2>
      </Reveal>

      <div className="mt-14 flex flex-col gap-24">
        {featuredProjects.map((project, i) => {
          const reversed = i % 2 === 1
          return (
            <Reveal key={project.slug}>
              <article
                className={`grid gap-8 lg:grid-cols-2 lg:gap-12 ${
                  reversed ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="aspect-video lg:aspect-auto">
                  <ProjectPlaceholder name={project.name} />
                </div>

                <div className="flex flex-col justify-center">
                  {project.period && (
                    <p className="font-mono text-xs text-muted-foreground">
                      {project.period}
                    </p>
                  )}
                  <h3 className="mt-1 text-2xl font-semibold tracking-tight">
                    {project.name}
                  </h3>
                  {project.role && (
                    <p className="mt-1 text-sm text-primary">{project.role}</p>
                  )}

                  {project.problem && (
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {project.problem}
                    </p>
                  )}

                  <ul className="mt-4 space-y-2">
                    {project.approach.slice(0, 4).map((point) => (
                      <li
                        key={point}
                        className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span aria-hidden className="text-primary">
                          ▹
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {project.metrics.length > 0 && (
                    <div className="mt-5 grid gap-1.5 border-l-2 border-primary/40 pl-4">
                      {project.metrics.map((metric) => (
                        <p
                          key={metric}
                          className="text-sm font-medium text-foreground"
                        >
                          {metric}
                        </p>
                      ))}
                    </div>
                  )}

                  {project.links.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-3">
                      {project.links.map((link) => (
                        <Button
                          key={link.href}
                          variant="ghost"
                          size="sm"
                          className="gap-1.5 px-0 text-primary hover:bg-transparent hover:underline"
                          nativeButton={false}
                          render={
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noreferrer"
                            />
                          }
                        >
                          {link.label}
                          <ExternalLink className="size-3.5" />
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
