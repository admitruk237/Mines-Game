import { Howl, Howler } from 'howler';
import { GAME_SOUNDS, type SoundKey } from '../constants/sounds';

const sounds: Record<SoundKey, Howl> = {
  click: new Howl({ src: [GAME_SOUNDS.click], preload: true, volume: 0.4 }),
  cashout: new Howl({ src: [GAME_SOUNDS.cashout], preload: true, volume: 0.4 }),
  lose: new Howl({ src: [GAME_SOUNDS.lose], preload: true, volume: 0.4 }),
  reveal: new Howl({ src: [GAME_SOUNDS.reveal], preload: true, volume: 0.4 }),
  bet: new Howl({ src: [GAME_SOUNDS.bet], preload: true, volume: 0.4 }),
};

export const soundManager = {
  play(key: SoundKey): void {
    sounds[key].play();
  },
  setMuted(muted: boolean): void {
    Howler.mute(muted);
  },
};
