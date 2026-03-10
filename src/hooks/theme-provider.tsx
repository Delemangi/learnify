import { type ReactNode, useEffect, useMemo, useState } from 'react';

import { type Theme, ThemeProviderContext } from './theme-context';

const STORAGE_KEY = 'learnify-theme';

const getSystemTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const isValidTheme = (value: null | string): value is Theme =>
  value === 'dark' || value === 'light';

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;

  root.classList.remove('light', 'dark');
  root.classList.add(theme);
};

type ThemeProviderProps = {
  readonly children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isValidTheme(stored) ? stored : getSystemTheme();
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      setTheme: (next: Theme) => {
        localStorage.setItem(STORAGE_KEY, next);
        setTheme(next);
      },
      theme,
    }),
    [theme],
  );

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};
