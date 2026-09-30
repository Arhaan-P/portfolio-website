export type ProjectLink = {
  label: string;
  href: string;
};

/** A metric from `metrics` split into a mono value and its label; `from` is that metric's index. */
export type Readout = {
  value: string;
  label: string;
  from: number;
};

export type Project = {
  slug: string;
  name: string;
  tier: "featured" | "standard";
  period?: string;
  role?: string;
  badge?: string;
  oneLiner: string;
  problem?: string;
  approach: string[];
  stack: string[];
  metrics: string[];
  /** 2–3 of the metrics above, shown as readouts at the top of a featured card. */
  readouts?: Readout[];
  links: ProjectLink[];
  tags: string[];
  images?: string[];
  /** One description per image, in order. Says what the image shows, not what kind of file it is. */
  imageAlts?: string[];
  /** "wide" for banner-shaped diagrams; omit for phone/app screenshots. */
  imageAspect?: "wide";
  /** CSS aspect-ratio for a "wide" image cropped tighter than 16:9, e.g. "1400 / 270". */
  imageRatio?: string;
  /** Live web build embedded in place of screenshots (e.g. a Flutter web deploy). */
  demoUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "polaris-gcs",
    name: "PolarisGCS",
    tier: "featured",
    period: "Ongoing",
    oneLiner:
      "A multi-drone Ground Control System for planning missions, monitoring live flights, and reviewing flight history across a fleet.",
    problem:
      "Drone operators need a single cloud-hosted surface to command many drones at once, real and simulated, hobbyist and industrial, while keeping every drone reachable through one consistent path regardless of its radio hardware.",
    approach: [
      "Architected a 4-component distributed topology consisting of a gateway, backend, frontend, and SITL testing suite, where every drone reaches the cloud through a gateway; there is no direct drone-to-cloud path.",
      "Engineered horizontal scaling by deploying stateless FastAPI instances that share live and persistent state through Redis pub/sub and PostgreSQL/TimescaleDB.",
      "Built a two-tier telemetry model (industrial Tier 1 / hobbyist Tier 2) with automatic, gateway-owned bandwidth-aware rich/critical telemetry allocation per radio group.",
      "Shipped a Kotlin + Jetpack Compose Android gateway wrapping the shared Python gateway core via Chaquopy, fully interoperable with the desktop gateway for multi-drone sessions.",
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
    readouts: [
      { value: "4-component", label: "distributed architecture (gateway, backend, frontend, SITL suite)", from: 0 },
      { value: "Two-tier", label: "telemetry model with automatic bandwidth-aware allocation", from: 1 },
      { value: "Android + desktop", label: "gateway interoperability via a shared Python core", from: 2 },
    ],
    links: [
      {
        label: "Landing Page Repo",
        href: "https://github.com/PolarisGCS/Landing-Page/",
      },
      { label: "Website", href: "http://polarisgcs.pages.dev/" },
    ],
    tags: ["Systems", "Drones", "FastAPI", "React", "Kotlin"],
    images: ["/projects/drones.webp"],
    imageAlts: [
      "PolarisGCS ground control interface: a satellite map with drone markers and flight paths, a mission panel on the right, and drone status cards along the bottom.",
    ],
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
      "Campus services at VIT Chennai were scattered across websites, WhatsApp groups, and PDFs. VHELP replaces them with one mobile-first ecosystem for students, plus a management dashboard for the vendors and admins running those services.",
    approach: [
      "Led development as top contributor (446/896 commits) over one year on a 178,000-line Flutter campus super-app for VIT Chennai’s ~15,000-student campus, reaching 1,000+ users in the first hour, unifying 16+ workflows across Android, iOS, and Web.",
      "Designed a hybrid backend on Supabase PostgreSQL (Row-Level Security) plus Firebase Firestore, bridging two separate Firebase projects and Supabase auth through a custom JWT edge function.",
      "Deployed 24 serverless Supabase Edge Functions handling business logic, FCM push notifications, and cron jobs, reducing manual backend operations to zero.",
      "Built an offline-first client with dedicated SQLite/offline sync layers so core features degrade gracefully without connectivity.",
      "Solved deep-linking for a shareable-cart flow using a custom vhelp:// scheme and Android digital asset links.",
    ],
    stack: [
      "Flutter",
      "Dart",
      "Supabase",
      "PostgreSQL",
      "Firebase",
      "Firestore",
      "Deno Edge Functions",
      "Node.js",
    ],
    metrics: [
      "~15,000-student addressable campus",
      "1,000+ users in the first hour",
      "16+ unified campus workflows",
      "24 serverless Supabase Edge Functions",
    ],
    readouts: [
      { value: "1,000+", label: "users in the first hour", from: 1 },
      { value: "24", label: "serverless Supabase Edge Functions", from: 3 },
      { value: "16+", label: "unified campus workflows", from: 2 },
    ],
    links: [{ label: "Live Demo", href: "https://vhelp-demo.pages.dev/" }],
    demoUrl: "https://vhelp-demo.pages.dev/",
    tags: ["Flutter", "Supabase", "Firebase", "Full-Stack"],
  },
  {
    slug: "pawguard",
    name: "PawGuard",
    tier: "featured",
    period: "2026",
    oneLiner:
      "A cross-platform Flutter app for animal rescue, pet adoption, lost-pet networking, wellness crowdfunding, a pet-supplies marketplace, and vet records, backed by a blockchain trust layer.",
    approach: [
      "Designed to record pet ownership, crowdfunding donations, and medical-record integrity hashes immutably on Polygon Amoy, with all on-chain writes performed server-side so users never touch a wallet.",
      "Bridges Firebase Auth identity into Supabase Postgres Row-Level Security policies, with edge functions independently verifying the Firebase JWT before any privileged write.",
    ],
    stack: [
      "Flutter",
      "Supabase",
      "Firebase Auth",
      "Solidity",
      "Hardhat",
      "Polygon Amoy",
      "Deno Edge Functions",
    ],
    metrics: [
      "Server-side blockchain writes via 17 Supabase Edge Functions",
      "3 Solidity contracts on Polygon Amoy: pet registry, crowdfund ledger, and medical-hash registry",
    ],
    readouts: [
      { value: "17", label: "Supabase Edge Functions for server-side blockchain writes", from: 0 },
      { value: "3", label: "Solidity contracts on Polygon Amoy: pet registry, crowdfund ledger, medical-hash registry", from: 1 },
    ],
    links: [{ label: "Live Demo", href: "https://pawguard-demo.pages.dev/" }],
    demoUrl: "https://pawguard-demo.pages.dev/",
    tags: ["Flutter", "Blockchain", "Supabase"],
  },
  {
    slug: "mutafix",
    name: "MutaFix",
    tier: "featured",
    period: "Aug 2026",
    oneLiner:
      "An adversarial benchmark for autonomous code-repair agents, with bugs synthesized by deterministic AST mutation so the LLM under test can never have seen them during training.",
    problem:
      "Standard coding-agent benchmarks are drawn from real GitHub issues, so the model under test may have already seen the bug and its fix during training. MutaFix removes that contamination risk by synthesizing bugs that have never existed.",
    approach: [
      "Built a deterministic, seeded AST mutation engine (7 operators) that injects small, syntactically-valid, logically-wrong bugs into well-tested Python codebases, producing 1,084 admitted challenges from 1,767 candidates across two real-world repos (bottle, click).",
      "Built a LangGraph repair agent that gets 3 attempts per bug using only failing-test output, never the ground-truth diff.",
      "Reported two error bars per metric, seed SEM and binomial SE, and hand-verified every non-exact repair, catching 5 of 298 passing runs that left the injected bug fully intact.",
      "Ran every LLM-generated patch inside a network-isolated Docker sandbox; the full benchmark reproduces from a single seed.",
    ],
    stack: [
      "LangGraph",
      "pydantic-ai",
      "Gemini API",
      "tree-sitter",
      "Docker",
      "pytest",
    ],
    metrics: [
      "93.0% strict_pass@3 (±2.5 SE) over 105 challenges × 3 seeds",
      "1,084 contamination-free bugs via deterministic AST mutation",
      "Caught 5 of 298 passing runs that left the bug intact, invisible to pass@k alone",
    ],
    readouts: [
      { value: "93.0%", label: "strict_pass@3 (±2.5 SE) over 105 challenges × 3 seeds", from: 0 },
      { value: "1,084", label: "contamination-free bugs via deterministic AST mutation", from: 1 },
      { value: "5 of 298", label: "passing runs caught that left the bug intact, invisible to pass@k alone", from: 2 },
    ],
    links: [],
    tags: ["AI", "LLM", "Research"],
    images: ["/projects/mutafix-architecture-cropped.svg"],
    imageAlts: [
      "MutaFix pipeline: Saboteur (deterministic AST mutation) feeds Agent (LangGraph, 3 attempts), then Sandbox (network-isolated Docker), then Eval (pass@k, SEM).",
    ],
    imageAspect: "wide",
    imageRatio: "1400 / 270",
  },
  {
    slug: "queez",
    name: "Queez",
    tier: "standard",
    period: "Ongoing",
    oneLiner:
      "A cross-platform learning app where students take quizzes and flashcards solo or in real-time multiplayer sessions, with AI turning uploaded documents into ready-made study material.",
    problem:
      "Static notes and single-purpose study apps, such as Kahoot for live quizzes and Quizlet for flashcards, do not combine active recall, gamified competition, and content creation in one place. Queez bundles quiz building, flashcards, notes, and live multiplayer into one app, with AI cutting the time needed to turn source documents into study material.",
    approach: [
      "Built real-time multiplayer quiz sessions (182/209 commits) over WebSockets with join codes/QR codes, live leaderboards, host controls, and reconnection support.",
      "Designed a speed- and streak-based scoring engine: a time-decayed point multiplier, per-answer partial credit for multi-select questions, and a capped streak bonus.",
      "Solved race-condition-safe scoring with per-user and session-wide Redis locks (retry/backoff) to prevent concurrent answers from clobbering shared session state, and hardened scoring integrity against spoofing and overflow exploits with server-side validation.",
      "Added anti-cheat timestamp validation that clamps client-reported answer timing and caps score to block exploit attempts.",
      "Integrated Google Gemini to auto-generate quizzes, flashcards, and notes from uploaded PDF/PPTX/DOCX files via a secured, resumable upload flow that keeps the API key server-side.",
    ],
    stack: [
      "FastAPI",
      "Python",
      "MongoDB",
      "Redis",
      "Flutter",
      "Riverpod",
      "Firebase Auth",
      "Gemini API",
      "Docker",
    ],
    metrics: [
      "Real-time multiplayer via WebSockets with distributed Redis locking",
      "Partial-credit scoring engine for multi-select questions",
      "AI-generated quizzes/flashcards/notes from uploaded documents",
    ],
    tags: ["Flutter", "FastAPI", "Real-Time", "AI"],
    links: [],
  },
  {
    slug: "deepfake-detection",
    name: "Gait-Based Deepfake Detection",
    tier: "featured",
    period: "2025 – 2026",
    oneLiner:
      "A deepfake video detector that verifies identity by analyzing how a person walks, catching face-swap deepfakes that fool facial-recognition-based detectors.",
    problem:
      "Most deepfake detectors analyze facial artifacts, which face-swap tools are increasingly good at faking convincingly. Gait, the biomechanical pattern of how someone walks, is much harder to forge, since face-swap tools only replace the face, not body motion.",
    approach: [
      "Built a custom feature pipeline extracting 12 gait keypoints per frame from MediaPipe pose estimation into 78-dimensional gait signatures, normalized to 60-frame sequences.",
      "Kept the trained decision path deliberately lean: a 133K-parameter difference-based temporal CNN comparing observed vs. claimed gait (diff, abs-diff, product), separate from a larger auxiliary CNN+BiLSTM+Transformer embedding branch used only for enrollment diagnostics and explainability.",
      "Validated that split with a paired 13-fold x 3-seed LOOCV ablation: every configuration that wires the auxiliary branch onto the decision path is significantly worse than the deployed raw-difference network (down to 50.70% AUC-ROC when the raw features are dropped entirely).",
      "Derived the AUTHENTIC / IDENTITY MISMATCH / SUSPECTED DEEPFAKE decision threshold empirically via Youden's J statistic over leave-one-out cross-validation, rather than hardcoding it.",
      "Added gradient-times-input and Grad-CAM explainability identifying which joints and timesteps drive each classification decision, and validated the model on real FaceFusion face-swap clips.",
    ],
    stack: [
      "PyTorch",
      "MediaPipe",
      "OpenCV",
      "Albumentations",
      "scikit-learn",
      "NumPy",
      "Pandas",
    ],
    metrics: [
      "94.95% pooled AUC-ROC (95.10% ± 3.08% per-fold, 13-fold subject-disjoint LOOCV)",
      "87.01% pooled accuracy (87.04% ± 3.65% per-fold)",
      "12.77% pooled Equal Error Rate",
      "3/3 real FaceFusion face-swap clips correctly rejected in end-to-end validation",
      "1,056 augmented training videos generated from 66 original recordings",
    ],
    readouts: [
      { value: "95.10% ± 3.08%", label: "AUC-ROC, per-fold mean (94.95% pooled), 13-fold subject-disjoint LOOCV", from: 0 },
      { value: "87.01%", label: "pooled accuracy (87.04% ± 3.65% per-fold)", from: 1 },
      { value: "3/3", label: "real FaceFusion face-swap clips correctly rejected in end-to-end validation", from: 3 },
    ],
    links: [
      {
        label: "Dataset: IEEE DataPort",
        href: "https://doi.org/10.21227/ngh5-b637",
      },
    ],
    tags: ["ML", "PyTorch", "Computer Vision", "Research"],
    images: ["/projects/deepfake-detection-architecture.svg"],
    imageAlts: [
      "Gait-based deepfake detection pipeline: a query video passes through MediaPipe pose into a 78-dimension gait sequence, which a 133K-parameter temporal CNN compares against the claimed identity's stored gait profile to give an authentic, mismatch or suspected-deepfake verdict; evaluated at 94.95% pooled AUC-ROC.",
    ],
    imageAspect: "wide",
  },
  {
    slug: "junk-wunk",
    name: "Junk-Wunk",
    tier: "standard",
    period: "2025",
    badge: "2nd Place, Hack-N-Droid",
    oneLiner:
      "A role-based marketplace in Flutter with buyer and seller dashboards, built at Hack-N-Droid.",
    approach: [
      "Replaced Firebase auth with AWS Cognito identity pools for secure, role-scoped session handling.",
      "Implemented manual AWS Signature Version 4 (SigV4) signing in Dart for direct S3 media uploads, eliminating third-party SDK dependencies.",
    ],
    stack: ["Flutter", "AWS Cognito", "AWS S3", "DynamoDB"],
    metrics: [],
    links: [
      { label: "GitHub", href: "https://github.com/JUNK-WUNK/Junk_Wunk" },
    ],
    tags: ["Flutter", "AWS", "Hackathon"],
  },
];

export const featuredProjects = projects.filter((p) => p.tier === "featured");
export const standardProjects = projects.filter((p) => p.tier === "standard");
