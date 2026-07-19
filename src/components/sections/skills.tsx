"use client"

import { Reveal } from "@/components/motion/reveal"
import { skillGroups } from "@/data/skills"

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-24 overflow-hidden">
      <div className="glow-bg"></div>
      
      <div className="relative z-10">
        <Reveal>
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
                <span className="text-foreground">Technical </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">Arsenal</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Tools, languages, and technologies I use to build scalable and robust applications.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grid-flow-row-dense">
          {skillGroups.map((group, index) => (
            <div key={group.label} className={group.colSpan === 2 ? "lg:col-span-2" : ""}>
              <Reveal delay={0.1 * index} className="h-full">
                <div className="h-full bg-card border border-border rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 group shadow-lg shadow-black/20">
                  <div className="flex items-center gap-3 mb-6 border-b border-border/50 pb-4">
                    <div className={`p-2 rounded-lg transition-colors ${group.iconBgClass} ${group.iconColorClass}`}>
                      {group.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{group.label}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {group.skills.map((skill) => (
                      <span key={skill.name} className="skill-badge">
                        {skill.iconNode ? (
                          skill.iconNode
                        ) : skill.iconClass ? (
                          <i className={skill.iconClass}></i>
                        ) : null}
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
