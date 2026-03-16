import { toPng } from 'html-to-image';
import { AlignCenter, AlignLeft, Moon, Sun } from 'lucide-react';
import { marked } from 'marked';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { SiteLogo } from '@/components/site-logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type BannerFont = {
  readonly category: 'sans-serif' | 'script' | 'serif';
  readonly family: string;
  readonly weights: readonly number[];
};

type BannerTheme = 'dark' | 'light';
type BgStyle = 'flat' | 'gradient' | 'minimal';
type PresetSize = {
  readonly height: number;
  readonly label: string;
  readonly width: number;
};

type TextAlign = 'center' | 'left';

const ACCENT_COLORS = [
  { hue: 50, label: 'Портокалова' },
  { hue: 250, label: 'Сина' },
  { hue: 150, label: 'Зелена' },
  { hue: 300, label: 'Виолетова' },
  { hue: 350, label: 'Розе' },
  { hue: 25, label: 'Црвена' },
] as const;

const FONTS: readonly BannerFont[] = [
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

const FONT_FALLBACKS: Record<BannerFont['category'], string> = {
  'sans-serif': 'sans-serif',
  script: 'cursive',
  serif: 'serif',
};

const PRESETS: readonly PresetSize[] = [
  { height: 1_080, label: 'Instagram Post', width: 1_080 },
  { height: 1_920, label: 'Instagram Story', width: 1_080 },
  { height: 630, label: 'Facebook Post', width: 1_200 },
  { height: 627, label: 'LinkedIn Post', width: 1_200 },
];

const BANNER_THEMES: ReadonlyArray<{
  readonly label: string;
  readonly value: BannerTheme;
}> = [
  { label: 'Светла', value: 'light' },
  { label: 'Темна', value: 'dark' },
];

const getBgGradient = (theme: BannerTheme, hue: number): string => {
  if (theme === 'dark') {
    return `radial-gradient(circle at top, oklch(0.48 0.12 ${hue + 5} / 0.32), transparent 30%), radial-gradient(circle at 20% 20%, oklch(0.3 0.04 ${hue - 12} / 0.4), transparent 24%), linear-gradient(180deg, oklch(0.19 0.012 ${hue - 5}), oklch(0.13 0.008 ${hue - 5}))`;
  }
  return `radial-gradient(circle at top, oklch(0.9 0.1 ${hue + 18} / 0.92), transparent 34%), radial-gradient(circle at 15% 18%, oklch(0.82 0.18 ${hue + 2} / 0.32), transparent 24%), linear-gradient(180deg, oklch(0.995 0.012 ${hue + 30}), oklch(0.955 0.03 ${hue + 24}))`;
};

const DEFAULT_CONTENT = `## Прва година
- Структурно програмирање
- Дискретна математика

## Втора година
- Објектно-ориентирано програмирање
- Алгоритми и податочни структури`;

const INPUT_CLASS =
  'rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

const loadedFonts = new Set<string>();

const loadGoogleFont = (font: BannerFont) => {
  if (loadedFonts.has(font.family)) return;
  loadedFonts.add(font.family);

  const weightsStr = font.weights.join(';');
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css2?family=${font.family.replaceAll(' ', '+')}:wght@${weightsStr}&display=swap&subset=cyrillic`;
  link.rel = 'stylesheet';
  document.head.append(link);
};

// eslint-disable-next-line max-lines-per-function
export const BannerGenerator = () => {
  const [headline, setHeadline] = useState('Learnify');
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [accentText, setAccentText] = useState('learnify.mk');
  const [bannerTheme, setBannerTheme] = useState<BannerTheme>('light');
  const [showLogo, setShowLogo] = useState(true);
  const [selectedHue, setSelectedHue] = useState(50);
  const [textAlign, setTextAlign] = useState<TextAlign>('center');
  const [watermarkOpacity, setWatermarkOpacity] = useState(5);
  const [bgStyle, setBgStyle] = useState<BgStyle>('gradient');
  const [selectedFont, setSelectedFont] = useState<BannerFont>(
    FONTS[0] ?? {
      category: 'sans-serif' as const,
      family: 'Montserrat',
      weights: [400, 700, 900],
    },
  );
  const [selectedSize, setSelectedSize] = useState<PresetSize>(
    PRESETS[0] ?? { height: 1_080, label: 'Instagram Post', width: 1_080 },
  );

  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadGoogleFont(selectedFont);
  }, [selectedFont]);

  const contentHtml = useMemo(() => marked.parse(content), [content]);

  const handleExport = useCallback(async () => {
    if (!previewRef.current) return;
    try {
      await document.fonts.ready;
      const dataUrl = await toPng(previewRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
      const link = document.createElement('a');
      link.download = `learnify-banner-${selectedSize.label.toLowerCase().replaceAll(/\s+/gu, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [selectedSize]);

  const bgGradient = getBgGradient(bannerTheme, selectedHue);
  const getBackgroundStyle = () => {
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

  const maxPreviewWidth = 600;
  const scale =
    selectedSize.width > maxPreviewWidth
      ? maxPreviewWidth / selectedSize.width
      : 1;

  const baseFontSize = selectedSize.width * 0.025;

  return (
    <div className="min-h-screen pb-12">
      <header className="glass sticky top-0 z-50 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            aria-label="Почетна страна"
            className="group block"
            href="/"
          >
            <SiteLogo textClassName="text-xl transition-colors group-hover:text-primary" />
          </a>
          <div className="flex items-center gap-4">
            <h1 className="hidden text-sm font-medium sm:block">
              Креирај банер
            </h1>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[400px_1fr]">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Текст и содржина</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Наслов</label>
                  <input
                    className={INPUT_CLASS}
                    onChange={(e) => {
                      setHeadline(e.target.value);
                    }}
                    value={headline}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">
                    Главна содржина (Markdown)
                  </label>
                  <textarea
                    className={`${INPUT_CLASS} min-h-48 resize-y font-mono`}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                    placeholder={`## Прва година\n- Предмет 1\n- Предмет 2`}
                    value={content}
                  />
                  <p className="text-xs text-muted-foreground">
                    ## за поднаслов, - за ставка, --- за линија
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Подзаглавие</label>
                  <input
                    className={INPUT_CLASS}
                    onChange={(e) => {
                      setAccentText(e.target.value);
                    }}
                    value={accentText}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Фонт</CardTitle>
              </CardHeader>
              <CardContent>
                <select
                  className={`${INPUT_CLASS} w-full`}
                  onChange={(e) => {
                    const font = FONTS.find((f) => f.family === e.target.value);
                    if (font) setSelectedFont(font);
                  }}
                  value={selectedFont.family}
                >
                  <optgroup label="Sans-serif">
                    {FONTS.filter((f) => f.category === 'sans-serif').map(
                      (font) => (
                        <option
                          key={font.family}
                          value={font.family}
                        >
                          {font.family}
                        </option>
                      ),
                    )}
                  </optgroup>
                  <optgroup label="Serif">
                    {FONTS.filter((f) => f.category === 'serif').map((font) => (
                      <option
                        key={font.family}
                        value={font.family}
                      >
                        {font.family}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Script">
                    {FONTS.filter((f) => f.category === 'script').map(
                      (font) => (
                        <option
                          key={font.family}
                          value={font.family}
                        >
                          {font.family}
                        </option>
                      ),
                    )}
                  </optgroup>
                </select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Боја</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                {ACCENT_COLORS.map((color) => (
                  <button
                    className={`h-8 w-8 rounded-full border-2 transition-all ${
                      selectedHue === color.hue
                        ? 'border-primary scale-110'
                        : 'border-transparent hover:scale-110 hover:border-border'
                    }`}
                    key={color.hue}
                    onClick={() => {
                      setSelectedHue(color.hue);
                    }}
                    style={{
                      backgroundColor: `oklch(0.7 0.2 ${color.hue})`,
                    }}
                    title={color.label}
                    type="button"
                  />
                ))}
              </CardContent>
            </Card>

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

            <Card>
              <CardHeader>
                <CardTitle>Позадина</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-2">
                {[
                  { label: 'Градиент', value: 'gradient' },
                  { label: 'Еднобојна', value: 'flat' },
                  { label: 'Минимална', value: 'minimal' },
                ].map((style) => (
                  <button
                    className={`flex flex-1 items-center justify-center gap-2 rounded-md border p-3 text-sm font-medium transition-colors ${
                      bgStyle === style.value
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:bg-accent hover:text-accent-foreground'
                    }`}
                    key={style.value}
                    onClick={() => {
                      setBgStyle(style.value as BgStyle);
                    }}
                    type="button"
                  >
                    {style.label}
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Порамнување</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-2">
                {[
                  { icon: AlignLeft, label: 'Лево', value: 'left' },
                  { icon: AlignCenter, label: 'Центар', value: 'center' },
                ].map((align) => {
                  const Icon = align.icon;
                  return (
                    <button
                      className={`flex flex-1 items-center justify-center gap-2 rounded-md border p-3 text-sm font-medium transition-colors ${
                        textAlign === align.value
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:bg-accent hover:text-accent-foreground'
                      }`}
                      key={align.value}
                      onClick={() => {
                        setTextAlign(align.value as TextAlign);
                      }}
                      type="button"
                    >
                      <Icon className="h-4 w-4" />
                      {align.label}
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Лого</CardTitle>
              </CardHeader>
              <CardContent>
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    checked={showLogo}
                    className="h-4 w-4 text-primary accent-primary"
                    onChange={(e) => {
                      setShowLogo(e.target.checked);
                    }}
                    type="checkbox"
                  />
                  <span className="text-sm font-medium">Прикажи лого</span>
                </label>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Водено знак ({watermarkOpacity}%)</CardTitle>
              </CardHeader>
              <CardContent>
                <input
                  className="w-full accent-primary"
                  max={30}
                  min={0}
                  onChange={(e) => {
                    setWatermarkOpacity(Number(e.target.value));
                  }}
                  step={1}
                  type="range"
                  value={watermarkOpacity}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Димензии</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {PRESETS.map((preset) => (
                  <label
                    className="flex cursor-pointer items-center gap-2 rounded-md border border-border p-3 hover:bg-accent hover:text-accent-foreground"
                    key={preset.label}
                  >
                    <input
                      checked={selectedSize.label === preset.label}
                      className="h-4 w-4 text-primary accent-primary"
                      name="preset-size"
                      onChange={() => {
                        setSelectedSize(preset);
                      }}
                      type="radio"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {preset.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {preset.width} × {preset.height} px
                      </span>
                    </div>
                  </label>
                ))}
              </CardContent>
            </Card>

            <Button
              className="w-full text-base font-semibold"
              onClick={handleExport}
              size="lg"
            >
              Преземи PNG
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Преглед</h2>
            <div className="relative flex overflow-hidden rounded-xl border border-border bg-card p-4 sm:p-8">
              <div
                className="mx-auto overflow-hidden bg-background shadow-2xl"
                style={{
                  height: `${selectedSize.height * scale}px`,
                  width: `${selectedSize.width * scale}px`,
                }}
              >
                <div
                  className={`${bannerTheme} relative flex flex-col items-center justify-center`}
                  ref={previewRef}
                  style={
                    {
                      ...getBackgroundStyle(),
                      '--primary':
                        bannerTheme === 'dark'
                          ? `oklch(0.72 0.17 ${selectedHue})`
                          : `oklch(0.7 0.2 ${selectedHue})`,
                      colorScheme: bannerTheme,
                      fontFamily: `"${selectedFont.family}", ${FONT_FALLBACKS[selectedFont.category]}`,
                      height: `${selectedSize.height}px`,
                      padding: `${selectedSize.width * 0.06}px`,
                      transform: `scale(${scale})`,
                      transformOrigin: 'top left',
                      width: `${selectedSize.width}px`,
                    } as { [key: string]: number | string | undefined }
                  }
                >
                  {showLogo ? (
                    <div className="absolute left-[6%] top-[6%] flex items-center gap-2 text-foreground">
                      <img
                        alt="Logo"
                        src="/favicon.svg"
                        style={{
                          height: `${selectedSize.width * 0.04}px`,
                          width: `${selectedSize.width * 0.04}px`,
                        }}
                      />
                      <span
                        className="font-bold tracking-tight"
                        style={{ fontSize: `${selectedSize.width * 0.025}px` }}
                      >
                        learnify.mk
                      </span>
                    </div>
                  ) : null}

                  <img
                    alt=""
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    src="/favicon.svg"
                    style={{
                      height: '80%',
                      opacity: watermarkOpacity / 100,
                      width: '80%',
                    }}
                  />

                  <div
                    className={`relative z-10 flex w-full flex-col justify-center gap-6 ${
                      textAlign === 'left'
                        ? 'items-start text-left'
                        : 'items-center text-center'
                    }`}
                  >
                    {headline ? (
                      <h2
                        className={`font-bold tracking-tight text-foreground ${
                          textAlign === 'left' ? 'w-full' : ''
                        }`}
                        style={{
                          fontSize: `${selectedSize.width * 0.08}px`,
                          lineHeight: 1.1,
                        }}
                      >
                        {headline}
                      </h2>
                    ) : null}

                    {contentHtml ? (
                      <div
                        className={`banner-content text-foreground ${
                          textAlign === 'left'
                            ? 'text-left w-full'
                            : 'text-center'
                        }`}
                        // eslint-disable-next-line react/no-danger -- intentional: user-authored Markdown in internal tool
                        dangerouslySetInnerHTML={{ __html: contentHtml }}
                        style={{ fontSize: `${baseFontSize}px` }}
                      />
                    ) : null}
                  </div>

                  {accentText ? (
                    <div
                      className={`absolute bottom-12 font-medium text-foreground/60 ${
                        textAlign === 'left' ? 'left-[6%]' : ''
                      }`}
                      style={{ fontSize: `${selectedSize.width * 0.025}px` }}
                    >
                      {accentText}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
