import { useActiveGameStatus } from '@/entities/game/model/useActiveGameStatus';
import { useGame } from '@/entities/game/api/queries';
import { BetAmountInput } from '@/features/place-bet/ui/BetAmountInput';
import { BetQuickActions } from '@/features/place-bet/ui/BetQuickActions';
import { MinesCountSelector } from '@/features/select-mines/ui/MinesCountSelector';
import { StartGameButton } from '@/features/start-game/ui/StartGameButton';
import { CashOutButton } from '@/features/cash-out/ui/CashOutButton';
import { Card } from '@/shared/ui/card';

export const ControlPanel = () => {
  const { isActive, gameId } = useActiveGameStatus();
  const { data: game = null } = useGame(gameId);

  return (
    <Card variant="panel" className="flex flex-col gap-6 w-full max-w-[300px] shrink-0">
      <div className="flex flex-col gap-4">
        <BetAmountInput />
        <BetQuickActions />
      </div>

      <MinesCountSelector />

      <div className="pt-2">
        {isActive && game ? <CashOutButton game={game} /> : <StartGameButton />}
      </div>
    </Card>
  );
};
