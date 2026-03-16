type FontSizeControlsProps = {
  readonly fontSize: number;
  readonly setFontSize: (size: number) => void;
};

export const FontSizeControls = ({
  fontSize,
  setFontSize,
}: FontSizeControlsProps) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-medium text-muted-foreground">
      Големина на фонт ({fontSize}%)
    </label>
    <input
      className="w-full accent-primary"
      max={200}
      min={50}
      onChange={(e) => {
        setFontSize(Number(e.target.value));
      }}
      step={5}
      type="range"
      value={fontSize}
    />
  </div>
);
