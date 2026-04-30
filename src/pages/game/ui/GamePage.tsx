import { Header } from '@/widgets/header';
import { CasinoGame } from '@/widgets/casino-game';
import { ControlPanel } from '@/widgets/control-panel';
import { GameHistory } from '@/widgets/game-history';
import { useActiveGameStatus } from '@/entities/game/model/useActiveGameStatus';
import { useGame } from '@/entities/game/api/queries';
import { CashOutButton } from '@/features/cash-out/ui/CashOutButton';
import { StartGameButton } from '@/features/start-game/ui/StartGameButton';

export const GamePage = () => {
  const { isActive, gameId } = useActiveGameStatus();
  const { data: game = null } = useGame(gameId);
  const showStats = isActive && game;

  return (
    <div className="h-screen bg-bg-main flex flex-col overflow-hidden relative">
      <Header />

      <main className="flex-1 flex justify-center w-full min-h-0 pt-2 lg:pb-6 pb-24 px-4 lg:px-6 overflow-y-auto lg:overflow-y-hidden scrollbar-hide">
        <div className="w-full max-w-[1440px] flex flex-col lg:flex-row gap-4 lg:gap-8 justify-between items-stretch h-auto lg:h-full">
          <div className="lg:order-3">
            <GameHistory />
          </div>

          <div className="lg:order-1 lg:max-w-[300px] w-full">
            <ControlPanel />
          </div>

          <div className="lg:order-2 flex-1 flex items-center justify-center min-w-0 py-8 lg:py-0">
            <CasinoGame />
          </div>
        </div>
      </main>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-[1440px] mx-auto px-4 pb-4 pointer-events-auto">
          {showStats ? <CashOutButton game={game} /> : <StartGameButton />}
        </div>
      </div>
    </div>
  );
};
