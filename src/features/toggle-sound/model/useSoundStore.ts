import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SoundState {
  isMuted: boolean;
  toggleMute: () => void;
}

export const useSoundStore = create<SoundState>()(
  persist(
    (set) => ({
      isMuted: false,
      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
    }),
    { name: 'mines-sound-storage' }
  )
);
