import { BookOpen, Phone, Sparkles } from 'lucide-react';

import { AnimateIn } from '@/components/animate-in';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const Hero = () => (
  <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-32">
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="animate-glow-drift absolute -top-24 left-1/2 h-125 w-200 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
    </div>

    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
      <AnimateIn>
        <Badge
          className="animate-soft-float mb-6 text-sm"
          variant="secondary"
        >
          <BookOpen className="mr-1.5 h-3.5 w-3.5" />
          Чиста Десетка
        </Badge>
      </AnimateIn>

      <AnimateIn delay={100}>
        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Learnify
        </h1>
      </AnimateIn>

      <AnimateIn delay={160}>
        <div className="mt-5 flex justify-center">
          <a
            className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-[linear-gradient(135deg,oklch(0.99_0.016_78/0.94),oklch(0.94_0.05_74/0.92))] px-4 py-2 text-sm font-medium text-foreground shadow-[0_12px_30px_-18px_oklch(0.7_0.2_50_/_0.85)] backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_16px_36px_-18px_oklch(0.7_0.2_50_/_0.95)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:bg-[linear-gradient(135deg,oklch(0.2_0.012_45_/_0.96),oklch(0.24_0.02_48_/_0.94))] dark:text-foreground"
            href="https://finki-hub.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/12 text-primary">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <span>
              <span className="text-muted-foreground">Поддржано од </span>
              <span className="bg-[linear-gradient(135deg,hsl(142_70%_58%),hsl(160_84%_52%))] bg-clip-text text-transparent">
                ФИНКИ Хаб
              </span>
            </span>
          </a>
        </div>
      </AnimateIn>

      <AnimateIn delay={200}>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Приватни часови за студенти од Факултетот за информатички науки и
          компјутерско инженерство. Разбери го материјалот подобро и положи ги
          испитите полесно.
        </p>
      </AnimateIn>

      <AnimateIn delay={350}>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
          >
            <a href="#courses">
              <BookOpen className="mr-2 h-5 w-5" />
              Погледни предмети
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
          >
            <a href="#contact">
              <Phone className="mr-2 h-5 w-5" />
              Контактирај нè
            </a>
          </Button>
        </div>
      </AnimateIn>
    </div>
  </section>
);
