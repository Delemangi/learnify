import { DEFAULT_CONTENT, INPUT_CLASS } from '@/data/banner-config';

type TextControlsProps = {
  readonly accentText: string;
  readonly content: string;
  readonly headline: string;
  readonly setAccentText: (accentText: string) => void;
  readonly setContent: (content: string) => void;
  readonly setHeadline: (headline: string) => void;
};

export const TextControls = ({
  accentText,
  content,
  headline,
  setAccentText,
  setContent,
  setHeadline,
}: TextControlsProps) => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-col gap-2">
      <label
        className="text-xs font-medium text-muted-foreground"
        htmlFor="banner-headline"
      >
        Наслов
      </label>
      <input
        className={INPUT_CLASS}
        id="banner-headline"
        onChange={(e) => {
          setHeadline(e.target.value);
        }}
        value={headline}
      />
    </div>
    <div className="flex flex-col gap-2">
      <label
        className="text-xs font-medium text-muted-foreground"
        htmlFor="banner-content"
      >
        Главна содржина (Markdown)
      </label>
      <textarea
        className={`${INPUT_CLASS} min-h-32 resize-y font-mono text-sm`}
        id="banner-content"
        onChange={(e) => {
          setContent(e.target.value);
        }}
        placeholder={DEFAULT_CONTENT}
        value={content}
      />
      <p className="text-[10px] text-muted-foreground">
        ## за поднаслов, - за ставка, --- за линија
      </p>
    </div>
    <div className="flex flex-col gap-2">
      <label
        className="text-xs font-medium text-muted-foreground"
        htmlFor="banner-accent-text"
      >
        Подзаглавие
      </label>
      <input
        className={INPUT_CLASS}
        id="banner-accent-text"
        onChange={(e) => {
          setAccentText(e.target.value);
        }}
        value={accentText}
      />
    </div>
  </div>
);
