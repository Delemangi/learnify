import { Search } from 'lucide-react';
import { useState } from 'react';

import { AnimateIn } from '@/components/animate-in';
import { CourseCard } from '@/components/course-card';
import { Button } from '@/components/ui/button';
import {
  coursesBySemester,
  type Semester,
  semesterLabels,
  semesters,
} from '@/data/courses';

const COLLAPSED_COUNT = 8;

export const CoursesSection = () => {
  const [active, setActive] = useState<'Сите' | Semester>('Сите');
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState('');

  const allCourses = (
    active === 'Сите'
      ? semesters.flatMap((s) => coursesBySemester[s])
      : [...coursesBySemester[active]]
  ).sort((a, b) => Number(Boolean(b.popular)) - Number(Boolean(a.popular)));

  const normalizedQuery = query.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;

  const filtered = allCourses.filter((course) => {
    if (!normalizedQuery) {
      return true;
    }

    return [course.title, course.description, ...course.tags]
      .join(' ')
      .toLowerCase()
      .includes(normalizedQuery);
  });

  const visible =
    isSearching || expanded ? filtered : filtered.slice(0, COLLAPSED_COUNT);
  const hiddenCount = filtered.length - visible.length;

  const handleFilterChange = (label: 'Сите' | Semester) => {
    setActive(label);
    setExpanded(false);
  };

  return (
    <section
      className="py-20 sm:py-28 bg-muted/40"
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

        <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              aria-label="Пребарај предмет"
              className="h-11 w-full rounded-full border border-border/70 bg-background pl-11 pr-4 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              placeholder="Пребарај предмет..."
              type="search"
              value={query}
            />
          </div>

          <div className="flex shrink-0 items-center justify-center gap-1.5">
            {(['Сите', ...semesters] as const).map((label) => (
              <Button
                key={label}
                onClick={() => {
                  handleFilterChange(label);
                }}
                size="sm"
                variant={active === label ? 'default' : 'outline'}
              >
                {label === 'Сите' ? 'Сите' : semesterLabels[label]}
              </Button>
            ))}
          </div>
        </div>

        {isSearching && filtered.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-border/70 bg-muted/30 px-6 py-10 text-center">
            <p className="text-base font-medium">Нема пронајдени предмети</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Обиди се со друго име на предмет, ознака или клучен поим.
            </p>
          </div>
        ) : null}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((course, index) => (
            <CourseCard
              course={course}
              index={index}
              key={course.title}
            />
          ))}
        </div>

        {!isSearching && hiddenCount > 0 ? (
          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => {
                setExpanded(true);
              }}
              size="lg"
              variant="outline"
            >
              Прикажи уште {hiddenCount} предмети
            </Button>
          </div>
        ) : null}

        {!isSearching && expanded && filtered.length > COLLAPSED_COUNT ? (
          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => {
                setExpanded(false);
              }}
              size="lg"
              variant="ghost"
            >
              Прикажи помалку
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
};
