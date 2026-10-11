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

Internet access is required throughout the suite. The application's normal
HTTPS requests to `fonts.googleapis.com` and `fonts.gstatic.com` are allowed
unchanged; there is no custom font fetch, setup, cache, local asset serving,
stylesheet rewrite or vendored font/license file. Browser tests wait for actual
Montserrat Latin/Cyrillic faces to load before checking PNG downloads.
The normal 30-second per-test and 240-second suite limits bound network waiting.
These integration tests depend on Google's availability; PNG signatures and
dimensions do not establish visual fidelity or coverage of other font families.
Discord's widget response remains a fixed fixture, not a live member-count claim.
During PNG export, `html-to-image` catches and logs cross-origin stylesheet
`cssRules` access failures. The guard permits only the verified SecurityError
first lines `Error inlining remote css file …` and `Error while reading CSS
rules from https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap&subset=cyrillic …`,
with the exact `Failed to read the 'cssRules' property from 'CSSStyleSheet':
Cannot access rules` text. Counts must match, so generic failures from other
stylesheets are not silently allowed. Fonts must still load and PNG signature/
dimensions must pass; export success does not prove every glyph was embedded.
All other console errors, page errors and external requests fail tests. Failure reports,
traces and screenshots are in ignored `playwright-report/` and `test-results/`.
