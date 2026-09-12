Read CLAUDE.md and PRD.md in the repo root before touching anything.

We're executing PRD.md phase by phase. Start with Phase 0 ONLY this session — do not begin Phase 1 until I explicitly confirm Phase 0 is good.

For each item in Phase 0:
1. Show me the diff.
2. Explain what was broken and why the fix is correct.
3. Move to the next item.

Rules for this session:
- Use portfolio-context/*.md and data/*.ts as the only source of truth for any factual or numeric claim. If you can't verify a number against those, ask me — don't guess or round favorably.
- Run `npm run lint && npm run build` after each item and fix anything that breaks before moving on.
- If Playwright MCP or Chrome DevTools MCP is available, screenshot any section you touch at 375px, 768px, and 1440px, before and after.
- Don't refactor anything outside the scope of the current bug — no drive-by rewrites.

Start with bug #0 in CLAUDE.md — the scroll-reveal blank-space issue. It's the highest priority: reproduce it first (do a full-page screenshot via Playwright/Chrome DevTools MCP without manually scrolling, compare against one where you scroll section-by-section first) before proposing a fix, so we're fixing the actual cause and not guessing.