import type { RefObject } from 'react';

import { X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { type CourseData, type Semester, semesterLabels } from '@/data/courses';

export type PanelPosition = null | {
  left: number;
  top: number;
};

type CoursePopoverProps = {
  readonly course: CourseData;
  readonly isDesktop: boolean;
  readonly onClose: () => void;
  readonly panelId: string;
  readonly panelPosition: PanelPosition;
  readonly panelRef: RefObject<HTMLDivElement | null>;
  readonly semester: Semester;
};

export const CoursePopover = ({
  course,
  isDesktop,
  onClose,
  panelId,
  panelPosition,
  panelRef,
  semester,
}: CoursePopoverProps) => {
  if (isDesktop && !panelPosition) {
    return null;
  }

  return (
    <div
      aria-label={course.title}
      className="fixed inset-x-4 bottom-4 z-100 rounded-2xl border border-border/80 bg-card/95 p-4 text-left shadow-[0_28px_70px_-36px_rgba(0,0,0,0.55)] backdrop-blur-md sm:inset-auto sm:w-80 sm:-translate-x-1/2 dark:shadow-[0_28px_80px_-34px_rgba(0,0,0,0.82)]"
      id={panelId}
      ref={panelRef}
      role="dialog"
      style={
        isDesktop && panelPosition
          ? {
              left: `${panelPosition.left}px`,
              top: `${panelPosition.top}px`,
            }
          : undefined
      }
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
          onClick={onClose}
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
    </div>
  );
};
