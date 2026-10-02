"use client";

import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { featuredProjects, type Project } from "@/data/projects";
import { ChevronDown, ExternalLink } from "lucide-react";
import { ProjectDemo } from "./project-demo";
import { ProjectImage } from "./project-image";

/** Results shown on the card face; the rest move into "How it works". */
const VISIBLE_METRICS = 3;

function Media({ project }: { project: Project }) {
  if (project.demoUrl) {
    return <ProjectDemo src={project.demoUrl} title={project.name} />;
  }
  if (project.images && project.images.length > 0) {
    return (
      <div
        className={`relative mx-auto w-full ${
          project.imageAspect === "wide" || project.imageRatio ? "" : "max-w-3xl"
        }`}
      >
        <ProjectImage
          images={project.images}
          alt={project.name}
          aspect={project.imageAspect}
          ratio={project.imageRatio}
        />
      </div>
    );
  }
  return (
    <div className="relative flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-aurora-1/20 to-aurora-2/20 sm:aspect-16/10">
      <span className="text-6xl font-bold tracking-tighter text-foreground/20">
        {project.name
          .split(" ")
          .map((w) => w[0])
          .join("")
          .substring(0, 2)
          .toUpperCase()}
      </span>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  // Phone-shaped demos sit in a narrow side column; landscape artwork leads on top.
  const side = !!project.demoUrl;
  const metrics = project.metrics.slice(0, VISIBLE_METRICS);
  const moreMetrics = project.metrics.slice(VISIBLE_METRICS);
  const hasDetails =
    !!project.problem || project.approach.length > 0 || moreMetrics.length > 0;

  return (
    <Reveal delay={0.1}>
      <article className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className={side ? "grid lg:grid-cols-[22rem_minmax(0,1fr)]" : ""}>
          <div
            className={`p-4 sm:p-6 lg:p-8 ${
              side ? "flex items-start justify-center lg:pr-0" : ""
            }`}
          >
            <Media project={project} />
          </div>

          <div
            className={`grid content-start gap-8 ${
              side
                ? "p-6 sm:p-8 lg:p-10"
                : "px-6 pb-8 pt-2 sm:px-8 lg:grid-cols-5 lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:px-10 lg:pb-10"
            }`}
          >
            <header className={side ? "" : "lg:col-span-3"}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {project.period && (
                  <span className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
                    {project.period}
                  </span>
                )}
                {project.role && (
                  <span className="text-sm font-medium text-muted-foreground">
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
            </header>

            <div
              className={`flex flex-col gap-6 ${
                side ? "" : "lg:col-span-2 lg:col-start-4 lg:row-span-2 lg:row-start-1"
              }`}
            >
              {metrics.length > 0 && (
                <ul className="grid gap-3">
                  {metrics.map((metric) => (
                    <li
                      key={metric}
                      className="border-t border-border pt-3 text-sm font-medium text-foreground/90"
                    >
                      {metric}
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="border-border bg-background/50"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>

              {project.links.length > 0 && (
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-aurora-1"
                    >
                      {link.label}
                      <ExternalLink className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {hasDetails && (
              <details
                className={`group border-t border-border ${
                  side ? "" : "self-start lg:col-span-3"
                }`}
              >
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-md text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                  How it works
                  <ChevronDown className="size-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="space-y-4 pt-2 text-sm leading-relaxed text-muted-foreground">
                  {project.problem && (
                    <p>
                      <strong className="text-foreground/80">Problem:</strong>{" "}
                      {project.problem}
                    </p>
                  )}
                  {project.approach.length > 0 && (
                    <div className="space-y-1">
                      <strong className="text-foreground/80">Approach:</strong>
                      <ul className="list-disc space-y-1.5 pl-5 marker:text-primary">
                        {project.approach.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {moreMetrics.length > 0 && (
                    <div className="space-y-1">
                      <strong className="text-foreground/80">More results:</strong>
                      <ul className="list-disc space-y-1.5 pl-5 marker:text-primary">
                        {moreMetrics.map((metric) => (
                          <li key={metric}>{metric}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function FeaturedProjects() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {featuredProjects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
