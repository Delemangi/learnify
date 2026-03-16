import { Eye, Settings2 } from 'lucide-react';

type MobileTabBarProps = {
  readonly activeTab: 'controls' | 'preview';
  readonly setActiveTab: (tab: 'controls' | 'preview') => void;
};

export const MobileTabBar = ({
  activeTab,
  setActiveTab,
}: MobileTabBarProps) => (
  <nav className="flex h-14 border-t border-border bg-card pb-[env(safe-area-inset-bottom)] lg:hidden">
    <button
      className={`flex flex-1 flex-col items-center justify-center gap-1 ${activeTab === 'controls' ? 'text-primary' : 'text-muted-foreground'}`}
      onClick={() => {
        setActiveTab('controls');
      }}
      type="button"
    >
      <Settings2 className="h-5 w-5" />
      <span className="text-[10px] font-medium uppercase tracking-wider">
        Поставки
      </span>
    </button>
    <button
      className={`flex flex-1 flex-col items-center justify-center gap-1 ${activeTab === 'preview' ? 'text-primary' : 'text-muted-foreground'}`}
      onClick={() => {
        setActiveTab('preview');
      }}
      type="button"
    >
      <Eye className="h-5 w-5" />
      <span className="text-[10px] font-medium uppercase tracking-wider">
        Преглед
      </span>
    </button>
  </nav>
);
