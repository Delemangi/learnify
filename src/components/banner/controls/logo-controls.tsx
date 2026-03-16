import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type LogoControlsProps = {
  readonly setShowLogo: (show: boolean) => void;
  readonly setTextShadow: (shadow: boolean) => void;
  readonly showLogo: boolean;
  readonly textShadow: boolean;
};

export const LogoControls = ({
  setShowLogo,
  setTextShadow,
  showLogo,
  textShadow,
}: LogoControlsProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Лого</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col gap-4">
      <label className="flex cursor-pointer items-center gap-3">
        <input
          checked={showLogo}
          className="h-4 w-4 text-primary accent-primary"
          onChange={(e) => {
            setShowLogo(e.target.checked);
          }}
          type="checkbox"
        />
        <span className="text-sm font-medium">Прикажи лого</span>
      </label>
      <label className="flex cursor-pointer items-center gap-3">
        <input
          checked={textShadow}
          className="h-4 w-4 text-primary accent-primary"
          onChange={(e) => {
            setTextShadow(e.target.checked);
          }}
          type="checkbox"
        />
        <span className="text-sm font-medium">Сенка на текст</span>
      </label>
    </CardContent>
  </Card>
);
