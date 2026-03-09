import { Monitor, Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme-hook';

const cycle: Array<'dark' | 'light' | 'system'> = ['system', 'light', 'dark'];

const labels: Record<string, string> = {
  dark: 'Темна тема',
  light: 'Светла тема',
  system: 'Системска тема',
};

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  const next = () => {
    const idx = cycle.indexOf(theme);
    const nextTheme = cycle[(idx + 1) % cycle.length];
    if (nextTheme) {
      setTheme(nextTheme);
    }
  };

  return (
    <Button
      aria-label={labels[theme]}
      onClick={next}
      size="icon"
      title={labels[theme]}
      variant="ghost"
    >
      {theme === 'light' && <Sun className="h-5 w-5" />}
      {theme === 'dark' && <Moon className="h-5 w-5" />}
      {theme === 'system' && <Monitor className="h-5 w-5" />}
    </Button>
  );
};
