# PRD — Portfolio Visual & Positioning Pass

## Problem
The page stacks nearly every 2024-2026-era portfolio effect at once — aurora background, cursor spotlight, glassmorphism, animated gradient borders, 3D tilt cards, magnetic cursor pull, a role-text cycler, spring-animated stat counters, Lenis smooth scroll, scroll-linked parallax — on top of a genuinely strong project portfolio (production systems with real users, a published IEEE dataset, a 93% strict_pass@3 agentic benchmark with proper statistical rigor). The execution is competent; the effect is generic "AI-built portfolio template," because every trend is present and none is chosen. The code's craft should read as clearly as the projects' craft does.

Also: the site's project list (PolarisGCS, VHELP, Queez, Deepfake Detection, PawGuard, Junk-Wunk) doesn't include **MutaFix** — the newest project (Aug '26) and arguably the strongest single line on the resume (LangGraph repair agent, 93.0% strict_pass@3 ±2.5 binomial SE over 105 challenges × 3 seeds (94.6% plain pass@3), 1,084 contamination-free bugs via deterministic AST mutation, caught 5/298 pass@k false positives by hand-verification). That's a gap, not a design issue.

## Goals
1. **Correctness first.** Fix the 5 known bugs in `CLAUDE.md` before any visual opinion work.
2. **Cut to 2-3 signature effects, retire or place the rest deliberately.** Every remaining animation should be doing a specific job (draw the eye to X, signal state Y) — not "because it was available."
3. **Sharpen positioning.** The hero currently rotates through 5 titles (Software Engineer / SDE / Full-Stack Developer / AI Researcher / ML Engineer). The actual project evidence tells one coherent story — production distributed systems + rigorous AI/agent evaluation — not five separate people. Pick a lane; the 3 role-targeted resumes already in the repo (`resumes/Arhaan_AI.pdf`, `_FullStack.pdf`, `_SDE.pdf`) show the person already knows how to reposition per audience — the site should do the same, deliberately, once.
4. **Metric integrity.** Audit every on-page stat against `portfolio-context/*.md`. Known risk: VHELP's site copy says "13k+ users served" per `context.md`, but `context-vhelp.md` gives ~1,000 *registered* students against a ~15,000 *potential* addressable population — those are different numbers. Anywhere a stat is a target/goal rather than a measured result, label it as one.
5. **Add MutaFix as a project entry.**
6. Ship as reviewable phases, not one rewrite.

## Non-goals
- No framework/stack change.
- No CMS/backend — TS data files are fine at this scale.
- No replacement of the OKLCH design-token system — refine usage, don't rebuild it.

## Audience
Recruiters/hiring managers doing a 30-60s scan, then technical interviewers going deep on 1-2 projects.

## Phases

### Phase 0 — Correctness (do first, in this order)
- **Fix the scroll-reveal blank-space bug first.** Confirmed via full-page screenshots: Experience, Featured Projects, and About render as long blank stretches with empty placeholder shells when content hasn't scrolled into view. This is the highest-priority item in the whole PRD — it's a functional bug (hurts real users on fast scroll/slow devices, and anything doing a full-page render, e.g. crawlers), not a style opinion.
- Fix mobile `SheetContent` — confirmed dark mode isn't applied to the sheet at all (dark and light screenshots of the mobile menu are visually identical), on top of the low-opacity bleed-through already known.
- Fix `.skill-badge` light-mode text contrast AND debug the separate icon-load issue — some Devicon icons render as faint gray placeholders next to fully-colored ones in the same card; likely a CDN/lazy-load race, not the same bug as the text contrast.
- Fix the font token self-reference.
- Standardize container max-width across sections.
- Reconcile every visible stat against source docs; fix or relabel mismatches (start with the VHELP user-count claim above).

### Phase 1 — Visual restraint
- One-line keep/cut/repurpose call on each of the 12 `components/motion/*` files, with rationale.
- Reduce simultaneous Hero effects (aurora + spotlight + parallax + word-reveal + role cycler is five things competing for attention in one viewport).
- Resolve the 4 unused components — place them with a real job or delete them. No orphaned code either way.
- One consistent card treatment per context: right now `glass-card`, `tilt-card`, and `gradient-border` are used across sections with no visible rule for which section gets which.

### Phase 2 — Positioning & content
- Replace the 5-title role rotator with a single sharp positioning line, or a tighter 2-title rotation, based on which resume the site should lead with.
- Add MutaFix as a project entry (source: `portfolio-context/mutafix/context-mutafix.md` — pull only what's in that doc, don't embellish. Its `pass@k` is an attempt-budget measure, not the HumanEval sampling estimator, so don't present it as comparable to SWE-bench).
- Re-check featured project order against current strongest work.
- Tighten About section copy; confirm "Currently building" is still accurate.

### Phase 3 — Polish
- Cross-viewport screenshot pass (375 / 768 / 1440) via Playwright or Chrome DevTools MCP.
- Accessibility pass: contrast, focus states, reduced-motion behavior.
- Delete any dead code left over from Phase 1.

## Success criteria
- All 5 known bugs closed.
- Every visible stat traceable to a source doc or explicitly labeled as a goal/projection.
- MutaFix is on the site.
- A first-time visitor can state the specialization in one sentence after 10 seconds.
- `npm run lint` and `npm run build` clean throughout.