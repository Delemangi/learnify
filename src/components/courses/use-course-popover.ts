import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';

import type { PanelPosition } from './course-popover';

const POPOVER_ANIMATION_MS = 220;

export const useCoursePopover = () => {
  const closeTimeoutRef = useRef<null | number>(null);
  const openFrameRef = useRef<null | number>(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const [panelPosition, setPanelPosition] = useState<PanelPosition>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const close = () => {
    if (openFrameRef.current) {
      window.cancelAnimationFrame(openFrameRef.current);
    }

    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }

    setOpen(false);
    closeTimeoutRef.current = window.setTimeout(() => {
      setMounted(false);
      setPanelPosition(null);
    }, POPOVER_ANIMATION_MS);
  };

  const toggle = () => {
    if (open) {
      close();
      return;
    }

    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }

    setMounted(true);
    openFrameRef.current = window.requestAnimationFrame(() => {
      setOpen(true);
    });
  };

  useLayoutEffect(() => {
    if (!mounted) {
      return () => {};
    }

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

    updatePanelPosition();
    window.addEventListener('resize', updatePanelPosition);
    window.addEventListener('scroll', updatePanelPosition, true);

    return () => {
      window.removeEventListener('resize', updatePanelPosition);
      window.removeEventListener('scroll', updatePanelPosition, true);
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) {
      return () => {};
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (
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

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mounted]);

  useEffect(
    () => () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }

      if (openFrameRef.current) {
        window.cancelAnimationFrame(openFrameRef.current);
      }
    },
    [],
  );

  return {
    buttonRef,
    close,
    isDesktop: typeof window !== 'undefined' && window.innerWidth >= 640,
    mounted,
    open,
    panelId,
    panelPosition,
    panelRef,
    toggle,
    wrapperRef,
  };
};
