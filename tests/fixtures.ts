import { test as base, expect } from '@playwright/test';

const CSS_RULES_ERROR =
  "SecurityError: Failed to read the 'cssRules' property from 'CSSStyleSheet': Cannot access rules";
const MONTSERRAT_CSS =
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap&subset=cyrillic';

// Google Fonts is a live integration; Discord alone is stubbed.
export const test = base.extend<{ networkGuard: undefined }>({
  networkGuard: [
    async ({ page }, use) => {
      const errors: string[] = [];
      let inliningWarnings = 0;
      let googleRuleWarnings = 0;
      page.on('pageerror', (error) => {
        errors.push(error.message);
      });
      page.on('console', (message) => {
        if (message.type() !== 'error') return;
        const text = message.text();
        const newline = text.indexOf('\n');
        const firstLine = newline === -1 ? text : text.slice(0, newline);
        // Verified html-to-image catch/fallback diagnostics. Keep the generic warning
        // only when paired with the exact Google-font-specific warning below.
        if (firstLine === `Error inlining remote css file ${CSS_RULES_ERROR}`) {
          inliningWarnings += 1;
        } else if (
          firstLine ===
          `Error while reading CSS rules from ${MONTSERRAT_CSS} ${CSS_RULES_ERROR}`
        ) {
          googleRuleWarnings += 1;
        } else {
          errors.push(message.text());
        }
      });
      await page.route('**/*', async (route) => {
        const url = new URL(route.request().url());
        if (
          [
            'http://127.0.0.1:4183',
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
          ].includes(url.origin)
        ) {
          await route.continue();
        } else if (
          url.href ===
          'https://discord.com/api/guilds/1558165639284129835/widget.json'
        ) {
          // eslint-disable-next-line camelcase -- Match Discord's public JSON field.
          await route.fulfill({ json: { presence_count: 42 } });
        } else {
          errors.push(`Unexpected external request: ${url.href}`);
          await route.abort();
        }
      });
      await use(undefined);
      expect(
        inliningWarnings,
        'Generic cssRules warnings must match the exact Google font warnings',
      ).toBe(googleRuleWarnings);
      expect(
        errors,
        'No application errors or unexpected external requests',
      ).toEqual([]);
    },
    { auto: true },
  ],
});
