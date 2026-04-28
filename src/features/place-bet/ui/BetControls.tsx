import { useActiveGameStatus } from '@/entities/game/model/useActiveGameStatus';
import { useGame } from '@/entities/game/api/queries';
import { BetAmountInput } from './BetAmountInput';
import { BetQuickActions } from './BetQuickActions';
import { MinesCountSelector } from '@/features/select-mines/ui/MinesCountSelector';
import { StartGameButton } from '@/features/start-game/ui/StartGameButton';
import { CashOutButton } from '@/features/cash-out/ui/CashOutButton';

export const BetControls = () => {
  const { isActive, gameId } = useActiveGameStatus();
  const { data: game } = useGame(gameId);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[300px] bg-[#161B28]/50 p-6 rounded-2xl border border-slate-800/50 backdrop-blur-sm">
      <div className="flex flex-col gap-4">
        <BetAmountInput />
        <BetQuickActions />
      </div>

      <MinesCountSelector />

      <div className="pt-2">
        {isActive && game ? <CashOutButton game={game} /> : <StartGameButton />}
      </div>
    </div>
  );
};
