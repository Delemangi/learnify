import { marked } from 'marked';
import { useEffect, useMemo, useRef, useState } from 'react';

import { BannerControlsPanel } from '@/components/banner/banner-controls-panel';
import { BannerPreviewPanel } from '@/components/banner/banner-preview-panel';
import { SiteLogo } from '@/components/site-logo';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  type BannerFont,
  type BannerTheme,
  type BgStyle,
  DEFAULT_CONTENT,
  FONTS,
  PRESETS,
  type PresetSize,
  type TextAlign,
} from '@/data/banner-config';
import { useBannerExport } from '@/hooks/use-banner-export';
import {
  getBackgroundStyle,
  getBgGradient,
  loadGoogleFont,
} from '@/lib/banner-utils';

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
  const [contentPadding, setContentPadding] = useState(64);
  const [verticalAlign, setVerticalAlign] = useState<
    'bottom' | 'center' | 'top'
  >('center');
  const [textShadow, setTextShadow] = useState(false);
  const [previewZoom, setPreviewZoom] = useState(100);

  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadGoogleFont(selectedFont);
  }, [selectedFont]);

  const { handleExport } = useBannerExport(previewRef, selectedSize);

  const contentHtml = useMemo(() => marked.parse(content) as string, [content]);
  const bgGradient = getBgGradient(bannerTheme, selectedHue);
  const backgroundStyle = getBackgroundStyle(
    bgStyle,
    bannerTheme,
    selectedHue,
    bgGradient,
  );

  const maxPreviewWidth = 600;
  const scale =
    selectedSize.width > maxPreviewWidth
      ? maxPreviewWidth / selectedSize.width
      : 1;
  const baseFontSize = selectedSize.width * 0.025;

  return (
    <div className="flex h-screen flex-col">
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

      <main className="mx-auto flex max-w-7xl flex-1 overflow-hidden px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid h-full w-full grid-cols-1 gap-6 overflow-hidden lg:grid-cols-[380px_1fr]">
          <BannerControlsPanel
            accentText={accentText}
            bannerTheme={bannerTheme}
            bgStyle={bgStyle}
            content={content}
            contentPadding={contentPadding}
            handleExport={handleExport}
            headline={headline}
            selectedFont={selectedFont}
            selectedHue={selectedHue}
            selectedSize={selectedSize}
            setAccentText={setAccentText}
            setBannerTheme={setBannerTheme}
            setBgStyle={setBgStyle}
            setContent={setContent}
            setContentPadding={setContentPadding}
            setHeadline={setHeadline}
            setSelectedFont={setSelectedFont}
            setSelectedHue={setSelectedHue}
            setSelectedSize={setSelectedSize}
            setShowLogo={setShowLogo}
            setTextAlign={setTextAlign}
            setTextShadow={setTextShadow}
            setVerticalAlign={setVerticalAlign}
            setWatermarkOpacity={setWatermarkOpacity}
            showLogo={showLogo}
            textAlign={textAlign}
            textShadow={textShadow}
            verticalAlign={verticalAlign}
            watermarkOpacity={watermarkOpacity}
          />

          <BannerPreviewPanel
            accentText={accentText}
            backgroundStyle={backgroundStyle}
            bannerTheme={bannerTheme}
            baseFontSize={baseFontSize}
            contentHtml={contentHtml}
            contentPadding={contentPadding}
            headline={headline}
            previewRef={previewRef}
            previewZoom={previewZoom}
            scale={scale}
            selectedFont={selectedFont}
            selectedHue={selectedHue}
            selectedSize={selectedSize}
            setPreviewZoom={setPreviewZoom}
            showLogo={showLogo}
            textAlign={textAlign}
            textShadow={textShadow}
            verticalAlign={verticalAlign}
            watermarkOpacity={watermarkOpacity}
          />
        </div>
      </main>
    </div>
  );
};
