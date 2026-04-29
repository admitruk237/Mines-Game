export const ENDPOINTS = {
  GAMES: '/games',
  ACTIVE_GAME: '/games/active',
  GAME_BY_ID: (id: string) => `/games/${id}`,
  REVEAL: (id: string) => `/games/${id}/reveal`,
  CASHOUT: (id: string) => `/games/${id}/cashout`,
  BALANCE: '/balance',
  HISTORY: '/history',
} as const;
