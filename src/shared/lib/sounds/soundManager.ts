import { Howl, Howler } from 'howler';
import { GAME_SOUNDS, SOUND_VOLUME, type SoundKey } from '../constants/sounds';

const sounds: Record<SoundKey, Howl> = {
  click: new Howl({ src: [GAME_SOUNDS.click], preload: true, volume: SOUND_VOLUME }),
  cashout: new Howl({ src: [GAME_SOUNDS.cashout], preload: true, volume: SOUND_VOLUME }),
  lose: new Howl({ src: [GAME_SOUNDS.lose], preload: true, volume: SOUND_VOLUME }),
  reveal: new Howl({ src: [GAME_SOUNDS.reveal], preload: true, volume: SOUND_VOLUME }),
  bet: new Howl({ src: [GAME_SOUNDS.bet], preload: true, volume: SOUND_VOLUME }),
};

export const soundManager = {
  play(key: SoundKey): void {
    sounds[key].play();
  },
  setMuted(muted: boolean): void {
    Howler.mute(muted);
  },
};
