import { AnimateIn } from '@/components/animate-in';
import {
  type CourseData,
  coursesBySemester,
  type Semester,
  semesterLabels,
  semesters,
} from '@/data/courses';
import { ICON_MAP } from '@/data/icon-map';

const CourseCard = ({ course }: { readonly course: CourseData }) => {
  const Icon = ICON_MAP[course.icon];

  return (
    <div className="flex h-full items-center gap-2.5 rounded-lg border border-border/60 bg-background/70 px-3 py-2.5 transition-colors hover:border-primary/30 hover:bg-primary/5">
      <Icon className="h-4 w-4 shrink-0 text-primary" />
      <span className="text-sm font-medium leading-tight">{course.title}</span>
    </div>
  );
};

const SemesterGroup = ({
  courses,
  semester,
}: {
  readonly courses: CourseData[];
  readonly semester: Semester;
}) => {
  const sorted = [...courses].sort(
    (a, b) => Number(Boolean(b.popular)) - Number(Boolean(a.popular)),
  );

  return (
    <div className="rounded-2xl border border-border/60 bg-card/80 p-5 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.38)] backdrop-blur-sm dark:bg-card/90 dark:shadow-[0_28px_72px_-40px_rgba(0,0,0,0.82)] sm:p-6">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {semesterLabels[semester]} семестар
      </h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {sorted.map((course) => (
          <CourseCard
            course={course}
            key={course.title}
          />
        ))}
      </div>
    </div>
  );
};

export const CoursesSection = () => (
  <section
    className="relative overflow-hidden py-20 sm:py-28"
    id="courses"
  >
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute left-0 top-24 h-72 w-72 -translate-x-1/3 rounded-full bg-primary/8 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute bottom-16 right-0 h-72 w-72 translate-x-1/3 rounded-full bg-accent/12 blur-3xl sm:h-96 sm:w-96" />
    </div>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <AnimateIn>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Предмети
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Нудиме приватни часови за најбараните предмети од ФИНКИ. Доколку
            твојот предмет не е наведен, контактирај нè.
          </p>
        </div>
      </AnimateIn>

      <div className="mt-10 space-y-8">
        {semesters.map((semester, index) => (
          <AnimateIn
            delay={index * 150}
            key={semester}
          >
            <SemesterGroup
              courses={coursesBySemester[semester]}
              semester={semester}
            />
          </AnimateIn>
        ))}
      </div>
    </div>
  </section>
);
