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

export const incrementPlayerId = () => {
  if (typeof window === 'undefined') return;

  const currentId = localStorage.getItem(STORAGE_KEY) || crypto.randomUUID();
  const match = currentId.match(/(.+)-(\d+)$/);

  let nextId;
  if (match) {
    const base = match[1];
    const counter = parseInt(match[2], 10);
    nextId = `${base}-${counter + 1}`;
  } else {
    nextId = `${currentId}-1`;
  }

  localStorage.setItem(STORAGE_KEY, nextId);
  window.location.reload();
};
