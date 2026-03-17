import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const VISIBILITY_OFFSET = 80;

const scrollToTop = () => {
  const prefersReducedMotion = globalThis.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  globalThis.scrollTo({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    top: 0,
  });
};

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(globalThis.scrollY > VISIBILITY_OFFSET);
    };

    handleScroll();
    globalThis.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      globalThis.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Button
      aria-label="Врати се на врвот"
      className={cn(
        'fixed right-4 bottom-4 z-40 shadow-lg shadow-primary/20 transition-all duration-300 sm:right-6 sm:bottom-6',
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0',
      )}
      onClick={scrollToTop}
      size="icon"
      tabIndex={isVisible ? 0 : -1}
      title="Врати се на врвот"
      variant="default"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
};
