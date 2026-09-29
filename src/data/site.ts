export const site = {
  name: "Arhaan Penwala",
  role: "Software Engineer",
  roles: ["Software Engineer", "AI/ML Engineer"],
  tagline:
    "I build distributed systems, scalable architectures, and applied ML pipelines, from a multi-drone ground control system to a campus super-app serving over a thousand students.",
  email: "arhaanpenwala9@gmail.com",
  github: "https://github.com/Arhaan-P",
  linkedin: "https://www.linkedin.com/in/arhaan-penwala/",
  resumeUrl: "/arhaan_sde.pdf",
  location: "Chennai, India",
  seeking:
    // Non-breaking hyphens (U+2011) keep "AI‑engineer" and "new‑grad" whole when the line wraps.
    "Seeking SDE and AI‑engineer internships and new‑grad roles · B.Tech CSE, VIT Chennai, class of 2027",
} as const;

/** Hero proof strip. Every figure is sourced from data/projects.ts or portfolio-context. */
export const proof = [
  { value: "1,000+", label: "VHELP · users in the first hour" },
  { value: "24", label: "VHELP · serverless Edge Functions" },
  { value: "4-component", label: "PolarisGCS · drone-fleet topology" },
  { value: "95.10% ± 3.08%", label: "Deepfake detection · AUC-ROC (per-fold mean)" },
] as const;

export const navLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;
