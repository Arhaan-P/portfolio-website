import React from "react";

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

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    colSpan: 2,
    iconColorClass: "text-blue-400 group-hover:text-blue-300",
    iconBgClass: "bg-blue-500/10 group-hover:bg-blue-500/20",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
      </svg>
    ),
    skills: [
      { name: "Python", iconClass: "devicon-python-plain colored text-lg" },
      { name: "TypeScript", iconClass: "devicon-typescript-plain colored text-lg" },
      { name: "JavaScript", iconClass: "devicon-javascript-plain colored text-lg" },
      { name: "Java", iconClass: "devicon-java-plain colored text-lg" },
      { name: "C#", iconClass: "devicon-csharp-plain colored text-lg" },
      { name: "Go", iconClass: "devicon-go-plain colored text-lg" },
      { name: "Dart", iconClass: "devicon-dart-plain colored text-lg" },
      { name: "C/C++", iconClass: "devicon-cplusplus-plain colored text-lg" },
      { name: "Kotlin", iconClass: "devicon-kotlin-plain colored text-lg" },
      { name: "SQL", iconClass: "devicon-azuresqldatabase-plain colored text-lg" },
    ],
  },
  {
    label: "Frontend",
    iconColorClass: "text-cyan-400 group-hover:text-cyan-300",
    iconBgClass: "bg-cyan-500/10 group-hover:bg-cyan-500/20",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
    ),
    skills: [
      { name: "React.js", iconClass: "devicon-react-original colored text-lg" },
      { name: "Next.js", iconClass: "devicon-nextjs-plain text-slate-200 text-lg" },
      { name: "Tailwind CSS", iconClass: "devicon-tailwindcss-plain colored text-lg" },
      { name: "HTML5", iconClass: "devicon-html5-plain colored text-lg" },
      { name: "CSS3", iconClass: "devicon-css3-plain colored text-lg" },
      { name: "Flutter", iconClass: "devicon-flutter-plain colored text-lg" },
      { name: "Jetpack Compose", iconClass: "devicon-android-plain colored text-lg" },
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
      { name: "Node.js", iconClass: "devicon-nodejs-plain colored text-lg" },
      { name: "Express.js", iconClass: "devicon-express-original text-slate-200 text-lg" },
      { name: "FastAPI", iconClass: "devicon-fastapi-plain colored text-lg" },
      { name: "Deno Edge", iconClass: "devicon-denojs-original text-slate-200 text-lg" },
      { 
        name: "WebSockets", 
        iconNode: (
          <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
          </svg>
        ) 
      },
    ],
  },
  {
    label: "ML & AI",
    iconColorClass: "text-purple-400 group-hover:text-purple-300",
    iconBgClass: "bg-purple-500/10 group-hover:bg-purple-500/20",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
      </svg>
    ),
    skills: [
      { name: "PyTorch", iconClass: "devicon-pytorch-original colored text-lg" },
      { name: "Scikit-learn", iconClass: "devicon-scikitlearn-plain colored text-lg" },
      { name: "Pandas", iconClass: "devicon-pandas-original colored text-lg" },
      { name: "XGBoost" },
      { name: "MediaPipe" },
      { 
        name: "Gemini API", 
        iconNode: (
          <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 2L12.5 8.5L19 10L12.5 11.5L11 18L9.5 11.5L3 10L9.5 8.5L11 2ZM17.5 15.5L18.25 18.75L21.5 19.5L18.25 20.25L17.5 23.5L16.75 20.25L13.5 19.5L16.75 18.75L17.5 15.5Z"></path>
          </svg>
        ) 
      },
    ],
  },
  {
    label: "Cloud & DevOps",
    colSpan: 2,
    iconColorClass: "text-orange-400 group-hover:text-orange-300",
    iconBgClass: "bg-orange-500/10 group-hover:bg-orange-500/20",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
      </svg>
    ),
    skills: [
      { name: "Azure", iconClass: "devicon-azure-plain colored text-lg" },
      { name: "AWS (EC2, Cognito, S3)", iconClass: "devicon-amazonwebservices-plain-wordmark colored text-2xl" },
      { name: "Firebase", iconClass: "devicon-firebase-plain colored text-lg" },
      { name: "Supabase", iconClass: "devicon-supabase-plain colored text-lg" },
      { name: "Docker", iconClass: "devicon-docker-plain colored text-lg" },
      { name: "PostgreSQL", iconClass: "devicon-postgresql-plain colored text-lg" },
      { name: "MySQL", iconClass: "devicon-mysql-plain colored text-lg" },
      { name: "MongoDB", iconClass: "devicon-mongodb-plain colored text-lg" },
      { name: "Redis", iconClass: "devicon-redis-plain colored text-lg" },
      { name: "GitHub Actions", iconClass: "devicon-githubactions-plain text-slate-200 text-lg" },
      { name: "Git", iconClass: "devicon-git-plain colored text-lg" },
      { name: "Kubernetes", iconClass: "devicon-kubernetes-plain colored text-lg" },
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
      { name: "Google AI Essentials" },
      { name: "Google Cloud Data Analytics" },
    ],
  },
];
