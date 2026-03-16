import { type RefObject } from 'react';

import type { getBackgroundStyle } from '@/lib/banner-utils';

import { Button } from '@/components/ui/button';
import { type BannerState } from '@/data/banner-config';

import { BannerPreview } from './banner-preview';

type BannerPreviewPanelProps = {
  readonly backgroundStyle: ReturnType<typeof getBackgroundStyle>;
  readonly baseFontSize: number;
  readonly contentHtml: string;
  readonly handleExport: () => void;
  readonly previewContainerRef: RefObject<HTMLDivElement | null>;
  readonly previewRef: RefObject<HTMLDivElement | null>;
  readonly previewZoom: number;
  readonly scale: number;
  readonly setPreviewZoom: (zoom: number) => void;
  readonly state: BannerState;
};

export const BannerPreviewPanel = ({
  backgroundStyle,
  baseFontSize,
  contentHtml,
  handleExport,
  previewContainerRef,
  previewRef,
  previewZoom,
  scale,
  setPreviewZoom,
  state,
}: BannerPreviewPanelProps) => (
  <div className="flex h-full flex-col bg-background">
    <div className="flex h-10 items-center justify-between border-b border-border bg-card/50 px-4">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">Зум:</span>
        <select
          className="h-6 rounded border border-input bg-transparent px-1 py-0 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
      <Button
        className="h-7 px-3 text-xs font-medium"
        onClick={handleExport}
        size="sm"
      >
        Преземи PNG
      </Button>
    </div>
    <div
      className="relative flex flex-1 items-center justify-center overflow-auto"
      ref={previewContainerRef}
      style={{
        backgroundImage:
          'radial-gradient(circle, oklch(0.5 0 0 / 0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      <div
        className="flex origin-center flex-col items-center transition-transform"
        style={{
          height: `${state.selectedSize.height * scale * (previewZoom / 100)}px`,
          transform: `scale(${previewZoom / 100})`,
          width: `${state.selectedSize.width * scale * (previewZoom / 100)}px`,
        }}
      >
        <div
          className="overflow-hidden bg-background shadow-2xl"
          style={{
            height: `${state.selectedSize.height * scale}px`,
            width: `${state.selectedSize.width * scale}px`,
          }}
        >
          <BannerPreview
            accentText={state.accentText}
            backgroundStyle={backgroundStyle}
            bannerTheme={state.bannerTheme}
            baseFontSize={baseFontSize}
            contentHtml={contentHtml}
            contentPadding={state.contentPadding}
            headline={state.headline}
            previewRef={previewRef}
            scale={scale}
            selectedFont={state.selectedFont}
            selectedHue={state.selectedHue}
            selectedSize={state.selectedSize}
            showLogo={state.showLogo}
            textAlign={state.textAlign}
            textShadow={state.textShadow}
            verticalAlign={state.verticalAlign}
            watermarkOpacity={state.watermarkOpacity}
          />
        </div>
      </div>
    </div>
  </div>
);
