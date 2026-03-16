import { Moon, Sun } from 'lucide-react';

import { BANNER_THEMES, type BannerTheme } from '@/data/banner-config';

type ThemeControlsProps = {
  readonly bannerTheme: BannerTheme;
  readonly setBannerTheme: (theme: BannerTheme) => void;
};

export const ThemeControls = ({
  bannerTheme,
  setBannerTheme,
}: ThemeControlsProps) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-medium text-muted-foreground">Тема</label>
    <div className="flex gap-2">
      {BANNER_THEMES.map((theme) => (
        <button
          className={`flex flex-1 items-center justify-center gap-1 rounded-md border p-2 text-xs font-medium transition-colors ${
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
            <Sun className="h-3 w-3" />
          ) : (
            <Moon className="h-3 w-3" />
          )}
          {theme.label}
        </button>
      ))}
    </div>
  </div>
);
