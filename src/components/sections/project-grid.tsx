"use client"

import { ExternalLink } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RevealGroup, RevealItem } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/section-heading"
import { standardProjects } from "@/data/projects"

export function ProjectGrid() {
  return (
    <section id="more-projects" data-nav="#projects" className="section-shell-compact">
      <SectionHeading title="More projects" />

      <RevealGroup>
        <div className="grid gap-6 sm:grid-cols-2">
          {standardProjects.map((project) => (
            <div key={project.slug} className="h-full">
              <RevealItem className="h-full">
                <div className="relative h-full">
                  <Card className="h-full flex flex-col glass-card bg-background/40 border-0 rounded-xl overflow-hidden">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg font-bold text-foreground/90">{project.name}</CardTitle>
                        {project.period && (
                          <span className="shrink-0 font-mono text-xs font-medium text-accent-foreground bg-accent px-2 py-0.5 rounded-md">
                            {project.period}
                          </span>
                        )}
                      </div>
                      {project.badge && (
                        <Badge variant="default" className="mt-1 w-fit bg-aurora-2/20 text-foreground hover:bg-aurora-2/30">
                          {project.badge}
                        </Badge>
                      )}
                      <CardDescription className="mt-2 leading-relaxed text-muted-foreground font-medium">
                        {project.oneLiner}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex flex-1 flex-col gap-4">
                      {project.approach && project.approach.length > 0 && (
                        <ul className="space-y-1.5 mt-2">
                          {project.approach.slice(0, 3).map((point) => (
                            <li
                              key={point}
                              className="flex gap-2 text-sm leading-relaxed text-muted-foreground/90"
                            >
                              <span aria-hidden className="text-primary mt-0.5 shrink-0">
                                ▹
                              </span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
                        {project.stack.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs bg-background/50 border-input hover:border-foreground/30 transition-colors">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>

                    {project.links && project.links.length > 0 && (
                      <CardFooter className="flex flex-wrap gap-4 bg-transparent pt-4 pb-6 border-t border-border">
                        {project.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary hover:text-aurora-1 transition-colors group"
                          >
                            {link.label}
                            <ExternalLink className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </a>
                        ))}
                      </CardFooter>
                    )}
                  </Card>
                </div>
              </RevealItem>
            </div>
          ))}
        </div>
      </RevealGroup>
    </section>
  )
}
