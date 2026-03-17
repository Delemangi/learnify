import { PRESETS, type PresetSize } from '@/data/banner-config';

type SizeControlsProps = {
  readonly selectedSize: PresetSize;
  readonly setSelectedSize: (size: PresetSize) => void;
};

export const SizeControls = ({
  selectedSize,
  setSelectedSize,
}: SizeControlsProps) => (
  <div className="flex flex-col gap-2">
    {PRESETS.map((preset) => (
      <label
        aria-label={preset.label}
        className="flex cursor-pointer items-center gap-2 rounded-md border border-border p-2 hover:bg-accent hover:text-accent-foreground"
        key={preset.label}
      >
        <input
          checked={selectedSize.label === preset.label}
          className="h-3 w-3 text-primary accent-primary"
          name="preset-size"
          onChange={() => {
            setSelectedSize(preset);
          }}
          type="radio"
        />
        <div className="flex flex-col">
          <span className="text-xs font-medium">{preset.label}</span>
          <span className="text-[10px] text-muted-foreground">
            {preset.width} × {preset.height} px
          </span>
        </div>
      </label>
    ))}
  </div>
);
