---
name: Arhaan Penwala Portfolio
description: A dark-first single-page portfolio in cool indigo-black, with translucent panels and one luminous cyan-blue signal.
colors:
  primary: "oklch(0.75 0.17 230)"
  primary-on: "oklch(0.13 0.015 270)"
  aurora-violet: "oklch(0.5 0.25 290)"
  background: "oklch(0.13 0.015 270)"
  surface: "oklch(0.17 0.02 270)"
  surface-raised: "oklch(0.2 0.025 270)"
  foreground: "oklch(0.95 0.01 270)"
  foreground-muted: "oklch(0.65 0.03 270)"
  border-hairline: "oklch(1 0 0 / 8%)"
  destructive: "oklch(0.704 0.191 22.216)"
  primary-light-mode: "oklch(0.55 0.18 255)"
  background-light-mode: "oklch(0.985 0.002 270)"
  surface-light-mode: "oklch(0.97 0.003 270)"
  foreground-light-mode: "oklch(0.145 0.015 270)"
  foreground-muted-light-mode: "oklch(0.5 0.02 270)"
  border-light-mode: "oklch(0.9 0.01 270)"
  control-border-light-mode: "oklch(0.64 0.02 270)"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 8vw, 6rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.05em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  body-small:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  readout:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.2
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.05em"
  caption:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-on}"
    rounded: "{rounded.lg}"
    height: "32px"
    padding: "0 10px"
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    height: "32px"
    padding: "0 10px"
  skill-badge:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    padding: "8px 12px"
  glass-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: Arhaan Penwala Portfolio

## Overview

**Creative North Star: "The Night Lab"**

A late-night engineering bench. The page sits on deep indigo-black, and the only light in the room comes from one cool cyan-blue signal, one still wash of the accent hue behind the hero, and frosted panels that read like instrument screens. It is quiet by default. Content, diagrams, and live demos lead, and the chrome stays out of their way.

Light mode is a supported, fully usable counterpart: the same hue family (270 neutrals, 255 blue) on a cool off-white. Dark is the primary experience and the one every decision is made in first.

The tone is refined and restrained. Compact controls, hairline borders, and light that responds to the visitor instead of glowing on its own.

**Key Characteristics:**
- Dark-first, cool-tinted neutrals (hue 270); no pure black or white.
- One accent hue family (blue-cyan, 230 dark / 255 light), with violet (290) as a quiet secondary tint (dividers, the timeline line, badges, the hover border).
- Translucent glass-tint surfaces (no backdrop blur), flat at rest, with glow and the animated border appearing only on hover or state. No text gradients, no tilt or glare, no counting animations.
- Geist for text, Geist Mono for small technical labels.
- All color comes from OKLCH tokens in `globals.css`.

## Colors

A near-monochrome indigo-black palette with a single luminous blue-cyan signal; violet is only a quiet secondary tint.

### Primary
- **Lab Signal Cyan** (`oklch(0.75 0.17 230)`): The one accent in dark mode. Used for the hero eyebrow, links, focus ring, primary buttons, and scrollbar hover. In light mode it becomes **Lab Signal Blue** (`oklch(0.55 0.18 255)`), and the text-on-primary flips accordingly.

### Secondary
- **Aurora Violet** (`oklch(0.5 0.25 290)`): Quiet secondary tint (fills, dividers, the timeline line, badge backgrounds, the animated hover border). Never used for text (it fails AA in both themes) and never a second interactive signal.

### Neutral
- **Night Indigo** (`oklch(0.13 0.015 270)`): Page background in dark mode.
- **Glass Panel** (`oklch(0.17 0.02 270)`): Cards and popovers; a translucent tint at 40% over the background (no blur).
- **Raised Slate** (`oklch(0.2 0.025 270)`): Secondary and muted fills, and the elevated tier of chips.
- **Moonlit Text** (`oklch(0.95 0.01 270)`): Primary text.
- **Dim Signal Text** (`oklch(0.65 0.03 270)`): Supporting copy, tagline, metadata.
- **Hairline** (`oklch(1 0 0 / 8%)`): Every divider and card border in dark mode (`border-border`). Light mode uses `oklch(0.9 0.01 270)`.
- **Control Edge** (`oklch(1 0 0 / 12%)` dark, `oklch(0.64 0.02 270)` light): The outline of controls that need an identifiable boundary (outline buttons, the Resume pill, stack badges, chips), via `border-input`. Light mode is darker than the hairline so it reaches 3:1 (about 3.2:1 on the page, 3.1:1 on cards).

### Named Rules
**The One Signal Rule.** Cyan-blue is the only accent hue for interface meaning (interactive, current, focus). Violet is a tint on decoration only; if it ever marks something clickable or current, it is wrong.

**The Token-Only Rule.** No hex, rgb, or Tailwind palette colours (slate, blue, emerald…) in components; tints come from `color-mix` on a token. The one exception is white and black on the lightbox and carousel controls, which always sit on a dark overlay in both themes. Skill icons are monochrome `text-foreground` so they read in both themes.

## Typography

**Display / Body Font:** Geist (with system sans fallback)
**Label / Mono Font:** Geist Mono

**Character:** A clean geometric sans for everything readable, with a mono voice reserved for the small technical asides (eyebrows, tags) that make the page feel like a lab bench.

### Hierarchy
- **Display** (700, `clamp(3rem, 8vw, 6rem)`, 1, tracking -0.05em): The name in the hero only, in solid foreground colour.
- **Headline** (700, 2.25rem, 1.15, tracking -0.025em): Every section heading, including Skills and Contact (`text-3xl sm:text-4xl`). One size, no exceptions.
- **Title** (600, 1.25rem, 1.3): Role titles and card headings. Featured project names step up to 1.5rem→1.875rem so the name leads its card.
- **Body** (400, 1rem, 1.625): Descriptions and the featured one-liner (weight 400, so it reads as prose under the readouts). Cap paragraphs near 65–75ch; the hero tagline is capped at `max-w-2xl`.
- **Readout** (Geist Mono 600, 1.25rem, 1.2, tabular numerals): The value in a metric readout on featured cards. Highest-contrast small text; the hero strip uses the 1rem step.
- **Body-small** (400, 0.875rem, 1.5): Anything read as a sentence at reduced weight: readout captions, education line, bullets inside the disclosure, demo captions.
- **Label** (Geist Mono 600, 0.875rem, tracking 0.05em, uppercase): Eyebrows like "Hi, I'm" and small metadata.
- **Caption** (Geist Mono 500, 0.75rem): Chips and tags only (tech-stack badges, period tags, Research label). This is the floor: nothing on the page is smaller.

### Named Rules
**The Mono-For-Machines Rule.** Geist Mono is for labels, readouts and technical asides, never for paragraphs.

**The 12/14 Floor Rule.** Chips and mono labels are never below 12px; anything a person reads as a sentence is never below 14px. No literal sizes such as `text-[10px]`.

## Layout

A single scrolling page in one column, with sections stacked at generous vertical rhythm (about 96px section padding, `py-24`) and a 16px side gutter that grows to 24px at `sm`. The hero is centered and takes about 90vh. Later sections sit in centered containers, and grids collapse from multi-column to a single stack on narrow screens. Smooth scrolling is provided by Lenis.

Known drift: container max-widths are not consistent across sections (5xl, 6xl, and effectively 3xl in Contact). The target is one shared content width.

Verify every change at 375px, 768px, and 1440px.

## Elevation & Depth

Depth comes from translucent panels over the near-black page, not from drop shadows or blur. Surfaces are flat at rest. Light enters only on interaction or state.

### Shadow Vocabulary
- **Glow small** (`box-shadow: 0 0 20px -5px var(--glow-primary)`): Hover glow under accent elements.
- **Skill badge lift** (Tailwind `shadow-sm`): The one resting shadow, on small chips.
- **Pulse ring** (`0 0 0 8px` fading to transparent, 2s): Live status dots.

### Named Rules
**The Flat-Until-Touched Rule.** Glow and the animated gradient border show up on hover, focus, or active state. At rest, a card is a flat pane of glass.

**The One Blur Rule.** The sticky nav is the only element with `backdrop-filter`, because content scrolls under it. Cards, the footer, buttons and overlays are plain translucent surfaces from the glass tokens: blur is invisible on a flat background and costs a compositing layer each.

## Shapes

Softly rounded rectangles, all derived from one radius base (`--radius: 0.625rem`, 10px), stepped as sm 6px, md 8px, lg 10px, xl 14px. Borders are always 1px hairlines. The animated hover border is a 1px conic gradient masked to the outline, so it traces the edge without filling the card. Icons inside badges are small, brand-colored marks.

## Components

### Buttons
- **Shape:** Gently rounded (10px), compact 32px height, 10px horizontal padding, `text-sm` medium weight.
- **Primary:** Lab Signal Cyan fill with Night Indigo text, softening to 80% on hover.
- **Outline:** Background fill with a hairline border; a muted fill on hover.
- **Ghost / Link:** Ghost shows a muted wash on hover. Link is primary-colored text with an underline on hover.
- **Focus:** A 3px ring in the primary color at 50%. Press nudges the button down 1px.

### Chips (Skill badges)
- **Style:** Background-colored pill with a hairline border, 8px × 12px padding, `text-sm` medium in 80% foreground, a small brand icon, and `shadow-sm`.
- **Hover:** Fills with the accent tone and lightens its border to primary at 40%.
- **Open bugs:** Text color contrast in light mode, and some CDN Devicon icons rendering faint.

### Cards / Containers
- **Corner Style:** 10px.
- **Background:** Glass Panel at 40% over the page (60% in light mode).
- **Border:** 1px hairline at 10% white in dark mode.
- **Shadow Strategy:** Flat at rest; see Elevation & Depth.
- **Internal Padding:** About 24px.

### Navigation
- Sticky top bar (translucent, the one blurred surface, hairline bottom border) with anchor links to About, Skills, Experience, Projects, and Contact. Mobile uses a slide-in sheet. The theme toggle is a binary light/dark switch. The mobile sheet does not apply dark styling (known open bug).

### Hero name (signature)
- The name is set in the display size in solid Moonlit Text. No gradient text anywhere. Words enter with a spring rise (skipped under reduced motion). Beneath sits a rotating role line in muted text. One still, low-opacity wash of the accent hue sits behind the hero; nothing drifts.

## Do's and Don'ts

### Do:
- **Do** take every color from the OKLCH tokens in `globals.css`, in both themes.
- **Do** keep surfaces flat at rest and let glow and gradient borders appear on hover or focus.
- **Do** use Geist Mono only for short labels and technical asides.
- **Do** respect `prefers-reduced-motion` for every animation, and make content render fully without any reveal animation.
- **Do** check contrast in dark and light mode whenever color changes.

### Don't:
- **Don't** add a second saturated accent hue, and don't use violet for anything interactive.
- **Don't** hardcode hex, rgb, or Tailwind slate/gray utilities in components.
- **Don't** hide content behind scroll-triggered reveals that leave blank space when they haven't fired.
- **Don't** reintroduce Marquee, Typewriter, TextGenerate, or GridPattern without an explicit job for them.
- **Don't** add `backdrop-filter` anywhere but the sticky nav.
