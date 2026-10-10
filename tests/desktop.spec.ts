import { expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

import { test } from './fixtures';

test('theme toggles root class and persists across reload', async ({
  page,
}) => {
  await page.goto('/');
  const root = page.locator('html');
  await expect(root).toHaveClass(/light/u);
  await page.getByRole('button', { name: 'Светла тема' }).click();
  await expect(root).toHaveClass(/dark/u);
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('learnify-theme')))
    .toBe('dark');
  await page.reload();
  await expect(root).toHaveClass(/dark/u);
  await page.getByRole('button', { name: 'Темна тема' }).click();
  await expect(root).toHaveClass(/light/u);
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('learnify-theme')))
    .toBe('light');
});

test('course dialog opens and closes with Escape and an outside click', async ({
  page,
}) => {
  await page.goto('/');
  const course = page.locator('button[aria-haspopup="dialog"]').first();
  await course.click();
  await expect(course).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(course).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByRole('dialog')).toBeHidden();
  await course.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page
    .getByRole('banner', { name: 'Главна навигација' })
    .click({ position: { x: 10, y: 10 } });
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(course).toHaveAttribute('aria-expanded', 'false');
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
  for (const trigger of ['button', 'shortcut']) {
    const downloadPromise = page.waitForEvent('download');
    if (trigger === 'button') {
      await page.getByRole('button', { name: 'Преземи PNG' }).click();
    } else {
      await page.keyboard.press('Control+s');
    }
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/^learnify-banner-.+\.png$/u);
    expect(await download.failure()).toBeNull();
    const path = testInfo.outputPath(`${trigger}.png`);
    await download.saveAs(path);
    // eslint-disable-next-line security/detect-non-literal-fs-filename -- Playwright owns this test output path.
    const png = await readFile(path);
    expect(png.length).toBeGreaterThan(8);
    expect([...png.subarray(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
  }
});
