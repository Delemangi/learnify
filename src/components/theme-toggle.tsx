import { Moon, Sun } from 'lucide-react';

import type { Theme } from '@/hooks/theme-context';

import { useTheme } from '@/hooks/use-theme';

const labels: Record<Theme, string> = {
  dark: 'Темна тема',
  light: 'Светла тема',
};

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  const toggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      aria-label={labels[theme]}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/80 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-accent/70"
      onClick={toggle}
      title={labels[theme]}
      type="button"
    >
      {theme === 'light' && <Sun className="h-5 w-5" />}
      {theme === 'dark' && <Moon className="h-5 w-5" />}
    </button>
  );
};
