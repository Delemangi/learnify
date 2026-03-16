import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type PaddingControlsProps = {
  readonly contentPadding: number;
  readonly setContentPadding: (padding: number) => void;
};

export const PaddingControls = ({
  contentPadding,
  setContentPadding,
}: PaddingControlsProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Внатрешен простор ({contentPadding}px)</CardTitle>
    </CardHeader>
    <CardContent>
      <input
        className="w-full accent-primary"
        max={128}
        min={32}
        onChange={(e) => {
          setContentPadding(Number(e.target.value));
        }}
        step={8}
        type="range"
        value={contentPadding}
      />
    </CardContent>
  </Card>
);
