import { Button } from '@/components/ui/button';

import { NavLinks } from './nav-links';

type MobileMenuProps = {
  readonly onNavigate: () => void;
};

export const MobileMenu = ({ onNavigate }: MobileMenuProps) => (
  <div className="border-t md:hidden">
    <div className="flex flex-col gap-1 px-4 py-3">
      <NavLinks
        linkClassName="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        onNavigate={onNavigate}
      />
      <Button
        asChild
        className="mt-2 sm:hidden"
        size="sm"
      >
        <a
          href="#contact"
          onClick={onNavigate}
        >
          Закажи час
        </a>
      </Button>
    </div>
  </div>
);
