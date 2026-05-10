import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { QueryProvider } from './providers/QueryProvider';
import { Toaster } from '@/shared/ui';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <App />
      <Toaster position="top-center" richColors />
    </QueryProvider>
  </StrictMode>
);
