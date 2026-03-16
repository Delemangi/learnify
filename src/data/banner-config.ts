export type BannerActions = {
  readonly setAccentText: (value: string) => void;
  readonly setBannerTheme: (value: BannerTheme) => void;
  readonly setBgStyle: (value: BgStyle) => void;
  readonly setContent: (value: string) => void;
  readonly setContentPadding: (value: number) => void;
  readonly setHeadline: (value: string) => void;
  readonly setSelectedFont: (value: BannerFont) => void;
  readonly setSelectedHue: (value: number) => void;
  readonly setSelectedSize: (value: PresetSize) => void;
  readonly setShowLogo: (value: boolean) => void;
  readonly setTextAlign: (value: TextAlign) => void;
  readonly setTextShadow: (value: boolean) => void;
  readonly setVerticalAlign: (value: VerticalAlign) => void;
  readonly setWatermarkOpacity: (value: number) => void;
};

export type BannerFont = {
  readonly category: 'sans-serif' | 'script' | 'serif';
  readonly family: string;
  readonly weights: readonly number[];
};
export type BannerState = {
  readonly accentText: string;
  readonly bannerTheme: BannerTheme;
  readonly bgStyle: BgStyle;
  readonly content: string;
  readonly contentPadding: number;
  readonly headline: string;
  readonly selectedFont: BannerFont;
  readonly selectedHue: number;
  readonly selectedSize: PresetSize;
  readonly showLogo: boolean;
  readonly textAlign: TextAlign;
  readonly textShadow: boolean;
  readonly verticalAlign: VerticalAlign;
  readonly watermarkOpacity: number;
};
export type BannerTheme = 'dark' | 'light';

export type BgStyle = 'flat' | 'gradient' | 'minimal';
export type PresetSize = {
  readonly height: number;
  readonly label: string;
  readonly width: number;
};

export type TextAlign = 'center' | 'left';

export type VerticalAlign = 'bottom' | 'center' | 'top';

export const ACCENT_COLORS = [
  { hue: 50, label: 'Портокалова' },
  { hue: 250, label: 'Сина' },
  { hue: 150, label: 'Зелена' },
  { hue: 300, label: 'Виолетова' },
  { hue: 350, label: 'Розе' },
  { hue: 25, label: 'Црвена' },
] as const;

export const FONTS: readonly BannerFont[] = [
  { category: 'sans-serif', family: 'Montserrat', weights: [400, 700, 900] },
  { category: 'sans-serif', family: 'Oswald', weights: [400, 700] },
  { category: 'sans-serif', family: 'Raleway', weights: [400, 700] },
  { category: 'sans-serif', family: 'Roboto', weights: [400, 700] },
  { category: 'sans-serif', family: 'Open Sans', weights: [400, 700] },
  { category: 'sans-serif', family: 'Noto Sans', weights: [400, 700] },
  { category: 'sans-serif', family: 'Bebas Neue', weights: [400] },
  { category: 'sans-serif', family: 'Poppins', weights: [400, 600, 700] },
  { category: 'sans-serif', family: 'Inter', weights: [400, 600, 700] },
  { category: 'sans-serif', family: 'Rubik', weights: [400, 600, 700] },
  { category: 'sans-serif', family: 'Nunito', weights: [400, 700] },
  { category: 'sans-serif', family: 'Archivo Black', weights: [400] },
  { category: 'serif', family: 'Playfair Display', weights: [400, 700] },
  { category: 'serif', family: 'Merriweather', weights: [400, 700] },
  { category: 'serif', family: 'Lora', weights: [400, 700] },
  { category: 'serif', family: 'Noto Serif', weights: [400, 700] },
  { category: 'serif', family: 'Cormorant Garamond', weights: [400, 600, 700] },
  { category: 'serif', family: 'Bitter', weights: [400, 700] },
  { category: 'script', family: 'Parisienne', weights: [400] },
];

export const FONT_FALLBACKS: Record<BannerFont['category'], string> = {
  'sans-serif': 'sans-serif',
  script: 'cursive',
  serif: 'serif',
};

export const PRESETS: readonly PresetSize[] = [
  { height: 1_080, label: 'Instagram Post', width: 1_080 },
  { height: 1_920, label: 'Instagram Story', width: 1_080 },
  { height: 630, label: 'Facebook Post', width: 1_200 },
  { height: 627, label: 'LinkedIn Post', width: 1_200 },
];

export const BANNER_THEMES: ReadonlyArray<{
  readonly label: string;
  readonly value: BannerTheme;
}> = [
  { label: 'Светла', value: 'light' },
  { label: 'Темна', value: 'dark' },
];

export const DEFAULT_CONTENT = `## Прва година
- Структурно програмирање
- Дискретна математика

## Втора година
- Објектно-ориентирано програмирање
- Алгоритми и податочни структури`;

export const INPUT_CLASS =
  'rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';
