import type { Semester } from './course-types';

export const semesters: Semester[] = ['winter', 'summer'];

export const semesterLabels: Record<Semester, string> = {
  summer: 'Летен',
  winter: 'Зимски',
};
