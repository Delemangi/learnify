import { ArrowUpRight, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

import { AnimateIn } from '@/components/animate-in';
import { DiscordIcon } from '@/components/icons/discord-icon';

const discordInvite = 'https://discord.gg/ArSwaDE4re';
const discordWidgetApi =
  'https://discord.com/api/guilds/1558165639284129835/widget.json';

type DiscordWidget = {
  readonly presence_count?: number;
};

export const CommunitySection = () => {
  const [onlineCount, setOnlineCount] = useState<null | number>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadPresence = async () => {
      try {
        const response = await fetch(discordWidgetApi, {
          signal: controller.signal,
        });

        if (!response.ok) return;

        const data = (await response.json()) as DiscordWidget;
        if (typeof data.presence_count === 'number') {
          setOnlineCount(data.presence_count);
        }
      } catch {
        // Presence is optional; the invite remains available if Discord is unreachable.
      }
    };

    void loadPresence();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <section
      className="relative py-20 sm:py-28"
      id="community"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateIn>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border/70 bg-card/75 shadow-lg shadow-primary/5 backdrop-blur-sm">
            <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full border-[48px] border-primary/[0.06]" />
            <div className="relative grid gap-8 p-6 sm:p-9 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-10 md:p-12">
              <div className="max-w-xl">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
                  <DiscordIcon className="h-5 w-5" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Учи подобро, заедно.
                </h2>
                <p className="mt-4 max-w-lg leading-7 text-muted-foreground">
                  Приклучи се на Дискорд за прашања, совети за учење и разговор
                  со други студенти.
                </p>
              </div>

              <div className="flex flex-col items-start gap-5 border-t border-border/70 pt-6 md:min-w-56 md:items-end md:border-l md:border-t-0 md:pl-10 md:pt-0">
                {onlineCount === null ? null : (
                  <p
                    aria-live="polite"
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50 motion-reduce:animate-none" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                    </span>
                    <span className="font-semibold text-foreground">
                      {onlineCount.toLocaleString('mk-MK')}
                    </span>
                    <Users
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                    онлајн сега
                  </p>
                )}

                <a
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  href={discordInvite}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Влези во Дискорд
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                  <span className="sr-only"> (се отвора во нов таб)</span>
                </a>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
};
