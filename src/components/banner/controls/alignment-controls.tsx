import { AlignCenter, AlignLeft } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type TextAlign } from '@/data/banner-config';

type AlignmentControlsProps = {
  readonly setTextAlign: (align: TextAlign) => void;
  readonly textAlign: TextAlign;
};

export const AlignmentControls = ({
  setTextAlign,
  textAlign,
}: AlignmentControlsProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Порамнување</CardTitle>
    </CardHeader>
    <CardContent className="flex gap-2">
      {[
        { icon: AlignLeft, label: 'Лево', value: 'left' },
        { icon: AlignCenter, label: 'Центар', value: 'center' },
      ].map((align) => {
        const Icon = align.icon;
        return (
          <button
            className={`flex flex-1 items-center justify-center gap-2 rounded-md border p-3 text-sm font-medium transition-colors ${
              textAlign === align.value
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border hover:bg-accent hover:text-accent-foreground'
            }`}
            key={align.value}
            onClick={() => {
              setTextAlign(align.value as TextAlign);
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
