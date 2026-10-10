import {
  type Download,
  expect,
  type Page,
  type TestInfo,
} from '@playwright/test';
import { readFile } from 'node:fs/promises';

export const blockStorage = async (
  page: Page,
  mode: 'getter' | 'read' | 'write',
) => {
  await page.addInitScript((failureMode) => {
    // eslint-disable-next-line unicorn/consistent-function-scoping -- Serialized into a separate browser runtime.
    const deny = () => {
      throw new DOMException('Test-only storage denial', 'SecurityError');
    };
    if (failureMode === 'getter') {
      Object.defineProperty(globalThis, 'localStorage', {
        configurable: true,
        get: deny,
      });
    } else if (failureMode === 'read') {
      Object.defineProperty(Storage.prototype, 'getItem', {
        configurable: true,
        value: deny,
      });
    } else {
      Object.defineProperties(Storage.prototype, {
        removeItem: { configurable: true, value: deny },
        setItem: { configurable: true, value: deny },
      });
    }
  }, mode);
};

export const assertPng = async (
  download: Download,
  testInfo: TestInfo,
  { height, name, width }: { height: number; name: string; width: number },
) => {
  expect(download.suggestedFilename()).toMatch(/^learnify-banner-.+\.png$/u);
  expect(await download.failure()).toBeNull();
  const output = testInfo.outputPath(`${name}.png`);
  await download.saveAs(output);
  // eslint-disable-next-line security/detect-non-literal-fs-filename -- Playwright owns this output path.
  const png = await readFile(output);
  expect(png.length).toBeGreaterThan(33);
  expect([...png.subarray(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
  expect(png.toString('ascii', 12, 16)).toBe('IHDR');
  expect(png.readUInt32BE(16)).toBe(width);
  expect(png.readUInt32BE(20)).toBe(height);
};

export const assertLocalFontLoaded = async (page: Page) => {
  const fonts = await page.evaluate(async () => {
    const faces = await document.fonts.load(
      '700 20px Montserrat',
      'Learnify Прва',
    );
    return faces.map((font) => ({ family: font.family, status: font.status }));
  });
  expect(fonts.length).toBeGreaterThanOrEqual(2);
  expect(
    fonts.every(
      (font) => font.family === 'Montserrat' && font.status === 'loaded',
    ),
  ).toBe(true);
};

export const confirmDraftReset = async (page: Page) => {
  await page.getByRole('button', { exact: true, name: 'Ресетирај' }).click();
  await page
    .getByRole('group', { name: 'Потврда за ресетирање' })
    .getByRole('button', { exact: true, name: 'Да, ресетирај' })
    .click();
};
