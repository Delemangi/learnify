import { expect } from '@playwright/test';

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
