# Agent Contribution Guide

This repository allows AI coding agents and automation assistants to contribute changes, including their own commits, when the task clearly requires it.

## Scope

Agents may make commits for:

- Documentation improvements.
- Small bug fixes.
- Dependency and security maintenance.
- Test additions.
- Focused UI or accessibility improvements.
- Translation and content updates.

For large product changes, architecture rewrites, data migrations, or security-sensitive behavior changes, agents should open a pull request and explain the risk instead of pushing directly.

## Branching

- Use the current working branch when the maintainer explicitly asks for direct work there.
- Use a dedicated branch for independent work, preferably with the `codex/` prefix, for example `codex/readme-polish`.
- Do not rewrite shared history.
- Do not force-push unless the maintainer explicitly asks for it.

## Commit Rules

Agents may create their own commits when:

- The requested task is complete.
- The diff is focused.
- No unrelated user changes are staged.
- Verification has been run or the reason for skipping verification is documented.

Use concise commit messages:

```text
Improve README translation docs
Fix dependency audit vulnerabilities
Add security reporting guide
```

Avoid vague messages such as `changes`, `fix`, or `update`.

## Staging Rules

Before committing:

```bash
git status --short
git diff --stat
git diff --cached --stat
```

Stage only files related to the current task. If unrelated changes already exist, leave them untouched and mention them in the final note.

## Verification

Choose verification based on the change:

- Documentation-only changes: inspect the rendered Markdown or review the diff.
- Dependency changes: run `npm audit` and `npm run build`.
- Code changes: run `npm run build` and any relevant tests.
- Security-sensitive changes: explain what data is processed locally, what is sent over the network, and how that was verified.

If a command cannot be run, record the reason clearly.

## Push Rules

Agents may push when the maintainer explicitly asks to push or publish changes.

Before pushing:

```bash
git status --short
git branch --show-current
git log -1 --oneline
```

Push the current branch to `origin` unless instructed otherwise.

## Safety Rules

- Never commit real passwords, secrets, tokens, API keys, private `.env` values, or private breach data.
- Never include real user passwords in examples, screenshots, tests, logs, or issue bodies.
- Use fake values such as `correct-horse-battery-staple-example`, `G-XXXXXXXXXX`, or `mongodb+srv://...`.
- Do not revert user changes unless the maintainer explicitly asks for that exact revert.
- Do not run destructive git commands such as `git reset --hard` or forced checkouts unless explicitly approved.

## Pull Request Notes

When opening a pull request, include:

- What changed.
- Why it changed.
- How it was verified.
- Any security or privacy impact.
- Any follow-up work that remains.

## Agent Disclosure

When practical, agents should mention in the commit body or pull request body that the change was prepared with an AI coding assistant. Keep the disclosure short and factual.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
