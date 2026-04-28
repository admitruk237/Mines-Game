const STORAGE_KEY = 'mines-player-id';

export const getPlayerId = (): string => {
  if (typeof window === 'undefined') return '';

  let id = localStorage.getItem(STORAGE_KEY);

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, id);
  }

  return id;
};

export const resetPlayerId = () => {
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
};
