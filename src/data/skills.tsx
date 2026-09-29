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

// Every entry maps to a project or role shown on the page, except C / C++, Next.js and Tailwind CSS,
// which were kept at the owner's request.
export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    iconColorClass: "text-blue-400 group-hover:text-blue-300",
    iconBgClass: "bg-blue-500/10 group-hover:bg-blue-500/20",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
      </svg>
    ),
    skills: [
      { name: "Python", iconNode: ic(SiPython, "text-[#3776AB]") },
      { name: "TypeScript", iconNode: ic(SiTypescript, "text-[#3178C6]") },
      { name: "C / C++", iconNode: ic(SiCplusplus, "text-[#00599C]") },
      { name: "Dart", iconNode: ic(SiDart, "text-[#0175C2]") },
      { name: "Kotlin", iconNode: ic(SiKotlin, "text-[#7F52FF]") },
      { name: "Solidity", iconNode: ic(SiSolidity, "text-foreground") },
    ],
  },
  {
    label: "Backend & Data",
    iconColorClass: "text-emerald-400 group-hover:text-emerald-300",
    iconBgClass: "bg-emerald-500/10 group-hover:bg-emerald-500/20",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
      </svg>
    ),
    skills: [
      { name: "FastAPI", iconNode: ic(SiFastapi, "text-[#009688]") },
      { name: "Node.js / Express", iconNode: ic(SiNodedotjs, "text-[#5FA04E]") },
      { name: "SQL (PostgreSQL / TimescaleDB)", iconNode: ic(SiPostgresql, "text-[#4169E1]") },
      { name: "Redis", iconNode: ic(SiRedis, "text-[#FF4438]") },
      { name: "Supabase Edge Functions", iconNode: ic(SiSupabase, "text-[#3ECF8E]") },
      { name: "WebSockets", iconNode: <Network className="w-4 h-4 text-emerald-400" /> },
    ],
  },
  {
    label: "Mobile & Frontend",
    iconColorClass: "text-cyan-400 group-hover:text-cyan-300",
    iconBgClass: "bg-cyan-500/10 group-hover:bg-cyan-500/20",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
    ),
    skills: [
      { name: "Flutter", iconNode: ic(SiFlutter, "text-[#02569B]") },
      { name: "Jetpack Compose", iconNode: ic(SiJetpackcompose, "text-[#4285F4]") },
      { name: "React", iconNode: ic(SiReact, "text-[#61DAFB]") },
      { name: "Next.js", iconNode: ic(SiNextdotjs, "text-foreground") },
      { name: "Tailwind CSS", iconNode: ic(SiTailwindcss, "text-[#06B6D4]") },
      { name: "Firebase", iconNode: ic(SiFirebase, "text-[#FFCA28]") },
    ],
  },
  {
    label: "AI / ML",
    iconColorClass: "text-purple-400 group-hover:text-purple-300",
    iconBgClass: "bg-purple-500/10 group-hover:bg-purple-500/20",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
      </svg>
    ),
    skills: [
      { name: "PyTorch", iconNode: ic(SiPytorch, "text-[#EE4C2C]") },
      { name: "scikit-learn", iconNode: ic(SiScikitlearn, "text-[#F7931E]") },
      { name: "MediaPipe", iconNode: <Cpu className="w-4 h-4 text-purple-400" /> },
      { name: "LangGraph", iconNode: ic(SiLangchain, "text-[#1C3C3C] dark:text-[#3ECF8E]") },
      { name: "OpenCV", iconNode: ic(SiOpencv, "text-[#5C3EE8]") },
      {
        name: "Gemini API",
        iconNode: (
          <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 2L12.5 8.5L19 10L12.5 11.5L11 18L9.5 11.5L3 10L9.5 8.5L11 2ZM17.5 15.5L18.25 18.75L21.5 19.5L18.25 20.25L17.5 23.5L16.75 20.25L13.5 19.5L16.75 18.75L17.5 15.5Z"></path>
          </svg>
        ),
      },
    ],
  },
];
