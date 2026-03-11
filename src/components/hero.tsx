import { BookOpen, Phone } from 'lucide-react';

import { AnimateIn } from '@/components/animate-in';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const Hero = () => (
  <section className="relative overflow-hidden py-20 sm:py-32">
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
