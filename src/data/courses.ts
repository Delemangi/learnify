export type CourseData = {
  /** Short description shown on the card */
  description: string;
  /** Lucide icon key (see IconKey type above) */
  icon: IconKey;
  /** Show a "Популарен" badge on the card */
  popular?: boolean;
  /** Which semester is this course active */
  semester: Semester;
  /** Tags / keywords shown as badges */
  tags: string[];
  /** Course name as shown on the card */
  title: string;
};

export type IconKey =
  | 'bar-chart'
  | 'brain'
  | 'calculator'
  | 'code'
  | 'cpu'
  | 'database'
  | 'flask'
  | 'layers'
  | 'monitor'
  | 'network'
  | 'search'
  | 'shield'
  | 'smartphone'
  | 'test'
  | 'users';

export type Semester = 'summer' | 'winter';

const winterCourses: CourseData[] = [
  {
    description:
      'Основи на програмирање во C: променливи, контролни структури, функции, низи и покажувачи.',
    icon: 'code',
    semester: 'winter',
    tags: ['C', 'Основи'],
    title: 'Структурно програмирање',
  },
  {
    description:
      'Линеарна алгебра, матрици, детерминанти, системи линеарни равенки и векторски простори.',
    icon: 'calculator',
    semester: 'winter',
    tags: ['Математика', 'Линеарна алгебра'],
    title: 'Математика 1',
  },
  {
    description:
      'Функции, граници, континуитет, изводи и нивна примена, интегрирање.',
    icon: 'calculator',
    semester: 'winter',
    tags: ['Математика', 'Калкулус'],
    title: 'Калкулус 1',
  },
  {
    description:
      'Сортирање, пребарување, графовски алгоритми, динамичко програмирање, стекови, редици, дрва.',
    icon: 'brain',
    popular: true,
    semester: 'winter',
    tags: ['Алгоритми', 'Структури'],
    title: 'Алгоритми и податочни структури',
  },
  {
    description:
      'Практична примена на алгоритамски техники: натпреварувачко програмирање, оптимизација и проблемски задачи.',
    icon: 'brain',
    semester: 'winter',
    tags: ['Алгоритми', 'Примена'],
    title: 'Примена на алгоритми и податочни структури',
  },
  {
    description:
      'Напредни концепти во Java: колекции, генерици, стримови, ламбда изрази и дизајн патерни.',
    icon: 'code',
    semester: 'winter',
    tags: ['Java', 'Напредно'],
    title: 'Напредно програмирање',
  },
  {
    description:
      'HTML, CSS, JavaScript, React, серверско програмирање, REST API и MVC архитектура.',
    icon: 'monitor',
    popular: true,
    semester: 'winter',
    tags: ['Web', 'JavaScript'],
    title: 'Веб програмирање',
  },
  {
    description:
      'ER-дијаграми, релациски модел, SQL, нормализација, трансакции и индекси.',
    icon: 'database',
    popular: true,
    semester: 'winter',
    tags: ['SQL', 'Бази'],
    title: 'Бази на податоци',
  },
  {
    description:
      'Основи на анализа на податоци, статистика, визуелизација и вовед во машинско учење со Python.',
    icon: 'bar-chart',
    semester: 'winter',
    tags: ['Data Science', 'Python'],
    title: 'Вовед во наука за податоци',
  },
  {
    description:
      'Диференцијални равенки, Лапласова трансформација, Фуриеови редови и нумерички методи.',
    icon: 'calculator',
    semester: 'winter',
    tags: ['Математика', 'Диф. равенки'],
    title: 'Математика 3',
  },
  {
    description:
      'Теорија на веројатност, случајни променливи, распределби, статистичко заклучување и тестирање хипотези.',
    icon: 'bar-chart',
    semester: 'winter',
    tags: ['Статистика', 'Веројатност'],
    title: 'Веројатност и статистика',
  },
  {
    description:
      'Архитектонски стилови, дизајн патерни, SOLID принципи, микросервиси и модуларен дизајн.',
    icon: 'layers',
    semester: 'winter',
    tags: ['Архитектура', 'Дизајн патерни'],
    title: 'Дизајн и архитектура на софтвер',
  },
];

const summerCourses: CourseData[] = [
  {
    description:
      'Класи, наследување, полиморфизам, апстракција, енкапсулација и темплејти во C++/Java.',
    icon: 'code',
    popular: true,
    semester: 'summer',
    tags: ['C++', 'Java', 'ООП'],
    title: 'Објектно-ориентирано програмирање',
  },
  {
    description:
      'Дискретна математика: множества, релации, графови, комбинаторика и математичка логика.',
    icon: 'calculator',
    semester: 'summer',
    tags: ['Математика', 'Дискретна'],
    title: 'Математика 2',
  },
  {
    description:
      'Повеќекратни интеграли, редови, Тејлорови развивања и примена во инженерство.',
    icon: 'calculator',
    semester: 'summer',
    tags: ['Математика', 'Калкулус'],
    title: 'Калкулус 2',
  },
  {
    description:
      'Процеси, нишки, синхронизација, управување со меморија, датотечни системи.',
    icon: 'cpu',
    semester: 'summer',
    tags: ['OS', 'Системи'],
    title: 'Оперативни системи',
  },
  {
    description:
      'Процесорска архитектура, асемблерско програмирање, мемориска хиерархија и I/O системи.',
    icon: 'cpu',
    semester: 'summer',
    tags: ['Архитектура', 'Хардвер'],
    title: 'Архитектура и организација на компјутери',
  },
  {
    description:
      'Пребарување, машинско учење, невронски мрежи, NLP и примена на AI алгоритми.',
    icon: 'brain',
    semester: 'summer',
    tags: ['AI', 'ML'],
    title: 'Вештачка интелигенција',
  },
  {
    description:
      'E-commerce платформи, мобилни плаќања, дигитален маркетинг и бизнис модели на интернет.',
    icon: 'smartphone',
    semester: 'summer',
    tags: ['E-commerce', 'Мобилно'],
    title: 'Електронска и мобилна трговија',
  },
  {
    description:
      'UX/UI принципи, кориснички истражувања, прототипирање, евалуација на употребливост.',
    icon: 'users',
    semester: 'summer',
    tags: ['HCI', 'UX/UI'],
    title: 'Дизајн на интеракција човек-компјутер',
  },
  {
    description:
      'Статистички методи за бизнис одлуки: регресија, корелација, временски серии и прогнозирање.',
    icon: 'bar-chart',
    semester: 'summer',
    tags: ['Статистика', 'Бизнис'],
    title: 'Бизнис статистика',
  },
  {
    description:
      'Техники на тестирање, автоматизација, CI/CD, квалитет на код и управување со дефекти.',
    icon: 'test',
    semester: 'summer',
    tags: ['Тестирање', 'QA'],
    title: 'Софтверски квалитет и тестирање',
  },
  {
    description:
      'NoSQL бази, дистрибуирани системи, репликација, партиционирање и оптимизација на перформанси.',
    icon: 'database',
    semester: 'summer',
    tags: ['NoSQL', 'Бази'],
    title: 'Напредни бази на податоци',
  },
];

export const courses: CourseData[] = [...winterCourses, ...summerCourses];

export const coursesBySemester: Record<Semester, CourseData[]> = {
  summer: summerCourses,
  winter: winterCourses,
};

export const semesters: Semester[] = ['winter', 'summer'];
