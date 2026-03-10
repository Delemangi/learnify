import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { type CourseData, type Semester, semesterLabels } from '@/data/courses';
import { cn } from '@/lib/utils';

import { CourseCard } from './course-card';

const MOBILE_VISIBLE_COUNT = 4;

type SemesterGroupProps = {
  readonly courses: CourseData[];
  readonly semester: Semester;
};

const sortByPopularity = (courses: CourseData[]) =>
  [...courses].sort(
    (a, b) => Number(Boolean(b.popular)) - Number(Boolean(a.popular)),
  );

export const SemesterGroup = ({ courses, semester }: SemesterGroupProps) => {
  const [expanded, setExpanded] = useState(false);
  const sortedCourses = sortByPopularity(courses);
  const hasHiddenCourses = sortedCourses.length > MOBILE_VISIBLE_COUNT;

  return (
    <div className="rounded-2xl border border-border/60 bg-card/80 p-5 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.38)] backdrop-blur-sm dark:bg-card/90 dark:shadow-[0_28px_72px_-40px_rgba(0,0,0,0.82)] sm:p-6">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {semesterLabels[semester]} семестар
      </h3>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {sortedCourses.map((course, index) => (
          <div
            className={cn(
              !expanded && index >= MOBILE_VISIBLE_COUNT && 'hidden sm:block',
            )}
            key={course.title}
          >
            <CourseCard
              course={course}
              semester={semester}
            />
          </div>
        ))}
      </div>
      {hasHiddenCourses ? (
        <div className="mt-4 sm:hidden">
          <Button
            className="w-full"
            onClick={() => {
              setExpanded((current) => !current);
            }}
            type="button"
            variant="outline"
          >
            {expanded
              ? 'Прикажи помалку'
              : `Прикажи уште ${sortedCourses.length - MOBILE_VISIBLE_COUNT}`}
          </Button>
        </div>
      ) : null}
    </div>
  );
};
