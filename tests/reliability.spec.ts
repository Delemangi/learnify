import { expect } from '@playwright/test';

import { blockStorage } from './browser-helpers';
import { test } from './fixtures';

for (const mode of ['getter', 'read'] as const) {
  test(`denied storage ${mode} does not prevent startup`, async ({ page }) => {
    await blockStorage(page, mode);
    await page.goto('/');
    await expect(
      page.getByRole('banner', { name: 'Главна навигација' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Префрли на темна тема' }),
    ).toBeVisible();
    await expect(page.locator('html')).toHaveClass(/light/u);
  });
}

test('denied storage writes still permit in-memory theme changes', async ({
  page,
}) => {
  await blockStorage(page, 'write');
  await page.goto('/');
  await page.getByRole('button', { name: 'Префрли на темна тема' }).click();
  await expect(page.locator('html')).toHaveClass(/dark/u);
  await expect(page.locator('html')).not.toHaveClass(/light/u);
  await page.getByRole('button', { name: 'Префрли на светла тема' }).click();
  await expect(page.locator('html')).toHaveClass(/light/u);
  await expect(page.locator('html')).not.toHaveClass(/dark/u);
});

test('unknown SPA paths show a 404 with working home recovery', async ({
  page,
}) => {
  await page.goto('/does-not-exist');
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Оваа страница не ја најдовме.',
    }),
  ).toBeVisible();
  await expect(page).toHaveTitle('Страницата не е пронајдена | Learnify.mk');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex, follow',
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await page
    .getByRole('main')
    .getByRole('link', { name: /почетн/iu })
    .click();
  await expect(page).toHaveURL('/');
  await expect(page).toHaveTitle('Learnify.mk | Приватни часови за ФИНКИ');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'index, follow',
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://learnify.mk/',
  );
  await expect(
    page.getByRole('banner', { name: 'Главна навигација' }),
  ).toBeVisible();
  for (const route of [
    {
      canonical: 'https://learnify.mk/about',
      path: '/about/',
      robots: 'index, follow',
      title: 'За нас | Learnify.mk',
    },
    {
      canonical: 'https://learnify.mk/about',
      path: '/ABOUT',
      robots: 'index, follow',
      title: 'За нас | Learnify.mk',
    },
    {
      canonical: 'https://learnify.mk/banner',
      path: '/banner/',
      robots: 'noindex, follow',
      title: 'Генератор на банери | Learnify.mk',
    },
  ]) {
    await page.goto(route.path);
    await expect(page).toHaveTitle(route.title);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      route.canonical,
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      'content',
      route.canonical,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      route.robots,
    );
    await expect(
      page.getByRole('heading', { name: 'Оваа страница не ја најдовме.' }),
    ).toBeHidden();
  }
});
