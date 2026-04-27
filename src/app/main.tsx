import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { QueryProvider } from './providers/QueryProvider';
import { Toaster } from '@/shared/ui/sonner';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <App />
      <Toaster position="top-center" richColors />
    </QueryProvider>
  </React.StrictMode>
);
