import { SoundToggle } from '@/features/toggle-sound';

export const Header = () => {
  return (
    <header className="lg:h-[60px] h-10 w-full flex items-center bg-transparent sticky top-0 z-header">
      <div className="w-full max-w-[1440px] mx-auto px-6 flex items-center justify-end">
        <SoundToggle />
      </div>
    </header>
  );
};
