import { type RefObject } from 'react';

import type { getBackgroundStyle } from '@/lib/banner-utils';

import {
  type BannerFont,
  type BannerTheme,
  INPUT_CLASS,
  type PresetSize,
  type TextAlign,
} from '@/data/banner-config';

import { BannerPreview } from './banner-preview';

type BannerPreviewPanelProps = {
  readonly accentText: string;
  readonly backgroundStyle: ReturnType<typeof getBackgroundStyle>;
  readonly bannerTheme: BannerTheme;
  readonly baseFontSize: number;
  readonly contentHtml: string;
  readonly contentPadding: number;
  readonly headline: string;
  readonly previewRef: RefObject<HTMLDivElement | null>;
  readonly previewZoom: number;
  readonly scale: number;
  readonly selectedFont: BannerFont;
  readonly selectedHue: number;
  readonly selectedSize: PresetSize;
  readonly setPreviewZoom: (zoom: number) => void;
  readonly showLogo: boolean;
  readonly textAlign: TextAlign;
  readonly textShadow: boolean;
  readonly verticalAlign: 'bottom' | 'center' | 'top';
  readonly watermarkOpacity: number;
};

export const BannerPreviewPanel = ({
  accentText,
  backgroundStyle,
  bannerTheme,
  baseFontSize,
  contentHtml,
  contentPadding,
  headline,
  previewRef,
  previewZoom,
  scale,
  selectedFont,
  selectedHue,
  selectedSize,
  setPreviewZoom,
  showLogo,
  textAlign,
  textShadow,
  verticalAlign,
  watermarkOpacity,
}: BannerPreviewPanelProps) => (
  <div className="flex h-full flex-col gap-4 overflow-y-auto">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold">Преглед</h2>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Зум:</span>
        <select
          className={`${INPUT_CLASS} w-24`}
          onChange={(e) => {
            setPreviewZoom(Number(e.target.value));
          }}
          value={previewZoom}
        >
          <option value={50}>50%</option>
          <option value={75}>75%</option>
          <option value={100}>100%</option>
          <option value={125}>125%</option>
          <option value={150}>150%</option>
        </select>
      </div>
    </div>
    <div className="relative flex overflow-auto rounded-xl border border-border bg-card p-4 sm:p-8">
      <div
        className="mx-auto flex origin-top flex-col items-center overflow-hidden transition-transform"
        style={{
          height: `${selectedSize.height * scale * (previewZoom / 100)}px`,
          transform: `scale(${previewZoom / 100})`,
          width: `${selectedSize.width * scale * (previewZoom / 100)}px`,
        }}
      >
        <div
          className="mx-auto overflow-hidden bg-background shadow-2xl"
          style={{
            height: `${selectedSize.height * scale}px`,
            width: `${selectedSize.width * scale}px`,
          }}
        >
          <BannerPreview
            accentText={accentText}
            backgroundStyle={backgroundStyle}
            bannerTheme={bannerTheme}
            baseFontSize={baseFontSize}
            contentHtml={contentHtml}
            contentPadding={contentPadding}
            headline={headline}
            previewRef={previewRef}
            scale={scale}
            selectedFont={selectedFont}
            selectedHue={selectedHue}
            selectedSize={selectedSize}
            showLogo={showLogo}
            textAlign={textAlign}
            textShadow={textShadow}
            verticalAlign={verticalAlign}
            watermarkOpacity={watermarkOpacity}
          />
        </div>
      </div>
    </div>
  </div>
);
