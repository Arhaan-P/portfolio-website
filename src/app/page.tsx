import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Skills } from "@/components/sections/skills"
import { Experience } from "@/components/sections/experience"
import { FeaturedProjects } from "@/components/sections/featured-projects"
import { ProjectGrid } from "@/components/sections/project-grid"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"
import { SectionDivider } from "@/components/motion/section-divider"

export default function Home() {
  return (
    <>
      <div className="relative z-10 bg-background shadow-[0_10px_50px_rgba(0,0,0,0.5)] pb-10">
        <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      
      <section id="projects" className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 relative">
        <div className="mb-12">
          <p className="font-mono text-sm text-primary uppercase tracking-wider font-semibold">Portfolio</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-gradient inline-block">
            Featured Projects
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            A selection of my recent work in building distributed systems, scalable architectures, and machine learning pipelines.
          </p>
        </div>
        <FeaturedProjects />
      </section>

      <SectionDivider />
      <ProjectGrid />
      <SectionDivider />
      <Contact />
      </div>
      <Footer />
    </>
  )
}
