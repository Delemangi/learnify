import { DiscordIcon } from '@/components/icons/discord-icon';
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

      <div className="mt-4 space-y-2 border-t border-border pt-4">
        <div className="flex items-center gap-2">
          <Button
            asChild
            className="h-10 flex-1 gap-2 border-primary/40 bg-primary/10 font-semibold text-foreground hover:bg-primary/20 hover:text-foreground"
            variant="outline"
          >
            <a
              href="https://discord.gg/ArSwaDE4re"
              rel="noopener noreferrer"
              target="_blank"
            >
              <DiscordIcon className="h-4 w-4" />
              Дискорд
            </a>
          </Button>
          <ThemeToggle />
        </div>
        <Button
          asChild
          className="h-10 w-full"
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
