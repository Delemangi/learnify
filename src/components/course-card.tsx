import { Star } from 'lucide-react';

import { AnimateIn } from '@/components/animate-in';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { type CourseData, semesterLabels } from '@/data/courses';
import { ICON_MAP } from '@/data/icon-map';

type CourseCardProps = {
  readonly course: CourseData;
  readonly index: number;
};

export const CourseCard = ({ course, index }: CourseCardProps) => {
  const Icon = ICON_MAP[course.icon];
  const visibleTags = course.tags.slice(0, 2);
  const remainingTags = course.tags.length - visibleTags.length;

  return (
    <AnimateIn delay={index * 75}>
      <Card className="group relative flex h-full flex-col border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        {course.popular ? (
          <div className="absolute -top-2.5 right-4">
            <Badge className="bg-amber-500 text-white hover:bg-amber-600 shadow-sm">
              <Star className="mr-1 h-3 w-3" /> Популарен
            </Badge>
          </div>
        ) : null}
        <CardHeader className="space-y-3 pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
              <Icon className="h-7 w-7" />
            </div>
            <Badge
              className="shrink-0"
              variant="outline"
            >
              {semesterLabels[course.semester]}
            </Badge>
          </div>
          <CardTitle className="text-lg">{course.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-4">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {course.description}
          </p>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 pt-0">
          {visibleTags.map((tag) => (
            <Badge
              className="text-xs"
              key={tag}
              variant="secondary"
            >
              {tag}
            </Badge>
          ))}
          {remainingTags > 0 ? (
            <Badge
              className="text-xs"
              variant="secondary"
            >
              +{remainingTags}
            </Badge>
          ) : null}
        </CardFooter>
      </Card>
    </AnimateIn>
  );
};
