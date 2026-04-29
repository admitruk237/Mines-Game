import { SoundToggle } from '@/features/toggle-sound/ui/SoundToggle';

export const Header = () => {
  return (
    <header className="h-[60px] w-full flex items-center bg-bg-main/50 backdrop-blur-md sticky top-0 z-header border-b border-white/5">
      <div className="w-full max-w-[1440px] mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-black tracking-tighter text-white">MINES</span>
          <div className="w-1.5 h-1.5 rounded-full bg-text-win animate-pulse" />
        </div>
        <SoundToggle />
      </div>
    </header>
  );
};
