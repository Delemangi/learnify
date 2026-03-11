import { ChevronRight, Star } from 'lucide-react';
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
    mounted,
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
        className="group relative flex h-full min-h-18 w-full items-center gap-2.5 rounded-lg border border-border/60 bg-background/70 px-3 py-2.5 pr-11 text-left transition-colors hover:border-primary/30 hover:bg-primary/5 sm:min-h-20 sm:pr-12"
        onClick={toggle}
        ref={buttonRef}
        type="button"
      >
        {course.popular ? (
          <span
            aria-label="Популарен"
            className="absolute -right-1.5 -top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-primary/25 bg-background text-primary shadow-sm"
            title="Популарен"
          >
            <Star className="h-3 w-3 fill-current" />
          </span>
        ) : null}

        <Icon className="h-4 w-4 shrink-0 text-primary" />
        <div className="min-w-0 flex-1">
          <span className="block text-sm leading-snug font-medium">
            {course.title}
          </span>
        </div>
        <span className="absolute right-2 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md border border-border/70 bg-background/80 text-primary/85 shadow-sm transition-all duration-220 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-primary/30 group-hover:bg-primary/8 group-hover:text-primary">
          <ChevronRight
            className={
              open
                ? 'h-3 w-3 rotate-90 transition-transform duration-220 ease-[cubic-bezier(0.22,1,0.36,1)]'
                : 'h-3 w-3 transition-transform duration-220 ease-[cubic-bezier(0.22,1,0.36,1)]'
            }
          />
        </span>
      </button>

      {mounted
        ? createPortal(
            <>
              <button
                aria-label="Затвори детали за предметот"
                className={`fixed inset-0 z-90 bg-black/20 backdrop-blur-[1px] transition-opacity duration-220 ease-[cubic-bezier(0.22,1,0.36,1)] sm:hidden ${open ? 'opacity-100' : 'opacity-0'}`}
                onClick={close}
                type="button"
              />
              <CoursePopover
                course={course}
                isDesktop={isDesktop}
                onClose={close}
                open={open}
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
