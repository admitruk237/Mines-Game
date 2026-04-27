export const gameKeys = {
  all: ['game'] as const,
  details: () => [...gameKeys.all, 'detail'] as const,
  detail: (id: string) => [...gameKeys.details(), id] as const,
};
