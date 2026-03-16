import {
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd,
  AlignVerticalJustifyStart,
} from 'lucide-react';

type VerticalAlignControlsProps = {
  readonly setVerticalAlign: (align: 'bottom' | 'center' | 'top') => void;
  readonly verticalAlign: 'bottom' | 'center' | 'top';
};

export const VerticalAlignControls = ({
  setVerticalAlign,
  verticalAlign,
}: VerticalAlignControlsProps) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-medium text-muted-foreground">
      Вертикално порамнување
    </label>
    <div className="flex gap-2">
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
            className={`flex flex-1 items-center justify-center gap-1 rounded-md border p-2 text-xs font-medium transition-colors ${
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
            <Icon className="h-3 w-3" />
            {align.label}
          </button>
        );
      })}
    </div>
  </div>
);
