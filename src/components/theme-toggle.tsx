import { Moon, Sun } from 'lucide-react';

import type { Theme } from '@/hooks/theme-context';

import { useTheme } from '@/hooks/use-theme';

const actionLabels: Record<Theme, string> = {
  dark: 'Префрли на светла тема',
  light: 'Префрли на темна тема',
};

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  const toggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      aria-label={actionLabels[theme]}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/80 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-accent/70"
      onClick={toggle}
      title={actionLabels[theme]}
      type="button"
    >
      {theme === 'light' && <Sun className="h-5 w-5" />}
      {theme === 'dark' && <Moon className="h-5 w-5" />}
    </button>
  );
};
