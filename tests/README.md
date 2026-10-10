# Production browser checks

Run `npm ci`, then `npx playwright install chromium` (Linux CI uses
`--with-deps`). `npm test` builds the app and runs the Chromium suite;
`npm run test:e2e` runs against an already-built `dist`.

Playwright owns a Vite preview server on `127.0.0.1:4183`, including the SPA
fallback for `/banner`, and stops it after testing. An occupied port fails
rather than silently testing another server. Desktop and mobile contexts cover
theme persistence/action labels, denied storage, unknown-route recovery, course
keyboard focus, draft recovery/validation/reset, Markdown sanitization and PNG
downloads. PNG signature and IHDR dimensions cover all four presets and mobile;
controlled font-readiness failure verifies pending/duplicate/retry behavior.
No screenshot baselines are used. `npm run check` also checks test TypeScript.

Google Fonts stylesheet links are localized to same-origin, licensed Montserrat
WOFF2 fixtures with real Latin/Cyrillic loading and export (see `assets/README.md`).
This does not verify live Google Fonts, other font families or visual fidelity.
Discord's
widget response is a fixed test fixture, not a claim about live member counts.
Other external requests and application errors fail tests. Failure reports,
traces and screenshots are in ignored `playwright-report/` and `test-results/`.
