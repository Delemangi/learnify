import { AnimateIn } from '@/components/animate-in';
import { type CourseData, coursesBySemester } from '@/data/courses';
import { ICON_MAP } from '@/data/icon-map';

const CoursePill = ({ course }: { readonly course: CourseData }) => {
  const Icon = ICON_MAP[course.icon];

  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border/60 bg-background px-3 py-1.5 text-sm shadow-sm transition-colors hover:border-primary/30 hover:bg-primary/5">
      <Icon className="h-3.5 w-3.5 text-primary" />
      <span className="whitespace-nowrap font-medium">{course.title}</span>
    </span>
  );
};

type MarqueeStripProps = {
  readonly courses: CourseData[];
  readonly reverse?: boolean;
};

const MarqueeStrip = ({ courses, reverse = false }: MarqueeStripProps) => (
  <div
    className="group relative overflow-hidden"
    style={{
      maskImage:
        'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      WebkitMaskImage:
        'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
    }}
  >
    <div
      aria-hidden="true"
      className={`flex w-max gap-3 py-2 hover:paused ${
        reverse ? 'animate-marquee-reverse' : 'animate-marquee'
      }`}
    >
      {/* Render the list twice for seamless looping */}
      {[0, 1].map((copy) => (
        <div
          className="flex shrink-0 gap-3"
          key={copy}
        >
          {courses.map((course) => (
            <CoursePill
              course={course}
              key={course.title}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const CoursesMarquee = () => {
  const winterCourses = coursesBySemester.winter;
  const summerCourses = coursesBySemester.summer;

  return (
    <aside
      aria-label="Листа на предмети"
      className="py-10 sm:py-14"
    >
      {/* Accessible hidden list for screen readers */}
      <ul className="sr-only">
        {[...winterCourses, ...summerCourses].map((course) => (
          <li key={course.title}>{course.title}</li>
        ))}
      </ul>

      <AnimateIn className="space-y-2">
        <MarqueeStrip courses={winterCourses} />
        <MarqueeStrip
          courses={summerCourses}
          reverse
        />
      </AnimateIn>
    </aside>
  );
};
