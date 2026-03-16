import { useState } from 'react';

import {
  type BannerActions,
  type BannerFont,
  type BannerState,
  type BannerTheme,
  type BgStyle,
  DEFAULT_CONTENT,
  FONTS,
  PRESETS,
  type PresetSize,
  type TextAlign,
  type VerticalAlign,
} from '@/data/banner-config';

export const useBannerState = (): {
  readonly actions: BannerActions;
  readonly state: BannerState;
} => {
  const [headline, setHeadline] = useState('Learnify');
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [accentText, setAccentText] = useState('learnify.mk');
  const [bannerTheme, setBannerTheme] = useState<BannerTheme>('light');
  const [showLogo, setShowLogo] = useState(true);
  const [selectedHue, setSelectedHue] = useState(50);
  const [textAlign, setTextAlign] = useState<TextAlign>('center');
  const [watermarkOpacity, setWatermarkOpacity] = useState(5);
  const [bgStyle, setBgStyle] = useState<BgStyle>('gradient');
  const [selectedFont, setSelectedFont] = useState<BannerFont>(
    FONTS[0] ?? {
      category: 'sans-serif' as const,
      family: 'Montserrat',
      weights: [400, 700, 900],
    },
  );
  const [selectedSize, setSelectedSize] = useState<PresetSize>(
    PRESETS[0] ?? { height: 1_080, label: 'Instagram Post', width: 1_080 },
  );
  const [contentPadding, setContentPadding] = useState(64);
  const [verticalAlign, setVerticalAlign] = useState<VerticalAlign>('center');
  const [textShadow, setTextShadow] = useState(false);

  const state: BannerState = {
    accentText,
    bannerTheme,
    bgStyle,
    content,
    contentPadding,
    headline,
    selectedFont,
    selectedHue,
    selectedSize,
    showLogo,
    textAlign,
    textShadow,
    verticalAlign,
    watermarkOpacity,
  };

  const actions: BannerActions = {
    setAccentText,
    setBannerTheme,
    setBgStyle,
    setContent,
    setContentPadding,
    setHeadline,
    setSelectedFont,
    setSelectedHue,
    setSelectedSize,
    setShowLogo,
    setTextAlign,
    setTextShadow,
    setVerticalAlign,
    setWatermarkOpacity,
  };

  return { actions, state };
};
