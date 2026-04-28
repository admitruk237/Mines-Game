import { useGame } from '@/entities/game/api/queries';
import { useActiveGameStore } from '@/entities/game/model/useActiveGameStore';
import { GameBoard } from '../mines-board/ui/GameBoard';

export const CasinoGame = () => {
  const { gameId } = useActiveGameStore();
  const { data: game = null, isLoading } = useGame(gameId);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
        <div className="flex flex-col gap-4">
          <div className="h-full min-h-[400px] rounded-xl bg-slate-800/30 flex items-center justify-center text-slate-500 border border-dashed border-slate-700">
            Bet Controls Area
          </div>
        </div>

        <div className="flex items-center justify-center bg-slate-950/50 rounded-xl p-4 md:p-8 relative">
          {isLoading ? (
            <div className="w-full max-w-[500px] aspect-square rounded-xl bg-slate-800/20 animate-pulse border border-slate-800" />
          ) : (
            <GameBoard game={game} />
          )}
        </div>
      </div>
    </div>
  );
};
