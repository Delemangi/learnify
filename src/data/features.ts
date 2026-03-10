import { CheckCircle, Clock, type LucideIcon, Star, Users } from 'lucide-react';

type FeatureData = {
  readonly description: string;
  readonly icon: LucideIcon;
  readonly title: string;
};

export const features: FeatureData[] = [
  {
    description:
      'Пристапот се прилагодува според предметот и потребите на студентот.',
    icon: Users,
    title: 'Индивидуален пристап',
  },
  {
    description:
      'Термините се договараат однапред, според меѓусебна достапност.',
    icon: Clock,
    title: 'Флексибилен распоред',
  },
  {
    description: 'Часовите ги држат предавачи со искуство во индустрија.',
    icon: Star,
    title: 'Искусни предавачи',
  },
  {
    description: 'Часовите вклучуваат колоквиумски и испитни задачи.',
    icon: CheckCircle,
    title: 'Подготовка за испити',
  },
];
