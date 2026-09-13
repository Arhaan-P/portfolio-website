# Arhaan Penwala — Portfolio

Personal portfolio site: a single scrolling page covering about, skills, experience, featured projects, and contact.

Live: [arhaanpenwala.dev](https://arhaanpenwala.dev)

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript 5
- [Tailwind CSS v4](https://tailwindcss.com) with an OKLCH token system in `src/app/globals.css`
- [shadcn/ui](https://ui.shadcn.com) (`base-nova` style) for primitives
- [Framer Motion](https://www.framer.com/motion/) for section reveals and interaction effects, [Lenis](https://github.com/darkroomengineering/lenis) for smooth scroll

## Project structure

```
src/
  app/                # App Router entry: layout, page, metadata, sitemap/robots
  components/
    sections/         # Page sections (hero, about, skills, experience, projects, contact, footer)
    motion/           # Reusable animation primitives (Reveal, TiltCard, Magnetic, ...)
    ui/               # shadcn/ui components
  data/                # Content: site copy, projects, skills, experience — edit here, not in components
  lib/                 # Shared utilities
```

Content (copy, project metrics, skills) lives in `src/data/*.ts`, not hardcoded in components. Any factual/numeric claim about a project should be traceable to that project's source material — ask before adding a number that isn't.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint

Run `npm run lint && npm run build` after any change before considering it done.

## Deployment

Deployed on [Vercel](https://vercel.com).
