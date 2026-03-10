import type { ElementType } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type ContactCardProps = {
  readonly className?: string;
  readonly external?: boolean;
  readonly href: string;
  readonly icon: ElementType<{ className?: string }>;
  readonly label: string;
  readonly title: string;
};

export const ContactCard = ({
  className,
  external = false,
  href,
  icon: Icon,
  label,
  title,
}: ContactCardProps) => (
  <Card
    className={cn(
      'flex flex-row items-center gap-4 p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:block sm:p-0 sm:text-center',
      className,
    )}
  >
    <CardHeader className="shrink-0 p-0 sm:p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary sm:mx-auto sm:h-12 sm:w-12">
        <Icon className="h-6 w-6" />
      </div>
    </CardHeader>
    <CardContent className="min-w-0 flex-1 p-0 sm:p-6 sm:pt-0">
      <CardTitle className="text-sm sm:text-base">{title}</CardTitle>
      <a
        className="mt-1 block truncate text-sm text-muted-foreground transition-colors hover:text-foreground"
        href={href}
        rel={external ? 'noopener noreferrer' : undefined}
        target={external ? '_blank' : undefined}
      >
        {label}
        {external ? (
          <span className="sr-only"> (се отвора во нов прозорец)</span>
        ) : null}
      </a>
    </CardContent>
  </Card>
);
