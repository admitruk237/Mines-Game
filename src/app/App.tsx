import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './main.css';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen items-center justify-center bg-main-gradient text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Mines Game</h1>
          <p className="text-zinc-400">FSD architecture initialized. Rules applied.</p>
        </div>
      </div>
    </QueryClientProvider>
  );
};
