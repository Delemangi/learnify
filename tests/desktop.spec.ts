import { expect } from '@playwright/test';

import { assertLocalFontLoaded, assertPng } from './browser-helpers';
import { test } from './fixtures';

test('theme toggles root class and persists across reload', async ({
  page,
}) => {
  await page.goto('/');
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
  await assertLocalFontLoaded(page);
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
