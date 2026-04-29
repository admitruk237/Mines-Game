import { useCashOut as useCashOutMutation } from '@/entities/game/api/mutations';

export const useCashOut = (gameId: string | null) => {
  const mutation = useCashOutMutation(gameId);

  const cashOut = () => {
    if (!gameId) return;
    mutation.mutate();
  };

  return {
    cashOut,
    isPending: mutation.isPending,
  };
};
