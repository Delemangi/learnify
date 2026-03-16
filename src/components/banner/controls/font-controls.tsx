import { type BannerFont, FONTS, INPUT_CLASS } from '@/data/banner-config';

type FontControlsProps = {
  readonly selectedFont: BannerFont;
  readonly setSelectedFont: (font: BannerFont) => void;
};

export const FontControls = ({
  selectedFont,
  setSelectedFont,
}: FontControlsProps) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-medium text-muted-foreground">Фонт</label>
    <select
      className={`${INPUT_CLASS} h-8 w-full py-1 text-xs`}
      onChange={(e) => {
        const font = FONTS.find((f) => f.family === e.target.value);
        if (font) setSelectedFont(font);
      }}
      value={selectedFont.family}
    >
      <optgroup label="Sans-serif">
        {FONTS.filter((f) => f.category === 'sans-serif').map((font) => (
          <option
            key={font.family}
            value={font.family}
          >
            {font.family}
          </option>
        ))}
      </optgroup>
      <optgroup label="Serif">
        {FONTS.filter((f) => f.category === 'serif').map((font) => (
          <option
            key={font.family}
            value={font.family}
          >
            {font.family}
          </option>
        ))}
      </optgroup>
      <optgroup label="Script">
        {FONTS.filter((f) => f.category === 'script').map((font) => (
          <option
            key={font.family}
            value={font.family}
          >
            {font.family}
          </option>
        ))}
      </optgroup>
    </select>
  </div>
);
