import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';

import { NAV_LINKS } from './nav-links-data';

type NavLinksProps = {
  readonly linkClassName: string;
  readonly onNavigate?: () => void;
};

export const NavLinks = ({ linkClassName, onNavigate }: NavLinksProps) => {
  const { pathname } = useLocation();

  return (
    <>
      {NAV_LINKS.map((link) =>
        link.isRoute ? (
          <Link
            className={cn(
              linkClassName,
              'rounded-full border border-primary/20 bg-primary/5 px-3',
              pathname === link.href && 'bg-primary/15 text-foreground',
            )}
            key={link.href}
            onClick={onNavigate}
            to={link.href}
          >
            {link.label}
          </Link>
        ) : (
          <a
            className={cn(linkClassName)}
            href={link.href}
            key={link.href}
            onClick={onNavigate}
          >
            {link.label}
          </a>
        ),
      )}
    </>
  );
};
