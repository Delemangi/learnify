import {
  type BannerFont,
  type BannerTheme,
  type BgStyle,
} from '@/data/banner-config';

export const getBgGradient = (theme: BannerTheme, hue: number): string => {
  if (theme === 'dark') {
    return `radial-gradient(circle at top, oklch(0.48 0.12 ${hue + 5} / 0.32), transparent 30%), radial-gradient(circle at 20% 20%, oklch(0.3 0.04 ${hue - 12} / 0.4), transparent 24%), linear-gradient(180deg, oklch(0.19 0.012 ${hue - 5}), oklch(0.13 0.008 ${hue - 5}))`;
  }
  return `radial-gradient(circle at top, oklch(0.9 0.1 ${hue + 18} / 0.92), transparent 34%), radial-gradient(circle at 15% 18%, oklch(0.82 0.18 ${hue + 2} / 0.32), transparent 24%), linear-gradient(180deg, oklch(0.995 0.012 ${hue + 30}), oklch(0.955 0.03 ${hue + 24}))`;
};

const loadedFonts = new Set<string>();

export const loadGoogleFont = (font: BannerFont) => {
  if (loadedFonts.has(font.family)) return;
  loadedFonts.add(font.family);

  const weightsStr = font.weights.join(';');
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css2?family=${font.family.replaceAll(' ', '+')}:wght@${weightsStr}&display=swap&subset=cyrillic`;
  link.rel = 'stylesheet';
  document.head.append(link);
};

export const getBackgroundStyle = (
  bgStyle: BgStyle,
  bannerTheme: BannerTheme,
  selectedHue: number,
  bgGradient: string,
) => {
  if (bgStyle === 'flat') {
    return {
      backgroundColor:
        bannerTheme === 'dark'
          ? `oklch(0.16 0.01 ${selectedHue - 5})`
          : `oklch(0.975 0.02 ${selectedHue + 28})`,
    };
  }
  if (bgStyle === 'minimal') {
    return {
      backgroundImage:
        bannerTheme === 'dark'
          ? `linear-gradient(180deg, oklch(0.19 0.012 ${selectedHue - 5}), oklch(0.15 0.008 ${selectedHue - 5}))`
          : `linear-gradient(180deg, oklch(0.985 0.01 ${selectedHue + 28}), oklch(0.965 0.02 ${selectedHue + 24}))`,
    };
  }
  return { backgroundImage: bgGradient };
};
