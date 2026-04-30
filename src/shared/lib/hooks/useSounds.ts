import { useCallback, useEffect, useRef } from 'react';
import { useSoundContext } from '../contexts/SoundContext';

export const useSounds = <T extends string>(soundMap: Record<T, string>) => {
  const { isMuted } = useSoundContext();
  const audioCache = useRef<Partial<Record<T, HTMLAudioElement>>>({});

  useEffect(() => {
    Object.entries(soundMap).forEach(([key, src]) => {
      const audio = new Audio(src as string);
      audio.preload = 'auto';
      audio.load();
      audioCache.current[key as T] = audio;
    });

    return () => {
      audioCache.current = {};
    };
  }, [JSON.stringify(soundMap)]);

  const playSound = useCallback(
    (key: T, volume: number = 0.4) => {
      if (isMuted) return;

      const audio = audioCache.current[key];
      if (audio) {
        audio.currentTime = 0;
        audio.volume = volume;
        audio.play().catch((err) => {
          if (import.meta.env.DEV) {
            console.warn(`[useSounds] Failed to play sound: ${key}`, err);
          }
        });
      }
    },
    [isMuted]
  );

  return { playSound };
};
