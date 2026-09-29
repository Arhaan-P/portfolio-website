# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** recruiters and hiring managers screening candidates for SDE and AI-engineer new-grad and intern roles at systems-heavy companies. They usually click through from the resume or LinkedIn and skim fast.
- **Secondary:** engineers running a technical screen. They open the projects to check depth: architecture, tradeoffs, and whether the work is real.

## Product Purpose

This is the personal portfolio of Arhaan Penwala (B.Tech CSE, VIT Chennai, 2023–2027). It turns a resume skim into a hiring conversation. The site succeeds when a visitor does any of the following:

- reaches out or moves the candidate to an interview (email, LinkedIn)
- downloads the resume (`/arhaan_sde.pdf`)
- concludes that this person builds real distributed systems and shipped products, not tutorial projects
- tries a live demo (VHELP, PawGuard)

## Positioning

Shipped real systems at real scale. Evidence: a campus super-app that reached 1,000+ users in its first hour, and distributed drone-fleet software. Lead with what actually ran in production, then show the architecture and tradeoffs behind it. Other student portfolios can list the same tech stack. They cannot truthfully claim this production usage and systems ownership.

## Operating Context

- It is a single scrolling page. Sections: hero, about, skills, experience, featured projects, contact, footer.
- Recruiters give it seconds and scan. Engineers give it minutes and read project detail, diagrams, and demos.
- Traffic arrives from the resume PDF, LinkedIn, and GitHub. The live site is arhaanpenwala.dev, deployed on Vercel.
- The page is also rendered by crawlers and full-page screenshot tools. Content must not depend on scroll-triggered reveals to exist.

## Capabilities and Constraints

- Stack: Next.js 16 (App Router), React 19, TypeScript 5, Tailwind v4 with OKLCH tokens in `globals.css`, shadcn/ui (base-nova), Framer Motion, and Lenis.
- Content lives in `src/data/*.ts` (site, projects, skills, experience) and is never hardcoded in components.
- Every technical claim must trace to `portfolio-context/<slug>/context-<slug>.md` or `src/data/*.ts`. Projections and goals are labeled as such.
- `portfolio-context/` and `resumes/` are read-only source material.
- Name, tagline, and the hero role rotator (currently "Software Engineer", "AI/ML Engineer") are content decisions owned by the user. Ask before changing them.
- Dark mode is the default and primary experience. Light mode must stay fully usable.
- Every animation respects `prefers-reduced-motion`.

## Brand Commitments

- Name: Arhaan Penwala. Roles: Software Engineer and AI/ML Engineer. Location: Chennai, India.
- Voice: factual, specific, and quantified only where a source backs the number. No hype and no invented scale.

## Evidence on Hand

- **Featured projects** (`src/data/projects.ts`):
  - PolarisGCS: multi-drone GCS, 4-component distributed topology.
  - VHELP: lead contributor, 446/896 commits, 178k-line Flutter app, 1,000+ users in the first hour, 24 Edge Functions.
  - PawGuard.
  - MutaFix.
  - Deepfake detection: published dataset, DOI 10.21227/ngh5-b637.
- **Other projects:** Queez and Junk-Wunk.
- **Live demos:** https://vhelp-demo.pages.dev/ and https://pawguard-demo.pages.dev/. The PolarisGCS site is http://polarisgcs.pages.dev/.
- **Assets:**
  - Architecture diagrams: `public/projects/mutafix-architecture.svg` and `public/projects/deepfake-detection-architecture.svg`.
  - Screenshots: `public/projects/*.webp`.
  - Source screenshots: `portfolio-context/*/screenshots`.
- **Experience:**
  - SDE Intern, BPO Integra (Dec 2025 – Feb 2026).
  - AI Research Intern, IHCL (May – June 2025).
- **Education:** CGPA 9.13.
- **Resume:** `public/arhaan_sde.pdf`.
- **Absent, never fabricate:** testimonials, employer endorsements, GitHub star or download counts, and any user or performance metric not in the source docs.

## Product Principles

1. **Production first.** Lead with what ran for real users, then explain how it was built.
2. **Every number is sourced.** An unsourced metric does more harm than a missing one. An engineer who catches one inflated claim will discount the rest.
3. **Serve both reading speeds.** A recruiter should get the verdict in one scan. An engineer should find architecture and tradeoffs one step deeper.
4. **Content exists without motion.** Everything renders fully for fast scrollers, slow devices, crawlers, and screenshot tools. Animation only enhances.
5. **Clear paths to act.** Contact, resume, and live demos stay easy to reach from anywhere in the scan.

## Accessibility & Inclusion

- Honor `prefers-reduced-motion` for all motion.
- Keep WCAG AA contrast in both dark and light themes.
- The layout must work at 375px, 768px, and 1440px.
