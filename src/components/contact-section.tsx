import { Mail } from 'lucide-react';

import { AnimateIn } from '@/components/animate-in';
import { FacebookIcon } from '@/components/icons/facebook-icon';
import { InstagramIcon } from '@/components/icons/instagram-icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ContactSection = () => (
  <section
    className="py-20 sm:py-28 bg-muted/40"
    id="contact"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <AnimateIn>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Контакт
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Контактирај нè ако си заинтересиран/а. Можеш да ни пишеш на е-пошта,
            Facebook или Instagram.
          </p>
        </div>
      </AnimateIn>

      <div className="mx-auto mt-12 grid max-w-3xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <AnimateIn delay={0}>
          <Card className="flex flex-row items-center gap-4 p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:block sm:p-0 sm:text-center">
            <CardHeader className="shrink-0 p-0 sm:p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary sm:mx-auto sm:h-12 sm:w-12">
                <FacebookIcon className="h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent className="min-w-0 flex-1 p-0 sm:p-6 sm:pt-0">
              <CardTitle className="text-sm sm:text-base">Facebook</CardTitle>
              <a
                className="mt-1 block truncate text-sm text-muted-foreground transition-colors hover:text-foreground"
                href="https://facebook.com/learnify.mk"
                rel="noopener noreferrer"
                target="_blank"
              >
                Learnify.mk
                <span className="sr-only"> (се отвора во нов прозорец)</span>
              </a>
            </CardContent>
          </Card>
        </AnimateIn>

        <AnimateIn delay={100}>
          <Card className="flex flex-row items-center gap-4 p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:block sm:p-0 sm:text-center">
            <CardHeader className="shrink-0 p-0 sm:p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary sm:mx-auto sm:h-12 sm:w-12">
                <Mail className="h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent className="min-w-0 flex-1 p-0 sm:p-6 sm:pt-0">
              <CardTitle className="text-sm sm:text-base">Е-пошта</CardTitle>
              <a
                className="mt-1 block truncate text-sm text-muted-foreground transition-colors hover:text-foreground"
                href="mailto:info@learnify.mk"
              >
                info@learnify.mk
              </a>
            </CardContent>
          </Card>
        </AnimateIn>

        <AnimateIn
          className="sm:col-span-2 lg:col-span-1"
          delay={200}
        >
          <Card className="flex flex-row items-center gap-4 p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:block sm:p-0 sm:text-center">
            <CardHeader className="shrink-0 p-0 sm:p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary sm:mx-auto sm:h-12 sm:w-12">
                <InstagramIcon className="h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent className="min-w-0 flex-1 p-0 sm:p-6 sm:pt-0">
              <CardTitle className="text-sm sm:text-base">Instagram</CardTitle>
              <a
                className="mt-1 block truncate text-sm text-muted-foreground transition-colors hover:text-foreground"
                href="https://instagram.com/learnify.mk"
                rel="noopener noreferrer"
                target="_blank"
              >
                @learnify.mk
                <span className="sr-only"> (се отвора во нов прозорец)</span>
              </a>
            </CardContent>
          </Card>
        </AnimateIn>
      </div>
    </div>
  </section>
);
