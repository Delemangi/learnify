import {
  BarChart3,
  Brain,
  Calculator,
  ClipboardCheck,
  Code,
  Cpu,
  Database,
  Layers,
  type LucideIcon,
  Monitor,
  Smartphone,
  Users,
} from 'lucide-react';

import type { IconKey } from '@/data/course-types';

export const ICON_MAP: Record<IconKey, LucideIcon> = {
  'bar-chart': BarChart3,
  brain: Brain,
  calculator: Calculator,
  code: Code,
  cpu: Cpu,
  database: Database,
  layers: Layers,
  monitor: Monitor,
  smartphone: Smartphone,
  test: ClipboardCheck,
  users: Users,
};
