export type IconKey =
  | "code"
  | "monitor"
  | "calculator"
  | "brain"
  | "database"
  | "cpu"
  | "network"
  | "shield"
  | "bar-chart"
  | "flask"
  | "smartphone"
  | "users"
  | "layers"
  | "search"
  | "test";

export type Semester = "Зимски" | "Летен";

export interface CourseData {
  /** Course name as shown on the card */
  title: string;
  /** Which semester is this course active */
  semester: Semester;
  /** Lucide icon key (see IconKey type above) */
  icon: IconKey;
  /** Short description shown on the card */
  description: string;
  /** Tags / keywords shown as badges */
  tags: string[];
  /** Show a "Популарен" badge on the card */
  popular?: boolean;
}

const winterCourses: CourseData[] = [
  {
    title: "Структурно програмирање",
    semester: "Зимски",
    icon: "code",
    description:
      "Основи на програмирање во C: променливи, контролни структури, функции, низи и покажувачи.",
    tags: ["C", "Основи"],
  },
  {
    title: "Математика 1",
    semester: "Зимски",
    icon: "calculator",
    description:
      "Линеарна алгебра, матрици, детерминанти, системи линеарни равенки и векторски простори.",
    tags: ["Математика", "Линеарна алгебра"],
  },
  {
    title: "Калкулус 1",
    semester: "Зимски",
    icon: "calculator",
    description:
      "Функции, граници, континуитет, изводи и нивна примена, интегрирање.",
    tags: ["Математика", "Калкулус"],
  },
  {
    title: "Алгоритми и податочни структури",
    semester: "Зимски",
    icon: "brain",
    description:
      "Сортирање, пребарување, графовски алгоритми, динамичко програмирање, стекови, редици, дрва.",
    tags: ["Алгоритми", "Структури"],
    popular: true,
  },
  {
    title: "Примена на алгоритми и податочни структури",
    semester: "Зимски",
    icon: "brain",
    description:
      "Практична примена на алгоритамски техники: натпреварувачко програмирање, оптимизација и проблемски задачи.",
    tags: ["Алгоритми", "Примена"],
  },
  {
    title: "Напредно програмирање",
    semester: "Зимски",
    icon: "code",
    description:
      "Напредни концепти во Java: колекции, генерици, стримови, ламбда изрази и дизајн патерни.",
    tags: ["Java", "Напредно"],
  },
  {
    title: "Веб програмирање",
    semester: "Зимски",
    icon: "monitor",
    description:
      "HTML, CSS, JavaScript, React, серверско програмирање, REST API и MVC архитектура.",
    tags: ["Web", "JavaScript"],
    popular: true,
  },
  {
    title: "Бази на податоци",
    semester: "Зимски",
    icon: "database",
    description:
      "ER-дијаграми, релациски модел, SQL, нормализација, трансакции и индекси.",
    tags: ["SQL", "Бази"],
    popular: true,
  },
  {
    title: "Вовед во наука за податоци",
    semester: "Зимски",
    icon: "bar-chart",
    description:
      "Основи на анализа на податоци, статистика, визуелизација и вовед во машинско учење со Python.",
    tags: ["Data Science", "Python"],
  },
  {
    title: "Математика 3",
    semester: "Зимски",
    icon: "calculator",
    description:
      "Диференцијални равенки, Лапласова трансформација, Фуриеови редови и нумерички методи.",
    tags: ["Математика", "Диф. равенки"],
  },
  {
    title: "Веројатност и статистика",
    semester: "Зимски",
    icon: "bar-chart",
    description:
      "Теорија на веројатност, случајни променливи, распределби, статистичко заклучување и тестирање хипотези.",
    tags: ["Статистика", "Веројатност"],
  },
  {
    title: "Дизајн и архитектура на софтвер",
    semester: "Зимски",
    icon: "layers",
    description:
      "Архитектонски стилови, дизајн патерни, SOLID принципи, микросервиси и модуларен дизајн.",
    tags: ["Архитектура", "Дизајн патерни"],
  },
];

const summerCourses: CourseData[] = [
  {
    title: "Објектно-ориентирано програмирање",
    semester: "Летен",
    icon: "code",
    description:
      "Класи, наследување, полиморфизам, апстракција, енкапсулација и темплејти во C++/Java.",
    tags: ["C++", "Java", "ООП"],
    popular: true,
  },
  {
    title: "Математика 2",
    semester: "Летен",
    icon: "calculator",
    description:
      "Дискретна математика: множества, релации, графови, комбинаторика и математичка логика.",
    tags: ["Математика", "Дискретна"],
  },
  {
    title: "Калкулус 2",
    semester: "Летен",
    icon: "calculator",
    description:
      "Повеќекратни интеграли, редови, Тејлорови развивања и примена во инженерство.",
    tags: ["Математика", "Калкулус"],
  },
  {
    title: "Оперативни системи",
    semester: "Летен",
    icon: "cpu",
    description:
      "Процеси, нишки, синхронизација, управување со меморија, датотечни системи.",
    tags: ["OS", "Системи"],
  },
  {
    title: "Архитектура и организација на компјутери",
    semester: "Летен",
    icon: "cpu",
    description:
      "Процесорска архитектура, асемблерско програмирање, мемориска хиерархија и I/O системи.",
    tags: ["Архитектура", "Хардвер"],
  },
  {
    title: "Вештачка интелигенција",
    semester: "Летен",
    icon: "brain",
    description:
      "Пребарување, машинско учење, невронски мрежи, NLP и примена на AI алгоритми.",
    tags: ["AI", "ML"],
  },
  {
    title: "Електронска и мобилна трговија",
    semester: "Летен",
    icon: "smartphone",
    description:
      "E-commerce платформи, мобилни плаќања, дигитален маркетинг и бизнис модели на интернет.",
    tags: ["E-commerce", "Мобилно"],
  },
  {
    title: "Дизајн на интеракција човек-компјутер",
    semester: "Летен",
    icon: "users",
    description:
      "UX/UI принципи, кориснички истражувања, прототипирање, евалуација на употребливост.",
    tags: ["HCI", "UX/UI"],
  },
  {
    title: "Бизнис статистика",
    semester: "Летен",
    icon: "bar-chart",
    description:
      "Статистички методи за бизнис одлуки: регресија, корелација, временски серии и прогнозирање.",
    tags: ["Статистика", "Бизнис"],
  },
  {
    title: "Софтверски квалитет и тестирање",
    semester: "Летен",
    icon: "test",
    description:
      "Техники на тестирање, автоматизација, CI/CD, квалитет на код и управување со дефекти.",
    tags: ["Тестирање", "QA"],
  },
  {
    title: "Напредни бази на податоци",
    semester: "Летен",
    icon: "database",
    description:
      "NoSQL бази, дистрибуирани системи, репликација, партиционирање и оптимизација на перформанси.",
    tags: ["NoSQL", "Бази"],
  },
];

export const courses: CourseData[] = [...winterCourses, ...summerCourses];

export const coursesBySemester: Record<Semester, CourseData[]> = {
  Зимски: winterCourses,
  Летен: summerCourses,
};

export const semesters: Semester[] = ["Зимски", "Летен"];
