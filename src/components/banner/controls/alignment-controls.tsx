import { AlignCenter, AlignLeft } from 'lucide-react';

import { type TextAlign } from '@/data/banner-config';

type AlignmentControlsProps = {
  readonly setTextAlign: (align: TextAlign) => void;
  readonly textAlign: TextAlign;
};

export const AlignmentControls = ({
  setTextAlign,
  textAlign,
}: AlignmentControlsProps) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-medium text-muted-foreground">
      Порамнување
    </label>
    <div className="flex gap-2">
      {[
        { icon: AlignLeft, label: 'Лево', value: 'left' },
        { icon: AlignCenter, label: 'Центар', value: 'center' },
      ].map((align) => {
        const Icon = align.icon;
        return (
          <button
            className={`flex flex-1 items-center justify-center gap-1 rounded-md border p-2 text-xs font-medium transition-colors ${
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
            <Icon className="h-3 w-3" />
            {align.label}
          </button>
        );
      })}
    </div>
  </div>
);
