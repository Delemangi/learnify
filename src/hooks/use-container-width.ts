import { type RefObject, useEffect, useState } from 'react';

export const useContainerWidth = (
  ref: RefObject<HTMLDivElement | null>,
  initialWidth = 600,
) => {
  const [containerWidth, setContainerWidth] = useState(initialWidth);

  useEffect(() => {
    const el = ref.current;
    const observer = el
      ? new ResizeObserver((entries) => {
          for (const entry of entries) {
            setContainerWidth(entry.contentRect.width);
          }
        })
      : null;
    if (el && observer) {
      observer.observe(el);
    }
    return () => {
      observer?.disconnect();
    };
  }, [ref]);

  return containerWidth;
};
