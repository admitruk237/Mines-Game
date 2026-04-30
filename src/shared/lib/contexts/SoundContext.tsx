import { createContext, type ReactNode, useContext } from 'react';
import { type SoundKey } from '../constants/sounds';

interface SoundContextType {
  isMuted: boolean;
  playSound: (key: SoundKey) => void;
}

const SoundContext = createContext<SoundContextType>({
  isMuted: false,
  playSound: () => {},
});

export const useSoundContext = () => useContext(SoundContext);

interface Props {
  children: ReactNode;
  isMuted: boolean;
  playSound: (key: SoundKey) => void;
}

export const SoundContextProvider = ({ children, isMuted, playSound }: Props) => {
  return <SoundContext.Provider value={{ isMuted, playSound }}>{children}</SoundContext.Provider>;
};
