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
404 contact recovery must actually scroll to the contact section. Course-modal
tests cover backdrop wheel locking, prior overflow restoration and viewport
clamping after programmatic scrolling.
No screenshot baselines are used. `npm run check` also checks test TypeScript.

Internet access is required at suite startup. `font-setup.ts` fetches the two
fixed Montserrat v31 Latin/Cyrillic WOFF2 URLs below once per suite (each request
has a 20-second timeout, with at most two retries). HTTP status, WOFF2 signature
and file length are validated; failures stop the suite, with no empty-CSS or
system-font fallback. No font binaries or license files are stored in this repo.

- https://fonts.gstatic.com/s/montserrat/v31/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2
- https://fonts.gstatic.com/s/montserrat/v31/JTUSjIg1_i6t8kCHKm459W1hyzbi.woff2
- Source stylesheet: https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap&subset=cyrillic
- Upstream SIL Open Font License: https://github.com/google/fonts/blob/main/ofl/montserrat/OFL.txt

Setup creates a unique `learnify-test-fonts-*` directory in the approved local
Windows temporary area, or the OS temp directory in CI. Workers receive its
path through Playwright's setup environment. Teardown deletes only that run's
directory, including after setup download failures. There is no persistent cache.
Browser font requests are served same-origin from the downloaded files, covering
real Latin/Cyrillic decoding and PNG export without live stylesheet/CORS coupling.
This does not verify the production Google Fonts integration, other font families
or visual fidelity. Discord's widget response remains a fixed test fixture,
not a claim about live member counts.
Other external requests and application errors fail tests. Failure reports,
traces and screenshots are in ignored `playwright-report/` and `test-results/`.
