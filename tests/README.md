# Production browser checks

Run `npm ci`, then `npx playwright install chromium` (Linux CI uses
`--with-deps`). `npm test` builds the app and runs the Chromium suite;
`npm run test:e2e` runs against an already-built `dist`.

Playwright owns a Vite preview server on `127.0.0.1:4183`, including the SPA
fallback for `/banner`, and stops it after testing. An occupied port fails
rather than silently testing another server. Desktop and mobile contexts cover
theme persistence, navigation, course dialogs, Markdown sanitization and PNG
downloads. No screenshot baselines are used.

Google Fonts stylesheet links are localized to an empty same-origin fixture
(system fallback fonts, readable CSS rules for PNG export), and Discord's
widget response is a fixed test fixture, not a claim about live member counts.
Other external requests and application errors fail tests. Failure reports,
traces and screenshots are in ignored `playwright-report/` and `test-results/`.
