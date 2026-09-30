"use client"

import { Reveal } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/section-heading"
import { skillGroups } from "@/data/skills"

export function Skills() {
  return (
    <section id="skills" className="section-shell overflow-hidden">
      <div className="relative z-10">
        <Reveal>
          <SectionHeading href="#skills" title="Skills" />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillGroups.map((group, index) => (
            <div key={group.label}>
              <Reveal delay={0.1 * index} className="h-full">
                <div className="glass-card h-full rounded-xl p-6 hover:border-primary/30 transition-colors duration-150 ease-out group">
                  <div className="flex items-center gap-3 mb-6 border-b border-border/50 pb-4">
                    <div className={`p-2 rounded-lg transition-colors ${group.iconBgClass} ${group.iconColorClass}`}>
                      {group.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{group.label}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {group.skills.map((skill) => (
                      <span key={skill.name} className="skill-badge">
                        {skill.iconNode}
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
