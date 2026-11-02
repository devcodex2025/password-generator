# Secret scanning

The repository uses [gitleaks](https://github.com/gitleaks/gitleaks) locally. Secret scanning
does not run in GitHub Actions; the workflow was removed on purpose.

## Local

Install the binary once (Windows: `winget install Gitleaks.Gitleaks`, macOS:
`brew install gitleaks`, Linux: download the release), then:

```bash
npm run secrets:scan
```

The command scans the full git history with `.gitleaks.toml` and prints a redacted report.
It exits non-zero when a finding is not covered by the allowlist.

Optional pre-commit hook (scans only staged changes):

```bash
npm run hooks:install
```

It skips silently when gitleaks is not installed, so contributors without the binary are not
blocked.

## Allowlist policy

`.gitleaks.toml` extends the default rules and allowlists only:

- generated Next.js build artifacts under `.next/` that were committed in early history
  and removed from tracking in `a7d8ff6`;
- `keywords: [...]` lines in article metadata, which the generic-api-key rule misreads as
  assignments.

Do not add a real secret to the allowlist. Rotate it first, remove it from the code, then
decide whether the commit history also needs cleaning.
