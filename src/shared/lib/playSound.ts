export const playSound = (path: string, volume = 0.5) => {
  const audio = new Audio(path);
  audio.volume = volume;

  audio.play().catch(() => {
    if (import.meta.env.DEV) {
      console.warn('Audio play failed (user interaction required):', path);
    }
  });
};
