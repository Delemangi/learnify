import { X } from 'lucide-react';
import { type RefObject, useLayoutEffect } from 'react';

import { Badge } from '@/components/ui/badge';
import { type CourseData, type Semester, semesterLabels } from '@/data/courses';

export type PanelPosition = null | {
  anchorTop: number;
  left: number;
  top: number;
};

type CoursePopoverProps = {
  readonly course: CourseData;
  readonly isDesktop: boolean;
  readonly onClose: () => void;
  readonly open: boolean;
  readonly panelId: string;
  readonly panelPosition: PanelPosition;
  readonly panelRef: RefObject<HTMLDialogElement | null>;
  readonly semester: Semester;
};

export const CoursePopover = ({
  course,
  isDesktop,
  onClose,
  open,
  panelId,
  panelPosition,
  panelRef,
  semester,
}: CoursePopoverProps) => {
  const readyToOpen = !isDesktop || Boolean(panelPosition);

  useLayoutEffect(() => {
    const dialog = panelRef.current;
    if (readyToOpen && dialog && !dialog.open) dialog.showModal();

    return () => {
      if (dialog?.open) dialog.close();
    };
  }, [panelRef, readyToOpen]);

  useLayoutEffect(() => {
    const dialog = panelRef.current;
    if (!isDesktop || !panelPosition || !dialog) return;

    const bounds = dialog.getBoundingClientRect();
    const margin = 12;
    const below = panelPosition.top;
    const above = panelPosition.anchorTop - bounds.height - margin;
    const top =
      below + bounds.height <= globalThis.innerHeight - margin
        ? below
        : Math.max(margin, above);
    const halfWidth = bounds.width / 2;
    const left = Math.min(
      Math.max(panelPosition.left, halfWidth + margin),
      globalThis.innerWidth - halfWidth - margin,
    );

    dialog.style.top = `${top}px`;
    dialog.style.left = `${left}px`;
  }, [isDesktop, panelPosition, panelRef]);

  if (isDesktop && !panelPosition) {
    return null;
  }

  const closedState = isDesktop
    ? '-translate-y-1.5 scale-[0.985] opacity-0'
    : 'translate-y-4 scale-[0.985] opacity-0';

  return (
    <dialog
      aria-label={course.title}
      className={`fixed inset-x-4 top-auto bottom-4 z-100 m-0 max-h-[min(80vh,42rem)] overflow-y-auto rounded-2xl border border-border/80 bg-card/95 p-4 text-left text-foreground shadow-[0_28px_70px_-36px_rgba(0,0,0,0.55)] backdrop:bg-black/20 backdrop:backdrop-blur-[1px] backdrop-blur-md transition-[opacity,transform] duration-220 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] ${isDesktop ? 'origin-top sm:inset-auto sm:w-80 sm:-translate-x-1/2' : 'origin-bottom'} dark:shadow-[0_28px_80px_-34px_rgba(0,0,0,0.82)] ${open ? 'translate-y-0 scale-100 opacity-100' : closedState}`}
      id={panelId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        ) {
          onClose();
        }
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;

        const focusable = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );
        const first = focusable.at(0);
        const last = focusable.at(-1);

        if (first === undefined || last === undefined) {
          event.preventDefault();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }}
      ref={panelRef}
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
          <h4 className="mt-2 text-base font-semibold leading-tight text-foreground">
            {course.title}
          </h4>
        </div>

        <button
          aria-label="Затвори"
          autoFocus
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          onClick={onClose}
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {course.description}
      </p>

      {course.professor ? (
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Предавач:</span>{' '}
          {course.professor}
        </p>
      ) : null}

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
    </dialog>
  );
};
