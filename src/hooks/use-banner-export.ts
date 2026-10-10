import { toPng } from 'html-to-image';
import {
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { type PresetSize } from '@/data/banner-config';

export const useBannerExport = (
  previewRef: RefObject<HTMLDivElement | null>,
  selectedSize: PresetSize,
) => {
  const inProgress = useRef(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const handleExport = useCallback(async () => {
    if (inProgress.current) return;
    const node = previewRef.current;
    if (!node) {
      setExportError(true);
      setExportSuccess(false);
      return;
    }
    inProgress.current = true;
    setIsExporting(true);
    setExportError(false);
    setExportSuccess(false);
    try {
      await document.fonts.ready;
      const dataUrl = await toPng(node, {
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
      setExportSuccess(true);
    } catch {
      // Capture/font failures are intentionally shown as an in-app retry message.
      setExportError(true);
    } finally {
      // eslint-disable-next-line require-atomic-updates -- Release the synchronous gate after this capture settles.
      inProgress.current = false;
      setIsExporting(false);
    }
  }, [previewRef, selectedSize]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey) || e.key !== 's') return;

      e.preventDefault();
      void handleExport();
    };
    globalThis.addEventListener('keydown', handleKeyDown);
    return () => {
      globalThis.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleExport]);

  return { exportError, exportSuccess, handleExport, isExporting };
};
