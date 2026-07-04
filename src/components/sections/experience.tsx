import { Reveal } from "@/components/motion/reveal"
import { education, experience } from "@/data/experience"

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
      <Reveal>
        <p className="font-mono text-sm text-primary">Experience</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Where I&apos;ve worked
        </h2>
      </Reveal>

      <ol className="mt-10 space-y-10 border-l border-border pl-6 sm:pl-8">
        {experience.map((entry, i) => (
          <Reveal key={entry.org} delay={0.05 * i}>
            <li className="relative">
              <span
                aria-hidden
                className="absolute top-1.5 -left-[calc(1.5rem+4.5px)] size-2.5 rounded-full bg-primary ring-4 ring-background sm:-left-[calc(2rem+4.5px)]"
              />
              <p className="text-sm text-muted-foreground">{entry.period}</p>
              <h3 className="mt-1 text-lg font-medium text-foreground">
                {entry.role}
              </h3>
              <p className="text-sm text-muted-foreground">
                {entry.org} · {entry.location}
              </p>
              <ul className="mt-3 space-y-2">
                {entry.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="text-sm leading-relaxed text-muted-foreground sm:text-base"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </li>
          </Reveal>
        ))}

        <Reveal delay={0.05 * experience.length}>
          <li className="relative">
            <span
              aria-hidden
              className="absolute top-1.5 -left-[calc(1.5rem+4.5px)] size-2.5 rounded-full bg-muted-foreground/50 ring-4 ring-background sm:-left-[calc(2rem+4.5px)]"
            />
            <p className="text-sm text-muted-foreground">{education.period}</p>
            <h3 className="mt-1 text-lg font-medium text-foreground">
              {education.degree}
            </h3>
            <p className="text-sm text-muted-foreground">
              {education.school} · {education.location} · {education.detail}
            </p>
          </li>
        </Reveal>
      </ol>
    </section>
  )
}
