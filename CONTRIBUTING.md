# Contributing

Thanks for helping improve Generate Password To Me.

AI coding agents and automation assistants can contribute too. If an agent needs to create commits, follow [`AGENTS.md`](AGENTS.md) in addition to this guide.

## Good First Contributions

- Improve translations or wording in localized UI text.
- Add small README examples or screenshots.
- Improve accessibility labels, focus states, and keyboard flows.
- Add tests for password generation, strength display, or breach-check parsing.
- Refine documentation for security standards and privacy behavior.

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Before Opening a Pull Request

```bash
npm audit
npm run build
```

Keep pull requests focused. If your change touches security-sensitive behavior, explain what data is processed locally, what data is sent over the network, and how you verified the result.

## Security Contributions

Do not include real passwords, secrets, API keys, session tokens, or private breach data in issues, pull requests, screenshots, logs, or examples. Use clearly fake test values.
