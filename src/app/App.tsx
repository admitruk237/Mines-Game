import { CasinoGame } from '@/widgets/casino-game';
import './main.css';

export const App = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-main text-white">
      <CasinoGame />
    </div>
  );
};
