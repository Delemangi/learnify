import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  <Card>
    <CardHeader>
      <CardTitle>Текст и содржина</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Наслов</label>
        <input
          className={INPUT_CLASS}
          onChange={(e) => {
            setHeadline(e.target.value);
          }}
          value={headline}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">
          Главна содржина (Markdown)
        </label>
        <textarea
          className={`${INPUT_CLASS} min-h-48 resize-y font-mono`}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          placeholder={DEFAULT_CONTENT}
          value={content}
        />
        <p className="text-xs text-muted-foreground">
          ## за поднаслов, - за ставка, --- за линија
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Подзаглавие</label>
        <input
          className={INPUT_CLASS}
          onChange={(e) => {
            setAccentText(e.target.value);
          }}
          value={accentText}
        />
      </div>
    </CardContent>
  </Card>
);
