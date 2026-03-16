import { type BgStyle } from '@/data/banner-config';

type BackgroundControlsProps = {
  readonly bgStyle: BgStyle;
  readonly setBgStyle: (style: BgStyle) => void;
};

export const BackgroundControls = ({
  bgStyle,
  setBgStyle,
}: BackgroundControlsProps) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-medium text-muted-foreground">
      Позадина
    </label>
    <div className="flex gap-2">
      {[
        { label: 'Градиент', value: 'gradient' },
        { label: 'Еднобојна', value: 'flat' },
        { label: 'Минимална', value: 'minimal' },
      ].map((style) => (
        <button
          className={`flex flex-1 items-center justify-center gap-1 rounded-md border p-2 text-xs font-medium transition-colors ${
            bgStyle === style.value
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border hover:bg-accent hover:text-accent-foreground'
          }`}
          key={style.value}
          onClick={() => {
            setBgStyle(style.value as BgStyle);
          }}
          type="button"
        >
          {style.label}
        </button>
      ))}
    </div>
  </div>
);
