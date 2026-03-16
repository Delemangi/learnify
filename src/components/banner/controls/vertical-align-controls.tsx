import {
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd,
  AlignVerticalJustifyStart,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type VerticalAlignControlsProps = {
  readonly setVerticalAlign: (align: 'bottom' | 'center' | 'top') => void;
  readonly verticalAlign: 'bottom' | 'center' | 'top';
};

export const VerticalAlignControls = ({
  setVerticalAlign,
  verticalAlign,
}: VerticalAlignControlsProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Вертикално порамнување</CardTitle>
    </CardHeader>
    <CardContent className="flex gap-2">
      {[
        {
          icon: AlignVerticalJustifyStart,
          label: 'Горе',
          value: 'top',
        },
        {
          icon: AlignVerticalJustifyCenter,
          label: 'Центар',
          value: 'center',
        },
        {
          icon: AlignVerticalJustifyEnd,
          label: 'Долу',
          value: 'bottom',
        },
      ].map((align) => {
        const Icon = align.icon;
        return (
          <button
            className={`flex flex-1 items-center justify-center gap-2 rounded-md border p-3 text-sm font-medium transition-colors ${
              verticalAlign === align.value
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border hover:bg-accent hover:text-accent-foreground'
            }`}
            key={align.value}
            onClick={() => {
              setVerticalAlign(align.value as 'bottom' | 'center' | 'top');
            }}
            type="button"
          >
            <Icon className="h-4 w-4" />
            {align.label}
          </button>
        );
      })}
    </CardContent>
  </Card>
);
