import { Instagram, Mail, MapPin, Phone } from 'lucide-react';

import { AnimateIn } from '@/components/animate-in';
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
            Јави се за да закажеме бесплатен воведен час и да направиме план за
            учење специјално за тебе.
          </p>
        </div>
      </AnimateIn>

      <div className="mx-auto mt-12 grid max-w-3xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <AnimateIn delay={0}>
          <Card className="text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Phone className="h-6 w-6" />
              </div>
              <CardTitle className="text-base">Телефон</CardTitle>
            </CardHeader>
            <CardContent>
              <a
                className="text-muted-foreground hover:text-foreground transition-colors"
                href="tel:+38970123456"
              >
                +389 70 123 456
              </a>
            </CardContent>
          </Card>
        </AnimateIn>

        <AnimateIn delay={100}>
          <Card className="text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <CardTitle className="text-base">Е-пошта</CardTitle>
            </CardHeader>
            <CardContent>
              <a
                className="text-muted-foreground hover:text-foreground transition-colors"
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
          <Card className="text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Instagram className="h-6 w-6" />
              </div>
              <CardTitle className="text-base">Instagram</CardTitle>
            </CardHeader>
            <CardContent>
              <a
                className="text-muted-foreground hover:text-foreground transition-colors"
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

      <div className="mt-10 text-center">
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          Скопје, Северна Македонија
        </div>
      </div>
    </div>
  </section>
);
