import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import { AnimateIn } from '@/components/animate-in';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { ScrollToTop } from '@/components/scroll-to-top';
import { SkipLink } from '@/components/skip-link';
import { TeamMemberCard } from '@/components/team-member-card';
import { TEAM_MEMBERS } from '@/data/team';

export const AboutUs = () => (
  <>
    <SkipLink
      href="#main"
      label="Прескокни до содржина"
    />
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main
        className="flex-1 py-20 sm:py-28"
        id="main"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <Link
              className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              to="/"
            >
              <ArrowLeft className="size-4" />
              Почетна
            </Link>
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                За нас
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Запознајте го нашиот тим
              </p>
            </div>
          </AnimateIn>
          <div className="mt-12 grid items-stretch gap-8 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM_MEMBERS.map((member, index) => (
              <AnimateIn
                className="h-full"
                delay={index * 150}
                key={member.name}
              >
                <TeamMemberCard member={member} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  </>
);
