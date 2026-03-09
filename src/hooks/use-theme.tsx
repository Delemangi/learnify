import { type ReactNode, useEffect, useMemo, useState } from 'react';

import { type Theme, ThemeProviderContext } from './theme-context';

const STORAGE_KEY = 'learnify-theme';

const getSystemTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;

  root.classList.remove('light', 'dark');
  root.classList.add(theme);
};

export const ThemeProvider = ({
  children,
}: {
  readonly children: ReactNode;
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as null | Theme;
    return stored ?? getSystemTheme();
  });

  const handleSetTheme = (next: Theme) => {
    localStorage.setItem(STORAGE_KEY, next);
    setTheme(next);
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const value = useMemo(() => ({ setTheme: handleSetTheme, theme }), [theme]);

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};
