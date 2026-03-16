import { type RefObject } from 'react';

import type { getBackgroundStyle } from '@/lib/banner-utils';

import {
  type BannerFont,
  type BannerTheme,
  FONT_FALLBACKS,
  type PresetSize,
  type TextAlign,
} from '@/data/banner-config';

type BannerPreviewProps = {
  readonly accentText: string;
  readonly backgroundStyle: ReturnType<typeof getBackgroundStyle>;
  readonly bannerTheme: BannerTheme;
  readonly baseFontSize: number;
  readonly contentHtml: string;
  readonly contentPadding: number;
  readonly fontSize: number;
  readonly headline: string;
  readonly previewRef: RefObject<HTMLDivElement | null>;
  readonly scale: number;
  readonly selectedFont: BannerFont;
  readonly selectedHue: number;
  readonly selectedSize: PresetSize;
  readonly showLogo: boolean;
  readonly textAlign: TextAlign;
  readonly textShadow: boolean;
  readonly verticalAlign: 'bottom' | 'center' | 'top';
  readonly watermarkOpacity: number;
};

export const BannerPreview = ({
  accentText,
  backgroundStyle,
  bannerTheme,
  baseFontSize,
  contentHtml,
  contentPadding,
  fontSize,
  headline,
  previewRef,
  scale,
  selectedFont,
  selectedHue,
  selectedSize,
  showLogo,
  textAlign,
  textShadow,
  verticalAlign,
  watermarkOpacity,
}: BannerPreviewProps) => (
  <div
    className={`${bannerTheme} relative flex flex-col items-center justify-center`}
    ref={previewRef}
    style={
      {
        ...backgroundStyle,
        '--primary':
          bannerTheme === 'dark'
            ? `oklch(0.72 0.17 ${selectedHue})`
            : `oklch(0.7 0.2 ${selectedHue})`,
        colorScheme: bannerTheme,
        fontFamily: `"${selectedFont.family}", ${FONT_FALLBACKS[selectedFont.category]}`,
        height: `${selectedSize.height}px`,
        justifyContent:
          verticalAlign === 'top'
            ? 'flex-start'
            : verticalAlign === 'bottom'
              ? 'flex-end'
              : 'center',
        padding: `${contentPadding}px`,
        textShadow: textShadow
          ? bannerTheme === 'dark'
            ? '0 2px 8px rgba(0,0,0,0.4)'
            : '0 2px 8px rgba(0,0,0,0.1)'
          : undefined,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${selectedSize.width}px`,
      } as { [key: string]: number | string | undefined }
    }
  >
    {showLogo ? (
      <div className="absolute left-[6%] top-[6%] flex items-center gap-2 text-foreground">
        <img
          alt="Logo"
          src="/favicon.svg"
          style={{
            height: `${selectedSize.width * 0.04}px`,
            width: `${selectedSize.width * 0.04}px`,
          }}
        />
        <span
          className="font-bold tracking-tight"
          style={{
            fontSize: `${selectedSize.width * 0.025}px`,
          }}
        >
          learnify.mk
        </span>
      </div>
    ) : null}

    <img
      alt=""
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      src="/favicon.svg"
      style={{
        height: '80%',
        opacity: watermarkOpacity / 100,
        width: '80%',
      }}
    />

    <div
      className={`relative z-10 flex w-full flex-col justify-center gap-6 ${
        textAlign === 'left'
          ? 'items-start text-left'
          : 'items-center text-center'
      }`}
    >
      {headline ? (
        <h2
          className={`font-bold tracking-tight text-foreground ${
            textAlign === 'left' ? 'w-full' : ''
          }`}
          style={{
            fontSize: `${selectedSize.width * 0.08 * (fontSize / 100)}px`,
            lineHeight: 1.1,
          }}
        >
          {headline}
        </h2>
      ) : null}

      {contentHtml ? (
        <div
          className={`banner-content text-foreground ${
            textAlign === 'left' ? 'text-left w-full' : 'text-center'
          }`}
          // eslint-disable-next-line react/no-danger -- intentional: user-authored Markdown in internal tool
          dangerouslySetInnerHTML={{ __html: contentHtml }}
          style={{ fontSize: `${baseFontSize}px` }}
        />
      ) : null}
    </div>

    {accentText ? (
      <div
        className={`absolute bottom-12 font-medium text-foreground/60 ${
          textAlign === 'left' ? 'left-[6%]' : ''
        }`}
        style={{
          fontSize: `${selectedSize.width * 0.025 * (fontSize / 100)}px`,
        }}
      >
        {accentText}
      </div>
    ) : null}
  </div>
);
