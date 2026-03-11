import { Menu, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { MobileMenu } from '@/components/navbar/mobile-menu';
import { NavLinks } from '@/components/navbar/nav-links';
import { SiteLogo } from '@/components/site-logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const close = useCallback(() => {
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        close();
      }
    };

    mq.addEventListener('change', handleChange);
    return () => {
      mq.removeEventListener('change', handleChange);
    };
  }, [close]);

  return (
    <nav
      aria-label="Главна навигација"
      className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          aria-label="Почетна страна"
          className="block"
          href="#"
        >
          <SiteLogo textClassName="text-xl" />
        </a>

        <div className="hidden items-center gap-6 text-sm font-medium md:flex">
          <NavLinks linkClassName="text-muted-foreground transition-colors hover:text-foreground" />
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            asChild
            className="hidden sm:inline-flex"
            size="sm"
          >
            <a href="#contact">Закажи час</a>
          </Button>
          <Button
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Затвори мени' : 'Отвори мени'}
            className="md:hidden"
            onClick={() => {
              setMobileOpen((prev) => !prev);
            }}
            size="icon"
            variant="ghost"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {mobileOpen ? <MobileMenu onNavigate={close} /> : null}
    </nav>
  );
};
