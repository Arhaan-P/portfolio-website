"use client"

import * as React from "react"
import { ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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
import { TiltCard } from "@/components/motion/tilt-card"
import { Magnetic } from "@/components/motion/magnetic"
import { allTags, projects } from "@/data/projects"

export function ProjectGrid() {
  const [activeTags, setActiveTags] = React.useState<string[]>([])

  const visible = React.useMemo(() => {
    if (activeTags.length === 0) return projects
    return projects.filter((p) => activeTags.some((tag) => p.tags.includes(tag)))
  }, [activeTags])

  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 relative">
      <p className="font-mono text-sm text-primary uppercase tracking-wider font-semibold">Project Archive</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-gradient inline-block">
        All Projects
      </h2>

      <div className="mt-8">
        <ToggleGroup
          multiple
          variant="outline"
          value={activeTags}
          onValueChange={(value) => setActiveTags(value as string[])}
          className="flex flex-wrap gap-2"
          aria-label="Filter projects by tag"
        >
          {allTags.map((tag) => (
            <Magnetic key={tag} intensity={0.1}>
              <ToggleGroupItem 
                value={tag} 
                aria-label={`Filter by ${tag}`}
                className="rounded-full data-[state=on]:bg-primary/20 data-[state=on]:text-primary data-[state=on]:border-primary transition-all duration-300"
              >
                {tag}
              </ToggleGroupItem>
            </Magnetic>
          ))}
        </ToggleGroup>
      </div>

      <RevealGroup className="mt-10">
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.9, rotateX: -30, y: 50, z: -50 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0, z: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateX: 30, y: -50, z: 50 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                className="h-full"
              >
                <RevealItem className="h-full">
                  <div className="gradient-border rounded-xl h-full">
                    <TiltCard maxTilt={5} glare glareOpacity={0.1} className="h-full">
                      <Card className="h-full flex flex-col glass-card bg-background/40 border-0 rounded-xl overflow-hidden">
                        <CardHeader>
                          <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-lg font-bold text-foreground/90">{project.name}</CardTitle>
                            {project.period && (
                              <span className="shrink-0 font-mono text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                                {project.period}
                              </span>
                            )}
                          </div>
                          {project.badge && (
                            <Badge variant="default" className="mt-1 w-fit bg-aurora-2/20 text-aurora-2 hover:bg-aurora-2/30">
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
                                  className="flex gap-2 text-xs leading-relaxed text-muted-foreground/90"
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
                              <Badge key={tech} variant="outline" className="text-[10px] bg-background/50 border-white/10 hover:glow-sm hover:border-white/20 transition-colors">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>

                        {project.links && project.links.length > 0 && (
                          <CardFooter className="flex flex-wrap gap-4 bg-transparent pt-4 pb-6 border-t border-white/5">
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
                          </CardFooter>
                        )}
                      </Card>
                    </TiltCard>
                  </div>
                </RevealItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </RevealGroup>
      
      <AnimatePresence>
        {visible.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="text-center mt-12 p-8 glass-card rounded-2xl"
          >
            <p className="text-muted-foreground font-medium">
              No projects match the selected filters. Try adjusting your selection.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
