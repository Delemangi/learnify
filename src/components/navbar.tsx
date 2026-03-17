import { Menu, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { MobileMenu } from '@/components/navbar/mobile-menu';
import { NavLinks } from '@/components/navbar/nav-links';
import { SiteLogo } from '@/components/site-logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const close = useCallback(() => {
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    const mq = globalThis.matchMedia('(min-width: 1024px)');

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(globalThis.scrollY > 20);
    };

    handleScroll();
    globalThis.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      globalThis.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      aria-label="Главна навигација"
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'glass py-3' : 'bg-transparent py-5',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          aria-label="Почетна страна"
          className="group block"
          href="/"
        >
          <SiteLogo textClassName="text-xl transition-colors group-hover:text-primary" />
        </a>

        <div className="hidden items-center gap-4 lg:flex xl:gap-8">
          <NavLinks linkClassName="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" />
        </div>

        <div className="hidden items-center gap-2 lg:flex xl:gap-3">
          <ThemeToggle />
          <Button asChild>
            <a href="/#contact">Закажи час</a>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Затвори мени' : 'Отвори мени'}
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
    </header>
  );
};
