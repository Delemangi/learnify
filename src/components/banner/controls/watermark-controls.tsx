type WatermarkControlsProps = {
  readonly setWatermarkOpacity: (opacity: number) => void;
  readonly watermarkOpacity: number;
};

export const WatermarkControls = ({
  setWatermarkOpacity,
  watermarkOpacity,
}: WatermarkControlsProps) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-medium text-muted-foreground">
      Воден печат ({watermarkOpacity}%)
    </label>
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
  </div>
);
