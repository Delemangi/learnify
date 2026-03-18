import type { FallbackProps } from 'react-error-boundary';

export const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
    <h1 className="text-2xl font-bold text-destructive">Нешто тргна наопаку</h1>
    <p className="max-w-md text-muted-foreground">
      Настана неочекувана грешка. Обидете се да ја превчитате страницата.
    </p>
    <button
      className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      onClick={resetErrorBoundary}
      type="button"
    >
      Обиди се повторно
    </button>
  </div>
);
