import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/ui/ErrorBoundary';
import './styles/tokens.css';
import './styles/main.css';

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 1, staleTime: 60_000, refetchOnWindowFocus: false } } });
createRoot(document.getElementById('root')).render(
  <React.StrictMode><BrowserRouter><QueryClientProvider client={queryClient}>
    <ThemeProvider><ToastProvider><AuthProvider><ErrorBoundary><AppRoutes /></ErrorBoundary></AuthProvider></ToastProvider></ThemeProvider>
  </QueryClientProvider></BrowserRouter></React.StrictMode>
);
