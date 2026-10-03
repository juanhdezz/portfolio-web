<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio notes

- Content source of truth: `CONTENT.md` (from `cv.pdf` + GitHub repos). All site copy lives in `src/content/site.ts` (ES/EN). Never add facts that are not in `CONTENT.md`.
- Commands: `npm run dev`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm run check` (all three).
- Visual check: start a server, then `python3 verification/shots.py http://localhost:3000 verification/screenshots/<name> [--reduced] [--sections]` (3 viewports, both themes, console errors, horizontal overflow).
- Links check: `python3 verification/check_links.py http://localhost:3000`. Lighthouse: see README.
- Routes: `/` (es) and `/en` are two root layouts (`src/app/(es)`, `src/app/(en)/en`). 404 is `src/app/global-not-found.tsx`.
- Design tokens are CSS variables in `src/app/globals.css` (switched by `data-theme` on `<html>`); rationale in `DESIGN.md`, decisions in `DECISIONS.md`.
