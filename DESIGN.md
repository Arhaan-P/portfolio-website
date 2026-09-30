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
  lead:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  hero-readout:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
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

**Creative North Star: "The Control Room"**

A dim ops console. Quiet near-black surfaces, one cool cyan-blue signal, and nothing lit that isn't reporting something. The character lives in the instruments: mono readouts of sourced numbers, panel headers that index each section, and architecture diagrams shown at full width. There is no ambient glow, wash or halo; content, diagrams and live demos lead, and the chrome stays out of their way.

Light mode is a supported, fully usable counterpart: the same hue family (270 neutrals, 255 blue) on a cool off-white. Dark is the primary experience and the one every decision is made in first.

The tone is refined and restrained. Compact controls, hairline borders, and light that responds to the visitor instead of glowing on its own.

**Key Characteristics:**
- Dark-first, cool-tinted neutrals (hue 270); no pure black or white.
- One accent hue family (blue-cyan, 230 dark / 255 light), with violet (290) as a quiet secondary tint (badges, the hover border).
- Translucent glass-tint surfaces (no backdrop blur), flat at rest, with glow and the animated border appearing only on hover or state. No text gradients, no tilt or glare, no counting animations.
- Geist for text, Geist Mono for small technical labels.
- All color comes from OKLCH tokens in `globals.css`.

## Colors

A near-monochrome indigo-black palette with a single luminous blue-cyan signal; violet is only a quiet secondary tint.

### Primary
- **Lab Signal Cyan** (`oklch(0.75 0.17 230)`): The one accent in dark mode. Used for links, focus ring, primary buttons, and scrollbar hover. In light mode it becomes **Lab Signal Blue** (`oklch(0.55 0.18 255)`), and the text-on-primary flips accordingly.

### Secondary
- **Aurora Violet** (`oklch(0.5 0.25 290)`): Quiet secondary tint (fills, badge backgrounds, the hover border). Never used for text (it fails AA in both themes) and never a second interactive signal.

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

**Character:** A clean geometric sans for everything readable, with a mono voice reserved for readouts, panel indexes and small technical tags that make the page feel like a lab bench.

### Hierarchy
- **Display** (700, `clamp(3rem, 8vw, 6rem)`, 1, tracking -0.05em): The name in the hero only, in solid foreground colour.
- **Headline** (700, 2.25rem, 1.15, tracking -0.025em): Every section heading, including Skills and Contact (`text-3xl sm:text-4xl`). One size, no exceptions.
- **Title** (600, 1.25rem, 1.3): Role titles and card headings. Featured project names step up to 1.5rem→1.875rem so the name leads its card.
- **Body** (400, 1rem, 1.625): Descriptions and the featured one-liner (weight 400, so it reads as prose under the readouts). Cap paragraphs near 65–75ch; the hero tagline is capped at `max-w-2xl`.
- **Readout** (Geist Mono 600, 1.25rem, 1.2, tabular numerals): The value in a metric readout (featured cards, Experience, About). Highest-contrast small text.
- **Lead** (400, 1.125rem, 1.6): Section subtitles, the hero tagline, and the Contact line. The one step between Body and Title, used for a single supporting sentence under a heading.
- **Body-small** (400, 0.875rem, 1.5): Anything read as a sentence at reduced weight: readout captions, education line, bullets inside the disclosure, demo captions.
- **Label** (Geist Mono 500, 0.875rem, tabular numerals): Panel-header indexes ("01"–"05") and small metadata.
- **Caption** (Geist Mono 500, 0.75rem): Chips and tags only (tech-stack badges, period tags, Research label). This is the floor: nothing on the page is smaller.

### Named Rules
**The One Readout Rule.** Every sourced number on the page (featured cards, Experience, About) uses the same readout: `.readout-grid` with a hairline top rule, a mono tabular value (`.readout-value`, Readout step) above a 14px muted label (`.readout-label`). Only numbers that already exist in `data/*.ts` become readouts.

**The Mono-For-Machines Rule.** Geist Mono is for labels, readouts and technical asides, never for paragraphs.

**The 12/14 Floor Rule.** Chips and mono labels are never below 12px; anything a person reads as a sentence is never below 14px. No literal sizes such as `text-[10px]`.

## Layout

A single scrolling page in one column. Every content section shares one shell (`.section-shell`): `max-w-5xl` (1024px), a 16px side gutter that grows to 24px at `sm`, and `py-20 sm:py-24` vertical padding. "More projects" is deliberately tighter (`.section-shell-compact`, `py-12 sm:py-16`) because it only holds two cards. The hero (about 90vh, centered) and Contact are full-bleed sections with their own inner container. Grids collapse from multi-column to a single stack on narrow screens.

Every section heading is a panel header (`SectionHeading`, classes `.panel-title`, `.panel-index`, `.panel-rule`): a mono index that matches the section's position in the nav (Projects 01, Experience 02, Skills 03, About 04, Contact 05), the title at the Headline step, and a hairline rule to the edge, all on one line. The index and rule are `aria-hidden`, so the heading reads as its title. "More projects" continues section 01 and has no index. Contact centres the title between two rules. A `.section-sub` (Lead step, `mt-3`) follows where there is one. There are no labels above headings.

Architecture diagrams (PolarisGCS, MutaFix, Deepfake) are the page's centerpieces: each featured card with a diagram shows it at full card width, cropped to its content so labels stay near the 12px floor, in the signal blue only (`#60a5fa` on `#0a0e14`). PolarisGCS shows its topology first and the map screenshot as the second image. VHELP, the production proof, leads the featured list at full card width: its live-demo tile shows a still of the app behind the launch button until the build is requested. "More projects" follows the featured cards directly, so section 01 stays in one piece.

Anchor jumps use native scrolling with `scroll-padding-top: 4.5rem`, so headings land below the 64px sticky header.

Touch: every interactive element is at least 44×44px on touch layouts, and never below 24px. Text links use `min-h-11`; small pills extend their hit area with a pseudo-element.

Verify every change at 320px, 375px, 768px, and 1440px, in both themes.

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
- **Style:** Background-colored pill with a hairline border, 8px × 12px padding, `text-sm` medium in 80% foreground, a small monochrome icon (`text-foreground`, so it reads in both themes), and `shadow-sm`.
- **Hover:** Fills with the accent tone and lightens its border to primary at 40%.

### Cards / Containers
- **Corner Style:** 14px (`rounded-xl`) for every card, including Skills.
- **Background:** Glass Panel tint at 40% over the page (60% in light mode), no blur.
- **Border:** 1px `--glass-border` hairline.
- **Shadow Strategy:** Flat at rest; see Elevation & Depth.
- **Internal Padding:** About 24px.

### Navigation
- Sticky top bar (translucent, the one blurred surface, hairline bottom border) with anchor links in page order: Projects, Experience, Skills, About, Contact. A compact 44px outline "Resume" pill sits before the theme switch at every width (28px from `sm` up). Mobile uses a solid slide-in sheet that closes at once on a link tap. The theme control is a switch announcing "Dark mode".

### Hero name (signature)
- The name is set in the display size in solid Moonlit Text. No gradient text anywhere. Words enter with a spring rise (skipped under reduced motion). Beneath sits a rotating role line in muted text that swaps instantly (no letter animation). The hero sits on the flat page background; nothing drifts.

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
