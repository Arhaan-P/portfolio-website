export type SkillGroup = {
  label: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    skills: ["Python", "TypeScript/JavaScript", "Dart", "Java", "C/C++", "SQL", "Kotlin"],
  },
  {
    label: "Backend",
    skills: ["FastAPI", "Node.js", "Express.js", "Deno Edge Functions", "WebSockets"],
  },
  {
    label: "Frontend",
    skills: ["React.js", "Flutter", "Jetpack Compose"],
  },
  {
    label: "Cloud & DevOps",
    skills: [
      "AWS (EC2, Cognito, S3)",
      "Firebase",
      "Supabase",
      "Docker",
      "PostgreSQL/TimescaleDB",
      "MySQL",
      "MongoDB",
      "Redis",
      "GitHub Actions",
      "Git",
    ],
  },
  {
    label: "ML & AI",
    skills: ["PyTorch", "Scikit-learn", "Pandas", "XGBoost", "MediaPipe", "Gemini API"],
  },
]
