export type CourseData = {
  /** Short description shown on the card */
  description: string;
  /** Lucide icon key */
  icon: IconKey;
  /** Show a highlighted popular indicator */
  popular?: boolean;
  /** Professor teaching the course */
  professor?: string;
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
  | 'layers'
  | 'monitor'
  | 'smartphone'
  | 'test'
  | 'users';

export type Semester = 'summer' | 'winter';
