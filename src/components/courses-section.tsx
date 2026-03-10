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
    <div className="flex h-full items-center gap-2.5 rounded-lg border border-border/60 px-3 py-2.5 transition-colors hover:border-primary/30 hover:bg-primary/5">
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
    <div>
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
    className="bg-muted/40 py-20 sm:py-28"
    id="courses"
  >
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
