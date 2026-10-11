import { test as base, expect } from '@playwright/test';
import { join } from 'node:path';
import process from 'node:process';

const FONT_CSS = `
@font-face {
  font-family: 'Montserrat'; font-style: normal; font-weight: 100 900; font-display: swap;
  src: url('http://127.0.0.1:4183/__test-fonts/montserrat-latin.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+2000-206F;
}
@font-face {
  font-family: 'Montserrat'; font-style: normal; font-weight: 100 900; font-display: swap;
  src: url('http://127.0.0.1:4183/__test-fonts/montserrat-cyrillic.woff2') format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}`;

// All browser requests are local or explicitly stubbed; unexpected dependencies fail.
export const test = base.extend<{ networkGuard: undefined }>({
  networkGuard: [
    async ({ page }, use) => {
      const { LEARNIFY_TEST_FONTS_DIR: fontDirectory } = process.env;
      if (!fontDirectory)
        throw new Error(
          'Font global setup did not provide its runtime directory',
        );
      const errors: string[] = [];
      page.on('pageerror', (error) => {
        errors.push(error.message);
      });
      page.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text());
      });
      // Fonts fetched once by global setup are served locally, without system-font fallback.
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
          (url.pathname === '/__test-fonts.css' &&
            url.origin === 'http://127.0.0.1:4183') ||
          url.hostname === 'fonts.googleapis.com'
        ) {
          await route.fulfill({
            body: FONT_CSS,
            contentType: 'text/css',
          });
        } else if (
          url.origin === 'http://127.0.0.1:4183' &&
          /^\/__test-fonts\/montserrat-(?:cyrillic|latin)\.woff2$/u.test(
            url.pathname,
          )
        ) {
          await route.fulfill({
            contentType: 'font/woff2',
            path: join(
              fontDirectory,
              url.pathname.slice('/__test-fonts/'.length),
            ),
          });
        } else if (url.origin === 'http://127.0.0.1:4183') {
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
        errors,
        'No application errors or unexpected external requests',
      ).toEqual([]);
    },
    { auto: true },
  ],
});
