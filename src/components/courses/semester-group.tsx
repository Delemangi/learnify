import { type CourseData, type Semester, semesterLabels } from '@/data/courses';

import { CourseCard } from './course-card';

type SemesterGroupProps = {
  readonly courses: CourseData[];
  readonly semester: Semester;
};

const sortByPopularity = (courses: CourseData[]) =>
  [...courses].sort(
    (a, b) => Number(Boolean(b.popular)) - Number(Boolean(a.popular)),
  );

export const SemesterGroup = ({ courses, semester }: SemesterGroupProps) => {
  const sortedCourses = sortByPopularity(courses);

  return (
    <div className="rounded-2xl border border-border/60 bg-card/80 p-5 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.38)] backdrop-blur-sm dark:bg-card/90 dark:shadow-[0_28px_72px_-40px_rgba(0,0,0,0.82)] sm:p-6">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {semesterLabels[semester]} семестар
      </h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {sortedCourses.map((course) => (
          <CourseCard
            course={course}
            key={course.title}
            semester={semester}
          />
        ))}
      </div>
    </div>
  );
};
