# Portfolio Website — Context Document

This document describes the personal portfolio website in this repository: what it is, how it's built, what content it contains, and how it's organized. It's meant as an onboarding reference for anyone (human or AI) picking up work on this codebase.

## 1. Overview

A single-page personal portfolio site for **Arhaan Penwala**, a software engineer / CS student (VIT Chennai, B.Tech CSE, 2023–2027) focused on distributed systems, scalable architectures, and applied machine learning. The site is a marketing/showcase page: hero, about, skills, experience, featured projects, a filterable project archive, and a contact section — all on one scrolling route (`/`).

- **Live domain (configured in metadata):** `https://arhaanpenwala.dev`
- **GitHub:** `https://github.com/Arhaan-P`
- **LinkedIn:** `https://linkedin.com/in/arhaan-penwala`
- **Deployment target:** Vercel (per `README.md` boilerplate and prior audit notes referencing `arhaanp.vercel.app`)

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2.10 (App Router), React 19.2.4 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/postcss`), `tw-animate-css` |
| Component system | shadcn/ui (`style: base-nova`, base color `neutral`), Base UI (`@base-ui/react`) primitives under the hood |
| Animation | Framer Motion 12, Anime.js 3 (role-text cycler), custom hand-rolled motion components |
| Smooth scroll | Lenis (`lenis` + `lenis/react`), wrapped as `LenisProvider` |
| Icons | lucide-react, custom inline `GitHubIcon`/`LinkedInIcon`, Devicon (loaded via CDN `<link>` in `layout.tsx` for skill badges) |
| Theming | `next-themes` (light/dark via `.dark` class), OKLCH color tokens |
| Fonts | next/font: Geist Sans, Geist Mono, Inter |
| Utilities | `clsx`, `tailwind-merge`, `class-variance-authority` |
| Linting | ESLint 9 + `eslint-config-next` |

No test framework, no CMS/backend, no database — this is a fully static/client-driven marketing site with content authored directly in TypeScript data files.

### Scripts (`package.json`)
```
npm run dev     # next dev
npm run build   # next build
npm run start   # next start
npm run lint    # eslint
```

## 3. Directory Structure

```
src/
  app/
    layout.tsx          # Root layout: fonts, theme init script, Nav, Lenis/Theme/Tooltip providers
    page.tsx             # Single-page composition of all sections
    globals.css          # Design tokens (OKLCH), Tailwind theme, custom utility classes, keyframes
    icon.tsx              # Favicon generator (ImageResponse)
    opengraph-image.tsx   # OG image generator (1200x630 ImageResponse)
    robots.ts             # robots.txt via MetadataRoute
    sitemap.ts            # sitemap.xml via MetadataRoute
  components/
    nav.tsx               # Sticky header, scroll-hide, active-section tracking, mobile Sheet menu
    icons.tsx             # Hand-rolled GitHub/LinkedIn SVG icon components
    theme-provider.tsx     # next-themes wrapper
    theme-toggle.tsx        # Light/dark toggle control
    motion/               # Reusable animation primitives (see §5)
    sections/             # Page sections (see §4)
    ui/                   # shadcn/ui primitives: badge, button, card, dropdown-menu, separator, sheet, toggle-group, toggle, tooltip
  data/
    site.ts               # Site-wide constants: name, role(s), tagline, contact links, nav links
    projects.ts            # Project content array (the portfolio's main data source)
    experience.ts           # Work experience + education entries
    skills.tsx              # Skill groups with icons (Languages, Frontend, Backend, ML/AI, Cloud/DevOps, Certifications)
  lib/
    utils.ts               # `cn()` class-merge helper (clsx + tailwind-merge)
public/
  projects/                # Project screenshots (drones.webp, vhelp1.webp, vhelp2.webp)
  resume.pdf, resume.tex   # Downloadable resume (linked from Hero, Nav, mobile menu)
resumes/                  # Additional resume variants: Arhaan_AI.pdf, Arhaan_FullStack.pdf, Arhaan_SDE.pdf (role-targeted resumes, not currently linked from the site)
portfolio-context/         # Deep-dive markdown writeups per project (source material behind the condensed copy in data/projects.ts)
```

## 4. Page Sections (in scroll order, from `src/app/page.tsx`)

1. **Hero** (`sections/hero.tsx`, id `#top`) — Full-viewport intro. Aurora background + spotlight cursor effect, staggered word-by-word name reveal (3D rotateX spring-in), an `AnimeText` role-rotator cycling through `site.roles`, tagline, CTA buttons ("View Projects", "Download Resume"), and social links (GitHub/LinkedIn/email). Uses scroll-linked parallax (translate/opacity/scale tied to `scrollY`).
2. **About** (`sections/about.tsx`, id `#about`) — Bento-style grid of `TiltCard`-wrapped glass cards: bio (2-col), "Currently building", education, animated stat counters (13k+ users served, 6 projects shipped, 1 dataset published, "Journal Paper in Progress"), and location.
3. **Skills** (`sections/skills.tsx`, id `#skills`) — "Technical Arsenal": responsive grid of skill-group cards (Languages, Frontend, Backend & APIs, ML & AI, Cloud & DevOps, Certifications), each skill rendered as a badge with a Devicon icon.
4. **Experience** (`sections/experience.tsx`, id `#experience`) — Vertical timeline (alternating sides on desktop) with a scroll-progress-linked glowing line (`useScroll`/`useTransform`), showing 2 work entries and 1 education entry, each with role/org/location/period/bullets.
5. **Featured Projects** (inline in `page.tsx`, uses `FeaturedProjects` component) — Large alternating-layout cards (image left/right) for `tier: "featured"` projects, each showing period, role, problem statement, approach bullets, metrics, tech-stack badges, and external links.
6. **Project Grid / Archive** (`sections/project-grid.tsx`) — All projects (featured + standard) in a filterable card grid. Tag filter via `ToggleGroup` (multi-select) sourced from `allTags`; animated enter/exit with `AnimatePresence`/`layout` (3D flip-in effect).
7. **Contact** (`sections/contact.tsx`, id `#contact`) — Closing CTA ("Let's build something") with a mailto button and social links, aurora background.
8. **Footer** (`sections/footer.tsx`) — Fixed-position footer (site "slides up" over it via a spacer div + `ResizeObserver`), copyright, social links, "Back to top" (Lenis-driven smooth scroll).

Sections are separated by `SectionDivider` (`motion/section-divider.tsx`), an animated gradient horizontal rule.

**Note on container widths:** most sections use `max-w-5xl`, but Skills and the visual note in globals.css skill-badge system diverge slightly (Skills section is `max-w-6xl`); Contact is visually centered within `max-w-3xl` content. This inconsistency was flagged in a prior design audit (see §8).

## 5. Motion / Animation Components (`src/components/motion/`)

| Component | Purpose | Status |
|---|---|---|
| `reveal.tsx` (`Reveal`, `RevealGroup`, `RevealItem`) | Fade+slide-up on scroll into view; respects `prefers-reduced-motion` | Used everywhere — the dominant animation pattern (all 8 sections) |
| `tilt-card.tsx` (`TiltCard`) | 3D pointer-tilt on hover with optional glare overlay, configurable `maxTilt` | Used on About, Featured Projects, Project Grid cards |
| `aurora-background.tsx` (`AuroraBackground`) | Decorative blurred gradient orbs (cyan/blue, magenta), CSS-animated drift | Used in Hero and Contact |
| `spotlight.tsx` (`Spotlight`) | Pointer-following radial glow overlay | Used in Hero |
| `magnetic.tsx` (`Magnetic`) | Cursor-attraction effect on wrapped element (nav links, project tag filters) | Used in Nav and Project Grid tag toggles |
| `anime-text.tsx` (`AnimeText`) | Anime.js-powered role-text cycler in the Hero subtitle | Used once, in Hero |
| `counter.tsx` (`Counter`) | Spring-animated number count-up, triggered on view | Used in About stats |
| `section-divider.tsx` (`SectionDivider`) | Animated gradient rule between sections | Used between every section |
| `lenis-provider.tsx` (`LenisProvider`) | Wraps the whole app in Lenis smooth-scroll | Used once, in `layout.tsx` |
| `grid-pattern.tsx` (`GridPattern`) | Decorative dot-grid SVG background | **Currently unused** in any section |
| `marquee.tsx` (`Marquee`) | Infinite horizontal scroll strip | **Currently unused** |
| `typewriter.tsx` (`Typewriter`) | Type/delete cycling text effect | **Currently unused** (superseded by `AnimeText`) |
| `text-generate.tsx` (`TextGenerate`) | Character-by-character reveal with blinking cursor | **Currently unused** |

All motion components are client components (`"use client"`) and generally guard against `prefers-reduced-motion`.

## 6. Design System (`src/app/globals.css`)

- **Color model:** OKLCH throughout, defined as CSS custom properties on `:root` (light) and `.dark` (dark theme, described in a comment as "the hero mode" — i.e., dark is the primary/intended experience).
- **Theme switch:** an inline `<script>` in `layout.tsx` (`beforeInteractive`) reads `localStorage("theme")` or `prefers-color-scheme` and adds the `.dark` class before hydration, avoiding a flash of incorrect theme.
- **Custom design tokens:** `--glow-primary`, `--glow-accent`, `--glass-bg`/`--glass-border` (glassmorphism), `--aurora-1/2/3` (gradient orb colors), `--grid-dot`.
- **Utility classes:** `.glass-card` (backdrop blur + saturate), `.gradient-border` (animated conic-gradient border via `@property --angle`, mask-composite trick), `.glow-sm/md/lg` (box-shadow glows), `.text-gradient` (animated gradient-clipped text), `.pulse-ring` (radar-style pulse for timeline dots), `.skill-badge`.
- **Radius scale:** derived from a single `--radius` base via `calc()` (sm/md/lg/xl/2xl/3xl/4xl).
- Respects `prefers-reduced-motion: reduce` globally (near-instant animation durations).
- Fonts are wired through Tailwind's `@theme inline` block referencing `--font-sans`, `--font-mono`, `--font-heading`.
  - **Known issue (carried over from a prior design audit, not yet fixed at time of writing):** `--font-sans: var(--font-sans);` (globals.css) is self-referential/undefined, and `--font-heading: var(--font-sans)` inherits that break — meaning the sans/heading font family may fail to resolve to Geist/Inter and fall back to the browser default serif in some render paths. Only `--font-mono` (hardcoded to `--font-geist-mono`) is guaranteed correct. Worth verifying/fixing if doing typography work.

## 7. Content Data (`src/data/`)

### `site.ts`
Central site constants: name, primary role, an array of rotating `roles` (Software Engineer / SDE / Full-Stack Developer / AI Researcher / ML Engineer — driven through the Hero's `AnimeText`), tagline, email, GitHub, LinkedIn, resume URL (`/resume.pdf`), location (Chennai, India), and `navLinks` (About/Skills/Experience/Projects/Contact).

### `projects.ts`
The core content model. Each `Project` has: `slug`, `name`, `tier` (`"featured" | "standard"`), `period`, `role`, `badge`, `oneLiner`, `problem`, `approach[]`, `stack[]`, `metrics[]`, `links[]`, `tags[]`, `images[]`. Derived exports: `featuredProjects`, `standardProjects`, `allTags`.

Projects currently listed:
1. **PolarisGCS** (featured, ongoing) — Multi-drone Ground Control System. 4-component distributed architecture (gateway/backend/frontend/SITL suite), stateless FastAPI + Redis pub/sub + PostgreSQL/TimescaleDB, two-tier telemetry model, Kotlin/Jetpack Compose Android gateway via Chaquopy, offline-first failsafe engine. Stack: FastAPI, PostgreSQL/TimescaleDB, Redis, React, TypeScript, PySide6, Kotlin, Jetpack Compose, MediaMTX, Docker.
2. **VHELP** (featured, ongoing) — Campus super-app for VIT Chennai (13,000+ students, 1,000+ users in first hour, 16+ unified workflows, 178k lines of Flutter, 446/896 commits as top contributor). Hybrid Supabase Postgres (RLS) + Firebase Firestore backend bridged by a custom JWT edge function; 24 serverless Supabase Edge Functions; offline-first SQLite sync; custom `vhelp://` deep-link scheme.
3. **Queez** (standard, ongoing) — Real-time multiplayer quiz/flashcard learning app. WebSocket-based multiplayer with Redis distributed locking, speed/streak scoring engine with anti-cheat timestamp validation, Gemini API integration to auto-generate study material from uploaded documents.
4. **Gait-Based Deepfake Detection** (featured, 2025–2026) — ML research project detecting deepfakes via gait biomechanics rather than facial artifacts. MediaPipe skeletal landmark extraction → 1D CNN + BiLSTM/Transformer hybrid → difference-based classifier. 94.95% ± 2.81% AUC-ROC (LOOCV), 87.27% accuracy, 12.77% EER, dataset published on IEEE DataPort.
5. **PawGuard** (featured, 2026) — Flutter app for animal rescue/adoption/marketplace with a blockchain trust layer (Polygon Amoy, Solidity/Hardhat, server-side on-chain writes so users never touch a wallet directly), Firebase Auth bridged into Supabase RLS.
6. **Junk-Wunk** (standard, 2025) — Hackathon project (2nd place, Hack-N-Droid), Flutter marketplace with AWS Cognito auth and manual SigV4-signed S3 uploads.

Deeper narrative writeups live in `portfolio-context/<slug>/context-<slug>.md` for polaris-gcs, vhelp, queez, deepfake-detection, pawguard, and mutafix (MutaFix is not yet in `data/projects.ts` — it's added in PRD Phase 2) — these are the authoring source material that was condensed into the `approach`/`problem`/`metrics` fields above; Junk-Wunk has no separate context file.

### `experience.ts`
Two work experience entries plus one education entry:
- **SDE Intern**, BPO Integra India Private Limited (Remote, Dec 2025 – Feb 2026) — shipped React/Node/Express/MySQL components, cut page load 18%, cut API response time 22%.
- **AI Research Intern**, The Indian Hotels Company Limited / IHCL (Mumbai, May–June 2025) — built a cost-parametrization framework to evaluate AI chatbot vendors, informed a Fortune 500 vendor decision (35% identified cost savings).
- **Education:** B.Tech Computer Science and Engineering, Vellore Institute of Technology, Chennai (2023–2027), CGPA 9.13.

### `skills.tsx`
Six skill groups rendered with SVG category icons and per-skill Devicon icons:
- **Languages** (Python, TypeScript, JavaScript, Java, C#, Go, Dart, C/C++, Kotlin, SQL)
- **Frontend** (React.js, Next.js, Tailwind CSS, HTML5, CSS3, Flutter, Jetpack Compose)
- **Backend & APIs** (Node.js, Express.js, FastAPI, Deno Edge, WebSockets)
- **ML & AI** (PyTorch, Scikit-learn, Pandas, XGBoost, MediaPipe, Gemini API)
- **Cloud & DevOps** (Azure, AWS (EC2/Cognito/S3), Firebase, Supabase, Docker, PostgreSQL, MySQL, MongoDB, Redis, GitHub Actions, Git, Kubernetes)
- **Certifications** (Google AI Essentials, Google Cloud Data Analytics)

## 8. SEO / Metadata

- `layout.tsx` sets `metadataBase` to `https://arhaanpenwala.dev`, a title template (`%s · Arhaan Penwala`), OpenGraph and Twitter card metadata pulling from `site.tagline`.
- `opengraph-image.tsx` generates a 1200×630 OG image dynamically via `next/og` `ImageResponse` (dark background, role + name + tagline).
- `icon.tsx` generates the favicon similarly.
- `sitemap.ts` / `robots.ts` produce a minimal single-URL sitemap and an allow-all robots policy pointing at it.

## 9. Known Issues / Prior Design Audit Findings

A prior visual/UX audit (screenshots across 4 viewports, documented separately in project memory) identified several issues, some of which may still be open:
- **Font token bug:** `--font-sans` self-references itself in `globals.css`'s `@theme inline` block, potentially breaking Geist/Inter application in favor of a serif fallback (see §6).
- Skills section previously had hardcoded dark-mode text colors (`text-slate-300` in `.skill-badge`) causing a contrast failure in light mode — check current `.skill-badge` definition if revisiting accessibility.
- Mobile menu (`SheetContent`) previously used low-opacity glass background causing text bleed-through.
- Heavy reliance on a single animation pattern (`Reveal`'s fade-up) across nearly all sections — limited visual variety.
- Several built motion components (`Marquee`, `Typewriter`, `TextGenerate`, `GridPattern`) exist but are unused, representing either removed content directions or available-but-unspent visual tools.
- Container max-width is inconsistent across sections (`max-w-5xl` vs `max-w-6xl` vs effectively `max-w-3xl` for Contact's centered content).

These are historical observations, not necessarily reflective of the current committed state — verify against the live code before acting on them.

## 10. Resumes

- `public/resume.pdf` (+ `public/resume.tex` source) — the resume linked from the site's Hero/Nav/mobile-menu "Download Resume" actions.
- `resumes/Arhaan_AI.pdf`, `resumes/Arhaan_FullStack.pdf`, `resumes/Arhaan_SDE.pdf` — role-targeted resume variants present in the repo but **not currently referenced anywhere in the site code** (not linked from any component or data file as of this writing).
