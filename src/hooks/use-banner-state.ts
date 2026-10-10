import { useCallback, useEffect, useReducer, useRef, useState } from 'react';

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
import { readStorage, removeStorage, writeStorage } from '@/lib/safe-storage';

const DRAFT_KEY = 'learnify-banner-draft';
const DRAFT_VERSION = 1;

type BannerAction =
  | { type: 'RESET' }
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

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
const BG_STYLES = new Set(['flat', 'gradient', 'minimal']);
const VERTICAL_ALIGNS = new Set(['bottom', 'center', 'top']);
const finiteIn = (value: unknown, min: number, max: number): value is number =>
  typeof value === 'number' &&
  Number.isFinite(value) &&
  value >= min &&
  value <= max;
const isBgStyle = (value: unknown): value is BgStyle =>
  typeof value === 'string' && BG_STYLES.has(value);
const isVerticalAlign = (value: unknown): value is VerticalAlign =>
  typeof value === 'string' && VERTICAL_ALIGNS.has(value);

const restoreText = (
  state: BannerState,
  saved: Record<string, unknown>,
): void => {
  if (typeof saved['headline'] === 'string') {
    Object.assign(state, { headline: saved['headline'] });
  }
  if (typeof saved['accentText'] === 'string') {
    Object.assign(state, { accentText: saved['accentText'] });
  }
  if (typeof saved['content'] === 'string') {
    Object.assign(state, { content: saved['content'] });
  }
};

const restoreAppearance = (
  state: BannerState,
  saved: Record<string, unknown>,
): void => {
  if (saved['bannerTheme'] === 'light' || saved['bannerTheme'] === 'dark') {
    Object.assign(state, { bannerTheme: saved['bannerTheme'] });
  }
  const bgStyle = saved['bgStyle'];
  if (isBgStyle(bgStyle)) {
    Object.assign(state, { bgStyle });
  }
  if (saved['textAlign'] === 'left' || saved['textAlign'] === 'center') {
    Object.assign(state, { textAlign: saved['textAlign'] });
  }
  const verticalAlign = saved['verticalAlign'];
  if (isVerticalAlign(verticalAlign)) {
    Object.assign(state, { verticalAlign });
  }
};

const restoreNumbersAndFlags = (
  state: BannerState,
  saved: Record<string, unknown>,
): void => {
  if (finiteIn(saved['contentPadding'], 0, 200)) {
    Object.assign(state, { contentPadding: saved['contentPadding'] });
  }
  if (finiteIn(saved['fontSize'], 25, 200)) {
    Object.assign(state, { fontSize: saved['fontSize'] });
  }
  if (finiteIn(saved['selectedHue'], 0, 360)) {
    Object.assign(state, { selectedHue: saved['selectedHue'] });
  }
  if (finiteIn(saved['watermarkOpacity'], 0, 100)) {
    Object.assign(state, { watermarkOpacity: saved['watermarkOpacity'] });
  }
  if (typeof saved['showLogo'] === 'boolean') {
    Object.assign(state, { showLogo: saved['showLogo'] });
  }
  if (typeof saved['textShadow'] === 'boolean') {
    Object.assign(state, { textShadow: saved['textShadow'] });
  }
};

const restoreSelections = (
  state: BannerState,
  saved: Record<string, unknown>,
): void => {
  const storedFont = saved['selectedFont'];
  if (isRecord(storedFont)) {
    const family = storedFont['family'];
    if (typeof family === 'string') {
      const font = FONTS.find((candidate) => candidate.family === family);
      if (font) Object.assign(state, { selectedFont: font });
    }
  }

  const storedSize = saved['selectedSize'];
  if (!isRecord(storedSize)) return;
  const label = storedSize['label'];
  if (typeof label !== 'string') return;
  const preset = PRESETS.find((candidate) => candidate.label === label);
  if (preset) Object.assign(state, { selectedSize: preset });
};

const restoreBannerState = (saved: Record<string, unknown>): BannerState => {
  const state = { ...INITIAL_STATE };
  restoreText(state, saved);
  restoreAppearance(state, saved);
  restoreNumbersAndFlags(state, saved);
  restoreSelections(state, saved);
  return state;
};

type DraftLoad = { recovered: boolean; state: BannerState };

const readDraft = (): DraftLoad => {
  const raw = readStorage(DRAFT_KEY);
  if (!raw) return { recovered: false, state: INITIAL_STATE };
  try {
    const parsed: unknown = JSON.parse(raw);
    return !isRecord(parsed) ||
      parsed['version'] !== DRAFT_VERSION ||
      !isRecord(parsed['state'])
      ? { recovered: false, state: INITIAL_STATE }
      : { recovered: true, state: restoreBannerState(parsed['state']) };
  } catch {
    return { recovered: false, state: INITIAL_STATE };
  }
};

const bannerReducer = (
  state: BannerState,
  action: BannerAction,
): BannerState => {
  switch (action.type) {
    case 'RESET':
      return { ...INITIAL_STATE };
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
  readonly clearDraft: () => void;
  readonly draftRecovered: boolean;
  readonly state: BannerState;
  readonly storageAvailable: boolean;
} => {
  const [initialDraft] = useState(readDraft);
  const [state, dispatch] = useReducer(bannerReducer, initialDraft.state);
  const [draftRecovered, setDraftRecovered] = useState(initialDraft.recovered);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const skipNextSave = useRef(false);

  useEffect(() => {
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }
    setStorageAvailable(
      writeStorage(
        DRAFT_KEY,
        JSON.stringify({ state, version: DRAFT_VERSION }),
      ),
    );
  }, [state]);

  const clearDraft = useCallback(() => {
    const removed = removeStorage(DRAFT_KEY);
    skipNextSave.current = removed;
    dispatch({ type: 'RESET' });
    setDraftRecovered(false);
    setStorageAvailable(removed);
  }, []);

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

  return { actions, clearDraft, draftRecovered, state, storageAvailable };
};
