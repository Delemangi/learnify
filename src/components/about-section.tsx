import { AnimateIn } from '@/components/animate-in';
import { features } from '@/data/features';

export const AboutSection = () => (
  <section
    className="py-20 sm:py-28"
    id="about"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <AnimateIn>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Зошто Learnify?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Часовите се насочени кон подобро разбирање на материјалот и
            поефикасна подготовка за колоквиуми и испити.
          </p>
        </div>
      </AnimateIn>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <AnimateIn
              delay={index * 100}
              key={feature.title}
            >
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </AnimateIn>
          );
        })}
      </div>
    </div>
  </section>
);
