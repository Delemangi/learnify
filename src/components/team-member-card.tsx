import { Award, Briefcase, Calendar, GraduationCap } from 'lucide-react';

import type { TeamMember } from '@/data/team';

import { LinkedinIcon } from '@/components/icons/linkedin-icon';
import { formatExperience } from '@/lib/date-utils';

export const TeamMemberCard = ({ member }: { readonly member: TeamMember }) => (
  <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/50 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-8">
    <div className="mb-6 flex flex-col items-center text-center">
      <div className="mb-5 size-28 overflow-hidden rounded-full border-4 border-background bg-muted shadow-sm sm:size-32">
        <img
          alt={member.name}
          className="size-full object-cover"
          src={member.image}
        />
      </div>
      <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {member.name}
      </h3>
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
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Calendar className="size-4" />
        <span>{formatExperience(member.workingSince)}</span>
      </div>
      <a
        className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
        href={member.linkedin}
        rel="noopener noreferrer"
        target="_blank"
      >
        <LinkedinIcon className="size-4" />
        <span>LinkedIn</span>
      </a>
    </div>
  </div>
);
