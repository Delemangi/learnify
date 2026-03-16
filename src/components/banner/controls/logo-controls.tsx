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
  <div className="flex flex-col gap-3">
    <label className="flex cursor-pointer items-center gap-2">
      <input
        checked={showLogo}
        className="h-3 w-3 text-primary accent-primary"
        onChange={(e) => {
          setShowLogo(e.target.checked);
        }}
        type="checkbox"
      />
      <span className="text-xs font-medium">Прикажи лого</span>
    </label>
    <label className="flex cursor-pointer items-center gap-2">
      <input
        checked={textShadow}
        className="h-3 w-3 text-primary accent-primary"
        onChange={(e) => {
          setTextShadow(e.target.checked);
        }}
        type="checkbox"
      />
      <span className="text-xs font-medium">Сенка на текст</span>
    </label>
  </div>
);
