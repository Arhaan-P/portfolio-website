import { SectionHeading } from "@/components/section-heading";
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
      <div className="relative bg-background pb-10">
        <Hero />
        <section id="projects" className="section-shell">
          <SectionHeading href="#projects" title="Featured Projects" />
          <FeaturedProjects />
        </section>
        <ProjectGrid />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </div>
      <Footer />
    </>
  );
}
