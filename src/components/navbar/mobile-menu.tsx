import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

import { NavLinks } from './nav-links';

type MobileMenuProps = {
  readonly onNavigate: () => void;
};

export const MobileMenu = ({ onNavigate }: MobileMenuProps) => (
  <div className="glass mt-3 border-t border-border lg:hidden">
    <div className="flex flex-col gap-1 px-4 py-4 sm:px-6">
      <NavLinks
        linkClassName="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        onNavigate={onNavigate}
      />

      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-border pt-4">
        <ThemeToggle />
        <Button
          asChild
          className="h-10"
        >
          <a
            href="/#contact"
            onClick={onNavigate}
          >
            Закажи час
          </a>
        </Button>
      </div>
    </div>
  </div>
);
