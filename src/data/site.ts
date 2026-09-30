export const site = {
  name: "Arhaan Penwala",
  role: "Software Engineer",
  roles: ["Software Engineer", "AI/ML Engineer"],
  tagline:
    "I build distributed systems, scalable architectures, and applied ML pipelines, from a multi-drone ground control system to a campus super-app that reached over a thousand users in its first hour.",
  email: "arhaanpenwala9@gmail.com",
  github: "https://github.com/Arhaan-P",
  linkedin: "https://www.linkedin.com/in/arhaan-penwala/",
  resumeUrl: "/arhaan_sde.pdf",
  location: "Chennai, India",
  bio:
    "I'm a B.Tech CSE student at VIT Chennai building distributed systems and applied ML. My experience spans software development at BPO Integra and AI research at IHCL. I lead VHELP, a campus app that reached 1,000+ users in its first hour, and I'm building PolarisGCS, a multi-drone ground control system. My gait-based deepfake detection research, with its dataset published on IEEE DataPort, is submitted to ISM 2026.",
  seeking:
    // Non-breaking hyphens (U+2011) keep "AI‑engineer" and "new‑grad" whole when the line wraps.
    "Seeking SDE and AI‑engineer internships and new‑grad roles.",
} as const;

export const navLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;
