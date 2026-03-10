import { GraduationCap } from 'lucide-react';

export const Footer = () => (
  <footer className="border-t py-8">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <a
          aria-label="Почетна страна"
          className="flex items-center gap-2 text-sm font-medium"
          href="#"
        >
          <GraduationCap className="h-5 w-5 text-primary" />
          learnify.mk
        </a>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Learnify.mk. Сите права задржани.
        </p>
      </div>
    </div>
  </footer>
);
