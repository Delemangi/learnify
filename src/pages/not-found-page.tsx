import { Link } from 'react-router-dom';

import { SkipLink } from '@/components/skip-link';

export const NotFoundPage = () => (
  <>
    <SkipLink
      href="#not-found-main"
      label="Прескокни до содржина"
    />
    <main
      className="relative flex min-h-screen items-center overflow-hidden bg-background px-5 py-16 text-foreground"
      id="not-found-main"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="relative mx-auto w-full max-w-3xl">
        <p className="text-sm font-semibold text-primary">Learnify.mk</p>
        <h1 className="mt-5 max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          Оваа страница не ја најдовме.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
          Можно е адресата да е погрешна или страницата да е преместена. Одбери
          каде да продолжиш.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            to="/"
          >
            Почетна страница
          </Link>
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            to="/#contact"
          >
            Контакт
          </Link>
        </div>
      </div>
    </main>
  </>
);
