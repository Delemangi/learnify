import {
  base,
  browser,
  perfectionist,
  prettier,
  react,
  typescript,
} from 'eslint-config-imperium';

const eslintConfig = [
  { ignores: ['dist', 'vite.config.ts'] },
  ...base,
  browser,
  react,
  typescript,
  prettier,
  perfectionist,
  {
    files: ['playwright.config.ts', 'tests/**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: './tests/tsconfig.json',
        projectService: false,
      },
    },
    rules: {
      // Browser-evaluated callbacks cannot capture module-scope regex constants.
      'e18e/prefer-static-regex': 'off',
    },
  },
  {
    files: ['playwright.config.ts'],
    rules: {
      // Playwright's declarative config is created by its official factory.
      'unicorn/no-top-level-side-effects': 'off',
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      // Preserve stable data-module aliases without banning other barrels.
      'no-barrel-files/prefer-source-imports': [
        'error',
        {
          fixStyle: 'preserve-alias',
          ignore: ['@/data/courses', '@/data/team'],
        },
      ],
      // Keep explicit globals and Date compatible with the app's browser targets.
      'unicorn/no-unnecessary-global-this': 'off',
      'unicorn/prefer-temporal': 'off',
    },
  },
  // These modules intentionally expose stable data-layer entry points.
  {
    files: ['src/data/courses.ts', 'src/data/team.ts'],
    rules: {
      'no-barrel-files/no-barrel-files': 'off',
    },
  },
  // Keep ref-forwarding behavior stable for existing shared primitives.
  {
    files: ['src/components/ui/{button,card}.tsx'],
    rules: {
      '@eslint-react/no-forward-ref': 'off',
    },
  },
  // These repeated values are CSS/font tokens; flag only less-common duplication.
  {
    files: ['src/data/banner-config.ts'],
    rules: {
      'sonarjs/no-duplicate-string': [
        'error',
        { ignoreStrings: 'application/json,sans-serif', threshold: 5 },
      ],
    },
  },
  // Retain a copy before sorting for compatibility with supported browsers.
  {
    files: ['src/components/courses/semester-group.tsx'],
    rules: {
      'e18e/prefer-array-to-sorted': 'off',
    },
  },
  // Vite plugin factories are intentionally called in the exported config.
  {
    files: ['vite.config.js'],
    rules: {
      'unicorn/no-top-level-side-effects': 'off',
    },
  },
];

export default eslintConfig;
