import { createContext } from 'react';

export type Theme = 'dark' | 'light' | 'system';

export type ThemeProviderState = {
  setTheme: (theme: Theme) => void;
  theme: Theme;
};

export const ThemeProviderContext = createContext<ThemeProviderState>({
  setTheme: () => {},
  theme: 'system',
});
ThemeProviderContext.displayName = 'ThemeProviderContext';
