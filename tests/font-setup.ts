import { Buffer } from 'node:buffer';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import process from 'node:process';

// Google Fonts Montserrat v31; source and license links are documented in tests/README.md.
const FONTS = [
  {
    name: 'montserrat-latin.woff2',
    url: 'https://fonts.gstatic.com/s/montserrat/v31/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2',
  },
  {
    name: 'montserrat-cyrillic.woff2',
    url: 'https://fonts.gstatic.com/s/montserrat/v31/JTUSjIg1_i6t8kCHKm459W1hyzbi.woff2',
  },
];

const downloadFont = async (
  font: (typeof FONTS)[number],
  directory: string,
) => {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(font.url, {
        signal: AbortSignal.timeout(20_000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      if (
        bytes.length <= 48 ||
        bytes.toString('ascii', 0, 4) !== 'wOF2' ||
        bytes.readUInt32BE(8) !== bytes.length
      ) {
        throw new Error('Invalid or truncated WOFF2 response');
      }
      // eslint-disable-next-line security/detect-non-literal-fs-filename -- Fixed font filename inside this run's owned temporary directory.
      await writeFile(join(directory, font.name), bytes);
      return;
    } catch (error: unknown) {
      if (attempt === 3) {
        throw new Error(
          `Cannot fetch test font ${font.url} after 3 attempts (20s timeout each). Browser tests require internet access.`,
          { cause: error },
        );
      }
    }
  }
};

const setupFonts = async () => {
  const directory = await mkdtemp(join(tmpdir(), 'learnify-test-fonts-'));
  const cleanup = async () => {
    await rm(directory, { force: true, recursive: true });
    Reflect.deleteProperty(process.env, 'LEARNIFY_TEST_FONTS_DIR');
  };
  try {
    // Settle both downloads before cleanup, so a late write cannot recreate deleted assets.
    const results = await Promise.allSettled(
      FONTS.map((font) => downloadFont(font, directory)),
    );
    const failed = results.find((result) => result.status === 'rejected');
    if (failed?.status === 'rejected') throw failed.reason;
    Object.assign(process.env, { LEARNIFY_TEST_FONTS_DIR: directory });
    return cleanup;
  } catch (error: unknown) {
    await cleanup();
    throw error;
  }
};

export default setupFonts;
