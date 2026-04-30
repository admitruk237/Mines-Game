import { GamePage } from '@/pages/game';
import { AppInitializer } from './providers/AppInitializer';
import { SoundProvider } from './providers/SoundProvider';
import './main.css';

export const App = () => {
  return (
    <div className="text-white selection:bg-blue-500/30">
      <SoundProvider>
        <AppInitializer>
          <GamePage />
        </AppInitializer>
      </SoundProvider>
    </div>
  );
};
