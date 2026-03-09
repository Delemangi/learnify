import {
  base,
  browser,
  perfectionist,
  prettier,
  react,
  typescript,
} from 'eslint-config-imperium';

export default [
  { ignores: ['dist', 'vite.config.ts'] },
  base,
  browser,
  react,
  typescript,
  prettier,
  perfectionist,
];
