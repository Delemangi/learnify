import { expect } from '@playwright/test';

import {
  assertLocalFontLoaded,
  assertPng,
  blockStorage,
  confirmDraftReset,
} from './browser-helpers';
import { test } from './fixtures';

const DRAFT_KEY = 'learnify-banner-draft';

test('banner draft survives reload and reset requires confirmation', async ({
  page,
}) => {
  await page.goto('/banner');
  const headline = page.getByLabel('Наслов', { exact: true });
  const content = page.getByLabel('Главна содржина (Markdown)');
  const initialContent = await content.inputValue();
  const savedHeadline = `Saved draft ${'x'.repeat(250)}`;
  const savedContent = `## Restored content\n\n${'Long draft '.repeat(2_000)}`;
  await headline.fill(savedHeadline);
  await content.fill(savedContent);
  await page.getByRole('radio', { name: /Facebook Post/u }).check();
  await expect
    .poll(() => page.evaluate((key) => localStorage.getItem(key), DRAFT_KEY))
    .toContain('Saved draft');
  await page.reload();
  await expect(headline).toHaveValue(savedHeadline);
  await expect(content).toHaveValue(savedContent);
  await expect(
    page.getByRole('radio', { name: /Facebook Post/u }),
  ).toBeChecked();
  await expect(page.getByRole('status')).toContainText('зачуваниот нацрт');
  await page.getByRole('button', { exact: true, name: 'Ресетирај' }).click();
  const confirmation = page.getByRole('group', {
    name: 'Потврда за ресетирање',
  });
  await expect(confirmation).toBeVisible();
  await confirmation
    .getByRole('button', { exact: true, name: 'Откажи' })
    .click();
  await expect(headline).toHaveValue(savedHeadline);
  await confirmDraftReset(page);
  await expect(headline).toHaveValue('Learnify');
  await expect(content).toHaveValue(initialContent);
  await expect(
    page.getByRole('radio', { name: /Instagram Post/u }),
  ).toBeChecked();
  await expect
    .poll(() => page.evaluate((key) => localStorage.getItem(key), DRAFT_KEY))
    .toBeNull();
  await headline.fill('First edit after reset');
  await expect
    .poll(() => page.evaluate((key) => localStorage.getItem(key), DRAFT_KEY))
    .toContain('First edit after reset');
  await page.reload();
  await expect(headline).toHaveValue('First edit after reset');
  await confirmDraftReset(page);
  await page.reload();
  await expect(headline).toHaveValue('Learnify');
  await expect(
    page.getByText('Продолжувате со зачуваниот нацрт.'),
  ).toBeHidden();
  // Reload once more to recover an already-default draft, then reset that too.
  await page.reload();
  await expect(headline).toHaveValue('Learnify');
  await confirmDraftReset(page);
  await headline.fill('First edit after default reset');
  await expect
    .poll(() => page.evaluate((key) => localStorage.getItem(key), DRAFT_KEY))
    .toContain('First edit after default reset');
  await page.reload();
  await expect(headline).toHaveValue('First edit after default reset');
});

test('a recovered draft still reports a later storage write failure', async ({
  page,
}) => {
  await page.addInitScript((key) => {
    localStorage.setItem(
      key,
      JSON.stringify({
        state: { headline: 'Recovered before quota failure' },
        version: 1,
      }),
    );
    Object.defineProperty(Storage.prototype, 'setItem', {
      configurable: true,
      value: () => {
        throw new DOMException(
          'Test-only quota exhaustion',
          'QuotaExceededError',
        );
      },
    });
  }, DRAFT_KEY);
  await page.goto('/banner');
  await expect(page.getByLabel('Наслов', { exact: true })).toHaveValue(
    'Recovered before quota failure',
  );
  await expect(
    page.getByRole('status').filter({ hasText: 'не може да се зачува' }),
  ).toBeVisible();
  await page.getByLabel('Наслов', { exact: true }).fill('Still editable');
  await expect(
    page.getByRole('heading', { name: 'Still editable' }),
  ).toBeVisible();
});

test('malformed, unsupported and untrusted draft fields fall back safely', async ({
  page,
}) => {
  await page.goto('/banner');
  const defaults = await page.evaluate((key) => {
    const parsed = JSON.parse(localStorage.getItem(key) ?? '{}') as {
      state: Record<string, unknown>;
    };
    return parsed.state;
  }, DRAFT_KEY);
  const malformed = {
    state: {
      ...defaults,
      accentText: null,
      bannerTheme: 'invalid',
      bgStyle: 'invalid',
      content: ['not text'],
      contentPadding: -100,
      fontSize: 999_999,
      headline: { hostile: true },
      selectedFont: { category: 'script', family: 'Montserrat', weights: [-1] },
      selectedHue: 999_999,
      selectedSize: { height: -1, label: 'Instagram Post', width: 999_999 },
      showLogo: 'false',
      textAlign: 'invalid',
      textShadow: 'true',
      verticalAlign: 'invalid',
      watermarkOpacity: -100,
    },
    version: 1,
  };
  const recoveredText = {
    content: '## Recovered safe content',
    headline: 'Recovered safe title',
  };
  const draftCases = [
    { expected: defaults, headline: 'Learnify', raw: '{broken JSON' },
    {
      expected: defaults,
      headline: 'Learnify',
      raw: JSON.stringify({
        state: { headline: 'Wrong version' },
        version: 999,
      }),
    },
    {
      expected: defaults,
      headline: 'Learnify',
      raw: JSON.stringify(malformed),
    },
    ...[
      { bgStyle: { toString: null }, verticalAlign: ['bottom'] },
      { bgStyle: ['flat'], verticalAlign: { toString: null } },
    ].map((invalidEnums) => ({
      expected: { ...defaults, ...recoveredText },
      headline: recoveredText.headline,
      raw: JSON.stringify({
        state: { ...defaults, ...recoveredText, ...invalidEnums },
        version: 1,
      }),
    })),
  ];
  for (const { expected, headline, raw } of draftCases) {
    await page.evaluate(
      ({ key, value }) => {
        localStorage.setItem(key, value);
      },
      {
        key: DRAFT_KEY,
        value: raw,
      },
    );
    await page.reload();
    await expect(page.getByLabel('Наслов', { exact: true })).toHaveValue(
      headline,
    );
    if (headline === recoveredText.headline) {
      await expect(page.getByLabel('Главна содржина (Markdown)')).toHaveValue(
        recoveredText.content,
      );
      await expect(
        page.getByRole('status').filter({ hasText: 'зачуваниот нацрт' }),
      ).toBeVisible();
    }
    const restored = await page.evaluate((key) => {
      const parsed = JSON.parse(localStorage.getItem(key) ?? '{}') as {
        state: Record<string, unknown>;
      };
      return parsed.state;
    }, DRAFT_KEY);
    expect(restored).toEqual(expected);
  }
});

test('banner editing remains usable when draft storage writes are denied', async ({
  page,
}) => {
  await blockStorage(page, 'write');
  await page.goto('/banner');
  await expect(page.getByRole('status')).toContainText('не може да се зачува');
  await page.getByLabel('Наслов', { exact: true }).fill('Unsaved but usable');
  await expect(
    page.getByRole('heading', { name: 'Unsaved but usable' }),
  ).toBeVisible();
  await page.reload();
  await expect(page.getByLabel('Наслов', { exact: true })).toHaveValue(
    'Learnify',
  );
});

test('export pending guard blocks duplicates, reports failure and permits retry', async ({
  page,
}, testInfo) => {
  await page.goto('/banner');
  await assertLocalFontLoaded(page);
  let downloads = 0;
  page.on('download', () => {
    downloads += 1;
  });
  await page.evaluate(() => {
    const { promise: gate, resolve } = Promise.withResolvers<undefined>();
    const release = () => {
      resolve(undefined);
    };
    const probe = { mode: 'pending', reads: 0, release };
    Object.assign(globalThis, { exportProbe: probe });
    Object.defineProperty(document.fonts, 'ready', {
      configurable: true,
      get() {
        probe.reads += 1;
        if (probe.mode === 'pending') return gate;
        return probe.mode === 'reject'
          ? Promise.reject(new Error('Test-only font readiness failure'))
          : Promise.resolve(document.fonts);
      },
    });
  });
  await page.getByRole('button', { name: 'Преземи PNG' }).click();
  const pending = page.getByRole('button', {
    exact: true,
    name: 'Се подготвува…',
  });
  await expect(pending).toBeDisabled();
  await expect(pending).toHaveAttribute('aria-busy', 'true');
  await page.keyboard.press('Control+s');
  await page.keyboard.press('Control+s');
  // Deliberately dispatch on the disabled button: the handler's guard must hold too.
  await pending.dispatchEvent('click');
  const reads = () =>
    page.evaluate(
      () =>
        (globalThis as typeof globalThis & { exportProbe: { reads: number } })
          .exportProbe.reads,
    );
  expect(await reads()).toBe(1);
  expect(downloads).toBe(0);
  const completed = page.waitForEvent('download');
  await page.evaluate(() => {
    (
      globalThis as typeof globalThis & { exportProbe: { release: () => void } }
    ).exportProbe.release();
  });
  await assertPng(await completed, testInfo, {
    height: 1_080,
    name: 'gated',
    width: 1_080,
  });
  await expect(
    page.getByRole('status').filter({ hasText: /png/iu }),
  ).toBeVisible();
  expect(downloads).toBe(1);
  await page.evaluate(() => {
    (
      globalThis as typeof globalThis & { exportProbe: { mode: string } }
    ).exportProbe.mode = 'reject';
  });
  await page.getByRole('button', { name: 'Преземи PNG' }).click();
  await expect(page.getByRole('alert')).toContainText('Обидете се повторно');
  await expect(page.getByRole('button', { name: 'Преземи PNG' })).toBeEnabled();
  expect(downloads).toBe(1);
  await page.evaluate(() => {
    (
      globalThis as typeof globalThis & { exportProbe: { mode: string } }
    ).exportProbe.mode = 'normal';
  });
  const retry = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Преземи PNG' }).click();
  await assertPng(await retry, testInfo, {
    height: 1_080,
    name: 'retry',
    width: 1_080,
  });
  await expect(page.getByRole('alert')).toBeHidden();
  expect(downloads).toBe(2);
});

for (const [name, scheme] of [
  ['encoded colon', 'javascript&#58;'],
  ['mixed case with embedded tab and whitespace', '  JaVa&#x09;ScRiPt:'],
] as const) {
  test(`hostile ${name} URLs are removed without execution`, async ({
    page,
  }) => {
    await page.goto('/banner');
    const payload = `${scheme}localStorage.setItem('encoded-executed','yes')`;
    await page
      .getByLabel('Главна содржина (Markdown)')
      .fill(
        `## Safe heading\n\n<a href="${payload}">Unsafe destination</a>\n\n[Safe destination](https://example.com/)`,
      );
    const content = page.locator('.banner-content');
    await expect(
      content.getByRole('heading', { name: 'Safe heading' }),
    ).toBeVisible();
    await expect(
      content.locator('a').filter({ hasText: 'Unsafe destination' }),
    ).not.toHaveAttribute('href');
    await expect(
      content.getByRole('link', { name: 'Safe destination' }),
    ).toHaveAttribute('href', 'https://example.com/');
    await content.getByText('Unsafe destination', { exact: true }).click();
    expect(
      await page.evaluate(() => localStorage.getItem('encoded-executed')),
    ).toBeNull();
  });
}
