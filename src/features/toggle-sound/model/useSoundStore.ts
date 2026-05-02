import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { soundManager } from '@/shared/lib/sounds/soundManager';

interface SoundState {
  isMuted: boolean;
  toggleMute: () => void;
}

export const useSoundStore = create<SoundState>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        isMuted: false,
        toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
      }),
      { name: 'mines-sound-storage' }
    )
  )
);

useSoundStore.subscribe(
  (state) => state.isMuted,
  (isMuted) => soundManager.setMuted(isMuted),
  { fireImmediately: true }
);

export const useIsMuted = () => useSoundStore((s) => s.isMuted);
export const useToggleMute = () => useSoundStore((s) => s.toggleMute);
