export const GAME_SOUNDS = {
  click: '/sounds/click.wav',
  cashout: '/sounds/cashout.mp3',
  lose: '/sounds/lose.m4a',
  reveal: '/sounds/gem-reveal.mp3',
  bet: '/sounds/bet.mp3',
} as const;

export const SOUND_KEYS = {
  CLICK: 'click',
  CASHOUT: 'cashout',
  LOSE: 'lose',
  REVEAL: 'reveal',
  BET: 'bet',
} as const;

export type SoundKey = keyof typeof GAME_SOUNDS;

export const SOUND_VOLUME = 0.4;
