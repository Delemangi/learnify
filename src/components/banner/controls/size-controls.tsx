import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PRESETS, type PresetSize } from '@/data/banner-config';

type SizeControlsProps = {
  readonly selectedSize: PresetSize;
  readonly setSelectedSize: (size: PresetSize) => void;
};

export const SizeControls = ({
  selectedSize,
  setSelectedSize,
}: SizeControlsProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Димензии</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col gap-2">
      {PRESETS.map((preset) => (
        <label
          className="flex cursor-pointer items-center gap-2 rounded-md border border-border p-3 hover:bg-accent hover:text-accent-foreground"
          key={preset.label}
        >
          <input
            checked={selectedSize.label === preset.label}
            className="h-4 w-4 text-primary accent-primary"
            name="preset-size"
            onChange={() => {
              setSelectedSize(preset);
            }}
            type="radio"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{preset.label}</span>
            <span className="text-xs text-muted-foreground">
              {preset.width} × {preset.height} px
            </span>
          </div>
        </label>
      ))}
    </CardContent>
  </Card>
);
