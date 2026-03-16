import { SiteLogo } from '@/components/site-logo';

export const Footer = () => (
  <footer className="border-t py-8">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <a
          aria-label="Почетна страна"
          className="block"
          href="/"
        >
          <SiteLogo
            imageClassName="h-6"
            textClassName="text-sm font-medium"
          />
        </a>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Learnify.mk. Сите права задржани.
        </p>
      </div>
    </div>
  </footer>
);
