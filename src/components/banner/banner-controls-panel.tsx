import { Button } from '@/components/ui/button';
import {
  type BannerFont,
  type BannerTheme,
  type BgStyle,
  type PresetSize,
  type TextAlign,
} from '@/data/banner-config';

import { AlignmentControls } from './controls/alignment-controls';
import { BackgroundControls } from './controls/background-controls';
import { ColorControls } from './controls/color-controls';
import { FontControls } from './controls/font-controls';
import { LogoControls } from './controls/logo-controls';
import { PaddingControls } from './controls/padding-controls';
import { SizeControls } from './controls/size-controls';
import { TextControls } from './controls/text-controls';
import { ThemeControls } from './controls/theme-controls';
import { VerticalAlignControls } from './controls/vertical-align-controls';
import { WatermarkControls } from './controls/watermark-controls';

type BannerControlsPanelProps = {
  readonly accentText: string;
  readonly bannerTheme: BannerTheme;
  readonly bgStyle: BgStyle;
  readonly content: string;
  readonly contentPadding: number;
  readonly handleExport: () => void;
  readonly headline: string;
  readonly selectedFont: BannerFont;
  readonly selectedHue: number;
  readonly selectedSize: PresetSize;
  readonly setAccentText: (accentText: string) => void;
  readonly setBannerTheme: (theme: BannerTheme) => void;
  readonly setBgStyle: (style: BgStyle) => void;
  readonly setContent: (content: string) => void;
  readonly setContentPadding: (padding: number) => void;
  readonly setHeadline: (headline: string) => void;
  readonly setSelectedFont: (font: BannerFont) => void;
  readonly setSelectedHue: (hue: number) => void;
  readonly setSelectedSize: (size: PresetSize) => void;
  readonly setShowLogo: (show: boolean) => void;
  readonly setTextAlign: (align: TextAlign) => void;
  readonly setTextShadow: (shadow: boolean) => void;
  readonly setVerticalAlign: (align: 'bottom' | 'center' | 'top') => void;
  readonly setWatermarkOpacity: (opacity: number) => void;
  readonly showLogo: boolean;
  readonly textAlign: TextAlign;
  readonly textShadow: boolean;
  readonly verticalAlign: 'bottom' | 'center' | 'top';
  readonly watermarkOpacity: number;
};

export const BannerControlsPanel = ({
  accentText,
  bannerTheme,
  bgStyle,
  content,
  contentPadding,
  handleExport,
  headline,
  selectedFont,
  selectedHue,
  selectedSize,
  setAccentText,
  setBannerTheme,
  setBgStyle,
  setContent,
  setContentPadding,
  setHeadline,
  setSelectedFont,
  setSelectedHue,
  setSelectedSize,
  setShowLogo,
  setTextAlign,
  setTextShadow,
  setVerticalAlign,
  setWatermarkOpacity,
  showLogo,
  textAlign,
  textShadow,
  verticalAlign,
  watermarkOpacity,
}: BannerControlsPanelProps) => (
  <div className="flex h-full flex-col gap-4 overflow-y-auto pb-4">
    <TextControls
      accentText={accentText}
      content={content}
      headline={headline}
      setAccentText={setAccentText}
      setContent={setContent}
      setHeadline={setHeadline}
    />
    <FontControls
      selectedFont={selectedFont}
      setSelectedFont={setSelectedFont}
    />
    <ColorControls
      selectedHue={selectedHue}
      setSelectedHue={setSelectedHue}
    />
    <ThemeControls
      bannerTheme={bannerTheme}
      setBannerTheme={setBannerTheme}
    />
    <BackgroundControls
      bgStyle={bgStyle}
      setBgStyle={setBgStyle}
    />
    <AlignmentControls
      setTextAlign={setTextAlign}
      textAlign={textAlign}
    />
    <LogoControls
      setShowLogo={setShowLogo}
      setTextShadow={setTextShadow}
      showLogo={showLogo}
      textShadow={textShadow}
    />
    <PaddingControls
      contentPadding={contentPadding}
      setContentPadding={setContentPadding}
    />
    <VerticalAlignControls
      setVerticalAlign={setVerticalAlign}
      verticalAlign={verticalAlign}
    />
    <WatermarkControls
      setWatermarkOpacity={setWatermarkOpacity}
      watermarkOpacity={watermarkOpacity}
    />
    <SizeControls
      selectedSize={selectedSize}
      setSelectedSize={setSelectedSize}
    />
    <Button
      className="w-full text-base font-semibold"
      onClick={handleExport}
      size="lg"
    >
      Преземи PNG
    </Button>
  </div>
);
