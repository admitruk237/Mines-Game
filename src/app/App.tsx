import { CasinoGame } from '@/widgets/casino-game';
import './main.css';

export const App = () => {
  return (
    <div className="p-4 flex min-h-screen items-center justify-center bg-main-gradient text-white">
      <CasinoGame />
    </div>
  );
};
