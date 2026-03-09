import type { ReactNode } from 'react';

import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

type AnimateInProps = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
};

export const AnimateIn = ({
  children,
  className,
  delay = 0,
}: AnimateInProps) => {
  const { inView, ref } = useInView();

  return (
    <div
      className={cn(
        'opacity-0 transition-none',
        inView && 'animate-fade-in-up',
        className,
      )}
      ref={ref}
      style={inView ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};
