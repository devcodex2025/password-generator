# Secret scanning

The repository uses [gitleaks](https://github.com/gitleaks/gitleaks) in CI and locally.

## Local

Install the binary once (Windows: `winget install Gitleaks.Gitleaks`, macOS:
`brew install gitleaks`, Linux: download the release), then:

```bash
npm run secrets:scan
```

The command scans the full git history with `.gitleaks.toml` and prints a redacted report.
It exits non-zero when a finding is not covered by the allowlist.

## CI

`.github/workflows/gitleaks.yml` runs on every push to `next` and on every pull request:

- pull requests scan only the commits in the PR range;
- pushes to `next` scan the full history;
- `workflow_dispatch` allows a manual full scan.

## Allowlist policy

`.gitleaks.toml` extends the default rules and allowlists only:

- generated Next.js build artifacts under `.next/` that were committed in early history
  and removed from tracking in `a7d8ff6`;
- `keywords: [...]` lines in article metadata, which the generic-api-key rule misreads as
  assignments.

Do not add a real secret to the allowlist. Rotate it first, remove it from the code, then
decide whether the commit history also needs cleaning.
