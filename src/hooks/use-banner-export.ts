import { toPng } from 'html-to-image';
import { type RefObject, useCallback, useEffect } from 'react';

import { type PresetSize } from '@/data/banner-config';

export const useBannerExport = (
  previewRef: RefObject<HTMLDivElement | null>,
  selectedSize: PresetSize,
) => {
  const handleExport = useCallback(async () => {
    if (!previewRef.current) return;
    try {
      await document.fonts.ready;
      const dataUrl = await toPng(previewRef.current, {
        cacheBust: true,
        height: selectedSize.height,
        pixelRatio: 1,
        style: {
          transform: 'none',
          transformOrigin: 'initial',
        },
        width: selectedSize.width,
      });
      const link = document.createElement('a');
      link.download = `learnify-banner-${selectedSize.label.toLowerCase().replaceAll(/\s+/gu, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [previewRef, selectedSize]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleExport().catch((error: unknown) => {
          // eslint-disable-next-line no-console
          console.error('Export failed:', error);
        });
      }
    };
    globalThis.addEventListener('keydown', handleKeyDown);
    return () => {
      globalThis.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleExport]);

  return { handleExport };
};
