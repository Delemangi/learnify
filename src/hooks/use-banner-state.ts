import { useCallback, useReducer } from 'react';

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

type BannerAction =
  | { type: 'SET_ACCENT_TEXT'; value: string }
  | { type: 'SET_BANNER_THEME'; value: BannerTheme }
  | { type: 'SET_BG_STYLE'; value: BgStyle }
  | { type: 'SET_CONTENT'; value: string }
  | { type: 'SET_CONTENT_PADDING'; value: number }
  | { type: 'SET_FONT_SIZE'; value: number }
  | { type: 'SET_HEADLINE'; value: string }
  | { type: 'SET_SELECTED_FONT'; value: BannerFont }
  | { type: 'SET_SELECTED_HUE'; value: number }
  | { type: 'SET_SELECTED_SIZE'; value: PresetSize }
  | { type: 'SET_SHOW_LOGO'; value: boolean }
  | { type: 'SET_TEXT_ALIGN'; value: TextAlign }
  | { type: 'SET_TEXT_SHADOW'; value: boolean }
  | { type: 'SET_VERTICAL_ALIGN'; value: VerticalAlign }
  | { type: 'SET_WATERMARK_OPACITY'; value: number };

const INITIAL_STATE: BannerState = {
  accentText: 'learnify.mk',
  bannerTheme: 'light',
  bgStyle: 'gradient',
  content: DEFAULT_CONTENT,
  contentPadding: 64,
  fontSize: 100,
  headline: 'Learnify',
  selectedFont: FONTS[0] ?? {
    category: 'sans-serif' as const,
    family: 'Montserrat',
    weights: [400, 700, 900],
  },
  selectedHue: 50,
  selectedSize: PRESETS[0] ?? {
    height: 1_080,
    label: 'Instagram Post',
    width: 1_080,
  },
  showLogo: true,
  textAlign: 'center',
  textShadow: false,
  verticalAlign: 'center',
  watermarkOpacity: 5,
};

const bannerReducer = (
  state: BannerState,
  action: BannerAction,
): BannerState => {
  switch (action.type) {
    case 'SET_ACCENT_TEXT':
      return { ...state, accentText: action.value };
    case 'SET_BANNER_THEME':
      return { ...state, bannerTheme: action.value };
    case 'SET_BG_STYLE':
      return { ...state, bgStyle: action.value };
    case 'SET_CONTENT':
      return { ...state, content: action.value };
    case 'SET_CONTENT_PADDING':
      return { ...state, contentPadding: action.value };
    case 'SET_FONT_SIZE':
      return { ...state, fontSize: action.value };
    case 'SET_HEADLINE':
      return { ...state, headline: action.value };
    case 'SET_SELECTED_FONT':
      return { ...state, selectedFont: action.value };
    case 'SET_SELECTED_HUE':
      return { ...state, selectedHue: action.value };
    case 'SET_SELECTED_SIZE':
      return { ...state, selectedSize: action.value };
    case 'SET_SHOW_LOGO':
      return { ...state, showLogo: action.value };
    case 'SET_TEXT_ALIGN':
      return { ...state, textAlign: action.value };
    case 'SET_TEXT_SHADOW':
      return { ...state, textShadow: action.value };
    case 'SET_VERTICAL_ALIGN':
      return { ...state, verticalAlign: action.value };
    case 'SET_WATERMARK_OPACITY':
      return { ...state, watermarkOpacity: action.value };
    default:
      return state;
  }
};

export const useBannerState = (): {
  readonly actions: BannerActions;
  readonly state: BannerState;
} => {
  const [state, dispatch] = useReducer(bannerReducer, INITIAL_STATE);

  const actions: BannerActions = {
    setAccentText: useCallback((value: string) => {
      dispatch({ type: 'SET_ACCENT_TEXT', value });
    }, []),
    setBannerTheme: useCallback((value: BannerTheme) => {
      dispatch({ type: 'SET_BANNER_THEME', value });
    }, []),
    setBgStyle: useCallback((value: BgStyle) => {
      dispatch({ type: 'SET_BG_STYLE', value });
    }, []),
    setContent: useCallback((value: string) => {
      dispatch({ type: 'SET_CONTENT', value });
    }, []),
    setContentPadding: useCallback((value: number) => {
      dispatch({ type: 'SET_CONTENT_PADDING', value });
    }, []),
    setFontSize: useCallback((value: number) => {
      dispatch({ type: 'SET_FONT_SIZE', value });
    }, []),
    setHeadline: useCallback((value: string) => {
      dispatch({ type: 'SET_HEADLINE', value });
    }, []),
    setSelectedFont: useCallback((value: BannerFont) => {
      dispatch({ type: 'SET_SELECTED_FONT', value });
    }, []),
    setSelectedHue: useCallback((value: number) => {
      dispatch({ type: 'SET_SELECTED_HUE', value });
    }, []),
    setSelectedSize: useCallback((value: PresetSize) => {
      dispatch({ type: 'SET_SELECTED_SIZE', value });
    }, []),
    setShowLogo: useCallback((value: boolean) => {
      dispatch({ type: 'SET_SHOW_LOGO', value });
    }, []),
    setTextAlign: useCallback((value: TextAlign) => {
      dispatch({ type: 'SET_TEXT_ALIGN', value });
    }, []),
    setTextShadow: useCallback((value: boolean) => {
      dispatch({ type: 'SET_TEXT_SHADOW', value });
    }, []),
    setVerticalAlign: useCallback((value: VerticalAlign) => {
      dispatch({ type: 'SET_VERTICAL_ALIGN', value });
    }, []),
    setWatermarkOpacity: useCallback((value: number) => {
      dispatch({ type: 'SET_WATERMARK_OPACITY', value });
    }, []),
  };

  return { actions, state };
};
