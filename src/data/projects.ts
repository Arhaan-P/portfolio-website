export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  slug: string
  name: string
  tier: "featured" | "standard"
  period?: string
  role?: string
  badge?: string
  oneLiner: string
  problem?: string
  approach: string[]
  stack: string[]
  metrics: string[]
  links: ProjectLink[]
  tags: string[]
}

export const projects: Project[] = [
  {
    slug: "polaris-gcs",
    name: "PolarisGCS",
    tier: "featured",
    period: "Ongoing",
    oneLiner:
      "A multi-drone Ground Control System for planning missions, monitoring live flights, and reviewing flight history across a fleet.",
    problem:
      "Drone operators need a single cloud-hosted surface to command many drones at once — real and simulated, hobbyist and industrial — while keeping every drone reachable through one consistent path regardless of its radio hardware.",
    approach: [
      "Architected a 4-component distributed topology — gateway, backend, frontend, and SITL testing suite — where every drone reaches the cloud through a gateway; there is no direct drone-to-cloud path.",
      "Engineered horizontal scaling by deploying stateless FastAPI instances that share live and persistent state through Redis pub/sub and PostgreSQL/TimescaleDB.",
      "Built a two-tier telemetry model (industrial Tier 1 / hobbyist Tier 2) with automatic, gateway-owned bandwidth-aware rich/critical telemetry allocation per radio group.",
      "Shipped a Kotlin + Jetpack Compose Android gateway wrapping the shared Python gateway core via Chaquopy — fully interoperable with the desktop gateway for multi-drone sessions.",
      "Added an autonomous, offline-first failsafe policy engine that runs on the gateway independent of cloud connectivity.",
    ],
    stack: [
      "FastAPI",
      "PostgreSQL/TimescaleDB",
      "Redis",
      "React",
      "TypeScript",
      "PySide6",
      "Kotlin",
      "Jetpack Compose",
      "MediaMTX",
      "Docker",
    ],
    metrics: [
      "4-component distributed architecture (gateway, backend, frontend, SITL suite)",
      "Two-tier telemetry model with automatic bandwidth-aware allocation",
      "Android + desktop gateway interoperability via a shared Python core",
      "Offline-first failsafe engine independent of cloud connectivity",
    ],
    links: [],
    tags: ["Systems", "Drones", "FastAPI", "React", "Kotlin"],
  },
  {
    slug: "vhelp",
    name: "VHELP",
    tier: "featured",
    period: "Ongoing",
    role: "Lead / top contributor across 2 repositories",
    oneLiner:
      "A campus super-app for VIT Chennai unifying food ordering, study materials, hostel/mess info, repairs, lost-and-found, a marketplace, carpooling, and messaging into one platform.",
    problem:
      "Campus services at VIT Chennai were scattered across websites, WhatsApp groups, and PDFs — VHELP replaces them with one mobile-first ecosystem for students, plus a management dashboard for the vendors and admins running those services.",
    approach: [
      "Engineered a production campus super-app scaling to a 13,000+ student body, adopted by 1,000+ users in the first hour, unifying 16+ workflows across Android, iOS, and Web.",
      "Designed a hybrid backend on Supabase PostgreSQL (Row-Level Security) plus Firebase Firestore, bridging two separate Firebase projects and Supabase auth through a custom JWT edge function.",
      "Deployed 33 serverless Deno Edge Functions handling business logic, FCM push notifications, and cron jobs — reducing manual backend operations to zero.",
      "Built an offline-first client with dedicated SQLite/offline sync layers so core features degrade gracefully without connectivity.",
      "Solved deep-linking for a shareable-cart flow using a custom vhelp:// scheme and Android digital asset links.",
    ],
    stack: ["Flutter", "Dart", "Supabase", "PostgreSQL", "Firebase", "Firestore", "Deno Edge Functions", "Node.js"],
    metrics: [
      "13,000+ student body",
      "1,000+ users in the first hour",
      "16+ unified campus workflows",
      "33 serverless Deno Edge Functions",
    ],
    links: [],
    tags: ["Flutter", "Supabase", "Firebase", "Full-Stack"],
  },
  {
    slug: "queez",
    name: "Queez",
    tier: "featured",
    period: "Ongoing",
    oneLiner:
      "A cross-platform learning app where students take quizzes and flashcards solo or in real-time multiplayer sessions, with AI turning uploaded documents into ready-made study material.",
    problem:
      "Static notes and single-purpose study apps — Kahoot for live quizzes, Quizlet for flashcards — don't combine active recall, gamified competition, and content creation in one place. Queez bundles quiz building, flashcards, notes, and live multiplayer into one app, with AI cutting the time needed to turn source documents into study material.",
    approach: [
      "Built real-time multiplayer quiz sessions over WebSockets with join codes/QR codes, live leaderboards, host controls, and reconnection support.",
      "Designed a speed- and streak-based scoring engine: a time-decayed point multiplier, per-answer partial credit for multi-select questions, and a capped streak bonus.",
      "Solved race-condition-safe scoring with per-user and session-wide Redis locks (retry/backoff) to prevent concurrent answers from clobbering shared session state.",
      "Added anti-cheat timestamp validation that clamps client-reported answer timing and caps score to block exploit attempts.",
      "Integrated Google Gemini to auto-generate quizzes, flashcards, and notes from uploaded PDF/PPTX/DOCX files via a secured, resumable upload flow that keeps the API key server-side.",
    ],
    stack: ["FastAPI", "Python", "MongoDB", "Redis", "Flutter", "Riverpod", "Firebase Auth", "Gemini API", "Docker"],
    metrics: [
      "Real-time multiplayer via WebSockets with distributed Redis locking",
      "Partial-credit scoring engine for multi-select questions",
      "AI-generated quizzes/flashcards/notes from uploaded documents",
    ],
    links: [
      { label: "Backend repo", href: "https://github.com/ABBEY-ANYTHING/Queez-Backend" },
      { label: "Frontend repo", href: "https://github.com/ABBEY-ANYTHING/QUEEZ" },
      { label: "Live API", href: "https://queez-backend.onrender.com" },
    ],
    tags: ["Flutter", "FastAPI", "Real-Time", "AI"],
  },
  {
    slug: "deepfake-detection",
    name: "Gait-Based Deepfake Detection",
    tier: "featured",
    period: "2025 – 2026",
    oneLiner:
      "A deepfake video detector that verifies identity by analyzing how a person walks, catching face-swap deepfakes that fool facial-recognition-based detectors.",
    problem:
      "Most deepfake detectors analyze facial artifacts, which face-swap tools are increasingly good at faking convincingly. Gait — the biomechanical pattern of how someone walks — is much harder to forge, since face-swap tools only replace the face, not body motion.",
    approach: [
      "Built a custom feature pipeline extracting 33 MediaPipe skeletal landmarks per frame into 78-dimensional gait signatures, normalized to 60-frame sequences.",
      "Designed a hybrid architecture: a 1D CNN encoder with residual blocks feeding a dual-path BiLSTM + Transformer temporal model, compared against an enrolled identity via a difference-based CNN classifier.",
      "Resolved an embedding-collapse failure in an earlier Siamese/triplet-loss approach by switching to difference-feature classification (diff, abs-diff, product of gait sequences).",
      "Derived the AUTHENTIC / IDENTITY MISMATCH / SUSPECTED DEEPFAKE decision threshold empirically via Youden's J statistic over leave-one-out cross-validation, rather than hardcoding it.",
      "Added Grad-CAM-style explainability identifying which joints and timesteps drive each classification decision.",
    ],
    stack: ["PyTorch", "MediaPipe", "OpenCV", "Albumentations", "scikit-learn", "NumPy", "Pandas"],
    metrics: [
      "94.95% ± 2.81% AUC-ROC (LOOCV)",
      "87.27% accuracy",
      "12.77% Equal Error Rate",
      "13-fold leave-one-out cross-validation across 13 subjects",
      "1,056 augmented training videos generated from 66 original recordings",
    ],
    links: [{ label: "Dataset — IEEE DataPort", href: "https://doi.org/10.21227/ngh5-b637" }],
    tags: ["ML", "PyTorch", "Computer Vision", "Research"],
  },
  {
    slug: "pawguard",
    name: "PawGuard",
    tier: "standard",
    period: "2026",
    oneLiner:
      "A cross-platform Flutter app for animal rescue, pet adoption, lost-pet networking, wellness crowdfunding, a pet-supplies marketplace, and vet records — backed by a blockchain trust layer.",
    approach: [
      "Records pet ownership, crowdfunding donations, and medical-record integrity hashes immutably on Polygon Amoy, with all on-chain writes performed server-side so users never touch a wallet.",
      "Bridges Firebase Auth identity into Supabase Postgres Row-Level Security policies, with edge functions independently verifying the Firebase JWT before any privileged write.",
    ],
    stack: ["Flutter", "Supabase", "Firebase Auth", "Solidity", "Hardhat", "Polygon Amoy", "Deno Edge Functions"],
    metrics: [
      "Server-side blockchain writes via 17 Supabase Edge Functions",
      "3 Solidity contracts on Polygon Amoy — pet registry, crowdfund ledger, medical-hash registry",
    ],
    links: [],
    tags: ["Flutter", "Blockchain", "Supabase"],
  },
  {
    slug: "junk-wunk",
    name: "Junk-Wunk",
    tier: "standard",
    period: "2025",
    badge: "2nd Place, Hack-N-Droid",
    oneLiner: "A role-based marketplace in Flutter with buyer and seller dashboards, built at Hack-N-Droid.",
    approach: [
      "Replaced Firebase auth with AWS Cognito identity pools for secure, role-scoped session handling.",
      "Implemented manual AWS Signature Version 4 (SigV4) signing in Dart for direct S3 media uploads, eliminating third-party SDK dependencies.",
    ],
    stack: ["Flutter", "AWS Cognito", "AWS S3", "DynamoDB"],
    metrics: [],
    links: [],
    tags: ["Flutter", "AWS", "Hackathon"],
  },
]

export const featuredProjects = projects.filter((p) => p.tier === "featured")
export const standardProjects = projects.filter((p) => p.tier === "standard")

export const allTags = Array.from(new Set(projects.flatMap((p) => p.tags))).sort()
