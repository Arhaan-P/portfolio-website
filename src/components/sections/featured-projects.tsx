"use client";

import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { featuredProjects, type Project } from "@/data/projects";
import { ChevronRight, ExternalLink } from "lucide-react";
import { ProjectDemo } from "./project-demo";
import { ProjectImage } from "./project-image";

const readoutCols: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
};

function CardHeader({ project }: { project: Project }) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <span className="text-sm font-medium text-accent-foreground bg-accent px-3 py-1 rounded-full">
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

      {project.readouts && project.readouts.length > 0 && (
        <dl
          className={`mt-5 grid gap-x-6 gap-y-4 border-t border-border pt-5 ${
            readoutCols[project.readouts.length] ?? "grid-cols-2 sm:grid-cols-3"
          }`}
        >
          {project.readouts.map((r) => (
            <div key={r.from} className="flex flex-col gap-1">
              <dt className="order-2 text-sm leading-snug text-muted-foreground">
                {r.label}
              </dt>
              <dd className="order-1 font-mono text-xl font-semibold tabular-nums text-foreground">
                {r.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <p className="mt-5 text-base text-foreground/90">
        {project.oneLiner}
      </p>
    </>
  );
}

function CardFooter({ project }: { project: Project }) {
  const shown = new Set(project.readouts?.map((r) => r.from));
  const moreMetrics = project.metrics.filter((_, i) => !shown.has(i));
  const hasDetails =
    !!project.problem || project.approach.length > 0 || moreMetrics.length > 0;

  return (
    <>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Badge
            key={tech}
            variant="outline"
            className="bg-background/50 hover:glow-sm transition-all hover:bg-white/5 border-white/10"
          >
            {tech}
          </Badge>
        ))}
      </div>

      {hasDetails && (
        <details className="group/details mt-5 border-t border-border pt-4">
          <summary className="flex w-fit cursor-pointer list-none items-center gap-1.5 rounded-sm text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
            <ChevronRight
              aria-hidden
              className="size-4 transition-transform motion-reduce:transition-none group-open/details:rotate-90"
            />
            How it&apos;s built
          </summary>

          <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
            {project.problem && (
              <p>
                <strong className="text-foreground/80">Problem:</strong>{" "}
                {project.problem}
              </p>
            )}
            {project.approach.length > 0 && (
              <ul className="space-y-1.5">
                {project.approach.slice(0, 4).map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden className="text-primary mt-0.5 shrink-0">
                      ▹
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
            {moreMetrics.length > 0 && (
              <ul className="space-y-1.5 border-t border-border pt-4">
                {moreMetrics.map((metric) => (
                  <li key={metric} className="font-medium text-foreground/90">
                    {metric}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </details>
      )}

      {project.links.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-4">
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
    </>
  );
}

function CardMedia({ project }: { project: Project }) {
  if (project.demoUrl) {
    return <ProjectDemo src={project.demoUrl} title={project.name} />;
  }
  if (project.images && project.images.length > 0) {
    return (
      <ProjectImage
        images={project.images}
        alt={project.name}
        aspect={project.imageAspect}
        ratio={project.imageRatio}
      />
    );
  }
  return null;
}

export function FeaturedProjects() {
  return (
    <div className="flex flex-col gap-12 md:gap-16">
      {featuredProjects.map((project, index) => {
        const isEven = index % 2 === 0;
        // Architecture diagrams span the full card so their labels stay readable.
        const wide = project.imageAspect === "wide";

        return (
          <Reveal key={project.slug} delay={0.1}>
            <div className="gradient-border rounded-2xl">
              <article className="glass-card overflow-hidden rounded-2xl bg-background/50 p-6 sm:p-8">
                {wide ? (
                  <>
                    <CardHeader project={project} />
                    <div className="mt-6">
                      <CardMedia project={project} />
                    </div>
                    <CardFooter project={project} />
                  </>
                ) : (
                  <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
                    <div
                      className={`w-full lg:w-5/12 ${
                        isEven ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <CardMedia project={project} />
                    </div>
                    <div
                      className={`w-full lg:w-7/12 ${
                        isEven ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <CardHeader project={project} />
                      <CardFooter project={project} />
                    </div>
                  </div>
                )}
              </article>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
