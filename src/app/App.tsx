import { GamePage } from '@/pages/game';
import { AppInitializer } from './providers/AppInitializer';
import './main.css';

export const App = () => {
  return (
    <div className="text-white selection:bg-active-blue/30">
      <AppInitializer>
        <GamePage />
      </AppInitializer>
    </div>
  );
};
