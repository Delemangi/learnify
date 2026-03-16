import { Moon, Sun } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BANNER_THEMES, type BannerTheme } from '@/data/banner-config';

type ThemeControlsProps = {
  readonly bannerTheme: BannerTheme;
  readonly setBannerTheme: (theme: BannerTheme) => void;
};

export const ThemeControls = ({
  bannerTheme,
  setBannerTheme,
}: ThemeControlsProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Тема</CardTitle>
    </CardHeader>
    <CardContent className="flex gap-2">
      {BANNER_THEMES.map((theme) => (
        <button
          className={`flex flex-1 items-center justify-center gap-2 rounded-md border p-3 text-sm font-medium transition-colors ${
            bannerTheme === theme.value
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border hover:bg-accent hover:text-accent-foreground'
          }`}
          key={theme.value}
          onClick={() => {
            setBannerTheme(theme.value);
          }}
          type="button"
        >
          {theme.value === 'light' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
          {theme.label}
        </button>
      ))}
    </CardContent>
  </Card>
);
