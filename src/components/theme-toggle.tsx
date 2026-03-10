import { Moon, Sun } from 'lucide-react';

import type { Theme } from '@/hooks/theme-context';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme-hook';

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
    <Button
      aria-label={labels[theme]}
      onClick={toggle}
      size="icon"
      title={labels[theme]}
      variant="ghost"
    >
      {theme === 'light' && <Sun className="h-5 w-5" />}
      {theme === 'dark' && <Moon className="h-5 w-5" />}
    </Button>
  );
};
