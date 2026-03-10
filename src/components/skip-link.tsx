type SkipLinkProps = {
  readonly href: string;
  readonly label: string;
};

export const SkipLink = ({ href, label }: SkipLinkProps) => (
  <a
    className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none"
    href={href}
  >
    {label}
  </a>
);
