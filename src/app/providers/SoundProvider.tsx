import { GAME_SOUNDS, SoundContextProvider, useSounds } from '@/shared/lib';
import { useSoundStore } from '@/features/toggle-sound';
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
