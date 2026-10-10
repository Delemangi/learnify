import { test as base, expect } from '@playwright/test';

// All browser requests are local or explicitly stubbed; unexpected dependencies fail.
export const test = base.extend<{ networkGuard: undefined }>({
  networkGuard: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => {
        errors.push(error.message);
      });
      page.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text());
      });
      // Keep font stylesheets same-origin so html-to-image can read cssRules.
      await page.addInitScript(() => {
        const localizeFonts = () => {
          for (const link of document.querySelectorAll(
            'link[rel="stylesheet"]',
          )) {
            if (
              link instanceof HTMLLinkElement &&
              link.href.startsWith('https://fonts.googleapis.com/')
            ) {
              link.href = '/__test-fonts.css';
            }
          }
        };
        new MutationObserver(localizeFonts).observe(document, {
          childList: true,
          subtree: true,
        });
      });
      await page.route('**/*', async (route) => {
        const url = new URL(route.request().url());
        if (
          url.pathname === '/__test-fonts.css' &&
          url.origin === 'http://127.0.0.1:4183'
        ) {
          await route.fulfill({ body: '', contentType: 'text/css' });
        } else if (url.origin === 'http://127.0.0.1:4183') {
          await route.continue();
        } else if (url.hostname === 'fonts.googleapis.com') {
          await route.fulfill({
            body: '',
            contentType: 'text/css',
          });
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
        errors,
        'No application errors or unexpected external requests',
      ).toEqual([]);
    },
    { auto: true },
  ],
});
