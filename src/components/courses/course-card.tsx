import { Plus, Star, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { type CourseData, type Semester, semesterLabels } from '@/data/courses';
import { ICON_MAP } from '@/data/icon-map';

type CourseCardProps = {
  readonly course: CourseData;
  readonly semester: Semester;
};

export const CourseCard = ({ course, semester }: CourseCardProps) => {
  const Icon = ICON_MAP[course.icon];
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return () => {};
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
              <X className="h-4 w-4" />
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
