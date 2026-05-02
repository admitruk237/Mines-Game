import { useActiveGameStatus, useGame } from '@/entities/game';
import { BalanceDisplay } from '@/entities/balance';
import { BetAmountInput, BetQuickActions, BetQuickAmounts } from '@/features/place-bet';
import { MinesCountSelector } from '@/features/select-mines';
import { StartGameButton } from '@/features/start-game';
import { CashOutButton } from '@/features/cash-out';
import { Card } from '@/shared/ui/card';
import { InfoStats } from './InfoStats';

interface ActiveGamePanelProps {
  gameId: string;
}

const ActiveGamePanel = ({ gameId }: ActiveGamePanelProps) => {
  const { data: game = null } = useGame(gameId);
  if (!game) return null;
  return (
    <>
      <div className="hidden lg:block pt-2">
        <CashOutButton gameId={gameId} initialData={game} />
      </div>
      <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
        <InfoStats game={game} />
      </div>
    </>
  );
};

export const ControlPanel = () => {
  const { isActive, gameId } = useActiveGameStatus();

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
        {!isActive && (
          <div className="hidden lg:block pt-2">
            <StartGameButton />
          </div>
        )}
        <div className="flex flex-col">
          {isActive && gameId && <ActiveGamePanel gameId={gameId} />}
          <div className="hidden lg:block pt-4 border-t border-white/5 mt-4">
            <BalanceDisplay />
          </div>
        </div>
      </div>
    </Card>
  );
};
