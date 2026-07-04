import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Skills } from "@/components/sections/skills"
import { Experience } from "@/components/sections/experience"
import { FeaturedProjects } from "@/components/sections/featured-projects"
import { ProjectGrid } from "@/components/sections/project-grid"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <FeaturedProjects />
      <ProjectGrid />
      <Contact />
      <Footer />
    </>
  )
}
