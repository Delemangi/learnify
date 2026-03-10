import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';

import type { PanelPosition } from './course-popover';

export const useCoursePopover = () => {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const [panelPosition, setPanelPosition] = useState<PanelPosition>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const close = () => {
    setOpen(false);
  };

  const toggle = () => {
    setOpen((current) => !current);
  };

  useLayoutEffect(() => {
    const updatePanelPosition = () => {
      const rect = buttonRef.current?.getBoundingClientRect();

      if (!rect) {
        return;
      }

      setPanelPosition({
        left: rect.left + rect.width / 2,
        top: rect.bottom + 12,
      });
    };

    if (open) {
      updatePanelPosition();
      window.addEventListener('resize', updatePanelPosition);
      window.addEventListener('scroll', updatePanelPosition, true);
    }

    return () => {
      window.removeEventListener('resize', updatePanelPosition);
      window.removeEventListener('scroll', updatePanelPosition, true);
    };
  }, [open]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (
        open &&
        !wrapperRef.current?.contains(target) &&
        !panelRef.current?.contains(target)
      ) {
        close();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    if (open) {
      document.addEventListener('pointerdown', handlePointerDown);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return {
    buttonRef,
    close,
    isDesktop: typeof window !== 'undefined' && window.innerWidth >= 640,
    open,
    panelId,
    panelPosition,
    panelRef,
    toggle,
    wrapperRef,
  };
};
