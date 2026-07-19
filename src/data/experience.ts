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
      "Reduced average page load time by 18% and improved live-site reliability by designing and shipping 6+ reusable React.js UI components and Node.js/Express.js REST services on a MySQL-backed data layer across 2 sprint cycles, validated through peer code review and unit testing",
      "Cut average API response time by 22% across 3 production endpoints by optimizing SQL queries and adding database indexes, collaborating cross-functionally in daily Agile standups to translate requirements into production-ready components",
    ],
  },
  {
    role: "AI Research Intern",
    org: "The Indian Hotels Company Limited (IHCL)",
    location: "Mumbai, India",
    period: "May – June 2025",
    bullets: [
      "Drove enterprise-wide selection of an AI chatbot partner for a Fortune 500 hospitality group, as measured by 35% identified cost savings across 5+ vendors and 15+ use cases, by designing and building a structured cost-parametrization evaluation framework",
      "Directly informed the vendor recommendation adopted by leadership by representing technical requirements in client and vendor demo calls, translating hospitality-specific operational needs into per-use-case cost parameters feeding the evaluation framework",
    ],
  },
]

export const education = {
  school: "Vellore Institute of Technology",
  location: "Chennai, India",
  degree: "B.Tech Computer Science and Engineering",
  detail: "CGPA: 9.13",
  period: "2023 – 2027",
}
