import { ChevronDown } from 'lucide-react';

import { AnimateIn } from '@/components/animate-in';
import { faqItems } from '@/data/faq';

export const FaqSection = () => (
  <section
    className="py-20 sm:py-28"
    id="faq"
  >
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <AnimateIn>
        <div className="text-center">
          <span className="inline-flex items-center justify-center rounded-full border border-border/70 bg-background/70 px-4 py-1 text-center text-xs font-semibold leading-none uppercase tracking-[0.28em] text-muted-foreground backdrop-blur">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Често поставувани прашања
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Кратки одговори за начинот на работа, подготовката и контактот со
            Learnify.
          </p>
        </div>
      </AnimateIn>

      <div className="mt-12 space-y-4">
        {faqItems.map((item, index) => (
          <AnimateIn
            delay={index * 90}
            key={item.question}
          >
            <details className="group rounded-3xl border border-border/70 bg-card/80 px-6 py-5 shadow-sm backdrop-blur-sm transition-colors open:border-primary/40 open:bg-background/90">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold marker:hidden">
                <span>{item.question}</span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-open:rotate-180">
                  <ChevronDown className="h-5 w-5" />
                </span>
              </summary>
              <p className="pr-14 pt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                {item.answer}
              </p>
            </details>
          </AnimateIn>
        ))}
      </div>
    </div>
  </section>
);
