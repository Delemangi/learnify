import { AnimateIn } from '@/components/animate-in';
import { SemesterGroup } from '@/components/courses/semester-group';
import { coursesBySemester, semesters } from '@/data/courses';

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
