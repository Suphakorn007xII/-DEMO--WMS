import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import React Query Client
import './index.css';
import App from './App';
import { Provider } from 'jotai';
import { StrictMode } from 'react';
import { Toaster } from 'sonner';

// Create a React Query client instance
const queryClient = new QueryClient();

// React 18 setup for root rendering
const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <BrowserRouter basename="/wms">
      <QueryClientProvider client={queryClient}>
        <Provider>
          <App />
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
    <Toaster position="top-right" />
  </StrictMode>
);
