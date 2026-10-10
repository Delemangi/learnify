import { defineConfig } from '@playwright/test';
import process from 'node:process';

const { CI: ci } = process.env;

export default defineConfig({
  forbidOnly: Boolean(ci),
  fullyParallel: false,
  globalTimeout: 240_000,
  projects: [
    {
      name: 'desktop',
      testMatch: '**/desktop.spec.ts',
      use: { viewport: { height: 1_000, width: 1_440 } },
    },
    {
      name: 'mobile',
      testMatch: '**/mobile.spec.ts',
      use: {
        hasTouch: true,
        isMobile: true,
        viewport: { height: 844, width: 390 },
      },
    },
  ],
  reporter: [['list'], ['html', { open: 'never' }]],
  retries: ci ? 1 : 0,
  testDir: './tests',
  timeout: 30_000,
  use: {
    baseURL: 'http://127.0.0.1:4183',
    browserName: 'chromium',
    colorScheme: 'light',
    screenshot: 'only-on-failure',
    serviceWorkers: 'block',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4183 --strictPort',
    reuseExistingServer: false,
    timeout: 30_000,
    url: 'http://127.0.0.1:4183/banner',
  },
  workers: 1,
});
