export type ExperienceEntry = {
  role: string
  org: string
  location: string
  period: string
  bullets: string[]
}

export const experience: ExperienceEntry[] = [
  {
    role: "Software Development Engineer Intern",
    org: "BPO Integra India Private Limited",
    location: "Remote",
    period: "Dec 2025 – Feb 2026",
    bullets: [
      "Delivered full-stack product features into production across 2 sprint cycles, building React.js UI components and Node.js/Express.js services on a MySQL-backed layer, validated through peer code review and unit testing",
      "Optimized query performance across 3+ RESTful API endpoints while partnering with cross-functional teams in daily Agile standups to translate product requirements into production-ready components",
    ],
  },
  {
    role: "AI Research Intern",
    org: "The Indian Hotels Company Limited (IHCL)",
    location: "Mumbai, India",
    period: "May – June 2025",
    bullets: [
      "Drove enterprise-wide selection of an AI chatbot partner for a Fortune 500 hospitality group, as measured by 35% identified cost savings across 5+ vendors and 15+ use cases, by designing and building a structured cost-parametrization evaluation framework",
    ],
  },
]

export const education = {
  school: "Vellore Institute of Technology",
  location: "Chennai, India",
  degree: "B.Tech Computer Science and Engineering (AI and Robotics)",
  detail: "CGPA: 9.13",
  period: "2023 – 2027",
}
