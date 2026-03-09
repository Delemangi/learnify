import { createContext } from 'react';

export type Theme = 'dark' | 'light';

export type ThemeProviderState = {
  setTheme: (theme: Theme) => void;
  theme: Theme;
};

export const ThemeProviderContext = createContext<ThemeProviderState>({
  setTheme: () => {},
  theme: 'light',
});
ThemeProviderContext.displayName = 'ThemeProviderContext';
