import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';

import type { PanelPosition } from './course-popover';

const POPOVER_ANIMATION_MS = 220;

export const useCoursePopover = () => {
  const closeTimeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);
  const openFrameRef = useRef<null | number>(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const [panelPosition, setPanelPosition] = useState<PanelPosition>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDialogElement>(null);

  const close = () => {
    if (openFrameRef.current !== null) {
      globalThis.cancelAnimationFrame(openFrameRef.current);
    }

    if (closeTimeoutRef.current !== null) {
      globalThis.clearTimeout(closeTimeoutRef.current);
    }

    setOpen(false);
    closeTimeoutRef.current = globalThis.setTimeout(() => {
      if (panelRef.current?.open) panelRef.current.close();
      setMounted(false);
      setPanelPosition(null);
      buttonRef.current?.focus();
    }, POPOVER_ANIMATION_MS);
  };

  const toggle = () => {
    if (open) {
      close();
      return;
    }

    if (closeTimeoutRef.current !== null) {
      globalThis.clearTimeout(closeTimeoutRef.current);
    }

    setMounted(true);
    openFrameRef.current = globalThis.requestAnimationFrame(() => {
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
        anchorTop: rect.top,
        left: rect.left + rect.width / 2,
        top: rect.bottom + 12,
      });
    };

    updatePanelPosition();
    globalThis.addEventListener('resize', updatePanelPosition);
    globalThis.addEventListener('scroll', updatePanelPosition, {
      capture: true,
    });

    return () => {
      globalThis.removeEventListener('resize', updatePanelPosition);
      globalThis.removeEventListener('scroll', updatePanelPosition, {
        capture: true,
      });
    };
  }, [mounted]);

  useEffect(
    () => () => {
      if (closeTimeoutRef.current !== null) {
        globalThis.clearTimeout(closeTimeoutRef.current);
      }

      if (openFrameRef.current !== null) {
        globalThis.cancelAnimationFrame(openFrameRef.current);
      }
    },
    [],
  );

  return {
    buttonRef,
    close,
    isDesktop:
      typeof globalThis !== 'undefined' && globalThis.innerWidth >= 640,
    mounted,
    open,
    panelId,
    panelPosition,
    panelRef,
    toggle,
  };
};
