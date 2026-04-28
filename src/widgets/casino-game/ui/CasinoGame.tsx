import { useGame } from '@/entities/game/api/queries';
import { useActiveGameStore } from '@/entities/game/model/useActiveGameStore';
import { GameBoard } from './GameBoard';
import { BetControls } from '@/features/place-bet/ui/BetControls';
import { SoundToggle } from '@/features/toggle-sound/ui/SoundToggle';

export const CasinoGame = () => {
  const gameId = useActiveGameStore((s) => s.gameId);
  const { data: game = null, isLoading } = useGame(gameId);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 w-full max-w-5xl mx-auto">
      {/* Header із налаштуваннями */}
      <div className="flex justify-end px-2">
        <SoundToggle />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
        {/* Ліва панель - Керування */}
        <div className="flex flex-col gap-4">
          <BetControls />
        </div>

        {/* Права панель - Ігрове поле */}
        <div className="flex items-center justify-center bg-slate-950/50 rounded-xl p-4 md:p-8 relative min-h-[400px]">
          {isLoading ? (
            <div className="w-full max-w-[500px] aspect-square rounded-xl bg-slate-800/20 animate-pulse border border-slate-800" />
          ) : game ? (
            <GameBoard game={game} />
          ) : (
            /* Стан без гри: показуємо просто порожню сітку для візуалу */
            <div className="grid grid-cols-5 gap-2 md:gap-3 w-full max-w-[500px] aspect-square opacity-20 pointer-events-none">
              {Array.from({ length: 25 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-slate-800 rounded-[14px] border border-slate-700"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
