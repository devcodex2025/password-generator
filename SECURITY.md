# Security Policy

Generate Password To Me is a password security project, so responsible disclosure matters.

## Supported Versions

Security fixes are handled on the default branch and released through the live deployment at `https://www.generatepasswordto.me`.

## Reporting a Vulnerability

Please do not open a public issue for sensitive security reports.

Use GitHub private vulnerability reporting if it is enabled for this repository, or contact the maintainer through the GitHub profile linked in the README.

Include:

- A concise description of the issue.
- Steps to reproduce with fake test data only.
- The affected route, component, dependency, or API call.
- Expected impact and any suggested fix.

## Password and Secret Handling

- Do not send real passwords to maintainers.
- Do not include production secrets, `.env` values, database URLs, or tokens in reports.
- Use placeholder values such as `correct-horse-battery-staple-example` or `G-XXXXXXXXXX`.

## Current Security Model

- Password generation runs locally in the browser.
- Generated passwords are not stored by the app.
- Breach checks use Have I Been Pwned k-anonymity: only the first 5 characters of a SHA-1 hash are sent to the range API.
- The returned hash suffixes are compared locally in the browser.
