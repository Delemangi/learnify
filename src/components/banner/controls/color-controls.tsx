import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ACCENT_COLORS } from '@/data/banner-config';

type ColorControlsProps = {
  readonly selectedHue: number;
  readonly setSelectedHue: (hue: number) => void;
};

export const ColorControls = ({
  selectedHue,
  setSelectedHue,
}: ColorControlsProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Боја</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-wrap gap-3">
      {ACCENT_COLORS.map((color) => (
        <button
          className={`h-8 w-8 rounded-full border-2 transition-all ${
            selectedHue === color.hue
              ? 'border-primary scale-110'
              : 'border-transparent hover:scale-110 hover:border-border'
          }`}
          key={color.hue}
          onClick={() => {
            setSelectedHue(color.hue);
          }}
          style={{
            backgroundColor: `oklch(0.7 0.2 ${color.hue})`,
          }}
          title={color.label}
          type="button"
        />
      ))}
    </CardContent>
  </Card>
);
