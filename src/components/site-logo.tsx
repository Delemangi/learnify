import { cn } from '@/lib/utils';

type SiteLogoProps = {
  readonly className?: string;
  readonly imageClassName?: string;
  readonly textClassName?: string;
};

export const SiteLogo = ({
  className,
  imageClassName,
  textClassName,
}: SiteLogoProps) => (
  <span className={cn('flex items-center gap-2', className)}>
    <img
      alt=""
      aria-hidden="true"
      className={cn('h-8 w-auto shrink-0', imageClassName)}
      src="/favicon.svg"
    />
    <span className={cn('font-bold tracking-tight', textClassName)}>
      learnify.mk
    </span>
  </span>
);
