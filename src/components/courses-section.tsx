import { Plus, Star } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';

import { AnimateIn } from '@/components/animate-in';
import { Badge } from '@/components/ui/badge';
import {
  type CourseData,
  coursesBySemester,
  type Semester,
  semesterLabels,
  semesters,
} from '@/data/courses';
import { ICON_MAP } from '@/data/icon-map';

const CourseCard = ({
  course,
  semester,
}: {
  readonly course: CourseData;
  readonly semester: Semester;
}) => {
  const Icon = ICON_MAP[course.icon];
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line unicorn/no-useless-undefined
      return undefined;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div
      className={open ? 'relative z-30' : 'relative'}
      ref={wrapperRef}
    >
      {open ? (
        <button
          aria-label="Затвори детали за предметот"
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px] sm:hidden"
          onClick={() => {
            setOpen(false);
          }}
          type="button"
        />
      ) : null}

      <button
        aria-controls={panelId}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="group flex h-full min-h-18 w-full cursor-pointer items-center gap-2.5 rounded-lg border border-border/60 bg-background/70 px-3 py-2.5 text-left transition-colors hover:border-primary/30 hover:bg-primary/5 sm:min-h-[5rem]"
        onClick={() => {
          setOpen((current) => !current);
        }}
        type="button"
      >
        <Icon className="h-4 w-4 shrink-0 text-primary" />
        <div className="min-w-0 flex-1">
          <span className="text-sm font-medium leading-tight">
            {course.title}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {course.popular ? (
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/14 text-primary">
              <Star className="h-3.5 w-3.5 fill-current" />
            </span>
          ) : null}
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-105 group-hover:bg-primary/14">
            <Plus
              className={
                open
                  ? 'h-3.5 w-3.5 rotate-45 transition-transform duration-200'
                  : 'h-3.5 w-3.5 transition-transform duration-200'
              }
            />
          </span>
        </div>
      </button>

      {open ? (
        <div
          aria-label={course.title}
          className="fixed inset-x-4 bottom-4 z-50 rounded-2xl border border-border/80 bg-card/95 p-4 text-left shadow-[0_28px_70px_-36px_rgba(0,0,0,0.55)] backdrop-blur-md sm:absolute sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-[calc(100%+0.75rem)] sm:z-20 sm:w-80 sm:-translate-x-1/2 dark:shadow-[0_28px_80px_-34px_rgba(0,0,0,0.82)]"
          id={panelId}
          role="dialog"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <span>{semesterLabels[semester]} семестар</span>
                {course.popular ? (
                  <Badge
                    className="rounded-full border-transparent bg-primary/15 px-2 py-0.5 text-[10px] text-primary hover:bg-primary/15"
                    variant="secondary"
                  >
                    Популарен
                  </Badge>
                ) : null}
              </div>
              <h4 className="mt-2 text-base font-semibold leading-tight">
                {course.title}
              </h4>
            </div>

            <button
              aria-label="Затвори"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              onClick={() => {
                setOpen(false);
              }}
              type="button"
            >
              x
            </button>
          </div>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {course.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {course.tags.map((tag) => (
              <Badge
                className="rounded-full bg-secondary/85 px-2.5 py-1 text-[11px]"
                key={tag}
                variant="secondary"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <a
            className="mt-4 inline-flex text-sm font-medium text-primary transition-opacity hover:opacity-80"
            href="#contact"
            onClick={() => {
              setOpen(false);
            }}
          >
            Прашај за приватен час
          </a>
        </div>
      ) : null}
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
            semester={semester}
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
