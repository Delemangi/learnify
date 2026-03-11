import { CheckCircle, Clock, type LucideIcon, Star, Users } from 'lucide-react';

type FeatureData = {
  readonly description: string;
  readonly icon: LucideIcon;
  readonly title: string;
};

export const features: FeatureData[] = [
  {
    description:
      'Наставата се прилагодува според предметот и индивидуалните потреби на секој студент.',
    icon: Users,
    title: 'Индивидуален пристап',
  },
  {
    description:
      'Термините за часови се договараат однапред, во согласност со меѓусебната достапност.',
    icon: Clock,
    title: 'Флексибилен распоред',
  },
  {
    description: 'Часовите ги одржуваат предавачи со релевантно искуство и докажано знаење во областа.',
    icon: Star,
    title: 'Искусни предавачи',
  },
  {
    description:
      'Сеопфатно објаснување на материјалот од предметот, со решавање колоквиумски и испитни задачи и лабораториски вежби.',
    icon: CheckCircle,
    title: 'Подготовка за колоквиуми и испити',
  },
];
