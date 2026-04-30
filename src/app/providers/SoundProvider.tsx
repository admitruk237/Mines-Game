import { SoundContextProvider } from '@/shared/lib/contexts/SoundContext';
import { useSoundStore } from '@/features/toggle-sound/model/useSoundStore';
import { GAME_SOUNDS } from '@/shared/lib/constants/sounds';
import { useSounds } from '@/shared/lib/hooks/useSounds';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const SoundProvider = ({ children }: Props) => {
  const isMuted = useSoundStore((s) => s.isMuted);
  const { playSound } = useSounds(GAME_SOUNDS);

  return (
    <SoundContextProvider isMuted={isMuted} playSound={playSound}>
      {children}
    </SoundContextProvider>
  );
};
