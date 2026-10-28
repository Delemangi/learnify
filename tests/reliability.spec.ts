import { expect } from '@playwright/test';

import { blockStorage } from './browser-helpers';
import { test } from './fixtures';

test('reduced motion overrides Tailwind utilities and pseudo-elements', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Затвори' }).click();
  await page.evaluate(() => {
    const probe = document.createElement('div');
    probe.id = 'reduced-motion-probe';
    probe.className = 'transition-all duration-300 animate-spin';
    const style = document.createElement('style');
    // Keep probe styles layered so the app's global override wins.
    style.textContent = `@layer utilities {
      #reduced-motion-probe::before,
      #reduced-motion-probe::after {
        content: '';
        transition: all 300ms;
        animation: spin 1s linear infinite;
      }
    }`;
    probe.append(style);
    document.body.append(probe);
  });

  const readMotion = async () =>
    page.locator('#reduced-motion-probe').evaluate((probe) =>
      [null, '::before', '::after'].map((pseudo) => {
        const style = getComputedStyle(probe, pseudo);
        return {
          animationDuration: Number.parseFloat(style.animationDuration),
          animationIterationCount: style.animationIterationCount,
          animationName: style.animationName,
          transitionDuration: Number.parseFloat(style.transitionDuration),
          transitionProperty: style.transitionProperty,
        };
      }),
    );

  await expect.poll(readMotion).toEqual(
    Array.from({ length: 3 }, () => ({
      animationDuration: 1,
      animationIterationCount: 'infinite',
      animationName: 'spin',
      transitionDuration: 0.3,
      transitionProperty: 'all',
    })),
  );

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(readMotion).toEqual(
    Array.from({ length: 3 }, () => ({
      animationDuration: 0.00001,
      animationIterationCount: '1',
      animationName: 'spin',
      transitionDuration: 0.00001,
      transitionProperty: 'all',
    })),
  );
});

for (const mode of ['getter', 'read'] as const) {
  test(`denied storage ${mode} does not prevent startup`, async ({ page }) => {
    await blockStorage(page, mode);
    await page.goto('/');
    await page.getByRole('button', { name: 'Затвори' }).click();
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
  await page.getByRole('button', { name: 'Затвори' }).click();
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
  await page.getByRole('button', { name: 'Затвори' }).click();
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

test('404 contact recovery performs the native hash jump after landing loads', async ({
  page,
}) => {
  await page.goto('/invalid-contact-route');
  await expect(
    page.getByRole('heading', { name: 'Оваа страница не ја најдовме.' }),
  ).toBeVisible();
  await page
    .getByRole('main')
    .getByRole('link', { exact: true, name: 'Контакт' })
    .click();
  await expect(page).toHaveURL('/#contact');
  await expect(page.locator('#contact')).toBeInViewport();
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(0);
});
