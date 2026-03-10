import { GraduationCap, Menu, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

const NAV_LINKS = [
  { href: '#courses', label: 'Предмети' },
  { href: '#about', label: 'За нас' },
  { href: '#contact', label: 'Контакт' },
];

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const close = useCallback(() => {
    setMobileOpen(false);
  }, []);

  // Close the mobile menu on resize past the md breakpoint
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
          className="flex items-center gap-2 font-bold text-xl"
          href="#"
        >
          <GraduationCap className="h-7 w-7 text-primary" />
          <span>learnify.mk</span>
        </a>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <a
              className="text-muted-foreground hover:text-foreground transition-colors"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
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

      {mobileOpen ? (
        <div className="border-t md:hidden">
          <div className="flex flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map((link) => (
              <a
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                href={link.href}
                key={link.href}
                onClick={close}
              >
                {link.label}
              </a>
            ))}
            <Button
              asChild
              className="mt-2 sm:hidden"
              size="sm"
            >
              <a
                href="#contact"
                onClick={close}
              >
                Закажи час
              </a>
            </Button>
          </div>
        </div>
      ) : null}
    </nav>
  );
};
