import { CheckCircle, Clock, type LucideIcon, Star, Users } from 'lucide-react';

type FeatureData = {
  readonly description: string;
  readonly icon: LucideIcon;
  readonly title: string;
};

export const features: FeatureData[] = [
  {
    description: 'Секој студент добива персонализирана програма за учење.',
    icon: Users,
    title: 'Индивидуален пристап',
  },
  {
    description:
      'Часовите се закажуваат по договор, во термин кој ви одговара.',
    icon: Clock,
    title: 'Флексибилен распоред',
  },
  {
    description: 'Предавачи со реално искуство во индустријата и академијата.',
    icon: Star,
    title: 'Искусни тутори',
  },
  {
    description: 'Фокус на стари испитни задачи, колоквиуми и практични вежби.',
    icon: CheckCircle,
    title: 'Подготовка за испити',
  },
];
