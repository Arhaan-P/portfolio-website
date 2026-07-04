"use client"

import * as React from "react"
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { RevealGroup, RevealItem } from "@/components/motion/reveal"
import { allTags, projects } from "@/data/projects"

export function ProjectGrid() {
  const [activeTags, setActiveTags] = React.useState<string[]>([])

  const visible = React.useMemo(() => {
    if (activeTags.length === 0) return projects
    return projects.filter((p) => activeTags.some((tag) => p.tags.includes(tag)))
  }, [activeTags])

  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
      <p className="font-mono text-sm text-primary">All Projects</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Everything else
      </h2>

      <div className="mt-8">
        <ToggleGroup
          multiple
          variant="outline"
          value={activeTags}
          onValueChange={(value) => setActiveTags(value as string[])}
          className="flex flex-wrap"
          aria-label="Filter projects by tag"
        >
          {allTags.map((tag) => (
            <ToggleGroupItem key={tag} value={tag} aria-label={`Filter by ${tag}`}>
              {tag}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <RevealItem key={project.slug}>
            <Card className="h-full ring-foreground/10 transition-colors hover:ring-primary/40">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  {project.period && (
                    <span className="shrink-0 font-mono text-xs text-muted-foreground">
                      {project.period}
                    </span>
                  )}
                </div>
                {project.badge && (
                  <Badge variant="default" className="mt-1 w-fit">
                    {project.badge}
                  </Badge>
                )}
                <CardDescription className="mt-1 leading-relaxed">
                  {project.oneLiner}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col gap-4">
                {project.approach.length > 0 && (
                  <ul className="space-y-1.5">
                    {project.approach.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2 text-xs leading-relaxed text-muted-foreground"
                      >
                        <span aria-hidden className="text-primary">
                          ▹
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              {project.links.length > 0 && (
                <CardFooter className="flex flex-wrap gap-4 bg-transparent">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      {link.label}
                      <ExternalLink className="size-3.5" />
                    </a>
                  ))}
                </CardFooter>
              )}
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  )
}
