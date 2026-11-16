<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Team

We are a team of 3. Each person owns a distinct part of the app — keep changes within the relevant area and coordinate across boundaries.

- **alexwerban** — Landing frontend: the swap setup screen where the user picks the swap amount and cryptocurrency, and enters the recipient address (validated differently per chain).
- **exontidev** — In-progress frontend and end of the bridge: shows swap state and the QR code for sending coins, plus the bridge's final step.
- **clouwn** — DevOps.
