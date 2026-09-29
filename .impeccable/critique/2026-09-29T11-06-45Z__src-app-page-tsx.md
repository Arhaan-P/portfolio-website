---
target: the whole page
total_score: 20
max_score: 36
na_heuristics: 10
p0_count: 0
p1_count: 3
target_identity: "file:C:\\Arhaan\\PORTFOLIO\\src\\app\\page.tsx"
target_fingerprint: "sha256:3b56a365941e93b08f27a11208aadbf6366568d41b42d49c7e8aa6fec41fa929"
target_path: "C:\\Arhaan\\PORTFOLIO\\src\\app\\page.tsx"
timestamp: 2026-09-29T11-06-45Z
slug: src-app-page-tsx
---
# Critique: whole page (src/app/page.tsx)
Method: dual-agent (A: design review, B: detector + browser evidence)

## Design Health Score: 20/36 (Acceptable, 56%). H10 n/a.
H1 3, H2 2, H3 3, H4 2, H5 3, H6 2, H7 2, H8 1, H9 2, H10 n/a.

## Design Specificity
The page is a category template: aurora hero, gradient name, role rotator, glass bento, zigzag timeline, tilt/glare cards, 71-badge skills wall, tag-filter archive. None of it is specific to drones or systems.

Detector:
- CLI found 5 issues: gradient-text at skills.tsx:17, and 10px or 0.8rem text sizes off the type ramp.
- The browser overlay found about 95: 52 undersized text, 24 nested cards, 10 gradient text, 6 glows, 2 AI-palette, 1 overused font.
- DESIGN.md contradicts itself: line 135 describes a gradient name, line 196 says no gradient text.

## Priority Issues
1. [P1] Proof buried. The first viewport lacks role, year, and proof; "1k+" sits at y≈1000 without "in the first hour"; the contact copy is generic. Fix: add a mono proof strip plus a seeking line, move Featured up, make Contact a specific ask. Commands: clarify, layout.
2. [P1] Too long and duplicated. The archive repeats the featured projects, and there are 71 skill badges with unbacked tools. Fix: show only standardProjects and drop the filter; cut Skills to about 4×6. Command: distill.
3. [P1] Template sameness. Decoration outweighs evidence, and PolarisGCS has no diagram. Fix: add a topology diagram and mono metric readouts; use solid headings; remove tilt and glare. Commands: quieter, then bolder.
4. [P2] Featured-card composition. Centred media leaves dead space; diagrams render at about 420px; metrics duplicate the approach; demo tiles are blank. Command: layout.
5. [P2] A11y and theme leaks:
   - The whileTap wrappers create double tab stops (hero.tsx:98,103; contact.tsx:31).
   - The rotator has no aria-label.
   - white/5 and white/10 borders are hardcoded in 6 files.
   - The theme follows the OS instead of defaulting to dark.
   - The lightbox has no focus management, and the diagram alt text is wrong.
   Commands: harden, polish.

## Persona Red Flags
- Priya: no role or year up top; IHCL at y≈2200; "6 Projects Shipped" and "Journal Paper in Progress" are unsourced.
- Dev: no PolarisGCS diagram or repo; the metrics are features, not measurements; Kubernetes and Azure are unbacked.
- Casey: a 22,470px page; Resume only in the menu; zoom doesn't work on touch.
- Jordan: the rotator goes blank; the nav order doesn't match the page.

## Minor
- The hero says "serving over a thousand" but the source says "in the first hour".
- The 0→1 counter adds nothing.
- TypeScript is listed twice.
- rgba is hardcoded at page.tsx:14.
- Violet is used as a text colour via the gradients.
- The footer has boilerplate.
- CLAUDE.md bugs 0–3 are stale.

## Questions
- Which single number should Priya read?
- Should VHELP lead?
- What is lost if Skills and the archive are deleted?
- Why does nothing look like telemetry?
