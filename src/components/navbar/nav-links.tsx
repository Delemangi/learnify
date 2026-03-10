import { cn } from '@/lib/utils';

import { NAV_LINKS } from './nav-links-data';

type NavLinksProps = {
  readonly linkClassName: string;
  readonly onNavigate?: () => void;
};

export const NavLinks = ({ linkClassName, onNavigate }: NavLinksProps) => (
  <>
    {NAV_LINKS.map((link) => (
      <a
        className={cn(linkClassName)}
        href={link.href}
        key={link.href}
        onClick={onNavigate}
      >
        {link.label}
      </a>
    ))}
  </>
);
