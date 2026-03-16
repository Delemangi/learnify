import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type BgStyle } from '@/data/banner-config';

type BackgroundControlsProps = {
  readonly bgStyle: BgStyle;
  readonly setBgStyle: (style: BgStyle) => void;
};

export const BackgroundControls = ({
  bgStyle,
  setBgStyle,
}: BackgroundControlsProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Позадина</CardTitle>
    </CardHeader>
    <CardContent className="flex gap-2">
      {[
        { label: 'Градиент', value: 'gradient' },
        { label: 'Еднобојна', value: 'flat' },
        { label: 'Минимална', value: 'minimal' },
      ].map((style) => (
        <button
          className={`flex flex-1 items-center justify-center gap-2 rounded-md border p-3 text-sm font-medium transition-colors ${
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
    </CardContent>
  </Card>
);
