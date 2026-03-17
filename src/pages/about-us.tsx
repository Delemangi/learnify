import {
  ArrowLeft,
  Award,
  Briefcase,
  Calendar,
  GraduationCap,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { AnimateIn } from '@/components/animate-in';
import { Footer } from '@/components/footer';
import { LinkedinIcon } from '@/components/icons/linkedin-icon';
import { Navbar } from '@/components/navbar';
import { ScrollToTop } from '@/components/scroll-to-top';
import { SkipLink } from '@/components/skip-link';
import { TEAM_MEMBERS, type TeamMember } from '@/data/team';

const getYearsOfExperience = (since: Date): number => {
  const now = new Date();
  const years = now.getFullYear() - since.getFullYear();
  const hadAnniversary =
    now.getMonth() > since.getMonth() ||
    (now.getMonth() === since.getMonth() && now.getDate() >= since.getDate());
  return hadAnniversary ? years : years - 1;
};

const formatExperience = (since: Date): string => {
  const years = getYearsOfExperience(since);
  if (years <= 0) return '1 година работно искуство';
  return `${years}+ ${years === 1 ? 'година' : 'години'} работно искуство`;
};

const TeamMemberCard = ({ member }: { readonly member: TeamMember }) => (
  <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/50 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-8">
    <div className="mb-6 flex flex-col items-center text-center">
      <div className="mb-5 size-28 overflow-hidden rounded-full border-4 border-background bg-muted shadow-sm sm:size-32">
        {member.image ? (
          <img
            alt={member.name}
            className="size-full object-cover"
            src={member.image}
          />
        ) : (
          <div className="flex size-full items-center justify-center text-3xl font-semibold text-muted-foreground">
            {member.name.charAt(0)}
          </div>
        )}
      </div>
      <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {member.name}
      </h3>
      {member.jobPosition ? (
        <div className="mt-2 flex items-center justify-center gap-1.5 text-sm font-medium text-primary">
          <Briefcase className="size-4" />
          {member.companyUrl && member.jobPosition.includes('@') ? (
            <span>
              {member.jobPosition.split('@')[0]}@{' '}
              <a
                className="underline underline-offset-4"
                href={member.companyUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {member.jobPosition.split('@').slice(1).join('@').trim()}
              </a>
            </span>
          ) : (
            <span>{member.jobPosition}</span>
          )}
        </div>
      ) : null}
    </div>

    <div className="flex flex-1 flex-col rounded-xl bg-muted/50 p-5 text-left">
      {member.degrees.length > 0 && (
        <div className="mb-3">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <GraduationCap className="size-4" />
            <span>Образование</span>
          </div>
          <ul className="flex flex-col gap-1.5">
            {member.degrees.map((degree) => (
              <li
                className="text-sm font-medium leading-tight text-foreground"
                key={degree}
              >
                {degree}
              </li>
            ))}
          </ul>
        </div>
      )}
      {member.certificates.length > 0 && (
        <div>
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Award className="size-4" />
            <span>Сертификати</span>
          </div>
          <ul className="flex flex-col gap-1.5">
            {member.certificates.map((cert) => (
              <li
                className="text-sm font-medium leading-tight text-foreground"
                key={cert}
              >
                {cert}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

    <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-border pt-5 sm:flex-row">
      {member.workingSince ? (
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Calendar className="size-4" />
          <span>{formatExperience(member.workingSince)}</span>
        </div>
      ) : (
        <div />
      )}
      {member.linkedin ? (
        <a
          className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
          href={member.linkedin}
          rel="noopener noreferrer"
          target="_blank"
        >
          <LinkedinIcon className="size-4" />
          <span>LinkedIn</span>
        </a>
      ) : null}
    </div>
  </div>
);

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
