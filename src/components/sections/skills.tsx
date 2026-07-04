import { Badge } from "@/components/ui/badge"
import { Reveal } from "@/components/motion/reveal"
import { skillGroups } from "@/data/skills"

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
      <Reveal>
        <p className="font-mono text-sm text-primary">Skills</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Tools &amp; technologies
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Reveal key={group.label} delay={0.05 * i}>
            <h3 className="text-sm font-medium text-muted-foreground">
              {group.label}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
