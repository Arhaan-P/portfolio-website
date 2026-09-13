import React from "react";
import { BadgeCheck, Cpu, Network, Blocks } from "lucide-react";
import {
  SiGoogle,
  SiCisco,
  SiPython,
  SiTypescript,
  SiJavascript,
  SiOpenjdk,
  SiCplusplus,
  SiDart,
  SiKotlin,
  SiPostgresql,
  SiReact,
  SiNextdotjs,
  SiVite,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiFlutter,
  SiJetpackcompose,
  SiQt,
  SiLeaflet,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiSocketdotio,
  SiJsonwebtokens,
  SiDeno,
  SiLangchain,
  SiPydantic,
  SiPytorch,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiSqlite,
  SiSupabase,
  SiFirebase,
  SiDocker,
  SiGithubactions,
  SiGit,
  SiLinux,
  SiKubernetes,
  SiSolidity,
  SiPolygon,
} from "react-icons/si";

export type Skill = {
  name: string;
  iconClass?: string;
  iconNode?: React.ReactNode;
};

export type SkillGroup = {
  label: string;
  icon: React.ReactNode;
  iconColorClass: string;
  iconBgClass: string;
  skills: Skill[];
  colSpan?: number;
};

const ic = (Icon: React.ComponentType<{ className?: string }>, colorClass: string) => (
  <Icon className={`w-4 h-4 ${colorClass}`} />
);

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
      { name: "JavaScript", iconNode: ic(SiJavascript, "text-[#F7DF1E]") },
      { name: "Java", iconNode: ic(SiOpenjdk, "text-[#EA2D2E]") },
      { name: "C/C++", iconNode: ic(SiCplusplus, "text-[#00599C]") },
      { name: "Dart", iconNode: ic(SiDart, "text-[#0175C2]") },
      { name: "Kotlin", iconNode: ic(SiKotlin, "text-[#7F52FF]") },
      { name: "SQL", iconNode: ic(SiPostgresql, "text-[#4169E1]") },
    ],
  },
  {
    label: "Frontend",
    colSpan: 2,
    iconColorClass: "text-cyan-400 group-hover:text-cyan-300",
    iconBgClass: "bg-cyan-500/10 group-hover:bg-cyan-500/20",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
    ),
    skills: [
      { name: "React.js", iconNode: ic(SiReact, "text-[#61DAFB]") },
      { name: "Next.js", iconNode: ic(SiNextdotjs, "text-foreground") },
      { name: "TypeScript", iconNode: ic(SiTypescript, "text-[#3178C6]") },
      { name: "Vite", iconNode: ic(SiVite, "text-[#646CFF]") },
      { name: "Tailwind CSS", iconNode: ic(SiTailwindcss, "text-[#06B6D4]") },
      { name: "HTML5", iconNode: ic(SiHtml5, "text-[#E34F26]") },
      { name: "CSS3", iconNode: ic(SiCss, "text-[#1572B6]") },
      { name: "Flutter", iconNode: ic(SiFlutter, "text-[#02569B]") },
      { name: "Riverpod", iconNode: <Blocks className="w-4 h-4 text-[#00D2B4]" /> },
      { name: "Jetpack Compose", iconNode: ic(SiJetpackcompose, "text-[#4285F4]") },
      { name: "PySide6", iconNode: ic(SiQt, "text-[#41CD52]") },
      { name: "Leaflet", iconNode: ic(SiLeaflet, "text-[#199900]") },
    ],
  },
  {
    label: "Backend & APIs",
    iconColorClass: "text-emerald-400 group-hover:text-emerald-300",
    iconBgClass: "bg-emerald-500/10 group-hover:bg-emerald-500/20",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
      </svg>
    ),
    skills: [
      { name: "Node.js", iconNode: ic(SiNodedotjs, "text-[#5FA04E]") },
      { name: "Express.js", iconNode: ic(SiExpress, "text-foreground") },
      { name: "FastAPI", iconNode: ic(SiFastapi, "text-[#009688]") },
      { name: "REST APIs", iconNode: <Network className="w-4 h-4 text-emerald-400" /> },
      { name: "WebSockets", iconNode: <Network className="w-4 h-4 text-emerald-400" /> },
      { name: "Socket.IO", iconNode: ic(SiSocketdotio, "text-foreground") },
      { name: "Deno Edge Functions", iconNode: ic(SiDeno, "text-foreground") },
      { name: "JWT Authentication", iconNode: ic(SiJsonwebtokens, "text-[#000000] dark:text-white") },
    ],
  },
  {
    label: "AI & LLM Engineering",
    colSpan: 2,
    iconColorClass: "text-purple-400 group-hover:text-purple-300",
    iconBgClass: "bg-purple-500/10 group-hover:bg-purple-500/20",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
      </svg>
    ),
    skills: [
      { name: "LangGraph", iconNode: ic(SiLangchain, "text-[#1C3C3C] dark:text-[#3ECF8E]") },
      { name: "pydantic-ai", iconNode: ic(SiPydantic, "text-[#E92063]") },
      {
        name: "Gemini API",
        iconNode: (
          <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 2L12.5 8.5L19 10L12.5 11.5L11 18L9.5 11.5L3 10L9.5 8.5L11 2ZM17.5 15.5L18.25 18.75L21.5 19.5L18.25 20.25L17.5 23.5L16.75 20.25L13.5 19.5L16.75 18.75L17.5 15.5Z"></path>
          </svg>
        ),
      },
      { name: "PyTorch", iconNode: ic(SiPytorch, "text-[#EE4C2C]") },
      { name: "Scikit-learn", iconNode: ic(SiScikitlearn, "text-[#F7931E]") },
      { name: "XGBoost", iconNode: <Cpu className="w-4 h-4 text-purple-400" /> },
      { name: "Pandas", iconNode: ic(SiPandas, "text-[#150458] dark:text-white") },
      { name: "NumPy", iconNode: ic(SiNumpy, "text-[#013243] dark:text-[#4DABCF]") },
      { name: "MediaPipe", iconNode: <Cpu className="w-4 h-4 text-purple-400" /> },
      { name: "Grad-CAM", iconNode: <Cpu className="w-4 h-4 text-purple-400" /> },
      { name: "tree-sitter", iconNode: <Cpu className="w-4 h-4 text-purple-400" /> },
    ],
  },
  {
    label: "Databases & Data",
    iconColorClass: "text-sky-400 group-hover:text-sky-300",
    iconBgClass: "bg-sky-500/10 group-hover:bg-sky-500/20",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7c0-1.657 3.582-3 8-3s8 1.343 8 3-3.582 3-8 3-8-1.343-8-3zm0 0v10c0 1.657 3.582 3 8 3s8-1.343 8-3V7m-16 5c0 1.657 3.582 3 8 3s8-1.343 8-3"></path>
      </svg>
    ),
    skills: [
      { name: "PostgreSQL", iconNode: ic(SiPostgresql, "text-[#4169E1]") },
      { name: "TimescaleDB", iconNode: ic(SiPostgresql, "text-[#FDB515]") },
      { name: "MySQL", iconNode: ic(SiMysql, "text-[#4479A1]") },
      { name: "MongoDB", iconNode: ic(SiMongodb, "text-[#47A248]") },
      { name: "Redis", iconNode: ic(SiRedis, "text-[#FF4438]") },
      { name: "SQLite", iconNode: ic(SiSqlite, "text-[#003B57] dark:text-[#7DACC5]") },
      { name: "Supabase", iconNode: ic(SiSupabase, "text-[#3ECF8E]") },
      { name: "Firebase/Firestore", iconNode: ic(SiFirebase, "text-[#FFCA28]") },
    ],
  },
  {
    label: "Cloud & Infra",
    iconColorClass: "text-orange-400 group-hover:text-orange-300",
    iconBgClass: "bg-orange-500/10 group-hover:bg-orange-500/20",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
      </svg>
    ),
    skills: [
      { name: "Docker", iconNode: ic(SiDocker, "text-[#2496ED]") },
      { name: "AWS (EC2, Cognito, S3)", iconClass: "devicon-amazonwebservices-plain-wordmark colored text-2xl" },
      { name: "Azure", iconClass: "devicon-azure-plain colored text-lg" },
      { name: "GitHub Actions", iconNode: ic(SiGithubactions, "text-[#2088FF]") },
      { name: "CI/CD", iconNode: <Network className="w-4 h-4 text-orange-400" /> },
      { name: "Git", iconNode: ic(SiGit, "text-[#F05032]") },
      { name: "Linux", iconNode: ic(SiLinux, "text-[#FCC624]") },
      { name: "Kubernetes", iconNode: ic(SiKubernetes, "text-[#326CE5]") },
    ],
  },
  {
    label: "Blockchain",
    iconColorClass: "text-violet-400 group-hover:text-violet-300",
    iconBgClass: "bg-violet-500/10 group-hover:bg-violet-500/20",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
      </svg>
    ),
    skills: [
      { name: "Solidity", iconNode: ic(SiSolidity, "text-foreground") },
      { name: "Hardhat", iconNode: <Blocks className="w-4 h-4 text-[#FFF100]" /> },
      { name: "Polygon Amoy", iconNode: ic(SiPolygon, "text-[#8247E5]") },
    ],
  },
  {
    label: "Concepts",
    colSpan: 2,
    iconColorClass: "text-rose-400 group-hover:text-rose-300",
    iconBgClass: "bg-rose-500/10 group-hover:bg-rose-500/20",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
      </svg>
    ),
    skills: [
      { name: "System Design" },
      { name: "Data Structures & Algorithms" },
      { name: "OOP" },
      { name: "Concurrency" },
      { name: "Caching" },
      { name: "Database Indexing" },
      { name: "Agent Evaluation & Benchmark Design" },
    ],
  },
  {
    label: "Certifications",
    iconColorClass: "text-amber-400 group-hover:text-amber-300",
    iconBgClass: "bg-amber-500/10 group-hover:bg-amber-500/20",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
      </svg>
    ),
    skills: [
      {
        name: "Google AI Essentials",
        iconNode: <SiGoogle className="w-4 h-4 text-[#4285F4]" />,
      },
      {
        name: "Google Prompting Essentials",
        iconNode: <SiGoogle className="w-4 h-4 text-[#4285F4]" />,
      },
      {
        name: "Google AI Professional",
        iconNode: <SiGoogle className="w-4 h-4 text-[#4285F4]" />,
      },
      {
        name: "Cisco Introduction to Cybersecurity",
        iconNode: <SiCisco className="w-4 h-4 text-[#1BA0D7]" />,
      },
      {
        name: "IBM AI Fundamentals",
        iconNode: <BadgeCheck className="w-4 h-4 text-[#052FAD]" />,
      },
      {
        name: "AWS Academy Graduate: Cloud Architecting",
        iconClass: "devicon-amazonwebservices-plain-wordmark colored text-2xl",
      },
    ],
  },
];
