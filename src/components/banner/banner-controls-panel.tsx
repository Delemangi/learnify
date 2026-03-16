import { type BannerActions, type BannerState } from '@/data/banner-config';

import { AlignmentControls } from './controls/alignment-controls';
import { BackgroundControls } from './controls/background-controls';
import { ColorControls } from './controls/color-controls';
import { FontControls } from './controls/font-controls';
import { FontSizeControls } from './controls/font-size-controls';
import { LogoControls } from './controls/logo-controls';
import { PaddingControls } from './controls/padding-controls';
import { SizeControls } from './controls/size-controls';
import { TextControls } from './controls/text-controls';
import { ThemeControls } from './controls/theme-controls';
import { VerticalAlignControls } from './controls/vertical-align-controls';
import { WatermarkControls } from './controls/watermark-controls';

type BannerControlsPanelProps = {
  readonly actions: BannerActions;
  readonly state: BannerState;
};

export const BannerControlsPanel = ({
  actions,
  state,
}: BannerControlsPanelProps) => (
  <div className="flex h-full flex-col overflow-y-auto lg:border-r border-border bg-card/80">
    <div className="flex flex-col gap-4 border-b border-border px-4 py-5">
      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Содржина
      </div>
      <TextControls
        accentText={state.accentText}
        content={state.content}
        headline={state.headline}
        setAccentText={actions.setAccentText}
        setContent={actions.setContent}
        setHeadline={actions.setHeadline}
      />
    </div>

    <div className="flex flex-col gap-4 border-b border-border px-4 py-5">
      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Стил
      </div>
      <FontControls
        selectedFont={state.selectedFont}
        setSelectedFont={actions.setSelectedFont}
      />
      <FontSizeControls
        fontSize={state.fontSize}
        setFontSize={actions.setFontSize}
      />
      <ColorControls
        selectedHue={state.selectedHue}
        setSelectedHue={actions.setSelectedHue}
      />
      <ThemeControls
        bannerTheme={state.bannerTheme}
        setBannerTheme={actions.setBannerTheme}
      />
      <BackgroundControls
        bgStyle={state.bgStyle}
        setBgStyle={actions.setBgStyle}
      />
    </div>

    <div className="flex flex-col gap-4 border-b border-border px-4 py-5">
      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Распоред
      </div>
      <AlignmentControls
        setTextAlign={actions.setTextAlign}
        textAlign={state.textAlign}
      />
      <VerticalAlignControls
        setVerticalAlign={actions.setVerticalAlign}
        verticalAlign={state.verticalAlign}
      />
      <PaddingControls
        contentPadding={state.contentPadding}
        setContentPadding={actions.setContentPadding}
      />
    </div>

    <div className="flex flex-col gap-4 border-b border-border px-4 py-5">
      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Детали
      </div>
      <LogoControls
        setShowLogo={actions.setShowLogo}
        setTextShadow={actions.setTextShadow}
        showLogo={state.showLogo}
        textShadow={state.textShadow}
      />
      <WatermarkControls
        setWatermarkOpacity={actions.setWatermarkOpacity}
        watermarkOpacity={state.watermarkOpacity}
      />
    </div>

    <div className="flex flex-col gap-4 px-4 py-5">
      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Извоз
      </div>
      <SizeControls
        selectedSize={state.selectedSize}
        setSelectedSize={actions.setSelectedSize}
      />
    </div>
  </div>
);
