import { GamePage } from '@/pages/game';
import { useRestoreSession } from '@/entities/game/model/useRestoreSession';
import './main.css';

export const App = () => {
  useRestoreSession();

  return (
    <div className="text-white selection:bg-blue-500/30">
      <GamePage />
    </div>
  );
};
