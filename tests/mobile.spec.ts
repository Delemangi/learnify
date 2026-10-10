import { expect } from '@playwright/test';

import { assertLocalFontLoaded, assertPng } from './browser-helpers';
import { test } from './fixtures';

test('mobile menu exposes state and closes after contact navigation', async ({
  page,
}) => {
  await page.goto('/');
  const header = page.getByRole('banner', { name: 'Главна навигација' });
  const open = header.getByRole('button', { name: 'Отвори мени' });
  await expect(open).toHaveAttribute('aria-expanded', 'false');
  await open.click();
  const close = header.getByRole('button', { name: 'Затвори мени' });
  await expect(close).toHaveAttribute('aria-expanded', 'true');
  await expect(header.getByRole('link', { name: 'Закажи час' })).toBeVisible();
  await close.click();
  await expect(open).toHaveAttribute('aria-expanded', 'false');
  await open.click();
  await header.getByRole('link', { name: 'Закажи час' }).click();
  await expect(page).toHaveURL(/\/#contact$/u);
  await expect(open).toHaveAttribute('aria-expanded', 'false');
  await expect(header.getByRole('link', { name: 'Закажи час' })).toBeHidden();
  await expect(page.locator('#contact')).toBeInViewport();
});

test('mobile preview exports the selected PNG dimensions', async ({
  page,
}, testInfo) => {
  await page.goto('/banner');
  await page.getByLabel('Наслов', { exact: true }).fill('Mobile banner');
  await page.getByRole('radio', { name: /Instagram Story/u }).check();
  await page.getByRole('button', { exact: true, name: 'Преглед' }).click();
  await expect(
    page.getByRole('heading', { name: 'Mobile banner' }),
  ).toBeVisible();
  await assertLocalFontLoaded(page);
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Преземи PNG' }).click();
  await assertPng(await download, testInfo, {
    height: 1_920,
    name: 'mobile-story',
    width: 1_080,
  });
});
