import { Mail } from 'lucide-react';

import { AnimateIn } from '@/components/animate-in';
import { ContactCard } from '@/components/contact/contact-card';
import { FacebookIcon } from '@/components/icons/facebook-icon';
import { InstagramIcon } from '@/components/icons/instagram-icon';

type ContactMethod = {
  readonly delay: number;
  readonly external?: boolean;
  readonly href: string;
  readonly icon: typeof FacebookIcon | typeof InstagramIcon | typeof Mail;
  readonly label: string;
  readonly title: string;
  readonly wrapperClassName?: string;
};

const CONTACT_METHODS: ContactMethod[] = [
  {
    delay: 0,
    external: true,
    href: 'https://facebook.com/learnify.mk',
    icon: FacebookIcon,
    label: 'Learnify.mk',
    title: 'Facebook',
  },
  {
    delay: 100,
    href: 'mailto:info@learnify.mk',
    icon: Mail,
    label: 'info@learnify.mk',
    title: 'Е-пошта',
  },
  {
    delay: 200,
    external: true,
    href: 'https://instagram.com/learnify.mk',
    icon: InstagramIcon,
    label: '@learnify.mk',
    title: 'Instagram',
    wrapperClassName: 'sm:col-span-2 lg:col-span-1',
  },
];

export const ContactSection = () => (
  <section
    className="bg-muted/40 py-20 sm:py-28"
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
        {CONTACT_METHODS.map((method) => (
          <AnimateIn
            className={method.wrapperClassName}
            delay={method.delay}
            key={method.title}
          >
            <ContactCard
              external={method.external}
              href={method.href}
              icon={method.icon}
              label={method.label}
              title={method.title}
            />
          </AnimateIn>
        ))}
      </div>
    </div>
  </section>
);
