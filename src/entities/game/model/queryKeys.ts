export const gameKeys = {
  all: ['game'] as const,
  details: () => [...gameKeys.all, 'detail'] as const,
  detail: (id: string) => [...gameKeys.details(), id] as const,
};

export const balanceKeys = {
  all: ['balance'] as const,
};

export const historyKeys = {
  all: ['history'] as const,
};
