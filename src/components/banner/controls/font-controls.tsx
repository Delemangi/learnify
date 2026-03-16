import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type BannerFont, FONTS, INPUT_CLASS } from '@/data/banner-config';

type FontControlsProps = {
  readonly selectedFont: BannerFont;
  readonly setSelectedFont: (font: BannerFont) => void;
};

export const FontControls = ({
  selectedFont,
  setSelectedFont,
}: FontControlsProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Фонт</CardTitle>
    </CardHeader>
    <CardContent>
      <select
        className={`${INPUT_CLASS} w-full`}
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
    </CardContent>
  </Card>
);
