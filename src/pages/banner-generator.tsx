import { marked } from 'marked';
import { useEffect, useMemo, useRef, useState } from 'react';

import { BannerControlsPanel } from '@/components/banner/banner-controls-panel';
import { BannerPreviewPanel } from '@/components/banner/banner-preview-panel';
import { MobileTabBar } from '@/components/banner/mobile-tab-bar';
import { SiteLogo } from '@/components/site-logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { useBannerExport } from '@/hooks/use-banner-export';
import { useBannerState } from '@/hooks/use-banner-state';
import { useContainerWidth } from '@/hooks/use-container-width';
import {
  getBackgroundStyle,
  getBgGradient,
  loadGoogleFont,
} from '@/lib/banner-utils';

export const BannerGenerator = () => {
  const [activeTab, setActiveTab] = useState<'controls' | 'preview'>(
    'controls',
  );
  const [previewZoom, setPreviewZoom] = useState(100);

  const { actions, state } = useBannerState();

  const previewRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const containerWidth = useContainerWidth(previewContainerRef);

  useEffect(() => {
    loadGoogleFont(state.selectedFont);
  }, [state.selectedFont]);

  const { handleExport } = useBannerExport(previewRef, state.selectedSize);

  const contentHtml = useMemo(
    () => marked.parse(state.content, { async: false }),
    [state.content],
  );
  const bgGradient = getBgGradient(state.bannerTheme, state.selectedHue);
  const backgroundStyle = getBackgroundStyle({
    bannerTheme: state.bannerTheme,
    bgGradient,
    bgStyle: state.bgStyle,
    selectedHue: state.selectedHue,
  });

  const maxPreviewWidth = Math.min(600, containerWidth - 32);
  const scale =
    state.selectedSize.width > maxPreviewWidth
      ? maxPreviewWidth / state.selectedSize.width
      : 1;
  const baseFontSize =
    state.selectedSize.width * 0.025 * (state.fontSize / 100);

  return (
    <div className="flex h-screen flex-col">
      <header className="glass sticky top-0 z-50 py-2">
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

      <main className="flex flex-1 overflow-hidden">
        <div className="grid h-full w-full grid-cols-1 gap-0 overflow-hidden lg:grid-cols-[340px_1fr]">
          <div
            className={`${activeTab === 'controls' ? 'flex' : 'hidden'} h-full flex-col overflow-hidden lg:flex`}
          >
            <BannerControlsPanel
              actions={actions}
              state={state}
            />
          </div>

          <div
            className={`${activeTab === 'preview' ? 'flex' : 'hidden'} h-full flex-col overflow-hidden lg:flex`}
          >
            <BannerPreviewPanel
              backgroundStyle={backgroundStyle}
              baseFontSize={baseFontSize}
              contentHtml={contentHtml}
              handleExport={handleExport}
              previewContainerRef={previewContainerRef}
              previewRef={previewRef}
              previewZoom={previewZoom}
              scale={scale}
              setPreviewZoom={setPreviewZoom}
              state={state}
            />
          </div>
        </div>
      </main>

      <MobileTabBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};
