import { type ReactNode, useEffect, useMemo, useState } from 'react';

import { type Theme, ThemeProviderContext } from './theme-context';

const STORAGE_KEY = 'learnify-theme';

const getSystemTheme = (): 'dark' | 'light' =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const applyTheme = (theme: Theme) => {
  const resolved = theme === 'system' ? getSystemTheme() : theme;
  const root = document.documentElement;

  root.classList.remove('light', 'dark');
  root.classList.add(resolved);
};

export const ThemeProvider = ({
  children,
}: {
  readonly children: ReactNode;
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as null | Theme;
    return stored ?? 'system';
  });

  const handleSetTheme = (next: Theme) => {
    localStorage.setItem(STORAGE_KEY, next);
    setTheme(next);
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (theme !== 'system') {
      // eslint-disable-next-line unicorn/no-useless-undefined
      return undefined;
    }

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      applyTheme('system');
    };

    mql.addEventListener('change', handler);
    return () => {
      mql.removeEventListener('change', handler);
    };
  }, [theme]);

  const value = useMemo(() => ({ setTheme: handleSetTheme, theme }), [theme]);

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};
