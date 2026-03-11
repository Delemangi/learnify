import type { CourseData, Semester } from './course-types';

export const PRACTICAL_COURSE_DESCRIPTION =
  'Сеопфатно објаснување на практичниот дел од предметот, проследено со решавање лабораториски вежби и задачи од претходни испити.';

export const THEORY_AND_PRACTICAL_DESCRIPTION =
  'Сеопфатно објаснување на теоретскиот и практичниот дел од предметот, проследено со решавање лабораториски вежби и задачи од претходни испити.';

export const THEORY_AND_PRACTICAL_WITHOUT_LAB_DESCRIPTION =
  'Сеопфатно објаснување на теоретскиот и практичниот дел од предметот, проследено со решавање задачи од претходни испити.';

export const winterCourses: CourseData[] = [
  {
    description: PRACTICAL_COURSE_DESCRIPTION,
    icon: 'code',
    semester: 'winter',
    tags: ['C'],
    title: 'Структурно програмирање',
  },
  {
    description: THEORY_AND_PRACTICAL_DESCRIPTION,
    icon: 'calculator',
    semester: 'winter',
    tags: [],
    title: 'Математика 1',
  },
  {
    description: THEORY_AND_PRACTICAL_WITHOUT_LAB_DESCRIPTION,
    icon: 'calculator',
    semester: 'winter',
    tags: [],
    title: 'Калкулус 1',
  },
  {
    description: PRACTICAL_COURSE_DESCRIPTION,
    icon: 'brain',
    popular: true,
    semester: 'winter',
    tags: ['Java'],
    title: 'Алгоритми и податочни структури',
  },
  {
    description: PRACTICAL_COURSE_DESCRIPTION,
    icon: 'brain',
    semester: 'winter',
    tags: ['Java'],
    title: 'Примена на алгоритми и податочни структури',
  },
  {
    description: PRACTICAL_COURSE_DESCRIPTION,
    icon: 'code',
    semester: 'winter',
    tags: ['Java'],
    title: 'Напредно програмирање',
  },
  {
    description: PRACTICAL_COURSE_DESCRIPTION,
    icon: 'monitor',
    popular: true,
    semester: 'winter',
    tags: ['Spring Boot', 'Thymeleaf'],
    title: 'Веб програмирање',
  },
  {
    description: THEORY_AND_PRACTICAL_DESCRIPTION,
    icon: 'database',
    popular: true,
    semester: 'winter',
    tags: ['SQL'],
    title: 'Бази на податоци',
  },
  {
    description: THEORY_AND_PRACTICAL_DESCRIPTION,
    icon: 'bar-chart',
    popular: true,
    semester: 'winter',
    tags: ['Python', 'AI'],
    title: 'Вовед во наука за податоци',
  },
  {
    description: THEORY_AND_PRACTICAL_WITHOUT_LAB_DESCRIPTION,
    icon: 'calculator',
    semester: 'winter',
    tags: [],
    title: 'Математика 3',
  },
  {
    description: THEORY_AND_PRACTICAL_WITHOUT_LAB_DESCRIPTION,
    icon: 'bar-chart',
    semester: 'winter',
    tags: [],
    title: 'Веројатност и статистика',
  },
  {
    description: PRACTICAL_COURSE_DESCRIPTION,
    icon: 'layers',
    semester: 'winter',
    tags: ['Spring Boot', 'Flask', 'React'],
    title: 'Дизајн и архитектура на софтвер',
  },
];

export const summerCourses: CourseData[] = [
  {
    description: PRACTICAL_COURSE_DESCRIPTION,
    icon: 'code',
    popular: true,
    semester: 'summer',
    tags: ['C++'],
    title: 'Објектно-ориентирано програмирање',
  },
  {
    description: THEORY_AND_PRACTICAL_WITHOUT_LAB_DESCRIPTION,
    icon: 'calculator',
    semester: 'summer',
    tags: [],
    title: 'Математика 2',
  },
  {
    description: THEORY_AND_PRACTICAL_WITHOUT_LAB_DESCRIPTION,
    icon: 'calculator',
    semester: 'summer',
    tags: [],
    title: 'Калкулус 2',
  },
  {
    description: THEORY_AND_PRACTICAL_DESCRIPTION,
    icon: 'cpu',
    popular: true,
    semester: 'summer',
    tags: ['Java'],
    title: 'Оперативни системи',
  },
  {
    description: PRACTICAL_COURSE_DESCRIPTION,
    icon: 'cpu',
    semester: 'summer',
    tags: [],
    title: 'Архитектура и организација на компјутери',
  },
  {
    description: THEORY_AND_PRACTICAL_DESCRIPTION,
    icon: 'brain',
    semester: 'summer',
    tags: ['Python'],
    title: 'Вештачка интелигенција',
  },
  {
    description: PRACTICAL_COURSE_DESCRIPTION,
    icon: 'smartphone',
    popular: true,
    semester: 'summer',
    tags: ['Spring Boot', 'React'],
    title: 'Електронска и мобилна трговија',
  },
  {
    description: PRACTICAL_COURSE_DESCRIPTION,
    icon: 'users',
    popular: true,
    semester: 'summer',
    tags: ['Django'],
    title: 'Дизајн на интеракција човек-компјутер',
  },
  {
    description: THEORY_AND_PRACTICAL_WITHOUT_LAB_DESCRIPTION,
    icon: 'bar-chart',
    semester: 'summer',
    tags: [],
    title: 'Бизнис статистика',
  },
  {
    description: PRACTICAL_COURSE_DESCRIPTION,
    icon: 'test',
    semester: 'summer',
    tags: [],
    title: 'Софтверски квалитет и тестирање',
  },
  {
    description: THEORY_AND_PRACTICAL_DESCRIPTION,
    icon: 'database',
    semester: 'summer',
    tags: ['SQL'],
    title: 'Напредни бази на податоци',
  },
];

export const coursesBySemester: Record<Semester, CourseData[]> = {
  summer: summerCourses,
  winter: winterCourses,
};
