import { PartyPopper, Rocket, Sparkles, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { DiscordIcon } from '@/components/icons/discord-icon';

export const PromotionDialog = () => {
  const [visible, setVisible] = useState(true);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!visible) return () => {};
    const dialog = dialogRef.current;
    if (dialog === null) return () => {};

    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    dialog.showModal();
    dialog.querySelector<HTMLButtonElement>('[aria-label="Затвори"]')?.focus();

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <dialog
      aria-label="Промоции"
      className="promotion-dialog"
      onClose={() => {
        setVisible(false);
      }}
      ref={dialogRef}
    >
      <section className="promotion-dialog__panel rounded-2xl border border-primary/25 bg-card/95 p-5 text-foreground shadow-[0_28px_70px_-36px_rgba(0,0,0,0.55)] ring-1 ring-primary/10 backdrop-blur-md sm:p-6 dark:shadow-[0_28px_80px_-34px_rgba(0,0,0,0.82)]">
        <div className="mb-5 grid grid-cols-[1fr_auto_1fr] items-center border-b border-border/60 pb-4">
          <h2 className="col-start-2 flex items-center gap-2.5 whitespace-nowrap text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/12 text-primary">
              <Sparkles
                aria-hidden="true"
                className="h-4 w-4"
              />
            </span>
            <span>Промоции</span>
          </h2>
          <button
            aria-label="Затвори"
            autoFocus
            className="col-start-3 inline-flex h-11 w-11 shrink-0 justify-self-end items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            onClick={() => {
              dialogRef.current?.close();
            }}
            type="button"
          >
            <X
              aria-hidden="true"
              className="h-4 w-4"
            />
          </button>
        </div>
        <div className="grid gap-3">
          <article className="promotion-dialog__featured flex items-center gap-4 rounded-xl border border-primary/35 bg-primary/8 p-5 text-left sm:gap-5 sm:p-6">
            <div
              aria-hidden="true"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary sm:h-14 sm:w-14"
            >
              <PartyPopper className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <p className="text-base leading-7 font-semibold text-card-foreground sm:text-lg">
              Искористи{' '}
              <span className="font-bold text-primary">50% попуст</span> на
              курсот по Структурно програмирање!
            </p>
          </article>
          <article className="flex items-center gap-4 rounded-xl border border-border/60 bg-background/70 p-5 text-left sm:gap-5 sm:p-6">
            <div
              aria-hidden="true"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary sm:h-14 sm:w-14"
            >
              <Rocket className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <p className="text-base leading-7 font-semibold text-card-foreground sm:text-lg">
              Запиши се на Веб програмирање + Бази на податоци и добиј{' '}
              <span className="font-bold text-primary">
                гратис Full-Stack курс
              </span>
              <span>!</span>
            </p>
          </article>
        </div>
        <footer className="mt-5 flex flex-wrap items-center gap-x-1.5 gap-y-1 border-t border-border/60 pt-4 text-sm leading-6 text-muted-foreground">
          <span>За повеќе информации, влезете во</span>
          <a
            className="inline-flex items-center gap-1.5 font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            href="https://discord.gg/ArSwaDE4re"
            rel="noopener noreferrer"
            target="_blank"
          >
            <DiscordIcon className="h-4 w-4" />
            Discord серверот.
          </a>
        </footer>
      </section>
    </dialog>
  );
};
