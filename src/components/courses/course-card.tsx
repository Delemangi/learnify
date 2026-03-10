import { Plus, Star } from 'lucide-react';
import { createPortal } from 'react-dom';

import { type CourseData, type Semester } from '@/data/courses';
import { ICON_MAP } from '@/data/icon-map';

import { CoursePopover } from './course-popover';
import { useCoursePopover } from './use-course-popover';

type CourseCardProps = {
  readonly course: CourseData;
  readonly semester: Semester;
};

export const CourseCard = ({ course, semester }: CourseCardProps) => {
  const Icon = ICON_MAP[course.icon];
  const {
    buttonRef,
    close,
    isDesktop,
    open,
    panelId,
    panelPosition,
    panelRef,
    toggle,
    wrapperRef,
  } = useCoursePopover();

  return (
    <div
      className={open ? 'relative z-30' : 'relative'}
      ref={wrapperRef}
    >
      <button
        aria-controls={panelId}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="group flex h-full min-h-18 w-full cursor-pointer items-center gap-2.5 rounded-lg border border-border/60 bg-background/70 px-3 py-2.5 text-left transition-colors hover:border-primary/30 hover:bg-primary/5 sm:min-h-[5rem]"
        onClick={toggle}
        ref={buttonRef}
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

      {open
        ? createPortal(
            <>
              <button
                aria-label="Затвори детали за предметот"
                className="fixed inset-0 z-90 bg-black/20 backdrop-blur-[1px] sm:hidden"
                onClick={close}
                type="button"
              />
              <CoursePopover
                course={course}
                isDesktop={isDesktop}
                onClose={close}
                panelId={panelId}
                panelPosition={panelPosition}
                panelRef={panelRef}
                semester={semester}
              />
            </>,
            document.body,
          )
        : null}
    </div>
  );
};
