import React from "react";
import { Cpu, Network } from "lucide-react";
import {
  SiPython,
  SiTypescript,
  SiCplusplus,
  SiDart,
  SiKotlin,
  SiSolidity,
  SiFastapi,
  SiNodedotjs,
  SiPostgresql,
  SiRedis,
  SiSupabase,
  SiFlutter,
  SiJetpackcompose,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFirebase,
  SiPytorch,
  SiScikitlearn,
  SiLangchain,
  SiOpencv,
} from "react-icons/si";

export type Skill = {
  name: string;
  iconNode?: React.ReactNode;
};

export type SkillGroup = {
  label: string;
  icon: React.ReactNode;
  iconColorClass: string;
  iconBgClass: string;
  skills: Skill[];
};

const ic = (Icon: React.ComponentType<{ className?: string }>, colorClass: string) => (
  <Icon className={`w-4 h-4 ${colorClass}`} />
);

// Icons are monochrome (text-foreground) so they read in both themes.
// Every entry maps to a project or role shown on the page, except C / C++, Next.js and Tailwind CSS,
// which were kept at the owner's request.
export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    iconColorClass: "text-primary",
    iconBgClass: "bg-primary/10 group-hover:bg-primary/20",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
      </svg>
    ),
    skills: [
      { name: "Python", iconNode: ic(SiPython, "text-foreground") },
      { name: "TypeScript", iconNode: ic(SiTypescript, "text-foreground") },
      { name: "C / C++", iconNode: ic(SiCplusplus, "text-foreground") },
      { name: "Dart", iconNode: ic(SiDart, "text-foreground") },
      { name: "Kotlin", iconNode: ic(SiKotlin, "text-foreground") },
      { name: "Solidity", iconNode: ic(SiSolidity, "text-foreground") },
    ],
  },
  {
    label: "Backend & Data",
    iconColorClass: "text-primary",
    iconBgClass: "bg-primary/10 group-hover:bg-primary/20",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
      </svg>
    ),
    skills: [
      { name: "FastAPI", iconNode: ic(SiFastapi, "text-foreground") },
      { name: "Node.js / Express", iconNode: ic(SiNodedotjs, "text-foreground") },
      { name: "SQL (PostgreSQL / TimescaleDB)", iconNode: ic(SiPostgresql, "text-foreground") },
      { name: "Redis", iconNode: ic(SiRedis, "text-foreground") },
      { name: "Supabase Edge Functions", iconNode: ic(SiSupabase, "text-foreground") },
      { name: "WebSockets", iconNode: <Network className="w-4 h-4 text-foreground" /> },
    ],
  },
  {
    label: "Mobile & Frontend",
    iconColorClass: "text-primary",
    iconBgClass: "bg-primary/10 group-hover:bg-primary/20",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
    ),
    skills: [
      { name: "Flutter", iconNode: ic(SiFlutter, "text-foreground") },
      { name: "Jetpack Compose", iconNode: ic(SiJetpackcompose, "text-foreground") },
      { name: "React", iconNode: ic(SiReact, "text-foreground") },
      { name: "Next.js", iconNode: ic(SiNextdotjs, "text-foreground") },
      { name: "Tailwind CSS", iconNode: ic(SiTailwindcss, "text-foreground") },
      { name: "Firebase", iconNode: ic(SiFirebase, "text-foreground") },
    ],
  },
  {
    label: "AI / ML",
    iconColorClass: "text-primary",
    iconBgClass: "bg-primary/10 group-hover:bg-primary/20",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
      </svg>
    ),
    skills: [
      { name: "PyTorch", iconNode: ic(SiPytorch, "text-foreground") },
      { name: "scikit-learn", iconNode: ic(SiScikitlearn, "text-foreground") },
      { name: "MediaPipe", iconNode: <Cpu className="w-4 h-4 text-foreground" /> },
      { name: "LangGraph", iconNode: ic(SiLangchain, "text-foreground") },
      { name: "OpenCV", iconNode: ic(SiOpencv, "text-foreground") },
      {
        name: "Gemini API",
        iconNode: (
          <svg className="w-4 h-4 text-foreground" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 2L12.5 8.5L19 10L12.5 11.5L11 18L9.5 11.5L3 10L9.5 8.5L11 2ZM17.5 15.5L18.25 18.75L21.5 19.5L18.25 20.25L17.5 23.5L16.75 20.25L13.5 19.5L16.75 18.75L17.5 15.5Z"></path>
          </svg>
        ),
      },
    ],
  },
];
