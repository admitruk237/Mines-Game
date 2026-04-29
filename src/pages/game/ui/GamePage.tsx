import { Header } from '@/widgets/header';
import { CasinoGame } from '@/widgets/casino-game';
import { ControlPanel } from '@/widgets/control-panel';
import { GameHistory } from '@/widgets/game-history';

export const GamePage = () => {
  return (
    <div className="h-screen bg-bg-main flex flex-col overflow-hidden">
      <Header />

      <main className="flex-1 flex justify-center w-full min-h-0 pt-2 pb-6 px-6">
        <div className="w-full max-w-[1440px] flex gap-8 justify-between items-stretch h-full">
          <ControlPanel />

          <div className="flex-1 flex items-center justify-center min-w-0">
            <CasinoGame />
          </div>

          <GameHistory />
        </div>
      </main>
    </div>
  );
};
