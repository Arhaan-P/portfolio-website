import { SectionDivider } from "@/components/motion/section-divider";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { ProjectGrid } from "@/components/sections/project-grid";
import { Skills } from "@/components/sections/skills";

export default function Home() {
  return (
    <>
      <div className="relative z-10 bg-background shadow-[0_10px_50px_color-mix(in_oklch,var(--foreground)_40%,transparent)] pb-10">
        <Hero />
        <SectionDivider />
        <section id="projects" className="section-shell">
          <div className="section-head">
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-sub">
              A selection of my recent work in building distributed systems,
              scalable architectures, and machine learning pipelines.
            </p>
          </div>
          <FeaturedProjects />
        </section>

        <SectionDivider />
        <Experience />
        <SectionDivider />
        <ProjectGrid />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Contact />
      </div>
      <Footer />
    </>
  );
}
