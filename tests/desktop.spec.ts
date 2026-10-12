import { expect } from '@playwright/test';

import {
  assertDialogInViewport,
  assertGoogleFontsLoaded,
  assertPng,
} from './browser-helpers';
import { test } from './fixtures';

test('promotion dialog appears on load, locks scrolling, and closes accessibly', async ({
  page,
}) => {
  await page.goto('/');
  const dialog = page.getByRole('dialog', {
    name: 'Промоции',
  });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText(
    'Искористи 50% попуст на курсот по Структурно програмирање!',
  );
  await expect(dialog).toContainText(
    'Запиши се на Веб програмирање + Бази на податоци и добиј гратис Full-Stack курс!',
  );
  await expect(dialog.locator('p span.font-bold')).toHaveText([
    '50% попуст',
    'гратис Full-Stack курс',
  ]);
  await expect(dialog.getByRole('button', { name: 'Затвори' })).toBeFocused();
  await expect(page.locator('html')).toHaveCSS('overflow', 'hidden');
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
  await dialog.getByRole('button', { name: 'Затвори' }).click();
  await expect(dialog).toBeHidden();
  await expect(page.locator('html')).not.toHaveCSS('overflow', 'hidden');
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  await page.reload();
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('promotion dialog content and close button remain reachable in a short viewport', async ({
  page,
}) => {
  await page.setViewportSize({ height: 401, width: 801 });
  await page.goto('/');
  const dialog = page.getByRole('dialog', {
    name: 'Промоции',
  });
  await expect(dialog).toBeVisible();
  const secondOffer = dialog.getByText(
    'Запиши се на Веб програмирање + Бази на податоци и добиј гратис Full-Stack курс!',
    { exact: true },
  );
  await secondOffer.scrollIntoViewIfNeeded();
  await expect(secondOffer).toBeInViewport();
  const close = dialog.getByRole('button', { name: 'Затвори' });
  await close.scrollIntoViewIfNeeded();
  await expect(close).toBeInViewport();
  await close.click();
  await expect(dialog).toBeHidden();
  await expect(page.locator('html')).not.toHaveCSS('overflow', 'hidden');
});

test('theme toggles root class and persists across reload', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Затвори' }).click();
  const root = page.locator('html');
  await expect(root).toHaveClass(/light/u);
  await page.getByRole('button', { name: 'Префрли на темна тема' }).click();
  await expect(root).toHaveClass(/dark/u);
  await expect(root).not.toHaveClass(/light/u);
  await expect(
    page.getByRole('button', { name: 'Префрли на светла тема' }),
  ).toBeVisible();
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('learnify-theme')))
    .toBe('dark');
  await page.reload();
  await page.getByRole('button', { name: 'Затвори' }).click();
  await expect(root).toHaveClass(/dark/u);
  await page.getByRole('button', { name: 'Префрли на светла тема' }).click();
  await expect(root).toHaveClass(/light/u);
  await expect(root).not.toHaveClass(/dark/u);
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('learnify-theme')))
    .toBe('light');
});

test('course dialog opens and closes with Escape and an outside click', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Затвори' }).click();
  const course = page.locator('button[aria-haspopup="dialog"]').first();
  await course.focus();
  await course.press('Enter');
  await expect(course).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('dialog')).toBeVisible();
  const dialog = page.getByRole('dialog');
  await expect
    .poll(() =>
      dialog.evaluate((element) => element.contains(document.activeElement)),
    )
    .toBe(true);
  for (const key of ['Tab', 'Tab', 'Shift+Tab', 'Shift+Tab']) {
    await page.keyboard.press(key);
    await expect
      .poll(() =>
        dialog.evaluate((element) => element.contains(document.activeElement)),
      )
      .toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(course).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(course).toBeFocused();
  await course.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  // A native modal makes the page behind it inert; click its backdrop, not an inert locator.
  await page.mouse.click(10, 10);
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(course).toHaveAttribute('aria-expanded', 'false');
  await expect(course).toBeFocused();
});

test('course modal locks backdrop wheel scrolling and restores previous overflow on close', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Затвори' }).click();
  await expect
    .poll(() => page.evaluate(() => document.documentElement.style.overflow))
    .toBe('');
  // Non-empty styles ensure cleanup restores previous values rather than just clearing them.
  const previousOverflow = await page.evaluate(() => {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'visible';
    return {
      body: document.body.style.overflow,
      root: document.documentElement.style.overflow,
    };
  });
  const course = page.locator('button[aria-haspopup="dialog"]').first();
  await course.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await assertDialogInViewport(dialog);
  const initialScroll = await page.evaluate(() => scrollY);
  await page.mouse.move(10, 10);
  await page.mouse.wheel(0, 2_000);
  // Wheel dispatch returns before scrolling finishes. Sample subsequent rendering frames
  // rather than letting an immediate equality assertion falsely pass before a scroll.
  const scrollSamples = await page.evaluate(async () => {
    const samples: number[] = [];
    for (let frame = 0; frame < 12; frame += 1) {
      const { promise, resolve } = Promise.withResolvers<number>();
      requestAnimationFrame(() => {
        resolve(scrollY);
      });
      samples.push(await promise);
    }
    return samples;
  });
  expect(scrollSamples.every((sample) => sample === initialScroll)).toBe(true);
  await assertDialogInViewport(dialog);
  await expect(
    dialog.getByRole('button', { exact: true, name: 'Затвори' }),
  ).toBeInViewport();
  await expect
    .poll(() =>
      dialog.evaluate((element) => element.contains(document.activeElement)),
    )
    .toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(course).toBeFocused();
  await expect
    .poll(() =>
      page.evaluate(() => ({
        body: document.body.style.overflow,
        root: document.documentElement.style.overflow,
      })),
    )
    .toEqual(previousOverflow);
  const afterClose = await page.evaluate(() => scrollY);
  await page.mouse.move(10, 10);
  await page.mouse.wheel(0, 2_000);
  await expect
    .poll(() => page.evaluate(() => scrollY))
    .toBeGreaterThan(afterClose);
});

test('course modal stays in the viewport even when its anchor is scrolled off screen', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Затвори' }).click();
  await page.locator('button[aria-haspopup="dialog"]').first().click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await assertDialogInViewport(dialog);
  // CSS overflow locks wheel scrolling, not imperative scrollTo; exercise positioning separately.
  await page.evaluate(async () => {
    scrollBy({ behavior: 'instant', top: 2_000 });
    for (let frame = 0; frame < 2; frame += 1) {
      const { promise, resolve } = Promise.withResolvers<undefined>();
      requestAnimationFrame(() => {
        resolve(undefined);
      });
      await promise;
    }
  });
  await expect
    .poll(() =>
      page
        .locator('button[aria-haspopup="dialog"]')
        .first()
        .evaluate((element) => element.getBoundingClientRect().bottom),
    )
    .toBeLessThan(0);
  await assertDialogInViewport(dialog);
  await expect(
    dialog.getByRole('button', { exact: true, name: 'Затвори' }),
  ).toBeInViewport();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('Markdown edits retain headings, lists, rules and safe links', async ({
  page,
}) => {
  await page.goto('/banner');
  await page
    .getByLabel('Главна содржина (Markdown)')
    .fill(
      '## Preview heading\n\n- First item\n- Second item\n\n---\n\n[Safe link](https://example.com/)',
    );
  const content = page.locator('.banner-content');
  await expect(
    content.getByRole('heading', { level: 2, name: 'Preview heading' }),
  ).toBeVisible();
  await expect(content.getByRole('listitem')).toHaveText([
    'First item',
    'Second item',
  ]);
  await expect(content.getByRole('separator')).toHaveCount(1);
  await expect(
    content.getByRole('link', { name: 'Safe link' }),
  ).toHaveAttribute('href', 'https://example.com/');
});

test('hostile Markdown strips scripts, events, javascript URLs and SVG', async ({
  page,
}) => {
  await page.goto('/banner');
  const attack = "localStorage.setItem('markdown-executed','yes')";
  await page
    .getByLabel('Главна содржина (Markdown)')
    .fill(
      [
        '## Still safe',
        `<script>${attack}</script>`,
        `<img src="data:image/png;base64,invalid" onerror="${attack}" onload="${attack}">`,
        `<a href="javascript:${attack}">Hostile link</a>`,
        `<svg onload="${attack}"><a href="javascript:${attack}">SVG attack</a></svg>`,
        `<p onclick="${attack}">Event attack</p>`,
      ].join('\n\n'),
    );
  const content = page.locator('.banner-content');
  await expect(
    content.getByRole('heading', { name: 'Still safe' }),
  ).toBeVisible();
  await expect(
    content.locator('script, svg, iframe, object, embed'),
  ).toHaveCount(0);
  const unsafeAttributes = await content.evaluate((element) => {
    const unsafe: string[] = [];
    for (const node of element.querySelectorAll('*')) {
      for (const attribute of node.attributes) {
        if (
          /^on/iu.test(attribute.name) ||
          (/^(?:href|src|xlink:href)$/iu.test(attribute.name) &&
            /^\s*javascript:/iu.test(attribute.value))
        ) {
          unsafe.push(attribute.name);
        }
      }
    }
    return unsafe;
  });
  expect(unsafeAttributes).toEqual([]);
  await content.getByText('Hostile link', { exact: true }).click();
  await content.getByText('Event attack', { exact: true }).click();
  await content.locator('img').dispatchEvent('error');
  await content.locator('img').dispatchEvent('load');
  expect(
    await page.evaluate(() => localStorage.getItem('markdown-executed')),
  ).toBeNull();
});

test('PNG downloads work from the button and Ctrl+S', async ({
  page,
}, testInfo) => {
  await page.goto('/banner');
  await assertGoogleFontsLoaded(page);
  const presets = [
    { height: 1_080, label: 'Instagram Post', width: 1_080 },
    { height: 1_920, label: 'Instagram Story', width: 1_080 },
    { height: 630, label: 'Facebook Post', width: 1_200 },
    { height: 627, label: 'LinkedIn Post', width: 1_200 },
  ];
  for (const preset of presets) {
    await page.getByRole('radio', { name: preset.label }).check();
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Преземи PNG' }).click();
    const download = await downloadPromise;
    await assertPng(download, testInfo, {
      height: preset.height,
      name: preset.label,
      width: preset.width,
    });
  }
  const shortcut = page.waitForEvent('download');
  await page.keyboard.press('Control+s');
  await assertPng(await shortcut, testInfo, {
    height: 627,
    name: 'shortcut',
    width: 1_200,
  });
});
