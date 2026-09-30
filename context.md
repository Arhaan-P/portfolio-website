# Portfolio Content Context — Arhaan Penwala

Reference for redesigning the UI. All copy below is the real content currently on the site (source: `src/data/*.ts` and section components). **Use this text verbatim; do not invent metrics, projects, or claims.** Only the visual design is being replaced.

## 1. Site overview

- **Single scrolling page**, sections in order: Hero → Featured Projects → More Projects → Experience → Skills → About → Contact → Footer.
- **Nav links** (sticky header, anchors): Projects, Experience, Skills, About, Contact. Header also has a **Resume** pill button and a **light/dark theme toggle** (binary toggle). Mobile: nav collapses into a slide-in sheet.
- **Section headings** are "panel headers": a mono index number (01 Projects, 02 Experience, 03 Skills, 04 About, 05 Contact), the title, and a hairline rule. "More projects" has no index.
- **Themes:** dark is the default/primary; light must also work. Current feel: technical "instrument / readout" aesthetic, indigo-blue primary accent, monospace for numbers/labels.
- Stack (for reference only): Next.js + React + Tailwind + Framer Motion. Animations must respect `prefers-reduced-motion`.

## 2. Identity (global)

| Field | Value |
|---|---|
| Name | Arhaan Penwala |
| Role | Software Engineer |
| Rotating roles (hero) | "Software Engineer" ↔ "AI/ML Engineer" |
| Location | Chennai, India |
| Email | arhaanpenwala9@gmail.com |
| GitHub | https://github.com/Arhaan-P |
| LinkedIn | https://www.linkedin.com/in/arhaan-penwala/ |
| Resume (PDF download) | /arhaan_sde.pdf |

**Tagline:** "I build distributed systems, scalable architectures, and applied ML pipelines, from a multi-drone ground control system to a campus super-app that reached over a thousand users in its first hour."

**Seeking line:** "Seeking SDE and AI‑engineer internships and new‑grad roles."

## 3. Hero

- H1: the name "Arhaan Penwala" (large, words animate in).
- Rotating role line beneath (Software Engineer / AI/ML Engineer).
- Tagline paragraph + seeking line (above).
- CTAs: **View Projects** (primary, → #projects), **Resume** (outline, downloads PDF).
- Icon links: GitHub, LinkedIn, Email.

## 4. Featured Projects (section 01, "Featured Projects")

Full-width cards. Each card: period pill, optional role, project name (H3), 2–3 **readouts** (big mono value + small label), one-liner, media (live demo, diagram, or image), tech-stack badges, a collapsible **"How it's built"** disclosure (Problem + approach bullets + any extra metrics), and external links.

Order on the page: VHELP, PolarisGCS, PawGuard, MutaFix, Gait-Based Deepfake Detection.

### 4.1 VHELP
- **Period:** Ongoing · **Role:** Lead / top contributor across 2 repositories
- **Readouts:** 1,000+ users in the first hour · 24 serverless Supabase Edge Functions · 16+ unified campus workflows
- **One-liner:** A campus super-app for VIT Chennai unifying food ordering, study materials, hostel/mess info, repairs, lost-and-found, a marketplace, carpooling, and messaging into one platform.
- **Problem:** Campus services at VIT Chennai were scattered across websites, WhatsApp groups, and PDFs. VHELP replaces them with one mobile-first ecosystem for students, plus a management dashboard for the vendors and admins running those services.
- **Approach:**
  - Led development as top contributor (446/896 commits) over one year on a 178,000-line Flutter campus super-app for VIT Chennai's ~15,000-student campus, reaching 1,000+ users in the first hour, unifying 16+ workflows across Android, iOS, and Web.
  - Designed a hybrid backend on Supabase PostgreSQL (Row-Level Security) plus Firebase Firestore, bridging two separate Firebase projects and Supabase auth through a custom JWT edge function.
  - Deployed 24 serverless Supabase Edge Functions handling business logic, FCM push notifications, and cron jobs, reducing manual backend operations to zero.
  - Built an offline-first client with dedicated SQLite/offline sync layers so core features degrade gracefully without connectivity.
  - Solved deep-linking for a shareable-cart flow using a custom vhelp:// scheme and Android digital asset links.
- **Extra metric:** ~15,000-student addressable campus
- **Stack:** Flutter, Dart, Supabase, PostgreSQL, Firebase, Firestore, Deno Edge Functions, Node.js
- **Tags:** Flutter, Supabase, Firebase, Full-Stack
- **Media:** embedded **live demo** (Flutter web build, https://vhelp-demo.pages.dev/) behind a "launch" button, with a poster image shown first (`vhelp1.webp`: screens of study resources, campus clubs, repair booking). Demo has an "Open in new tab" option.
- **Links:** Live Demo → https://vhelp-demo.pages.dev/

### 4.2 PolarisGCS
- **Period:** Ongoing
- **Readouts:** 4-component distributed architecture (gateway, backend, frontend, SITL suite) · Two-tier telemetry model with automatic bandwidth-aware allocation · Android + desktop gateway interoperability via a shared Python core
- **One-liner:** A multi-drone Ground Control System for planning missions, monitoring live flights, and reviewing flight history across a fleet.
- **Problem:** Drone operators need a single cloud-hosted surface to command many drones at once, real and simulated, hobbyist and industrial, while keeping every drone reachable through one consistent path regardless of its radio hardware.
- **Approach:**
  - Architected a 4-component distributed topology consisting of a gateway, backend, frontend, and SITL testing suite, where every drone reaches the cloud through a gateway; there is no direct drone-to-cloud path.
  - Engineered horizontal scaling by deploying stateless FastAPI instances that share live and persistent state through Redis pub/sub and PostgreSQL/TimescaleDB.
  - Built a two-tier telemetry model (industrial Tier 1 / hobbyist Tier 2) with automatic, gateway-owned bandwidth-aware rich/critical telemetry allocation per radio group.
  - Shipped a Kotlin + Jetpack Compose Android gateway wrapping the shared Python gateway core via Chaquopy, fully interoperable with the desktop gateway for multi-drone sessions.
  - Added an autonomous, offline-first failsafe policy engine that runs on the gateway independent of cloud connectivity.
- **Extra metric:** Offline-first failsafe engine independent of cloud connectivity
- **Stack:** FastAPI, PostgreSQL/TimescaleDB, Redis, React, TypeScript, PySide6, Kotlin, Jetpack Compose, MediaMTX, Docker
- **Tags:** Systems, Drones, FastAPI, React, Kotlin
- **Media:** 2 images — architecture diagram SVG (`polaris-gcs-architecture.svg`, wide ~1400×500) and a UI screenshot (`drones.webp`, 16:10). Clicking opens a lightbox.
  - Diagram alt: drones (real or SITL, Tier 1 and Tier 2) connect over MAVLink to a gateway (desktop PySide6 or Android), the sole path to the cloud with an offline failsafe engine; the gateway talks WebSocket to the FastAPI backend with PostgreSQL/TimescaleDB and Redis pub/sub, which serves the React operator dashboard over REST and WebSocket. Tier 1 payload and video post directly to the backend, and a SITL suite supplies simulated ArduPilot drones.
  - Screenshot alt: ground control interface with a satellite map, drone markers and flight paths, a mission panel on the right, and drone status cards along the bottom.
- **Links:** Landing Page Repo → https://github.com/PolarisGCS/Landing-Page/ · Website → http://polarisgcs.pages.dev/

### 4.3 PawGuard
- **Period:** 2026
- **Readouts:** 17 Supabase Edge Functions for server-side blockchain writes · 3 Solidity contracts on Polygon Amoy: pet registry, crowdfund ledger, medical-hash registry
- **One-liner:** A cross-platform Flutter app for animal rescue, pet adoption, lost-pet networking, wellness crowdfunding, a pet-supplies marketplace, and vet records, backed by a blockchain trust layer.
- **Approach:**
  - Designed to record pet ownership, crowdfunding donations, and medical-record integrity hashes immutably on Polygon Amoy, with all on-chain writes performed server-side so users never touch a wallet.
  - Bridges Firebase Auth identity into Supabase Postgres Row-Level Security policies, with edge functions independently verifying the Firebase JWT before any privileged write.
- **Stack:** Flutter, Supabase, Firebase Auth, Solidity, Hardhat, Polygon Amoy, Deno Edge Functions
- **Tags:** Flutter, Blockchain, Supabase
- **Media:** embedded live demo (Flutter web, https://pawguard-demo.pages.dev/), no poster.
- **Links:** Live Demo → https://pawguard-demo.pages.dev/

### 4.4 MutaFix
- **Period:** Aug 2026
- **Readouts:** 93.0% strict_pass@3 (±2.5 SE) over 105 challenges × 3 seeds · 1,084 contamination-free bugs via deterministic AST mutation · 5 of 298 passing runs caught that left the bug intact, invisible to pass@k alone
- **One-liner:** An adversarial benchmark for autonomous code-repair agents, with bugs synthesized by deterministic AST mutation so the LLM under test can never have seen them during training.
- **Problem:** Standard coding-agent benchmarks are drawn from real GitHub issues, so the model under test may have already seen the bug and its fix during training. MutaFix removes that contamination risk by synthesizing bugs that have never existed.
- **Approach:**
  - Built a deterministic, seeded AST mutation engine (7 operators) that injects small, syntactically-valid, logically-wrong bugs into well-tested Python codebases, producing 1,084 admitted challenges from 1,767 candidates across two real-world repos (bottle, click).
  - Built a LangGraph repair agent that gets 3 attempts per bug using only failing-test output, never the ground-truth diff.
  - Reported two error bars per metric, seed SEM and binomial SE, and hand-verified every non-exact repair, catching 5 of 298 passing runs that left the injected bug fully intact.
  - Ran every LLM-generated patch inside a network-isolated Docker sandbox; the full benchmark reproduces from a single seed.
- **Stack:** LangGraph, pydantic-ai, Gemini API, tree-sitter, Docker, pytest
- **Tags:** AI, LLM, Research
- **Media:** wide pipeline diagram SVG (`mutafix-architecture-cropped.svg`, ~1400×270). Alt: Saboteur (deterministic AST mutation) → Agent (LangGraph, 3 attempts) → Sandbox (network-isolated Docker) → Eval (pass@k, SEM).
- **Links:** none

### 4.5 Gait-Based Deepfake Detection
- **Period:** 2025 – 2026
- **Readouts:** 95.10% ± 3.08% AUC-ROC, per-fold mean (94.95% pooled), 13-fold subject-disjoint LOOCV · 87.01% pooled accuracy (87.04% ± 3.65% per-fold) · 3/3 real FaceFusion face-swap clips correctly rejected in end-to-end validation
- **One-liner:** A deepfake video detector that verifies identity by analyzing how a person walks, catching face-swap deepfakes that fool facial-recognition-based detectors.
- **Problem:** Most deepfake detectors analyze facial artifacts, which face-swap tools are increasingly good at faking convincingly. Gait, the biomechanical pattern of how someone walks, is much harder to forge, since face-swap tools only replace the face, not body motion.
- **Approach:**
  - Built a custom feature pipeline extracting 12 gait keypoints per frame from MediaPipe pose estimation into 78-dimensional gait signatures, normalized to 60-frame sequences.
  - Kept the trained decision path deliberately lean: a 133K-parameter difference-based temporal CNN comparing observed vs. claimed gait (diff, abs-diff, product), separate from a larger auxiliary CNN+BiLSTM+Transformer embedding branch used only for enrollment diagnostics and explainability.
  - Validated that split with a paired 13-fold x 3-seed LOOCV ablation: every configuration that wires the auxiliary branch onto the decision path is significantly worse than the deployed raw-difference network (down to 50.70% AUC-ROC when the raw features are dropped entirely).
  - Derived the AUTHENTIC / IDENTITY MISMATCH / SUSPECTED DEEPFAKE decision threshold empirically via Youden's J statistic over leave-one-out cross-validation, rather than hardcoding it.
  - Added gradient-times-input and Grad-CAM explainability identifying which joints and timesteps drive each classification decision, and validated the model on real FaceFusion face-swap clips.
- **Extra metrics:** 12.77% pooled Equal Error Rate · 1,056 augmented training videos generated from 66 original recordings
- **Stack:** PyTorch, MediaPipe, OpenCV, Albumentations, scikit-learn, NumPy, Pandas
- **Tags:** ML, PyTorch, Computer Vision, Research
- **Media:** pipeline diagram SVG (`deepfake-detection-architecture-signal.svg`, ~1400×567). Alt: a query video passes through MediaPipe pose into a 78-dimension gait sequence, which a 133K-parameter temporal CNN compares against the claimed identity's stored gait profile to give an authentic, mismatch or suspected-deepfake verdict; evaluated at 94.95% pooled AUC-ROC.
- **Links:** Dataset: IEEE DataPort → https://doi.org/10.21227/ngh5-b637

## 5. More Projects (standard tier, 2-column card grid, shorter cards)

Each card: name, period chip, optional badge, one-liner, up to 3 approach bullets, stack badges, links.

### 5.1 Queez
- **Period:** Ongoing
- **One-liner:** A cross-platform learning app where students take quizzes and flashcards solo or in real-time multiplayer sessions, with AI turning uploaded documents into ready-made study material.
- **Problem:** Static notes and single-purpose study apps, such as Kahoot for live quizzes and Quizlet for flashcards, do not combine active recall, gamified competition, and content creation in one place. Queez bundles quiz building, flashcards, notes, and live multiplayer into one app, with AI cutting the time needed to turn source documents into study material.
- **Approach:**
  - Built real-time multiplayer quiz sessions (182/209 commits) over WebSockets with join codes/QR codes, live leaderboards, host controls, and reconnection support.
  - Designed a speed- and streak-based scoring engine: a time-decayed point multiplier, per-answer partial credit for multi-select questions, and a capped streak bonus.
  - Solved race-condition-safe scoring with per-user and session-wide Redis locks (retry/backoff) to prevent concurrent answers from clobbering shared session state, and hardened scoring integrity against spoofing and overflow exploits with server-side validation.
  - Added anti-cheat timestamp validation that clamps client-reported answer timing and caps score to block exploit attempts.
  - Integrated Google Gemini to auto-generate quizzes, flashcards, and notes from uploaded PDF/PPTX/DOCX files via a secured, resumable upload flow that keeps the API key server-side.
- **Stack:** FastAPI, Python, MongoDB, Redis, Flutter, Riverpod, Firebase Auth, Gemini API, Docker
- **Tags:** Flutter, FastAPI, Real-Time, AI
- **Links:** none

### 5.2 Junk-Wunk
- **Period:** 2025 · **Badge:** 2nd Place, Hack-N-Droid
- **One-liner:** A role-based marketplace in Flutter with buyer and seller dashboards, built at Hack-N-Droid.
- **Approach:**
  - Replaced Firebase auth with AWS Cognito identity pools for secure, role-scoped session handling.
  - Implemented manual AWS Signature Version 4 (SigV4) signing in Dart for direct S3 media uploads, eliminating third-party SDK dependencies.
- **Stack:** Flutter, AWS Cognito, AWS S3, DynamoDB
- **Tags:** Flutter, AWS, Hackathon
- **Links:** GitHub → https://github.com/JUNK-WUNK/Junk_Wunk

## 6. Experience (section 02)

Vertical timeline (single left rail). Each entry: role, org, location, period, 2 readout figures, 2 bullets.

### Software Development Engineer Intern — BPO Integra India Private Limited
- Remote · Dec 2025 – Feb 2026
- **Readouts:** 18% lower average page load time · 22% faster average API response across 3 production endpoints
- Reduced average page load time by 18% and improved live-site reliability by designing and shipping 6+ reusable React.js UI components and Node.js/Express.js REST services on a MySQL-backed data layer across 2 sprint cycles, validated through peer code review and unit testing
- Cut average API response time by 22% across 3 production endpoints by optimizing SQL queries and adding database indexes, collaborating cross-functionally in daily Agile standups to translate requirements into production-ready components

### AI Research Intern — The Indian Hotels Company Limited (IHCL)
- Mumbai, India · May – June 2025
- **Readouts:** 35% identified cost savings in the chatbot vendor evaluation · 15+ use cases across 5+ vendors
- Drove enterprise-wide selection of an AI chatbot partner for a Fortune 500 hospitality group, as measured by 35% identified cost savings across 5+ vendors and 15+ use cases, by designing and building a structured cost-parametrization evaluation framework
- Directly informed the vendor recommendation adopted by leadership by representing technical requirements in client and vendor demo calls, translating hospitality-specific operational needs into per-use-case cost parameters feeding the evaluation framework

## 7. Skills (section 03) — 4 grouped cards, each skill is an icon + label chip

Icons are monochrome so they read in both themes.

- **Languages:** Python, TypeScript, C / C++, Dart, Kotlin, Solidity
- **Backend & Data:** FastAPI, Node.js / Express, SQL (PostgreSQL / TimescaleDB), Redis, Supabase Edge Functions, WebSockets
- **Mobile & Frontend:** Flutter, Jetpack Compose, React, Next.js, Tailwind CSS, Firebase
- **AI / ML:** PyTorch, scikit-learn, MediaPipe, LangGraph, OpenCV, Gemini API

## 8. About (section 04) — bento layout: bio card (wide) + education card + stats card

- **Bio:** "B.Tech CSE student at VIT Chennai (CGPA 9.13), with a software development internship at BPO Integra (Dec 2025 – Feb 2026) and an AI research internship at IHCL (May – June 2025). My projects include a multi-drone ground control system, a campus app that reached 1,000+ users in its first hour, and a gait-based deepfake detector evaluated with 13-fold subject-disjoint cross-validation."
- Location line: Chennai, India
- **Education card:** B.Tech Computer Science and Engineering · Vellore Institute of Technology, Chennai, India · CGPA: 9.13 · 2023 – 2027
- **Stats card (readouts):** `1` — Dataset published (IEEE DataPort) · `Journal paper` — Research · in progress

## 9. Contact (section 05)

- Copy: "Hiring for an SDE or AI-engineer role? Email is the fastest way to reach me."
- Buttons: **Email me** (mailto), **Resume** (download PDF)
- Email shown in mono with a **Copy** button (shows "Copied" for 2s)
- Icon buttons: GitHub, LinkedIn

## 10. Footer

- "© {current year} Arhaan Penwala" + icon links (GitHub, LinkedIn, Email). Nothing else.

## 11. Assets available (`public/`)

- `arhaan_sde.pdf` — resume
- `projects/vhelp1.webp` (demo poster), `projects/vhelp2.webp` (unused by the page)
- `projects/drones.webp` — PolarisGCS UI screenshot
- `projects/polaris-gcs-architecture.svg`, `mutafix-architecture-cropped.svg`, `deepfake-detection-architecture-signal.svg` — architecture diagrams (dark-styled; they look best on dark backgrounds)
- Older uncropped versions also exist (`mutafix-architecture.svg`, `deepfake-detection-architecture.svg`)

## 12. Content rules for the redesign

1. **No fabricated numbers.** Every figure above is sourced; don't add testimonials, user counts, awards, or stats that aren't listed.
2. Keep the **readouts** (big value + small label) — they are the main proof points per project.
3. Keep **"How it's built"** details (problem + approach bullets) available but secondary (collapsed/expandable) so cards stay scannable.
4. Live demos (VHELP, PawGuard) are interactive embeds of Flutter web builds; give them a framed "device/screen" area with a launch button.
5. Architecture diagrams are wide, detailed SVGs; they must be viewable full-size (lightbox/zoom) and readable on mobile (pan horizontally).
6. Both **dark (primary)** and **light** themes; mobile-first (check 375px, 768px, 1440px); 44px minimum touch targets.
7. Don't change name, tagline, or the role rotator wording without asking — they are positioning copy.
8. Goal of the site: get recruiters to hire Arhaan for SDE / AI-engineer internships and new-grad roles. Primary CTAs: View Projects, Resume, Email.
