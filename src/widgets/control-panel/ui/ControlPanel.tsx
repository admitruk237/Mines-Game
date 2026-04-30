import { useActiveGameStatus } from '@/entities/game/model/useActiveGameStatus';
import { useGame } from '@/entities/game/api/queries';
import { BetAmountInput } from '@/features/place-bet/ui/BetAmountInput';
import { BetQuickActions } from '@/features/place-bet/ui/BetQuickActions';
import { MinesCountSelector } from '@/features/select-mines/ui/MinesCountSelector';
import { StartGameButton } from '@/features/start-game/ui/StartGameButton';
import { CashOutButton } from '@/features/cash-out/ui/CashOutButton';
import { BalanceDisplay } from '@/entities/balance/ui/BalanceDisplay';
import { Card } from '@/shared/ui/card';
import { InfoStats } from './InfoStats';

import { BetQuickAmounts } from '@/features/place-bet/ui/BetQuickAmounts';

export const ControlPanel = () => {
  const { isActive, gameId } = useActiveGameStatus();
  const { data: game = null } = useGame(gameId);

  const showStats = isActive && game;

  return (
    <Card
      variant="panel"
      className="flex flex-col gap-6 w-full lg:max-w-[300px] shrink-0 h-full border-none lg:border-2"
    >
      <div className="flex flex-col gap-6 flex-1">
        <div className="flex flex-col gap-4">
          <div className="lg:hidden pb-2 border-b border-white/5">
            <BalanceDisplay />
          </div>
          <BetAmountInput disabled={isActive} />
          <BetQuickAmounts disabled={isActive} />
          <BetQuickActions disabled={isActive} />
        </div>
        <MinesCountSelector disabled={isActive} />
        <div className="hidden lg:block pt-2">
          {showStats ? <CashOutButton game={game} /> : <StartGameButton />}
        </div>
        <div className="flex flex-col">
          {showStats && (
            <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <InfoStats game={game} />
            </div>
          )}
          <div className="hidden lg:block pt-4 border-t border-white/5 mt-4">
            <BalanceDisplay />
          </div>
        </div>
      </div>
    </Card>
  );
};
