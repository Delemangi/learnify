type PaddingControlsProps = {
  readonly contentPadding: number;
  readonly setContentPadding: (padding: number) => void;
};

export const PaddingControls = ({
  contentPadding,
  setContentPadding,
}: PaddingControlsProps) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-medium text-muted-foreground">
      Внатрешен простор ({contentPadding}px)
    </label>
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
  </div>
);
