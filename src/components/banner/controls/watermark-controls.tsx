import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type WatermarkControlsProps = {
  readonly setWatermarkOpacity: (opacity: number) => void;
  readonly watermarkOpacity: number;
};

export const WatermarkControls = ({
  setWatermarkOpacity,
  watermarkOpacity,
}: WatermarkControlsProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Watermark ({watermarkOpacity}%)</CardTitle>
    </CardHeader>
    <CardContent>
      <input
        className="w-full accent-primary"
        max={30}
        min={0}
        onChange={(e) => {
          setWatermarkOpacity(Number(e.target.value));
        }}
        step={1}
        type="range"
        value={watermarkOpacity}
      />
    </CardContent>
  </Card>
);
